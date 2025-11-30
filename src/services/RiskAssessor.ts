import { Clause, RiskAssessment, RiskMap } from '../types';

class RiskAssessorService {
  assessClause(clause: Clause): RiskAssessment {
    let riskLevel: 'high' | 'medium' | 'low' = 'low';
    let reason = 'Standard clause with minimal risk';

    const content = clause.content.toLowerCase();

    // High-risk indicators
    if (clause.category === 'penalties' || content.includes('penalty') || content.includes('liquidated damages')) {
      riskLevel = 'high';
      reason = 'Contains penalty or liquidated damages provisions';
    } else if (content.includes('unilateral') && clause.category === 'termination') {
      riskLevel = 'high';
      reason = 'Unilateral termination clause detected';
    } else if (content.includes('unlimited liability') || content.includes('indemnify')) {
      riskLevel = 'high';
      reason = 'Unlimited liability or indemnification clause';
    }
    // Medium-risk indicators
    else if (clause.category === 'non_compete' || clause.category === 'non_solicitation') {
      riskLevel = 'medium';
      reason = 'Restrictive covenant that may limit future opportunities';
    } else if (clause.category === 'confidentiality') {
      riskLevel = 'medium';
      reason = 'Confidentiality obligations require careful compliance';
    } else if (content.includes('automatic renewal')) {
      riskLevel = 'medium';
      reason = 'Automatic renewal clause - requires attention to termination dates';
    }

    return {
      clause,
      riskLevel,
      reason,
    };
  }

  generateRiskMap(clauses: Clause[]): RiskMap {
    const assessments = clauses.map(clause => this.assessClause(clause));

    return {
      high: assessments.filter(a => a.riskLevel === 'high'),
      medium: assessments.filter(a => a.riskLevel === 'medium'),
      low: assessments.filter(a => a.riskLevel === 'low'),
    };
  }
}

export const riskAssessor = new RiskAssessorService();
