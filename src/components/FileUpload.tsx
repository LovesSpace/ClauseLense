import React, { useState } from 'react';
import { uploadHandler, documentExtractor, textProcessor, clauseDetector, riskAssessor, complianceChecker, complexityAnalyzer, timelineGenerator, costAnalyzer, summaryGenerator } from '../services';
import { useAppStore } from '../store/useAppStore';

export const FileUpload: React.FC = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState<string>('');

  const {
    setCurrentDocument,
    setExtractedText,
    setClauses,
    setRiskMap,
    setCompliance,
    setComplexity,
    setTimeline,
    setCosts,
    setSummary,
  } = useAppStore();

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setError(null);
    setIsProcessing(true);
    setProgress('Validating file...');

    try {
      // Step 1: Validate and process upload
      const metadata = await uploadHandler.processUpload(file);
      setCurrentDocument(metadata);
      setProgress('Extracting text...');

      // Step 2: Extract text
      let extractedText;
      try {
        extractedText = metadata.fileType === 'pdf'
          ? await documentExtractor.extractFromPDF(file)
          : await documentExtractor.extractFromDOCX(file);
      } catch (extractError) {
        if (metadata.fileType === 'pdf') {
          throw new Error(
            'PDF extraction failed. This may be due to:\n' +
            '1. Internet connection issues (PDF.js worker needs to load)\n' +
            '2. Browser security settings\n\n' +
            'Suggestion: Try uploading a DOCX file instead, which works offline.'
          );
        }
        throw extractError;
      }
      
      setExtractedText(extractedText);
      setProgress('Processing text...');

      // Step 3: Clean text
      const cleanedText = textProcessor.processText(extractedText.content);
      setProgress('Detecting clauses...');

      // Step 4: Detect clauses
      const clauses = clauseDetector.detectClauses(cleanedText);
      setClauses(clauses);
      setProgress('Assessing risks...');

      // Step 5: Risk assessment
      const riskMap = riskAssessor.generateRiskMap(clauses);
      setRiskMap(riskMap);
      setProgress('Checking compliance...');

      // Step 6: Compliance check
      const compliance = complianceChecker.checkCompliance(clauses);
      setCompliance(compliance);
      setProgress('Calculating complexity...');

      // Step 7: Complexity analysis
      const complexity = complexityAnalyzer.calculateScore(cleanedText, clauses);
      setComplexity(complexity);
      setProgress('Generating timeline...');

      // Step 8: Timeline generation
      const timeline = timelineGenerator.generateTimeline(clauses);
      setTimeline(timeline);
      setProgress('Analyzing costs...');

      // Step 9: Cost analysis
      const costs = costAnalyzer.analyzeCosts(clauses);
      setCosts(costs);
      setProgress('Creating summary...');

      // Step 10: Generate summary
      const summary = summaryGenerator.generateSummary(clauses, riskMap, complexity);
      setSummary(summary);

      setProgress('Analysis complete!');
      setTimeout(() => setProgress(''), 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during processing');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Upload Document</h2>
      
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors">
        <input
          type="file"
          accept=".pdf,.docx"
          onChange={handleFileUpload}
          disabled={isProcessing}
          className="hidden"
          id="file-upload"
        />
        <label
          htmlFor="file-upload"
          className="cursor-pointer inline-flex flex-col items-center"
        >
          <svg
            className="w-12 h-12 text-gray-400 mb-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
          <span className="text-sm text-gray-600">
            {isProcessing ? 'Processing...' : 'Click to upload or drag and drop'}
          </span>
          <span className="text-xs text-gray-500 mt-1">
            PDF or DOCX (max 10MB)
          </span>
        </label>
      </div>

      {progress && (
        <div className="mt-4 p-3 bg-blue-50 text-blue-700 rounded-md">
          {progress}
        </div>
      )}

      {error && (
        <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-md whitespace-pre-wrap">
          <div className="font-semibold mb-2">Error:</div>
          {error}
        </div>
      )}
    </div>
  );
};
