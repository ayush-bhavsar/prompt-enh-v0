import React, { useState, useEffect } from 'react';
import { History, Trash2, X, Clock } from 'lucide-react';
import { storageUtils } from '../utils/storage';
import type { PromptHistory } from '../types';

interface HistoryPanelProps {
  onSelectHistory: (original: string) => void;
}

const HistoryPanel: React.FC<HistoryPanelProps> = ({ onSelectHistory }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [history, setHistory] = useState<PromptHistory[]>([]);

  useEffect(() => {
    if (isOpen) {
      loadHistory();
    }
  }, [isOpen]);

  const loadHistory = () => {
    const items = storageUtils.getHistory();
    setHistory(items);
  };

  const handleClearAll = () => {
    if (confirm('Clear all history?')) {
      storageUtils.clearHistory();
      setHistory([]);
    }
  };

  const handleDelete = (id: string) => {
    storageUtils.deleteHistoryItem(id);
    loadHistory();
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="history-panel">
      <button
        className="btn-secondary history-toggle"
        onClick={() => setIsOpen(!isOpen)}
      >
        <History className="icon" />
        History ({history.length})
      </button>

      {isOpen && (
        <div className="history-dropdown">
          <div className="history-header">
            <h3>Recent History</h3>
            <div className="history-actions">
              {history.length > 0 && (
                <button
                  className="btn-icon"
                  onClick={handleClearAll}
                  title="Clear all history"
                >
                  <Trash2 className="icon" />
                </button>
              )}
              <button
                className="btn-icon"
                onClick={() => setIsOpen(false)}
                aria-label="Close history"
              >
                <X className="icon" />
              </button>
            </div>
          </div>
          <div className="history-list">
            {history.length === 0 ? (
              <div className="empty-state">
                <History className="icon-large" />
                <p>No history yet</p>
              </div>
            ) : (
              history.map((item) => (
                <div key={item.id} className="history-item">
                  <div
                    className="history-content"
                    onClick={() => {
                      onSelectHistory(item.original);
                      setIsOpen(false);
                    }}
                  >
                    <div className="history-text">
                      {item.original.slice(0, 100)}
                      {item.original.length > 100 ? '...' : ''}
                    </div>
                    <div className="history-meta">
                      <Clock className="icon-small" />
                      {formatDate(item.timestamp)}
                    </div>
                  </div>
                  <button
                    className="btn-icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(item.id);
                    }}
                    title="Delete"
                  >
                    <Trash2 className="icon-small" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default HistoryPanel;
