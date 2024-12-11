import React from 'react';
import { Template } from '../../types';
import { Card } from '../ui/Card';
import { FileText, Clock } from 'lucide-react';
import { format } from 'date-fns';
import ReactMarkdown from 'react-markdown';

interface TemplateListProps {
  templates: Template[];
  onSelectTemplate?: (template: Template) => void;
}

export function TemplateList({ templates, onSelectTemplate }: TemplateListProps) {
  return (
    <div className="space-y-4">
      {templates.map((template) => (
        <Card 
          key={template.id}
          className="cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => onSelectTemplate?.(template)}
        >
          <div className="flex justify-between items-start">
            <div className="flex items-center">
              <FileText className="w-5 h-5 text-purple-600 mr-3" />
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{template.name}</h3>
                <p className="text-sm text-gray-600 capitalize">{template.category.replace('_', ' ')}</p>
              </div>
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <Clock className="w-4 h-4 mr-1" />
              {format(new Date(template.created_at), 'MMM d, yyyy')}
            </div>
          </div>
          <div className="mt-4 text-gray-600 text-sm line-clamp-3">
            <ReactMarkdown>{template.content}</ReactMarkdown>
          </div>
        </Card>
      ))}
    </div>
  );
}