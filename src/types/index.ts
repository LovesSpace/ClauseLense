// Core type definitions for Legal Contract Dashboard

export type ClauseCategory =
  | 'parties'
  | 'effective_date'
  | 'duration'
  | 'payment'
  | 'confidentiality'
  | 'termination'
  | 'penalties'
  | 'dispute_resolution'
  | 'governing_law'
  | 'responsibilities'
  | 'non_compete'
  | 'non_solicitation'
  | 'other';

export interface Clause {
  title: string;
  content: string;
  startIndex: number;
  endIndex: number;
  category: ClauseCategory;
}

export interface DocumentMetadata {
  fileName: string;
  fileSize: number;
  fileType: 'pdf' | 'docx';
  uploadTimestamp: Date;
}

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

export interface ExtractedText {
  content: string;
  paragraphs: string[];
  metadata: {
    pageCount: number;
    characterCount: number;
  };
}

export interface RiskAssessment {
  clause: Clause;
  riskLevel: 'high' | 'medium' | 'low';
  reason: string;
}

export interface RiskMap {
  high: RiskAssessment[];
  medium: RiskAssessment[];
  low: RiskAssessment[];
}

export interface ComplianceIssue {
  issue: string;
  severity: 'high' | 'medium' | 'low';
  details: string;
  recommendation?: string;
}

export interface ComplexityScore {
  score: number; // 0-100
  label: 'simple' | 'moderate' | 'complex';
  metrics: {
    avgSentenceLength: number;
    jargonDensity: number;
    clauseCount: number;
    nestedClauseCount: number;
    penaltySeverity: number;
  };
}

export interface TimelineMilestone {
  date: Date;
  label: string;
  type: 'start' | 'end' | 'renewal' | 'milestone';
}

export interface Timeline {
  startDate?: Date;
  endDate?: Date;
  renewalTerms?: string;
  milestones: TimelineMilestone[];
}

export interface CostItem {
  description: string;
  amount: number;
  currency: string;
  frequency?: 'monthly' | 'quarterly' | 'annually' | 'one-time';
}

export interface CostBreakdown {
  oneTimeCosts: CostItem[];
  recurringCosts: CostItem[];
  fees: CostItem[];
  total: number;
}

export interface ContractSummary {
  purpose: string;
  keyParties: string[];
  contractLength: string;
  paymentHighlights: string[];
  topRisks: string[];
  keyPoints: string[]; // Top 10
}

export interface TextDiff {
  type: 'addition' | 'deletion' | 'modification';
  text: string;
  position: number;
}

export interface ModifiedClause {
  oldClause: Clause;
  newClause: Clause;
  differences: TextDiff[];
}

export interface ComparisonResult {
  added: Clause[];
  removed: Clause[];
  modified: ModifiedClause[];
}

export interface AnalysisData {
  metadata: DocumentMetadata;
  summary: ContractSummary;
  clauses: Clause[];
  riskMap: RiskMap;
  compliance: ComplianceIssue[];
  complexity: ComplexityScore;
  timeline: Timeline;
  costs: CostBreakdown;
}

export interface AppState {
  currentDocument: DocumentMetadata | null;
  extractedText: ExtractedText | null;
  clauses: Clause[];
  riskMap: RiskMap | null;
  compliance: ComplianceIssue[];
  complexity: ComplexityScore | null;
  timeline: Timeline | null;
  costs: CostBreakdown | null;
  summary: ContractSummary | null;
  comparisonMode: boolean;
  comparisonResult: ComparisonResult | null;
}

export interface ClausePattern {
  category: ClauseCategory;
  patterns: RegExp[];
  keywords: string[];
  priority: number;
}

export interface ComplianceRule {
  id: string;
  name: string;
  check: (clauses: Clause[]) => boolean;
  severity: 'high' | 'medium' | 'low';
  message: string;
  details: string;
}

export interface ErrorResponse {
  code: string;
  message: string;
  details?: string;
  suggestions?: string[];
  recoverable: boolean;
}

export interface DashboardFilter {
  riskLevels?: ('high' | 'medium' | 'low')[];
  clauseCategories?: ClauseCategory[];
  searchTerm?: string;
}

// Service Interfaces
export interface UploadHandler {
  validateFile(file: File): ValidationResult;
  processUpload(file: File): Promise<DocumentMetadata>;
  sanitizeFile(file: File): Promise<File>;
}

export interface DocumentExtractor {
  extractFromPDF(file: File): Promise<ExtractedText>;
  extractFromDOCX(file: File): Promise<ExtractedText>;
}

export interface TextProcessor {
  removeHeaders(text: string): string;
  removeFooters(text: string): string;
  removePageNumbers(text: string): string;
  normalizeParagraphs(text: string): string;
  cleanWhitespace(text: string): string;
}

export interface ClauseDetector {
  detectClauses(text: string): Clause[];
  categorizeClause(clause: string): ClauseCategory;
}

export interface RiskAssessor {
  assessClause(clause: Clause): RiskAssessment;
  generateRiskMap(clauses: Clause[]): RiskMap;
}

export interface ComplianceChecker {
  checkCompliance(clauses: Clause[]): ComplianceIssue[];
}

export interface ComplexityAnalyzer {
  calculateScore(text: string, clauses: Clause[]): ComplexityScore;
}

export interface TimelineGenerator {
  generateTimeline(clauses: Clause[]): Timeline;
}

export interface CostAnalyzer {
  analyzeCosts(clauses: Clause[]): CostBreakdown;
}

export interface DocumentComparator {
  compare(oldDoc: Clause[], newDoc: Clause[]): ComparisonResult;
}

export interface SummaryGenerator {
  generateSummary(
    clauses: Clause[],
    riskMap: RiskMap,
    complexity: ComplexityScore
  ): ContractSummary;
}

export interface PDFReportGenerator {
  generateReport(analysisData: AnalysisData): Promise<Blob>;
}
