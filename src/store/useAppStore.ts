import { create } from 'zustand';
import { AppState } from '../types';

interface AppStore extends AppState {
  setCurrentDocument: (doc: AppState['currentDocument']) => void;
  setExtractedText: (text: AppState['extractedText']) => void;
  setClauses: (clauses: AppState['clauses']) => void;
  setRiskMap: (riskMap: AppState['riskMap']) => void;
  setCompliance: (compliance: AppState['compliance']) => void;
  setComplexity: (complexity: AppState['complexity']) => void;
  setTimeline: (timeline: AppState['timeline']) => void;
  setCosts: (costs: AppState['costs']) => void;
  setSummary: (summary: AppState['summary']) => void;
  setComparisonMode: (mode: boolean) => void;
  setComparisonResult: (result: AppState['comparisonResult']) => void;
  reset: () => void;
}

const initialState: AppState = {
  currentDocument: null,
  extractedText: null,
  clauses: [],
  riskMap: null,
  compliance: [],
  complexity: null,
  timeline: null,
  costs: null,
  summary: null,
  comparisonMode: false,
  comparisonResult: null,
};

export const useAppStore = create<AppStore>((set) => ({
  ...initialState,
  
  setCurrentDocument: (doc) => set({ currentDocument: doc }),
  setExtractedText: (text) => set({ extractedText: text }),
  setClauses: (clauses) => set({ clauses }),
  setRiskMap: (riskMap) => set({ riskMap }),
  setCompliance: (compliance) => set({ compliance }),
  setComplexity: (complexity) => set({ complexity }),
  setTimeline: (timeline) => set({ timeline }),
  setCosts: (costs) => set({ costs }),
  setSummary: (summary) => set({ summary }),
  setComparisonMode: (mode) => set({ comparisonMode: mode }),
  setComparisonResult: (result) => set({ comparisonResult: result }),
  
  reset: () => set(initialState),
}));
