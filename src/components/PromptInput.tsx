import React, { useState } from 'react';
import { Sparkles, Loader2 } from 'lucide-react';

interface PromptInputProps {
  onSubmit: (prompt: string) => void;
  loading: boolean;
  onTemplateSelect: (template: string) => void;
}

const PromptInput: React.FC<PromptInputProps> = ({ onSubmit, loading, onTemplateSelect }) => {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim() && !loading) {
      onSubmit(prompt);
    }
  };

  return (
    <div className="prompt-input-container">
      <form onSubmit={handleSubmit}>
        <div className="input-header">
          <h2 className="section-title">
            <Sparkles className="icon" />
            Original Prompt
          </h2>
        </div>
        
        <textarea
          className="prompt-textarea"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your prompt here... 

Example:
write a function that sorts an array"
          rows={15}
          disabled={loading}
        />

        <div className="input-footer">
          <div className="char-count">
            {prompt.length} characters
          </div>
          <button
            type="submit"
            className="btn-primary"
            disabled={loading || !prompt.trim()}
          >
            {loading ? (
              <>
                <Loader2 className="icon spinning" />
                Refactoring...
              </>
            ) : (
              <>
                <Sparkles className="icon" />
                Refactor Prompt
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PromptInput;
