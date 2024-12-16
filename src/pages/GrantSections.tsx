import { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { GrantSectionList } from '../components/grant-sections/GrantSectionList';
import { StaffMemberSection } from '../components/grant-sections/StaffMemberSection';
import { OrganizationInfo } from '../components/grant-sections/OrganizationInfo';
import { ProjectDetails } from '../components/grant-sections/ProjectDetails';
import { useGrantSections } from '../hooks/useGrantSections';
import type { GrantSection, GrantSectionType } from '../types';

export default function GrantSections() {
  const [showForm, setShowForm] = useState(false);
  const [selectedType, setSelectedType] = useState<GrantSectionType | null>(null);
  const [selectedSection, setSelectedSection] = useState<GrantSection | null>(null);

  const { sections, loading, error, createSection, updateSection } = useGrantSections();

  const handleCreate = (type: GrantSectionType) => {
    setSelectedType(type);
    setSelectedSection(null);
    setShowForm(true);
  };

  const handleEdit = (section: GrantSection) => {
    setSelectedSection(section);
    setSelectedType(section.type);
    setShowForm(true);
  };

  const handleSave = async (data: Record<string, unknown>) => {
    try {
      if (!selectedType) return;

      if (selectedSection) {
        await updateSection(selectedSection.id, { content: data });
      } else {
        await createSection({ type: selectedType, content: data });
      }
      setShowForm(false);
      setSelectedSection(null);
      setSelectedType(null);
    } catch (error) {
      console.error('Error saving section:', error);
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setSelectedSection(null);
    setSelectedType(null);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  if (showForm) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">
            {selectedSection ? 'Edit' : 'Create'} Grant Section
          </h1>
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
        </div>

        <Card className="p-6">
          {selectedType === 'staff_member' && (
            <StaffMemberSection
              initialData={selectedSection?.content as typeof StaffMemberSection | null | undefined}
              onSave={(data: typeof StaffMemberSection) => handleSave(data)}
            />
          )}
          {selectedType === 'organization_info' && (
            <OrganizationInfo
              initialData={selectedSection?.content as any}
              onSave={(data: any) => handleSave(data)}
            />
          )}
          {selectedType === 'project_details' && (
            <ProjectDetails
              initialData={selectedSection?.content}
              onSave={handleSave}
            />
          )}
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Grant Sections</h1>
          <p className="mt-1 text-sm text-gray-500">
            Create and manage reusable content sections for your grant applications.
          </p>
        </div>
        <div className="flex space-x-4">
          <Button
            variant="outline"
            onClick={() => handleCreate('staff_member')}
          >
            Add Staff Member
          </Button>
          <Button
            variant="outline"
            onClick={() => handleCreate('organization_info')}
          >
            Add Organization Info
          </Button>
          <Button
            variant="outline"
            onClick={() => handleCreate('project_details')}
          >
            Add Project Details
          </Button>
        </div>
      </div>

      <GrantSectionList
        sections={sections}
        onSelectSection={handleEdit}
      />
    </div>
  );
} 