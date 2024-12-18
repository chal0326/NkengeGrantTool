import { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { GrantSectionList } from '../components/grant-sections/GrantSectionList';
import { StaffMemberSection } from '../components/grant-sections/StaffMemberSection';
import { OrganizationInfo } from '../components/grant-sections/OrganizationInfo';
import { ProjectDetails } from '../components/grant-sections/ProjectDetails';
import { ProjectActivity } from '../components/grant-sections/ProjectActivity';
import { BudgetItem } from '../components/grant-sections/BudgetItem';
import { DemographicCategory } from '../components/grant-sections/DemographicCategory';
import { FinancialInfo } from '../components/grant-sections/FinancialInfo';
import { ImpactInfo } from '../components/grant-sections/ImpactInfo';
import { Program } from '../components/grant-sections/Program';
import { CommunityPartnership } from '../components/grant-sections/CommunityPartnership';
import { useGrantSections } from '../hooks/useGrantSections';
import type { 
  GrantSection, 
  GrantSectionType, 
  StaffMemberSection as StaffMemberSectionType,
  OrganizationInfoSection,
  ProjectDetailsSection,
  ProjectActivitySection,
  BudgetItemSection,
  FinancialInfoSection,
  DemographicCategorySection,
  ImpactInfoSection,
  ProgramSection,
  CommunityPartnershipSection
} from '../types';

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

  const handleSave = async (data: unknown) => {
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
              initialData={selectedSection?.type === 'staff_member' ? selectedSection.content as unknown as StaffMemberSectionType : null}
              onSave={handleSave}
            />
          )}
          {selectedType === 'organization_info' && (
            <OrganizationInfo
              initialData={selectedSection?.type === 'organization_info' ? selectedSection.content as unknown as OrganizationInfoSection : null}
              onSave={handleSave}
            />
          )}
          {selectedType === 'project_details' && (
            <ProjectDetails
              initialData={selectedSection?.type === 'project_details' ? (selectedSection.content as unknown as ProjectDetailsSection) : null}
              onSave={handleSave}
            />
          )}
          {selectedType === 'project_activity' && (
            <ProjectActivity
              initialData={selectedSection?.type === 'project_activity' ? (selectedSection.content as unknown as ProjectActivitySection) : null}
              onSave={handleSave}
            />
          )}
          {selectedType === 'budget_item' && (
            <BudgetItem
              initialData={selectedSection?.type === 'budget_item' ? (selectedSection.content as unknown as BudgetItemSection) : null}
              onSave={handleSave}
            />
          )}
          {selectedType === 'financial_info' && (
            <FinancialInfo
              initialData={selectedSection?.type === 'financial_info' ? (selectedSection.content as unknown as FinancialInfoSection) : null}
              onSave={handleSave}
            />
          )}
          {selectedType === 'demographic_category' && (
            <DemographicCategory
              initialData={selectedSection?.type === 'demographic_category' ? (selectedSection.content as unknown as DemographicCategorySection) : null}
              onSave={handleSave}
            />
          )}
          {selectedType === 'impact_info' && (
            <ImpactInfo
              initialData={selectedSection?.type === 'impact_info' ? (selectedSection.content as unknown as ImpactInfoSection) : null}
              onSave={handleSave}
            />
          )}
          {selectedType === 'program' && (
            <Program
              initialData={selectedSection?.type === 'program' ? (selectedSection.content as unknown as ProgramSection) : null}
              onSave={handleSave}
            />
          )}
          {selectedType === 'community_partnership' && (
            <CommunityPartnership
              initialData={selectedSection?.type === 'community_partnership' ? (selectedSection.content as unknown as CommunityPartnershipSection) : null}
              onSave={handleSave}
            />
          )}
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Grant Sections</h1>
          <p className="mt-1 text-sm text-gray-500">
            Create and manage reusable content for your this website and your grant applications.
          </p>
        </div>
        <div className="flex flex-wrap gap-4 justify-end">
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
          <Button
            variant="outline"
            onClick={() => handleCreate('project_activity')}
          >
            Add Project Activity
          </Button>
          <Button
            variant="outline"
            onClick={() => handleCreate('budget_item')}
          >
            Add Budget Item
          </Button>
          <Button
            variant="outline"
            onClick={() => handleCreate('financial_info')}
          >
            Add Financial Info
          </Button>
          <Button
            variant="outline"
            onClick={() => handleCreate('demographic_category')}
          >
            Add Demographic Category
          </Button>
          <Button
            variant="outline"
            onClick={() => handleCreate('impact_info')}
          >
            Add Impact Info
          </Button>
          <Button
            variant="outline"
            onClick={() => handleCreate('program')}
          >
            Add Program
          </Button>
          <Button
            variant="outline"
            onClick={() => handleCreate('community_partnership')}
          >
            Add Community Partnership
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