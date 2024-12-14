import { Template } from '../../types';
import { Card } from '../ui/Card';
import FileTextIcon from 'lucide-react/dist/esm/icons/file-text'
import ClockIcon from 'lucide-react/dist/esm/icons/clock'
import { format } from 'date-fns';

interface TemplateListProps {
  templates: Template[];
  onSelectTemplate?: (template: Template) => void;
}

export function TemplateList({ templates, onSelectTemplate }: TemplateListProps) {
  const formatDate = (date: string | null) => {
    if (!date) return 'N/A';
    return format(new Date(date), 'MMM d, yyyy');
  };

  if (!templates.length) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-900">No templates yet</h3>
        <p className="mt-1 text-sm text-gray-500">Get started by creating a new template.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {templates.map((template) => (
        <Card
          key={template.id}
          onClick={() => onSelectTemplate?.(template)}
          className="cursor-pointer hover:shadow-lg transition-shadow duration-200"
        >
          <div className="p-4">
            <div className="flex items-center">
              <FileTextIcon className="h-5 w-5 text-gray-400" />
              <h3 className="ml-2 text-sm font-medium text-gray-900">{template.name}</h3>
            </div>
            <div className="mt-4 flex items-center text-sm text-gray-500">
              <ClockIcon className="h-4 w-4 mr-1" />
              <span>Updated {formatDate(template.updated_at)}</span>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}