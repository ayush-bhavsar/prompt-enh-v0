import { useState } from 'react';
import { geminiService } from '../services/gemini';
import type { RefactoredPrompt } from '../types';
import { storageUtils } from '../utils/storage';

export const usePromptRefactor = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<RefactoredPrompt | null>(null);

  const refactorPrompt = async (prompt: string) => {
    if (!prompt.trim()) {
      setError('Please enter a prompt');
      return;
    }

    if (!geminiService.isConfigured()) {
      setError('Gemini API key not configured. Please add VITE_GEMINI_API_KEY to your .env file.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const refactored = await geminiService.refactorPrompt(prompt);
      setResult(refactored);
      storageUtils.saveToHistory(refactored.original, refactored.refactored);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  const clearResult = () => {
    setResult(null);
    setError(null);
  };

  return {
    loading,
    error,
    result,
    refactorPrompt,
    clearResult,
  };
};
