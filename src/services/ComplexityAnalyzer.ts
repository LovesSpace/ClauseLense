import { Clause, ComplexityScore } from '../types';

class ComplexityAnalyzerService {
  calculateScore(text: string, clauses: Clause[]): ComplexityScore {
    const avgSentenceLength = this.calculateAvgSentenceLength(text);
    const jargonDensity = this.calculateJargonDensity(text);
    const clauseCount = clauses.length;
    const nestedClauseCount = this.countNestedClauses(text);
    const penaltySeverity = this.assessPenaltySeverity(clauses);

    // Calculate overall score (0-100)
    let score = 0;
    score += Math.min(avgSentenceLength / 30 * 20, 20); // Max 20 points
    score += jargonDensity * 25; // Max 25 points
    score += Math.min(clauseCount / 50 * 20, 20); // Max 20 points
    score += Math.min(nestedClauseCount / 10 * 20, 20); // Max 20 points
    score += penaltySeverity * 15; // Max 15 points

    score = Math.round(Math.min(score, 100));

    const label = score <= 30 ? 'simple' : score <= 60 ? 'moderate' : 'complex';

    return {
      score,
      label,
      metrics: {
        avgSentenceLength,
        jargonDensity,
        clauseCount,
        nestedClauseCount,
        penaltySeverity,
      },
    };
  }

  private calculateAvgSentenceLength(text: string): number {
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    if (sentences.length === 0) return 0;

    const totalWords = sentences.reduce((sum, sentence) => {
      return sum + sentence.trim().split(/\s+/).length;
    }, 0);

    return Math.round(totalWords / sentences.length);
  }

  private calculateJargonDensity(text: string): number {
    const legalTerms = [
      'herein', 'thereof', 'hereby', 'hereto', 'whereas', 'aforementioned',
      'notwithstanding', 'pursuant', 'indemnify', 'covenant', 'severability',
      'jurisdiction', 'arbitration', 'liquidated', 'waiver', 'supersede'
    ];

    const words = text.toLowerCase().split(/\s+/);
    const jargonCount = words.filter(word => 
      legalTerms.some(term => word.includes(term))
    ).length;

    return Math.min(jargonCount / words.length, 1);
  }

  private countNestedClauses(text: string): number {
    // Count parenthetical expressions and sub-clauses
    const parentheticals = (text.match(/\([^)]+\)/g) || []).length;
    const subClauses = (text.match(/;\s*\([a-z]\)/g) || []).length;
    
    return parentheticals + subClauses;
  }

  private assessPenaltySeverity(clauses: Clause[]): number {
    const penaltyClauses = clauses.filter(c => c.category === 'penalties');
    if (penaltyClauses.length === 0) return 0;

    let severity = 0;
    penaltyClauses.forEach(clause => {
      const content = clause.content.toLowerCase();
      if (content.includes('unlimited')) severity += 0.5;
      if (content.includes('liquidated damages')) severity += 0.3;
      if (content.includes('indemnify')) severity += 0.2;
    });

    return Math.min(severity, 1);
  }
}

export const complexityAnalyzer = new ComplexityAnalyzerService();
