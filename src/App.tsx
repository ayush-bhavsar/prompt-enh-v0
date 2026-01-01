import { useState } from 'react';
import { Sparkles } from 'lucide-react';
import './App.css';
import PromptInput from './components/PromptInput';
import PromptOutput from './components/PromptOutput';
import TemplatesPanel from './components/TemplatesPanel';
import HistoryPanel from './components/HistoryPanel';
import ErrorAlert from './components/ErrorAlert';
import { usePromptRefactor } from './hooks/usePromptRefactor';

function App() {
  const { loading, error, result, refactorPrompt, clearResult } = usePromptRefactor();
  const [inputPrompt, setInputPrompt] = useState('');

  const handleSubmit = (prompt: string) => {
    setInputPrompt(prompt);
    refactorPrompt(prompt);
  };

  const handleTemplateSelect = (template: string) => {
    setInputPrompt(template);
  };

  const handleHistorySelect = (original: string) => {
    setInputPrompt(original);
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <div className="logo">
            <Sparkles className="logo-icon" />
            <h1>Prompt Refactor</h1>
          </div>
          <p className="tagline">Transform your prompts with AI-powered refinement</p>
        </div>
      </header>

      <main className="app-main">
        {error && <ErrorAlert message={error} onDismiss={clearResult} />}

        <div className="toolbar">
          <TemplatesPanel onSelectTemplate={handleTemplateSelect} />
          <HistoryPanel onSelectHistory={handleHistorySelect} />
        </div>

        <div className="content-grid">
          <div className="input-panel">
            <PromptInput
              onSubmit={handleSubmit}
              loading={loading}
              onTemplateSelect={handleTemplateSelect}
            />
          </div>

          <div className="output-panel">
            {result ? (
              <PromptOutput result={result} />
            ) : (
              <div className="empty-output">
                <Sparkles className="empty-icon" />
                <h3>Ready to refactor</h3>
                <p>
                  Enter your prompt on the left and click "Refactor Prompt" to get an enhanced,
                  well-structured version powered by Google Gemini AI.
                </p>
                <div className="features">
                  <div className="feature">
                    <span className="feature-icon">✨</span>
                    <span>Enhanced clarity</span>
                  </div>
                  <div className="feature">
                    <span className="feature-icon">📋</span>
                    <span>Better structure</span>
                  </div>
                  <div className="feature">
                    <span className="feature-icon">🎯</span>
                    <span>Optimized for AI</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="app-footer">
        <p>Powered by Google Gemini AI</p>
      </footer>
    </div>
  );
}

export default App;
