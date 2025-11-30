class TextProcessorService {
  /**
   * Remove headers from text
   */
  removeHeaders(text: string): string {
    const lines = text.split('\n');
    const filtered = lines.filter((line, index) => {
      // Skip first few lines if they look like headers
      if (index < 3 && this.looksLikeHeader(line)) {
        return false;
      }
      return true;
    });
    return filtered.join('\n');
  }

  /**
   * Remove footers from text
   */
  removeFooters(text: string): string {
    const lines = text.split('\n');
    const filtered = lines.filter((line, index) => {
      // Skip last few lines if they look like footers
      if (index >= lines.length - 3 && this.looksLikeFooter(line)) {
        return false;
      }
      return true;
    });
    return filtered.join('\n');
  }

  /**
   * Remove page numbers from text
   */
  removePageNumbers(text: string): string {
    // Remove standalone page numbers
    text = text.replace(/^\s*\d+\s*$/gm, '');
    text = text.replace(/^\s*Page\s+\d+\s*$/gim, '');
    text = text.replace(/^\s*\d+\s+of\s+\d+\s*$/gim, '');
    text = text.replace(/^\s*\d+\/\d+\s*$/gm, '');
    
    return text;
  }

  /**
   * Normalize paragraphs by ensuring consistent spacing
   */
  normalizeParagraphs(text: string): string {
    // Replace multiple spaces with single space
    text = text.replace(/[ \t]+/g, ' ');
    
    // Ensure paragraphs are separated by exactly two newlines
    text = text.replace(/\n{3,}/g, '\n\n');
    
    // Remove spaces at start/end of lines
    text = text.split('\n').map(line => line.trim()).join('\n');
    
    return text.trim();
  }

  /**
   * Clean whitespace from text
   */
  cleanWhitespace(text: string): string {
    // Remove duplicate line breaks
    text = text.replace(/\n{3,}/g, '\n\n');
    
    // Remove trailing whitespace from each line
    text = text.split('\n').map(line => line.trimEnd()).join('\n');
    
    // Remove leading/trailing whitespace from entire text
    text = text.trim();
    
    // Normalize spaces (replace multiple spaces with single space)
    text = text.replace(/[ \t]+/g, ' ');
    
    return text;
  }

  /**
   * Check if a line looks like a header
   */
  private looksLikeHeader(line: string): boolean {
    const trimmed = line.trim();
    
    // Empty or very short lines
    if (trimmed.length < 3) return true;
    
    // Common header patterns
    if (/^(confidential|proprietary|draft|internal)/i.test(trimmed)) return true;
    if (/^(company|organization|department)/i.test(trimmed) && trimmed.length < 50) return true;
    
    // All caps short text
    if (trimmed === trimmed.toUpperCase() && trimmed.length < 30) return true;
    
    return false;
  }

  /**
   * Check if a line looks like a footer
   */
  private looksLikeFooter(line: string): boolean {
    const trimmed = line.trim();
    
    // Empty or very short lines
    if (trimmed.length < 3) return true;
    
    // Common footer patterns
    if (/©|copyright|all rights reserved/i.test(trimmed)) return true;
    if (/page\s+\d+/i.test(trimmed)) return true;
    if (/^\d+\s*$/.test(trimmed)) return true;
    if (/confidential/i.test(trimmed) && trimmed.length < 50) return true;
    
    return false;
  }

  /**
   * Process text through all cleaning steps
   */
  processText(text: string): string {
    text = this.removeHeaders(text);
    text = this.removeFooters(text);
    text = this.removePageNumbers(text);
    text = this.normalizeParagraphs(text);
    text = this.cleanWhitespace(text);
    return text;
  }
}

export const textProcessor = new TextProcessorService();
