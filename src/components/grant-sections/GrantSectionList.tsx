import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import type { GrantSection } from '../../types';

interface GrantSectionListProps {
  sections: GrantSection[];
  onSelectSection: (section: GrantSection) => void;
}

export function GrantSectionList({ sections, onSelectSection }: GrantSectionListProps) {
  const getSectionTitle = (type: string) => {
    switch (type) {
      case 'staff_member':
        return 'Staff Member';
      case 'organization_info':
        return 'Organization Information';
      case 'project_details':
        return 'Project Details';
      default:
        return type;
    }
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
                {section.content.name}
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