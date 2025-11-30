import { ExtractedText } from '../types';
import * as pdfjsLib from 'pdfjs-dist';

// Configure PDF.js worker with proper configuration
// Using jsdelivr CDN which is more reliable
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.js`;

class DocumentExtractorService {
  /**
   * Extract text from PDF file while preserving paragraph boundaries
   */
  async extractFromPDF(file: File): Promise<ExtractedText> {
    try {
      const arrayBuffer = await file.arrayBuffer();
      
      // Load PDF with proper configuration
      const loadingTask = pdfjsLib.getDocument({
        data: arrayBuffer,
        useWorkerFetch: false,
        isEvalSupported: false,
        useSystemFonts: true,
      });
      
      const pdf = await loadingTask.promise;
      
      let fullText = '';
      const paragraphs: string[] = [];
      let pageCount = pdf.numPages;

      for (let i = 1; i <= pageCount; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        
        let pageText = '';
        let currentParagraph = '';
        
        textContent.items.forEach((item: any) => {
          if ('str' in item) {
            const text = item.str;
            
            // Skip headers, footers, and page numbers
            if (this.isHeaderFooterOrPageNumber(text, i, pageCount)) {
              return;
            }
            
            // Detect paragraph boundaries
            if (text.trim() === '') {
              if (currentParagraph.trim()) {
                paragraphs.push(currentParagraph.trim());
                pageText += currentParagraph.trim() + '\n\n';
                currentParagraph = '';
              }
            } else {
              currentParagraph += text + ' ';
            }
          }
        });
        
        // Add remaining paragraph
        if (currentParagraph.trim()) {
          paragraphs.push(currentParagraph.trim());
          pageText += currentParagraph.trim() + '\n\n';
        }
        
        fullText += pageText;
      }

      // Clean up text
      fullText = this.cleanExtractedText(fullText);

      return {
        content: fullText,
        paragraphs: paragraphs.filter(p => p.length > 0),
        metadata: {
          pageCount,
          characterCount: fullText.length,
        },
      };
    } catch (error) {
      throw new Error(`Failed to extract text from PDF: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Extract text from DOCX file while preserving clause boundaries
   */
  async extractFromDOCX(file: File): Promise<ExtractedText> {
    try {
      // Dynamic import of mammoth to avoid bundling issues
      const mammoth = await import('mammoth');
      
      const arrayBuffer = await file.arrayBuffer();
      const result = await mammoth.extractRawText({ arrayBuffer });
      
      let fullText = result.value;
      
      // Split into paragraphs (clauses)
      const paragraphs = fullText
        .split(/\n\n+/)
        .map(p => p.trim())
        .filter(p => p.length > 0 && !this.isHeaderFooterOrPageNumber(p, 0, 0));

      // Clean up text
      fullText = this.cleanExtractedText(fullText);

      // Estimate page count (rough estimate: 500 words per page)
      const wordCount = fullText.split(/\s+/).length;
      const estimatedPageCount = Math.ceil(wordCount / 500);

      return {
        content: fullText,
        paragraphs,
        metadata: {
          pageCount: estimatedPageCount,
          characterCount: fullText.length,
        },
      };
    } catch (error) {
      throw new Error(`Failed to extract text from DOCX: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Check if text is likely a header, footer, or page number
   */
  private isHeaderFooterOrPageNumber(text: string, pageNum: number, totalPages: number): boolean {
    const trimmed = text.trim();
    
    // Check for page numbers
    if (/^Page\s+\d+/.test(trimmed)) return true;
    if (/^\d+\s+of\s+\d+$/.test(trimmed)) return true;
    if (trimmed === String(pageNum)) return true;
    if (trimmed === `${pageNum}/${totalPages}`) return true;
    
    // Check for common header/footer patterns
    if (trimmed.length < 5) return true; // Very short text likely not content
    if (/^(confidential|proprietary|draft)/i.test(trimmed)) return true;
    if (/©|copyright/i.test(trimmed) && trimmed.length < 100) return true;
    
    return false;
  }

  /**
   * Clean extracted text by removing duplicate line breaks and normalizing whitespace
   */
  private cleanExtractedText(text: string): string {
    // Remove excessive line breaks (more than 2 consecutive)
    text = text.replace(/\n{3,}/g, '\n\n');
    
    // Normalize whitespace
    text = text.replace(/[ \t]+/g, ' ');
    
    // Remove leading/trailing whitespace from each line
    text = text.split('\n').map(line => line.trim()).join('\n');
    
    // Remove empty lines at start and end
    text = text.trim();
    
    return text;
  }
}

export const documentExtractor = new DocumentExtractorService();
