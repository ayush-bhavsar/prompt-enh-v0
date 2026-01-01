import React, { useState } from 'react';
import { AlertCircle, Settings, X } from 'lucide-react';

interface ErrorAlertProps {
  message: string;
  onDismiss: () => void;
}

const ErrorAlert: React.FC<ErrorAlertProps> = ({ message, onDismiss }) => {
  const [showSetup, setShowSetup] = useState(false);
  const isApiKeyError = message.includes('API key');

  return (
    <div className="error-alert">
      <div className="alert-content">
        <AlertCircle className="icon alert-icon" />
        <div className="alert-message">
          <strong>Error:</strong> {message}
          {isApiKeyError && !showSetup && (
            <button
              className="btn-link"
              onClick={() => setShowSetup(true)}
            >
              Show setup instructions
            </button>
          )}
        </div>
        <button className="btn-icon" onClick={onDismiss} aria-label="Dismiss">
          <X className="icon" />
        </button>
      </div>

      {showSetup && isApiKeyError && (
        <div className="setup-instructions">
          <div className="setup-header">
            <Settings className="icon" />
            <h3>Setup Instructions</h3>
          </div>
          <ol>
            <li>
              Get your Gemini API key from{' '}
              <a
                href="https://makersuite.google.com/app/apikey"
                target="_blank"
                rel="noopener noreferrer"
              >
                Google AI Studio
              </a>
            </li>
            <li>Create a <code>.env</code> file in the project root</li>
            <li>
              Add this line to the file:
              <pre>VITE_GEMINI_API_KEY=your_api_key_here</pre>
            </li>
            <li>Restart the development server</li>
          </ol>
        </div>
      )}
    </div>
  );
};

export default ErrorAlert;
