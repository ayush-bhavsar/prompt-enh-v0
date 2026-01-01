import React, { useState } from 'react';
import { BookOpen, X } from 'lucide-react';
import { promptTemplates } from '../utils/templates';

interface TemplatesPanelProps {
  onSelectTemplate: (template: string) => void;
}

const TemplatesPanel: React.FC<TemplatesPanelProps> = ({ onSelectTemplate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleSelect = (template: string, id: string) => {
    setSelectedId(id);
    onSelectTemplate(template);
    setTimeout(() => setSelectedId(null), 500);
  };

  return (
    <div className="templates-panel">
      <button
        className="btn-secondary templates-toggle"
        onClick={() => setIsOpen(!isOpen)}
      >
        <BookOpen className="icon" />
        Templates ({promptTemplates.length})
      </button>

      {isOpen && (
        <div className="templates-dropdown">
          <div className="templates-header">
            <h3>Prompt Templates</h3>
            <button
              className="btn-icon"
              onClick={() => setIsOpen(false)}
              aria-label="Close templates"
            >
              <X className="icon" />
            </button>
          </div>
          <div className="templates-list">
            {promptTemplates.map((template) => (
              <div
                key={template.id}
                className={`template-item ${selectedId === template.id ? 'selected' : ''}`}
                onClick={() => handleSelect(template.template, template.id)}
              >
                <h4>{template.name}</h4>
                <p>{template.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TemplatesPanel;
