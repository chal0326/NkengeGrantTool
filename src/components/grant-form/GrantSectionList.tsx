import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import type { GrantSection } from '../../types';

interface GrantSectionListProps {
  sections: GrantSection[];
  onSelectSection: (section: GrantSection) => void;
}

export function GrantSectionList({ sections, onSelectSection }: GrantSectionListProps) {
  console.log('Sections data:', sections);

  const getSectionTitle = (type: string | undefined) => {
    if (!type) return 'Unknown Type';
    return type.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  if (sections.length === 0) {
    return (
      <Card className="p-6">
        <p className="text-center text-gray-500">No grant sections created yet.</p>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {sections.map((section) => (
        <Card key={section.id} className="p-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-medium text-gray-900">
                {section.name}
              </h3>
              <p className="text-sm text-gray-500">
                {getSectionTitle(section.type)}
              </p>
            </div>
            <Button
              variant="outline"
              onClick={() => onSelectSection(section)}
            >
              Edit
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
} 