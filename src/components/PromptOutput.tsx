import React, { useState } from 'react';
import { Copy, Check, Lightbulb, ListTree, TrendingUp } from 'lucide-react';
import type { RefactoredPrompt } from '../types';
import { copyToClipboard } from '../utils/storage';

interface PromptOutputProps {
  result: RefactoredPrompt;
}

const PromptOutput: React.FC<PromptOutputProps> = ({ result }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const success = await copyToClipboard(result.refactored);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="prompt-output-container">
      <div className="output-header">
        <h2 className="section-title">
          <Sparkles className="icon" />
          Refactored Prompt
        </h2>
        <button
          onClick={handleCopy}
          className="btn-secondary"
          title="Copy to clipboard"
        >
          {copied ? (
            <>
              <Check className="icon" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="icon" />
              Copy
            </>
          )}
        </button>
      </div>

      <div className="refactored-content">
        <div className="output-text">
          {result.refactored}
        </div>
      </div>

      <div className="analysis-section">
        <div className="analysis-card">
          <div className="analysis-header">
            <Lightbulb className="icon" />
            <h3>Clarity Improvements</h3>
          </div>
          <p>{result.clarity}</p>
        </div>

        <div className="analysis-card">
          <div className="analysis-header">
            <ListTree className="icon" />
            <h3>Structure Enhancements</h3>
          </div>
          <p>{result.structure}</p>
        </div>

        <div className="analysis-card">
          <div className="analysis-header">
            <TrendingUp className="icon" />
            <h3>Key Improvements</h3>
          </div>
          <ul className="improvements-list">
            {result.improvements.map((improvement, index) => (
              <li key={index}>{improvement}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

const Sparkles: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
    <path d="M5 3v4" />
    <path d="M19 17v4" />
    <path d="M3 5h4" />
    <path d="M17 19h4" />
  </svg>
);

export default PromptOutput;
