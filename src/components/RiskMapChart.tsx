import React from 'react';
import { useAppStore } from '../store/useAppStore';

export const RiskMapChart: React.FC = () => {
  const { riskMap } = useAppStore();

  if (!riskMap) return null;

  const getRiskColor = (level: 'high' | 'medium' | 'low') => {
    switch (level) {
      case 'high':
        return 'bg-red-500';
      case 'medium':
        return 'bg-orange-500';
      case 'low':
        return 'bg-green-500';
    }
  };

  const getRiskTextColor = (level: 'high' | 'medium' | 'low') => {
    switch (level) {
      case 'high':
        return 'text-red-700';
      case 'medium':
        return 'text-orange-700';
      case 'low':
        return 'text-green-700';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-4">Risk Assessment</h3>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
          <div>
            <div className="text-sm font-semibold text-red-700">High Risk</div>
            <div className="text-2xl font-bold text-red-900">{riskMap.high.length}</div>
          </div>
          <div className={`w-16 h-16 ${getRiskColor('high')} rounded-full`}></div>
        </div>

        <div className="flex items-center justify-between p-4 bg-orange-50 rounded-lg">
          <div>
            <div className="text-sm font-semibold text-orange-700">Medium Risk</div>
            <div className="text-2xl font-bold text-orange-900">{riskMap.medium.length}</div>
          </div>
          <div className={`w-16 h-16 ${getRiskColor('medium')} rounded-full`}></div>
        </div>

        <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
          <div>
            <div className="text-sm font-semibold text-green-700">Low Risk</div>
            <div className="text-2xl font-bold text-green-900">{riskMap.low.length}</div>
          </div>
          <div className={`w-16 h-16 ${getRiskColor('low')} rounded-full`}></div>
        </div>
      </div>

      <div className="mt-6">
        <h4 className="text-sm font-semibold text-gray-700 mb-2">High Risk Items</h4>
        <div className="space-y-2">
          {riskMap.high.slice(0, 3).map((assessment, index) => (
            <div key={index} className="text-sm p-2 bg-red-50 rounded">
              <div className="font-semibold text-red-900">{assessment.clause.title}</div>
              <div className="text-red-700 text-xs">{assessment.reason}</div>
            </div>
          ))}
          {riskMap.high.length === 0 && (
            <div className="text-sm text-gray-500 italic">No high-risk items found</div>
          )}
        </div>
      </div>
    </div>
  );
};
