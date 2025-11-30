import { Clause, ClauseCategory, ClausePattern } from '../types';

class ClauseDetectorService {
  private patterns: ClausePattern[] = [
    {
      category: 'parties',
      patterns: [
        /(?:this\s+(?:agreement|contract).*?between|parties?\s+to\s+this\s+(?:agreement|contract))[:\s]+([^.]+)/gi,
        /(?:entered\s+into\s+by\s+and\s+between)[:\s]+([^.]+)/gi,
        /(?:party|parties)[:\s]+([^.]+?)(?:hereinafter|referred\s+to)/gi,
      ],
      keywords: ['party', 'parties', 'between', 'hereinafter', 'referred to as'],
      priority: 10,
    },
    {
      category: 'effective_date',
      patterns: [
        /effective\s+date[:\s]+([^.]+)/gi,
        /(?:dated|executed\s+on|signed\s+on)[:\s]+([^.]+)/gi,
        /(?:this\s+agreement.*?dated)[:\s]+([^.]+)/gi,
      ],
      keywords: ['effective date', 'dated', 'executed on', 'commencement date'],
      priority: 9,
    },
    {
      category: 'duration',
      patterns: [
        /(?:term|duration)[:\s]+([^.]+)/gi,
        /(?:period\s+of)[:\s]+([^.]+)/gi,
        /(?:shall\s+(?:remain|continue)\s+in\s+(?:force|effect)\s+for)[:\s]+([^.]+)/gi,
      ],
      keywords: ['term', 'duration', 'period', 'years', 'months'],
      priority: 8,
    },
    {
      category: 'payment',
      patterns: [
        /(?:payment|compensation|fee|price)[:\s]+([^.]+)/gi,
        /(?:\$|USD|EUR|GBP)\s*[\d,]+(?:\.\d{2})?/gi,
        /(?:shall\s+pay|payment\s+of)[:\s]+([^.]+)/gi,
      ],
      keywords: ['payment', 'compensation', 'fee', 'price', 'amount', 'invoice', 'billing'],
      priority: 9,
    },
    {
      category: 'confidentiality',
      patterns: [
        /confidential(?:ity)?[:\s]+([^.]+)/gi,
        /(?:non-disclosure|nda)[:\s]+([^.]+)/gi,
        /(?:proprietary\s+information)[:\s]+([^.]+)/gi,
      ],
      keywords: ['confidential', 'confidentiality', 'non-disclosure', 'proprietary', 'secret'],
      priority: 8,
    },
    {
      category: 'termination',
      patterns: [
        /termination[:\s]+([^.]+)/gi,
        /(?:either\s+party\s+may\s+terminate)[:\s]+([^.]+)/gi,
        /(?:this\s+agreement.*?(?:terminated|cancelled))[:\s]+([^.]+)/gi,
      ],
      keywords: ['termination', 'terminate', 'cancel', 'cancellation', 'end'],
      priority: 9,
    },
    {
      category: 'penalties',
      patterns: [
        /(?:penalty|penalties|liquidated\s+damages)[:\s]+([^.]+)/gi,
        /(?:breach.*?(?:shall\s+pay|liable\s+for))[:\s]+([^.]+)/gi,
        /(?:damages|indemnif(?:y|ication))[:\s]+([^.]+)/gi,
      ],
      keywords: ['penalty', 'penalties', 'damages', 'liquidated', 'indemnify', 'liable'],
      priority: 8,
    },
    {
      category: 'dispute_resolution',
      patterns: [
        /(?:dispute\s+resolution|arbitration)[:\s]+([^.]+)/gi,
        /(?:in\s+the\s+event\s+of.*?dispute)[:\s]+([^.]+)/gi,
        /(?:mediation|arbitration\s+proceedings)[:\s]+([^.]+)/gi,
      ],
      keywords: ['dispute', 'arbitration', 'mediation', 'resolution', 'litigation'],
      priority: 7,
    },
    {
      category: 'governing_law',
      patterns: [
        /(?:governing\s+law|applicable\s+law)[:\s]+([^.]+)/gi,
        /(?:shall\s+be\s+governed\s+by)[:\s]+([^.]+)/gi,
        /(?:jurisdiction)[:\s]+([^.]+)/gi,
      ],
      keywords: ['governing law', 'jurisdiction', 'applicable law', 'governed by'],
      priority: 7,
    },
    {
      category: 'responsibilities',
      patterns: [
        /(?:obligations?|responsibilities|duties)[:\s]+([^.]+)/gi,
        /(?:shall\s+(?:be\s+responsible|perform|provide))[:\s]+([^.]+)/gi,
      ],
      keywords: ['obligations', 'responsibilities', 'duties', 'shall', 'must'],
      priority: 6,
    },
    {
      category: 'non_compete',
      patterns: [
        /(?:non-compete|non\s+compete)[:\s]+([^.]+)/gi,
        /(?:shall\s+not\s+(?:compete|engage\s+in))[:\s]+([^.]+)/gi,
        /(?:restrictive\s+covenant)[:\s]+([^.]+)/gi,
      ],
      keywords: ['non-compete', 'non compete', 'restrictive covenant', 'competition'],
      priority: 7,
    },
    {
      category: 'non_solicitation',
      patterns: [
        /(?:non-solicitation|non\s+solicitation)[:\s]+([^.]+)/gi,
        /(?:shall\s+not\s+solicit)[:\s]+([^.]+)/gi,
      ],
      keywords: ['non-solicitation', 'non solicitation', 'solicit', 'employees', 'customers'],
      priority: 7,
    },
  ];

