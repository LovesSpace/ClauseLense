import { Clause, ContractSummary, RiskMap, ComplexityScore } from '../types';

class SummaryGeneratorService {
  generateSummary(
    clauses: Clause[],
    riskMap: RiskMap,
    complexity: ComplexityScore
  ): ContractSummary {
    const purpose = this.extractPurpose(clauses);
    const keyParties = this.extractKeyParties(clauses);
    const contractLength = this.extractContractLength(clauses);
    const paymentHighlights = this.extractPaymentHighlights(clauses);
    const topRisks = this.extractTopRisks(riskMap);
    const keyPoints = this.generateKeyPoints(clauses, riskMap, complexity);

    return {
      purpose,
      keyParties,
      contractLength,
      paymentHighlights,
      topRisks,
      keyPoints,
    };
  }

  private extractPurpose(clauses: Clause[]): string {
    // Look for clauses that might describe the purpose
    const purposeClause = clauses.find(c => 
      c.content.toLowerCase().includes('purpose') ||
      c.content.toLowerCase().includes('whereas') ||
      c.category === 'other' && c.startIndex < 500
    );

    if (purposeClause) {
      const sentences = purposeClause.content.split(/[.!?]/);
      return sentences[0]?.trim() || 'General contractual agreement';
    }

    return 'General contractual agreement';
  }

  private extractKeyParties(clauses: Clause[]): string[] {
    const partyClauses = clauses.filter(c => c.category === 'parties');
    const parties: string[] = [];

    partyClauses.forEach(clause => {
      const matches = clause.content.match(/(?:between|party|parties)[:\s]+([^,;.]+)/gi);
      if (matches) {
        matches.forEach(match => {
          const party = match.replace(/(?:between|party|parties)[:\s]+/gi, '').trim();
          if (party.length > 2 && party.length < 100) {
            parties.push(party);
          }
        });
      }
    });

    return parties.length > 0 ? parties.slice(0, 5) : ['Not specified'];
  }

  private extractContractLength(clauses: Clause[]): string {
    const durationClauses = clauses.filter(c => c.category === 'duration');
    
    for (const clause of durationClauses) {
      const yearMatch = clause.content.match(/(\d+)\s*year/i);
      if (yearMatch) {
        return `${yearMatch[1]} year(s)`;
      }
      
      const monthMatch = clause.content.match(/(\d+)\s*month/i);
      if (monthMatch) {
        return `${monthMatch[1]} month(s)`;
      }
    }

    return 'Not specified';
  }

  private extractPaymentHighlights(clauses: Clause[]): string[] {
    const paymentClauses = clauses.filter(c => c.category === 'payment');
    const highlights: string[] = [];

    paymentClauses.forEach(clause => {
      // Extract monetary amounts
      const amounts = clause.content.match(/(?:\$|USD|EUR|GBP)\s*[\d,]+(?:\.\d{2})?/g);
      if (amounts) {
        amounts.forEach(amount => highlights.push(amount));
      }

      // Extract payment frequency
      if (/monthly|annually|quarterly/i.test(clause.content)) {
        const freqMatch = clause.content.match(/(monthly|annually|quarterly)/i);
        if (freqMatch) {
          highlights.push(`Payment frequency: ${freqMatch[1]}`);
        }
      }
    });

    return highlights.length > 0 ? highlights.slice(0, 5) : ['No payment information found'];
  }

  private extractTopRisks(riskMap: RiskMap): string[] {
    const risks: string[] = [];

    // Add high-risk items first
    riskMap.high.forEach(assessment => {
      risks.push(`${assessment.clause.title}: ${assessment.reason}`);
    });

    // Add medium-risk items if we need more
    if (risks.length < 5) {
      riskMap.medium.slice(0, 5 - risks.length).forEach(assessment => {
        risks.push(`${assessment.clause.title}: ${assessment.reason}`);
      });
    }

    return risks.length > 0 ? risks.slice(0, 5) : ['No significant risks identified'];
  }

  private generateKeyPoints(
    clauses: Clause[],
    riskMap: RiskMap,
    complexity: ComplexityScore
  ): string[] {
    const points: string[] = [];

    // Add complexity info
    points.push(`Contract complexity: ${complexity.label} (score: ${complexity.score}/100)`);

    // Add clause count
    points.push(`Total clauses identified: ${clauses.length}`);

    // Add risk summary
    points.push(`Risk assessment: ${riskMap.high.length} high, ${riskMap.medium.length} medium, ${riskMap.low.length} low`);

    // Add key clause types present
    const categories = new Set(clauses.map(c => c.category));
    if (categories.has('termination')) {
      points.push('Termination clause present');
    }
    if (categories.has('confidentiality')) {
      points.push('Confidentiality agreement included');
    }
    if (categories.has('non_compete')) {
      points.push('Non-compete clause included');
    }
    if (categories.has('dispute_resolution')) {
      points.push('Dispute resolution mechanism defined');
    }

    // Add payment info if available
    const paymentClauses = clauses.filter(c => c.category === 'payment');
    if (paymentClauses.length > 0) {
      points.push(`${paymentClauses.length} payment-related clause(s) found`);
    }

    return points.slice(0, 10);
  }
}

export const summaryGenerator = new SummaryGeneratorService();
