import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { GrantSectionList } from '../components/grant-sections/GrantSectionList';
import { StaffMemberSection } from '../components/grant-sections/StaffMemberSection';
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

  const handleSave = async (data: any) => {
    try {
      if (selectedSection) {
        await updateSection(selectedSection.id, data);
      } else {
        await createSection(data);
      }
      setShowForm(false);
      setSelectedSection(null);
      setSelectedType(null);
    } catch (error) {
      console.error('Error saving section:', error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

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

      {showForm ? (
        <Card className="p-6">
          {selectedType === 'staff_member' && (
            <StaffMemberSection
              initialData={selectedSection?.content}
              onSave={handleSave}
            />
          )}
          {/* Add other section forms here */}
        </Card>
      ) : (
        <GrantSectionList
          sections={sections}
          onSelectSection={handleEdit}
        />
      )}
    </div>
  );
} 