  /**
   * Detect and extract clauses from text
   */
  detectClauses(text: string): Clause[] {
    const clauses: Clause[] = [];
    const sections = this.splitIntoSections(text);

    sections.forEach((section, index) => {
      const category = this.categorizeClause(section.content);
      const title = this.extractTitle(section.content, category);

      clauses.push({
        title,
        content: section.content,
        startIndex: section.startIndex,
        endIndex: section.endIndex,
        category,
      });
    });

    return clauses;
  }

  /**
   * Categorize a clause based on patterns and keywords
   */
  categorizeClause(text: string): ClauseCategory {
    let bestMatch: { category: ClauseCategory; score: number } = {
      category: 'other',
      score: 0,
    };

    for (const pattern of this.patterns) {
      let score = 0;

      // Check regex patterns
      for (const regex of pattern.patterns) {
        if (regex.test(text)) {
          score += 3;
        }
      }

      // Check keywords
      const lowerText = text.toLowerCase();
      for (const keyword of pattern.keywords) {
        if (lowerText.includes(keyword.toLowerCase())) {
          score += 1;
        }
      }

      // Apply priority weight
      score *= pattern.priority;

      if (score > bestMatch.score) {
        bestMatch = {
          category: pattern.category,
          score,
        };
      }
    }

    return bestMatch.category;
  }

  /**
   * Split text into logical sections/clauses
   */
  private splitIntoSections(text: string): Array<{ content: string; startIndex: number; endIndex: number }> {
    const sections: Array<{ content: string; startIndex: number; endIndex: number }> = [];
    
    // Split by numbered sections (e.g., "1.", "2.", "Article 1", etc.)
    const numberedSectionRegex = /(?:^|\n)(?:\d+\.|Article\s+\d+|Section\s+\d+|Clause\s+\d+)[:\s]/gi;
    const matches = Array.from(text.matchAll(numberedSectionRegex));

    if (matches.length > 0) {
      // Process numbered sections
      for (let i = 0; i < matches.length; i++) {
        const match = matches[i];
        const startIndex = match.index!;
        const endIndex = i < matches.length - 1 ? matches[i + 1].index! : text.length;
        const content = text.substring(startIndex, endIndex).trim();

        if (content.length > 20) { // Minimum clause length
          sections.push({ content, startIndex, endIndex });
        }
      }
    } else {
      // Fall back to paragraph-based splitting
      const paragraphs = text.split(/\n\n+/);
      let currentIndex = 0;

      paragraphs.forEach(paragraph => {
        const trimmed = paragraph.trim();
        if (trimmed.length > 20) {
          const startIndex = currentIndex;
          const endIndex = currentIndex + paragraph.length;
          sections.push({
            content: trimmed,
            startIndex,
            endIndex,
          });
        }
        currentIndex += paragraph.length + 2; // +2 for \n\n
      });
    }

    return sections;
  }

  /**
   * Extract a title from clause content
   */
  private extractTitle(content: string, category: ClauseCategory): string {
    // Try to extract title from first line
    const firstLine = content.split('\n')[0].trim();
    
    // If first line is short and looks like a title, use it
    if (firstLine.length < 100 && firstLine.length > 5) {
      // Check if it's a numbered section
      if (/^(?:\d+\.|Article\s+\d+|Section\s+\d+|Clause\s+\d+)/i.test(firstLine)) {
        return firstLine;
      }
      
      // Check if it's all caps or title case
      if (firstLine === firstLine.toUpperCase() || /^[A-Z][a-z]+(?:\s+[A-Z][a-z]+)*$/.test(firstLine)) {
        return firstLine;
      }
    }

    // Generate title from category
    return this.generateTitleFromCategory(category);
  }

  /**
   * Generate a human-readable title from category
   */
  private generateTitleFromCategory(category: ClauseCategory): string {
    const titleMap: Record<ClauseCategory, string> = {
      parties: 'Parties to the Agreement',
      effective_date: 'Effective Date',
      duration: 'Term and Duration',
      payment: 'Payment Terms',
      confidentiality: 'Confidentiality',
      termination: 'Termination',
      penalties: 'Penalties and Damages',
      dispute_resolution: 'Dispute Resolution',
      governing_law: 'Governing Law',
      responsibilities: 'Obligations and Responsibilities',
      non_compete: 'Non-Compete Clause',
      non_solicitation: 'Non-Solicitation Clause',
      other: 'General Provision',
    };

    return titleMap[category];
  }
}

export const clauseDetector = new ClauseDetectorService();
