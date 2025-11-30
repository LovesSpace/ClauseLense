import React from 'react';
import { useAppStore } from '../store/useAppStore';
import { FileUpload } from './FileUpload';
import { SummaryCards } from './SummaryCards';
import { RiskMapChart } from './RiskMapChart';
import { ClauseList } from './ClauseList';
import { ComplianceTable } from './ComplianceTable';

export const Dashboard: React.FC = () => {
  const { currentDocument, summary, complexity } = useAppStore();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Legal Contract Dashboard
          </h1>
          <p className="text-gray-600">
            Upload and analyze legal documents with automated insights
          </p>
        </header>

        <div className="space-y-6">
          <FileUpload />

          {currentDocument && (
            <>
              <div className="bg-white rounded-lg shadow-md p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Document Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">File Name:</span>
                    <span className="ml-2 font-medium">{currentDocument.fileName}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">File Size:</span>
                    <span className="ml-2 font-medium">
                      {(currentDocument.fileSize / 1024).toFixed(2)} KB
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Type:</span>
                    <span className="ml-2 font-medium uppercase">{currentDocument.fileType}</span>
                  </div>
                </div>
              </div>

              {summary && complexity && (
                <>
                  <SummaryCards />
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <RiskMapChart />
                    <div className="bg-white rounded-lg shadow-md p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-4">
                        Complexity Score
                      </h3>
                      <div className="text-center">
                        <div className="text-5xl font-bold text-blue-600 mb-2">
                          {complexity.score}
                        </div>
                        <div className="text-lg text-gray-600 capitalize mb-4">
                          {complexity.label}
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <div className="text-gray-600">Avg Sentence Length</div>
                            <div className="font-semibold">{complexity.metrics.avgSentenceLength} words</div>
                          </div>
                          <div>
                            <div className="text-gray-600">Clause Count</div>
                            <div className="font-semibold">{complexity.metrics.clauseCount}</div>
                          </div>
                          <div>
                            <div className="text-gray-600">Jargon Density</div>
                            <div className="font-semibold">{(complexity.metrics.jargonDensity * 100).toFixed(1)}%</div>
                          </div>
                          <div>
                            <div className="text-gray-600">Nested Clauses</div>
                            <div className="font-semibold">{complexity.metrics.nestedClauseCount}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <ClauseList />
                  <ComplianceTable />
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
