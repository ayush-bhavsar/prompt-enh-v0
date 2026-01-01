import { GoogleGenerativeAI } from '@google/generative-ai';
import type { RefactoredPrompt } from '../types';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

export class GeminiService {
  private genAI: GoogleGenerativeAI | null = null;
  private model: any = null;

  constructor() {
    if (API_KEY) {
      this.genAI = new GoogleGenerativeAI(API_KEY);
      this.model = this.genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });
    }
  }

  isConfigured(): boolean {
    return !!API_KEY;
  }

  async refactorPrompt(userPrompt: string): Promise<RefactoredPrompt> {
    if (!this.model) {
      throw new Error('Gemini API key not configured. Please add VITE_GEMINI_API_KEY to your .env file.');
    }

    const systemPrompt = `You are an expert AI prompt engineer. Your task is to refactor and enhance user prompts to make them more effective, clear, and structured.

Analyze the following prompt and provide:
1. A refactored version that is well-structured, clear, and optimized for AI processing
2. Clarity improvements explanation
3. Structure improvements explanation
4. List of specific improvements made

Format your response as JSON with this exact structure:
{
  "refactored": "The enhanced and well-structured prompt",
  "clarity": "Explanation of how clarity was improved",
  "structure": "Explanation of structural improvements",
  "improvements": ["improvement 1", "improvement 2", "improvement 3"]
}

User's original prompt:
${userPrompt}`;

    try {
      const result = await this.model.generateContent(systemPrompt);
      const response = await result.response;
      const text = response.text();
      
      // Try to extract JSON from the response
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('Failed to parse response from Gemini');
      }

      const parsed = JSON.parse(jsonMatch[0]);

      return {
        original: userPrompt,
        refactored: parsed.refactored || text,
        clarity: parsed.clarity || 'Enhanced for better AI understanding',
        structure: parsed.structure || 'Improved organization and flow',
        improvements: parsed.improvements || ['Enhanced clarity', 'Better structure', 'More specific details'],
        timestamp: Date.now(),
      };
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      throw new Error(error instanceof Error ? error.message : 'Failed to refactor prompt');
    }
  }
}

export const geminiService = new GeminiService();
