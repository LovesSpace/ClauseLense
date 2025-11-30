import React, { useState } from 'react';
import { useAppStore } from '../store/useAppStore';

export const ClauseList: React.FC = () => {
  const { clauses } = useAppStore();
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [filter, setFilter] = useState<string>('all');

  if (clauses.length === 0) return null;

  const filteredClauses = filter === 'all' 
    ? clauses 
    : clauses.filter(c => c.category === filter);

  const categories = Array.from(new Set(clauses.map(c => c.category)));

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-gray-900">Detected Clauses</h3>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md text-sm"
        >
          <option value="all">All Categories</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>
              {cat.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        {filteredClauses.map((clause, index) => (
          <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
            <button
              onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
              className="w-full px-4 py-3 text-left bg-gray-50 hover:bg-gray-100 transition-colors flex justify-between items-center"
            >
              <div>
                <div className="font-semibold text-gray-900">{clause.title}</div>
                <div className="text-xs text-gray-500 mt-1">
                  Category: {clause.category.replace(/_/g, ' ')}
                </div>
              </div>
              <svg
                className={`w-5 h-5 text-gray-500 transition-transform ${
                  expandedIndex === index ? 'transform rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {expandedIndex === index && (
              <div className="px-4 py-3 bg-white border-t border-gray-200">
                <p className="text-sm text-gray-700 whitespace-pre-wrap">{clause.content}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
