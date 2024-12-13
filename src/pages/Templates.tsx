import React from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useTemplates } from '../hooks/useTemplates';
import { OrganizationInfo } from '../components/templates/OrganizationInfo';
import { ProjectDetails } from '../components/templates/ProjectDetails';
import { FinancialInfo } from '../components/templates/FinancialInfo';
import { ImpactInfo } from '../components/templates/ImpactInfo';

export default function Templates() {
  const { loading, error } = useTemplates();
  const [activeSection, setActiveSection] = React.useState<string>('organization');

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const sections = [
    { id: 'organization', name: 'Organization Information' },
    { id: 'project', name: 'Project Details' },
    { id: 'financial', name: 'Financial Information' },
    { id: 'impact', name: 'Impact Information' }
  ];

  const renderSection = () => {
    switch (activeSection) {
      case 'organization':
        return <OrganizationInfo />;
      case 'project':
        return <ProjectDetails />;
      case 'financial':
        return <FinancialInfo />;
      case 'impact':
        return <ImpactInfo />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Organization Templates</h1>
      </div>

      <div className="flex space-x-4">
        {sections.map((section) => (
          <Button
            key={section.id}
            variant={activeSection === section.id ? 'primary' : 'outline'}
            onClick={() => setActiveSection(section.id)}
          >
            {section.name}
          </Button>
        ))}
      </div>

      <Card>
        <div className="p-6">
          {renderSection()}
        </div>
      </Card>
    </div>
  );
}
