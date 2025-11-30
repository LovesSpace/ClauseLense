import { ExtractedText } from '../types';

/**
 * Fallback document extractor that doesn't rely on PDF.js worker
 * This is a simpler implementation for when the worker fails to load
 */
class DocumentExtractorFallbackService {
  /**
   * Extract text from PDF using a simpler approach
   * Note: This is a basic implementation and may not work with all PDFs
   */
  async extractFromPDF(file: File): Promise<ExtractedText> {
    try {
      // For now, return a helpful message
      // In production, you could use a server-side PDF parser or a different library
      throw new Error(
        'PDF extraction requires an internet connection to load the PDF.js worker. ' +
        'Please check your internet connection and try again, or try uploading a DOCX file instead.'
      );
    } catch (error) {
      throw new Error(`Failed to extract text from PDF: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Extract text from DOCX file
   */
  async extractFromDOCX(file: File): Promise<ExtractedText> {
    try {
      const mammoth = await import('mammoth');
      
      const arrayBuffer = await file.arrayBuffer();
      const result = await mammoth.extractRawText({ arrayBuffer });
      
      let fullText = result.value;
      
      // Split into paragraphs
      const paragraphs = fullText
        .split(/\n\n+/)
        .map(p => p.trim())
        .filter(p => p.length > 0);

      // Clean up text
      fullText = this.cleanExtractedText(fullText);

      // Estimate page count
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

  private cleanExtractedText(text: string): string {
    text = text.replace(/\n{3,}/g, '\n\n');
    text = text.replace(/[ \t]+/g, ' ');
    text = text.split('\n').map(line => line.trim()).join('\n');
    text = text.trim();
    return text;
  }
}

export const documentExtractorFallback = new DocumentExtractorFallbackService();
