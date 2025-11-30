import { Clause, CostBreakdown, CostItem } from '../types';

class CostAnalyzerService {
  analyzeCosts(clauses: Clause[]): CostBreakdown {
    const paymentClauses = clauses.filter(c => c.category === 'payment');
    
    const oneTimeCosts: CostItem[] = [];
    const recurringCosts: CostItem[] = [];
    const fees: CostItem[] = [];

    paymentClauses.forEach(clause => {
      const amounts = this.extractAmounts(clause.content);
      
      amounts.forEach(({ amount, currency, description }) => {
        const frequency = this.determineFrequency(clause.content, description);
        
        const costItem: CostItem = {
          description,
          amount,
          currency,
          frequency,
        };

        if (frequency === 'one-time') {
          oneTimeCosts.push(costItem);
        } else if (frequency) {
          recurringCosts.push(costItem);
        } else if (/fee|charge/i.test(description)) {
          fees.push(costItem);
        } else {
          oneTimeCosts.push(costItem);
        }
      });
    });

    const total = [...oneTimeCosts, ...recurringCosts, ...fees].reduce(
      (sum, item) => sum + item.amount,
      0
    );

    return {
      oneTimeCosts,
      recurringCosts,
      fees,
      total,
    };
  }

  private extractAmounts(text: string): Array<{ amount: number; currency: string; description: string }> {
    const results: Array<{ amount: number; currency: string; description: string }> = [];
    
    // Match currency amounts
    const patterns = [
      /\$\s*([\d,]+(?:\.\d{2})?)/g,
      /([\d,]+(?:\.\d{2})?)\s*USD/g,
      /([\d,]+(?:\.\d{2})?)\s*EUR/g,
      /([\d,]+(?:\.\d{2})?)\s*GBP/g,
    ];

    patterns.forEach((pattern, index) => {
      const matches = text.matchAll(pattern);
      for (const match of matches) {
        const amountStr = match[1].replace(/,/g, '');
        const amount = parseFloat(amountStr);
        
        const currency = index === 0 ? 'USD' : index === 1 ? 'USD' : index === 2 ? 'EUR' : 'GBP';
        
        // Extract context around the amount for description
        const matchIndex = match.index || 0;
        const contextStart = Math.max(0, matchIndex - 50);
        const contextEnd = Math.min(text.length, matchIndex + 50);
        const context = text.substring(contextStart, contextEnd).trim();
        
        results.push({
          amount,
          currency,
          description: this.generateDescription(context),
        });
      }
    });

    return results;
  }

  private determineFrequency(text: string, description: string): 'monthly' | 'quarterly' | 'annually' | 'one-time' | undefined {
    const combined = (text + ' ' + description).toLowerCase();
    
    if (/monthly|per month|\/month/i.test(combined)) return 'monthly';
    if (/quarterly|per quarter/i.test(combined)) return 'quarterly';
    if (/annually|per year|per annum|\/year/i.test(combined)) return 'annually';
    if (/one-time|one time|initial|upfront/i.test(combined)) return 'one-time';
    
    return undefined;
  }

  private generateDescription(context: string): string {
    // Try to extract a meaningful description from context
    const sentences = context.split(/[.;]/);
    for (const sentence of sentences) {
      if (sentence.length > 10 && sentence.length < 100) {
        return sentence.trim();
      }
    }
    return 'Payment amount';
  }
}

export const costAnalyzer = new CostAnalyzerService();
