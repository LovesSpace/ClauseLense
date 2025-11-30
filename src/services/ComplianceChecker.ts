import { Clause, ComplianceIssue } from '../types';

class ComplianceCheckerService {
  checkCompliance(clauses: Clause[]): ComplianceIssue[] {
    const issues: ComplianceIssue[] = [];
    const categories = new Set(clauses.map(c => c.category));

    // Check for missing termination clause
    if (!categories.has('termination')) {
      issues.push({
        issue: 'Missing Termination Clause',
        severity: 'high',
        details: 'No termination clause found. This may make it difficult to exit the agreement.',
        recommendation: 'Add a termination clause specifying conditions and notice periods.',
      });
    }

    // Check for undefined payment cycle
    const paymentClauses = clauses.filter(c => c.category === 'payment');
    const hasPaymentCycle = paymentClauses.some(c => 
      /monthly|quarterly|annually|weekly/i.test(c.content)
    );
    if (paymentClauses.length > 0 && !hasPaymentCycle) {
      issues.push({
        issue: 'Undefined Payment Cycle',
        severity: 'medium',
        details: 'Payment terms exist but the payment frequency is not clearly defined.',
        recommendation: 'Specify whether payments are monthly, quarterly, or annually.',
      });
    }

    // Check for missing confidentiality clause
    if (!categories.has('confidentiality')) {
      issues.push({
        issue: 'Missing Confidentiality Clause',
        severity: 'medium',
        details: 'No confidentiality or NDA clause found.',
        recommendation: 'Consider adding confidentiality provisions to protect sensitive information.',
      });
    }

    // Check for missing governing law
    if (!categories.has('governing_law')) {
      issues.push({
        issue: 'Missing Governing Law',
        severity: 'high',
        details: 'No governing law or jurisdiction clause found.',
        recommendation: 'Specify which jurisdiction\'s laws will govern the agreement.',
      });
    }

    // Check for one-sided liability
    const penaltyClauses = clauses.filter(c => c.category === 'penalties');
    penaltyClauses.forEach(clause => {
      if (/one\s+party|unilateral/i.test(clause.content) && /liable|liability/i.test(clause.content)) {
        issues.push({
          issue: 'One-Sided Liability Clause',
          severity: 'high',
          details: 'Liability appears to be heavily weighted toward one party.',
          recommendation: 'Review liability provisions to ensure fair allocation of risk.',
        });
      }
    });

    // Check for excessive non-compete duration
    const nonCompeteClauses = clauses.filter(c => c.category === 'non_compete');
    nonCompeteClauses.forEach(clause => {
      const yearMatch = clause.content.match(/(\d+)\s*year/i);
      if (yearMatch && parseInt(yearMatch[1]) > 1) {
        issues.push({
          issue: 'Excessive Non-Compete Duration',
          severity: 'medium',
          details: `Non-compete clause extends for ${yearMatch[1]} years, which may be unreasonable.`,
          recommendation: 'Consider negotiating a shorter non-compete period (typically 6-12 months).',
        });
      }
    });

    return issues;
  }
}

export const complianceChecker = new ComplianceCheckerService();
