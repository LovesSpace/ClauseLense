import React from 'react';
import { useAppStore } from '../store/useAppStore';

export const SummaryCards: React.FC = () => {
  const { summary } = useAppStore();

  if (!summary) return null;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Contract Summary</h2>
      
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-semibold text-gray-600 uppercase mb-1">Purpose</h3>
          <p className="text-gray-900">{summary.purpose}</p>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-gray-600 uppercase mb-1">Key Parties</h3>
          <ul className="list-disc list-inside text-gray-900">
            {summary.keyParties.map((party, index) => (
              <li key={index}>{party}</li>
            ))}
          </ul>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm font-semibold text-gray-600 uppercase mb-1">Contract Length</h3>
            <p className="text-gray-900">{summary.contractLength}</p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-600 uppercase mb-1">Payment Highlights</h3>
            <ul className="list-disc list-inside text-gray-900 text-sm">
              {summary.paymentHighlights.map((highlight, index) => (
                <li key={index}>{highlight}</li>
              ))}
            </ul>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-gray-600 uppercase mb-1">Top Risks</h3>
          <ul className="list-disc list-inside text-gray-900 text-sm">
            {summary.topRisks.map((risk, index) => (
              <li key={index}>{risk}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-gray-600 uppercase mb-1">Key Points</h3>
          <ul className="list-disc list-inside text-gray-900 text-sm">
            {summary.keyPoints.map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
