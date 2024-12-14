import { formatDate } from '../../utils/date';
import { Card } from '../ui/Card';
import { FileText } from 'lucide-react';
import type { GrantSection } from '../../types';

interface GrantSectionListProps {
  sections: GrantSection[];
  onSelectSection?: (section: GrantSection) => void;
}

export function GrantSectionList({ sections, onSelectSection }: GrantSectionListProps) {
  if (!sections.length) {
    return (
      <Card className="p-6">
        <div className="text-center">
          <h3 className="text-lg font-medium text-gray-900">No sections yet</h3>
          <p className="mt-1 text-sm text-gray-500">Get started by creating a new section.</p>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {sections.map((section) => (
        <Card
          key={section.id}
          onClick={() => onSelectSection?.(section)}
          className="p-4 hover:bg-gray-50 cursor-pointer"
        >
          <div className="flex items-center">
            <FileText className="h-6 w-6 text-gray-400" />
            <h3 className="ml-2 text-sm font-medium text-gray-900">{section.name}</h3>
          </div>
          <div className="mt-2 text-xs text-gray-500 flex justify-between">
            <span>Updated {formatDate(section.updated_at)}</span>
          </div>
        </Card>
      ))}
    </div>
  );
} 