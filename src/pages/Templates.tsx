import React from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useTemplates } from '../hooks/useTemplates';
import { OrganizationInfo } from '../components/templates/OrganizationInfo';
import { ProjectDetails } from '../components/templates/ProjectDetails';
import { FinancialInfo } from '../components/templates/FinancialInfo';
import { ImpactInfo } from '../components/templates/ImpactInfo';
import { TemplateList } from '../components/templates/TemplateList';
import { ProgramTemplate } from '../components/templates/ProgramTemplate';
import { StaffMemberTemplate } from '../components/templates/StaffMemberTemplate';
import { ProjectActivityTemplate } from '../components/templates/ProjectActivityTemplate';
import { BudgetItemTemplate } from '../components/templates/BudgetItemTemplate';
import { DemographicCategoryTemplate } from '../components/templates/DemographicCategoryTemplate';
import { CommunityPartnershipTemplate } from '../components/templates/CommunityPartnershipTemplate';
import type { 
  Template, 
  TemplateData, 
  OrganizationInfoTemplate, 
  ProjectDetailsTemplate, 
  FinancialInfoTemplate, 
  ImpactInfoTemplate,
  ProgramTemplate as ProgramTemplateType,
  StaffMemberTemplate as StaffMemberTemplateType,
  ProjectActivityTemplate as ProjectActivityTemplateType,
  BudgetItemTemplate as BudgetItemTemplateType,
  DemographicCategoryTemplate as DemographicCategoryTemplateType,
  CommunityPartnershipTemplate as CommunityPartnershipTemplateType,
  TemplateType
} from '../types';

// Define a generic template component props type
interface TemplateComponentProps<T extends TemplateData> {
  initialData?: T;
  onSave: (data: T) => void;
}

// Define the component type mapping
type TemplateComponentType<T extends TemplateData> = React.ComponentType<TemplateComponentProps<T>>;

// Define the template type mapping
type TemplateComponentMap = {
  [K in TemplateType]: {
    title: string;
    description: string;
    component: TemplateComponentType<Extract<TemplateData, { type: K }>>;
  };
};

