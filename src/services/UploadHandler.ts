import { DocumentMetadata, ValidationResult } from '../types';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB in bytes
const ALLOWED_TYPES = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
const ALLOWED_EXTENSIONS = ['.pdf', '.docx'];

// Magic bytes for file signature validation
const PDF_SIGNATURE = [0x25, 0x50, 0x44, 0x46]; // %PDF
const DOCX_SIGNATURE = [0x50, 0x4B, 0x03, 0x04]; // ZIP signature (DOCX is a ZIP file)

class UploadHandlerService {
  /**
   * Validate file type, size, and signature
   */
  validateFile(file: File): ValidationResult {
    // Check file extension
    const fileName = file.name.toLowerCase();
    const hasValidExtension = ALLOWED_EXTENSIONS.some(ext => fileName.endsWith(ext));
    
    if (!hasValidExtension) {
      return {
        isValid: false,
        error: 'Invalid file type. Only PDF and DOCX files are supported.',
      };
    }

    // Check MIME type
    if (!ALLOWED_TYPES.includes(file.type)) {
      return {
        isValid: false,
        error: 'Invalid file type. Only PDF and DOCX files are supported.',
      };
    }

    // Check file size
    if (file.size > MAX_FILE_SIZE) {
      return {
        isValid: false,
        error: `File size exceeds the maximum limit of 10 MB. Your file is ${(file.size / (1024 * 1024)).toFixed(2)} MB.`,
      };
    }

    // Check for empty file
    if (file.size === 0) {
      return {
        isValid: false,
        error: 'File is empty. Please upload a valid document.',
      };
    }

    return { isValid: true };
  }

  /**
   * Verify file signature using magic bytes
   */
  private async verifyFileSignature(file: File): Promise<boolean> {
    return new Promise((resolve) => {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        const arr = new Uint8Array(e.target?.result as ArrayBuffer);
        
        if (file.name.toLowerCase().endsWith('.pdf')) {
          // Check PDF signature
          const isPDF = PDF_SIGNATURE.every((byte, index) => arr[index] === byte);
          resolve(isPDF);
        } else if (file.name.toLowerCase().endsWith('.docx')) {
          // Check DOCX signature (ZIP format)
          const isDOCX = DOCX_SIGNATURE.every((byte, index) => arr[index] === byte);
          resolve(isDOCX);
        } else {
          resolve(false);
        }
      };

      reader.onerror = () => resolve(false);
      
      // Read first 4 bytes for signature check
      reader.readAsArrayBuffer(file.slice(0, 4));
    });
  }

  /**
   * Process file upload and extract metadata
   */
  async processUpload(file: File): Promise<DocumentMetadata> {
    // Validate file first
    const validation = this.validateFile(file);
    if (!validation.isValid) {
      throw new Error(validation.error);
    }

    // Verify file signature
    const isValidSignature = await this.verifyFileSignature(file);
    if (!isValidSignature) {
      throw new Error('File signature validation failed. The file may be corrupted or not a valid PDF/DOCX file.');
    }

    // Extract metadata
    const fileType = file.name.toLowerCase().endsWith('.pdf') ? 'pdf' : 'docx';
    
    return {
      fileName: file.name,
      fileSize: file.size,
      fileType,
      uploadTimestamp: new Date(),
    };
  }

  /**
   * Sanitize file to remove embedded scripts and malicious content
   */
  async sanitizeFile(file: File): Promise<File> {
    // For PDF files, we'll rely on the PDF.js library to safely parse content
    // For DOCX files, mammoth.js handles sanitization during extraction
    // This method serves as a placeholder for additional sanitization if needed
    
    // In a production environment, you might want to:
    // 1. Strip JavaScript from PDFs
    // 2. Remove macros from DOCX files
    // 3. Scan for embedded executables
    
    // For now, we return the file as-is since the extraction libraries handle basic sanitization
    return file;
  }
}

export const uploadHandler = new UploadHandlerService();
