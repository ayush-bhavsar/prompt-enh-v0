export interface RefactoredPrompt {
  original: string;
  refactored: string;
  clarity: string;
  structure: string;
  improvements: string[];
  timestamp: number;
}

export interface PromptTemplate {
  id: string;
  name: string;
  description: string;
  template: string;
}

export interface PromptHistory {
  id: string;
  original: string;
  refactored: string;
  timestamp: number;
}
