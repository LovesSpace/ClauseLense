import { Clause, Timeline, TimelineMilestone } from '../types';

class TimelineGeneratorService {
  generateTimeline(clauses: Clause[]): Timeline {
    const startDate = this.extractStartDate(clauses);
    const endDate = this.extractEndDate(clauses);
    const renewalTerms = this.extractRenewalTerms(clauses);
    const milestones = this.generateMilestones(startDate, endDate, renewalTerms);

    return {
      startDate,
      endDate,
      renewalTerms,
      milestones,
    };
  }

  private extractStartDate(clauses: Clause[]): Date | undefined {
    const dateClauses = clauses.filter(c => 
      c.category === 'effective_date' || c.category === 'duration'
    );

    for (const clause of dateClauses) {
      const dateMatch = clause.content.match(/(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})/);
      if (dateMatch) {
        return new Date(parseInt(dateMatch[3]), parseInt(dateMatch[1]) - 1, parseInt(dateMatch[2]));
      }

      const monthYearMatch = clause.content.match(/(January|February|March|April|May|June|July|August|September|October|November|December)\s+(\d{1,2}),?\s+(\d{4})/i);
      if (monthYearMatch) {
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        const monthIndex = monthNames.findIndex(m => m.toLowerCase() === monthYearMatch[1].toLowerCase());
        return new Date(parseInt(monthYearMatch[3]), monthIndex, parseInt(monthYearMatch[2]));
      }
    }

    return undefined;
  }

  private extractEndDate(clauses: Clause[]): Date | undefined {
    const durationClauses = clauses.filter(c => c.category === 'duration');

    for (const clause of durationClauses) {
      const dateMatch = clause.content.match(/(?:until|through|ending)\s+(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})/i);
      if (dateMatch) {
        return new Date(parseInt(dateMatch[3]), parseInt(dateMatch[1]) - 1, parseInt(dateMatch[2]));
      }

      const monthYearMatch = clause.content.match(/(?:until|through|ending)\s+(January|February|March|April|May|June|July|August|September|October|November|December)\s+(\d{1,2}),?\s+(\d{4})/i);
      if (monthYearMatch) {
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        const monthIndex = monthNames.findIndex(m => m.toLowerCase() === monthYearMatch[1].toLowerCase());
        return new Date(parseInt(monthYearMatch[3]), monthIndex, parseInt(monthYearMatch[2]));
      }
    }

    return undefined;
  }

  private extractRenewalTerms(clauses: Clause[]): string | undefined {
    const durationClauses = clauses.filter(c => c.category === 'duration');

    for (const clause of durationClauses) {
      if (/renew|renewal|automatic/i.test(clause.content)) {
        const sentences = clause.content.split(/[.!?]/);
        const renewalSentence = sentences.find(s => /renew|renewal/i.test(s));
        return renewalSentence?.trim();
      }
    }

    return undefined;
  }

  private generateMilestones(
    startDate?: Date,
    endDate?: Date,
    renewalTerms?: string
  ): TimelineMilestone[] {
    const milestones: TimelineMilestone[] = [];

    if (startDate) {
      milestones.push({
        date: startDate,
        label: 'Contract Start',
        type: 'start',
      });
    }

    if (endDate) {
      milestones.push({
        date: endDate,
        label: 'Contract End',
        type: 'end',
      });

      if (renewalTerms) {
        // Add renewal milestone 30 days before end date
        const renewalDate = new Date(endDate);
        renewalDate.setDate(renewalDate.getDate() - 30);
        milestones.push({
          date: renewalDate,
          label: 'Renewal Decision Point',
          type: 'renewal',
        });
      }
    }

    return milestones.sort((a, b) => a.date.getTime() - b.date.getTime());
  }
}

export const timelineGenerator = new TimelineGeneratorService();