export default function Templates() {
  const { templates, loading, error, saveTemplate } = useTemplates();
  const [selectedTemplate, setSelectedTemplate] = React.useState<Template | null>(null);
  const [mode, setMode] = React.useState<'view' | 'create'>('view');
  const [section, setSection] = React.useState<'main' | 'reusable'>('main');

  const defaultTemplates: Record<TemplateType, TemplateData> = {
    organization_info: {
      type: 'organization_info',
      name: '',
      organizationName: '',
      hasNonProfitStatus: false,
      ein: '',
      missionStatement: '',
      organizationHistory: '',
      annualOperatingBudget: 0,
      physicalAddress: {
        street: '',
        city: '',
        state: '',
        zipCode: '',
      },
      currentPrograms: [],
      bipocWomenArtsFocus: '',
      keyStaff: [],
      artForms: [],
    } as OrganizationInfoTemplate,
    project_details: {
      type: 'project_details',
      name: '',
      projectGoals: '',
      targetAudience: '',
      evaluationMethods: '',
      successCriteria: '',
      sustainabilityPlan: '',
      riskMitigation: '',
      collaborationStrategy: '',
      projectActivities: [],
      artProgramDetails: '',
      projectTeam: [],
      programTypes: [],
    } as ProjectDetailsTemplate,
    financial_info: {
      type: 'financial_info',
      fundingStrategy: {
        annualBudget: 0,
        projectBudget: 0,
        requestedAmount: 0,
        isFullyFunded: false,
        otherFunding: [],
      },
      budgetLineItems: [],
      matchingFunds: {
        required: false,
        percentage: 0,
        secured: 0,
      },
      indirectCosts: {
        rate: 0,
        basis: '',
      },
    } as FinancialInfoTemplate,
    impact_info: {
      type: 'impact_info',
      name: '',
      communityNeeds: '',
      equityApproach: '',
      beneficiaryFeedback: '',
      communityEngagement: '',
      demographicData: {
        categories: [],
        collectionMethod: '',
        frequency: '',
      },
      longTermImpact: '',
      communityPartnerships: [],
      artsSectorImpact: '',
    } as ImpactInfoTemplate,
    program: {
      type: 'program',
      name: '',
      description: '',
      impact: '',
    } as ProgramTemplateType,
    staff_member: {
      type: 'staff_member',
      name: '',
      title: '',
      bio: '',
      email: '',
    } as StaffMemberTemplateType,
    project_activity: {
      type: 'project_activity',
      activity: '',
      method: '',
      timeline: '',
      responsibleParty: '',
    } as ProjectActivityTemplateType,
    budgetItem: {
      type: 'budget_item',
      category: '',
      description: '',
      amount: 0,
    } as BudgetItemTemplateType,
    demographic_category: {
      type: 'demographic_category',
      category: '',
      description: '',
      collectionMethod: '',
    } as DemographicCategoryTemplateType,
    community_partnership: {
      type: 'community_partnership',
      partner: '',
      role: '',
      contribution: '',
    } as CommunityPartnershipTemplateType,
  };

  const reusableTemplateTypes: TemplateComponentMap = {
    program: {
      title: "Program",
      description: "Create a template for program information",
      component: ProgramTemplate as TemplateComponentType<ProgramTemplateType>,
    },
    staff_member: {
      title: "Staff Member",
      description: "Create a template for staff member information",
      component: StaffMemberTemplate as TemplateComponentType<StaffMemberTemplateType>,
    },
    project_activity: {
      title: "Project Activity",
      description: "Create a template for project activities",
      component: ProjectActivityTemplate as TemplateComponentType<ProjectActivityTemplateType>,
    },
    budget_item: {
      title: "Budget Item",
      description: "Create a template for budget items",
      component: BudgetItemTemplate as TemplateComponentType<BudgetItemTemplateType>,
    },
    demographic_category: {
      title: "Demographic Category",
      description: "Create a template for demographic categories",
      component: DemographicCategoryTemplate as TemplateComponentType<DemographicCategoryTemplateType>,
    },
    community_partnership: {
      title: "Community Partnership",
      description: "Create a template for community partnerships",
      component: CommunityPartnershipTemplate as TemplateComponentType<CommunityPartnershipTemplateType>,
    },
    organization_info: {
      title: "Organization Info",
      description: "Create a template for organization information",
      component: OrganizationInfo as TemplateComponentType<OrganizationInfoTemplate>,
    },
    project_details: {
      title: "Project Details",
      description: "Create a template for project details",
      component: ProjectDetails as TemplateComponentType<ProjectDetailsTemplate>,
    },
    financial_info: {
      title: "Financial Info",
      description: "Create a template for financial information",
      component: FinancialInfo as TemplateComponentType<FinancialInfoTemplate>,
    },
    impact_info: {
      title: "Impact Info",
      description: "Create a template for impact information",
      component: ImpactInfo as TemplateComponentType<ImpactInfoTemplate>,
    },
  };

  const mainTemplateTypes = reusableTemplateTypes;

  const handleSave = (data: TemplateData) => {
    if (selectedTemplate?.id) {
      // Update existing template
      saveTemplate({
        id: selectedTemplate.id,
        name: selectedTemplate.name,
        type: data.type,
        content: data,
      });
    } else {
      // Create new template
      const timestamp = new Date().toLocaleString();
      saveTemplate({
        name: `${formatTypeName(data.type)} Template - ${timestamp}`,
        type: data.type as TemplateType,
        content: data,
      });
    }
    setSelectedTemplate(null);
    setMode('view');
  };

  const handleCreateTemplate = (type: TemplateType) => {
    const defaultTemplate = defaultTemplates[type];
    
    if (!defaultTemplate) return;

    setSelectedTemplate({
      id: '',
      name: `New ${formatTypeName(type)} Template`,
      type,
      content: defaultTemplate,
      created_at: null,
      updated_at: null,
    });
  };

  const formatTypeName = (type: TemplateType) => {
    return type.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  const renderTemplateForm = () => {
    if (!selectedTemplate) return null;

    const templateData = selectedTemplate.content;
    console.log('Selected template:', selectedTemplate);
    console.log('Template data for form:', templateData);
    
    if (!templateData) return null;

    const templateType = templateData.type;
    const Component = reusableTemplateTypes[templateType]?.component;

    if (Component) {
      return (
        <Component
          initialData={templateData as any}
          onSave={handleSave}
        />
      );
    }

    console.log('Unknown template type:', templateData.type);
    return null;
  };

  const renderTemplateCreation = () => {
    const templateTypes = section === 'main' ? mainTemplateTypes : reusableTemplateTypes;

    return (
      <div className="space-y-6">
        <div className="flex space-x-4">
          <Button 
            variant={section === 'main' ? 'primary' : 'outline'}
            onClick={() => setSection('main')}
          >
            Main Templates
          </Button>
          <Button 
            variant={section === 'reusable' ? 'primary' : 'outline'}
            onClick={() => setSection('reusable')}
          >
            Reusable Components
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {Object.entries(templateTypes).map(([type, { title, description }]) => (
            <Card
              key={type}
              title={title}
              description={description}
              onClick={() => handleCreateTemplate(type as TemplateType)}
            />
          ))}
        </div>
      </div>
    );
  };

  const renderTemplateList = () => {
    const mainTemplates = templates.filter(t => t.type in mainTemplateTypes);
    const reusableTemplates = templates.filter(t => t.type in reusableTemplateTypes);

    return (
      <div className="space-y-8">
        <div className="flex space-x-4">
          <Button 
            variant={section === 'main' ? 'primary' : 'outline'}
            onClick={() => setSection('main')}
          >
            Main Templates
          </Button>
          <Button 
            variant={section === 'reusable' ? 'primary' : 'outline'}
            onClick={() => setSection('reusable')}
          >
            Reusable Components
          </Button>
        </div>

        <TemplateList
          templates={section === 'main' ? mainTemplates : reusableTemplates}
          onSelectTemplate={setSelectedTemplate}
        />
      </div>
    );
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Templates</h1>
          <div className="space-x-4">
            <Button 
              variant={mode === 'view' ? 'primary' : 'outline'}
              onClick={() => {
                setMode('view');
                setSelectedTemplate(null);
              }}
            >
              View Templates
            </Button>
            <Button 
              variant={mode === 'create' ? 'primary' : 'outline'}
              onClick={() => {
                setMode('create');
                setSelectedTemplate(null);
              }}
            >
              Create Template
            </Button>
          </div>
        </div>

        {selectedTemplate ? (
          <div>
            <div className="flex justify-between items-center mb-4">
              <Button onClick={() => setSelectedTemplate(null)}>
                Back to {mode === 'create' ? 'Template Creation' : 'Templates'}
              </Button>
              <h2 className="text-xl font-semibold text-gray-900">
                {selectedTemplate.id ? 'Edit Template' : 'Create New Template'}
              </h2>
            </div>
            {renderTemplateForm()}
          </div>
        ) : mode === 'create' ? (
          renderTemplateCreation()
        ) : (
          renderTemplateList()
        )}
      </div>
    </div>
  );
}
