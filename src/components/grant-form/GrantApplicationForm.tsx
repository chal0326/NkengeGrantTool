import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { grantFormSchema, type GrantFormData } from '../../types/grant';
import { OrganizationInfo } from './OrganizationInfo';
import { ContactInfo } from './ContactInfo';
import { ProjectDetails } from './ProjectDetails';
import { Timeline } from './Timeline';
import { FinancialInfo } from './FinancialInfo';
import { AdditionalInfo } from './AdditionalInfo';
import { Button } from '../ui/Button';
import { useTemplates } from '../../hooks/useTemplates';
import type { Template } from '../../types';

interface GrantApplicationFormProps {
  onSubmit: (data: GrantFormData) => Promise<void>;
  initialData?: Partial<GrantFormData>;
}

export function GrantApplicationForm({ onSubmit, initialData }: GrantApplicationFormProps) {
  const { templates } = useTemplates();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const methods = useForm<GrantFormData>({
    resolver: zodResolver(grantFormSchema),
    defaultValues: getDefaultValues(templates, initialData),
  });

  const handleSubmit = async (data: GrantFormData) => {
    try {
      setIsSubmitting(true);
      setError(null);
      await onSubmit(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-600">{error}</p>
        </div>
      )}

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(handleSubmit)} className="space-y-8">
          <OrganizationInfo />
          <ContactInfo />
          <ProjectDetails />
          <Timeline />
          <FinancialInfo />
          <AdditionalInfo />

          <div className="flex justify-end pt-6 border-t border-gray-200">
            <Button
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Saving...' : 'Save Application'}
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}

function getDefaultValues(templates: Template[], initialData?: Partial<GrantFormData>): Partial<GrantFormData> {
  if (initialData) return initialData;

  const defaults: Partial<GrantFormData> = {};
  
  // Get organization template
  const orgTemplate = templates.find(t => t.category === 'organization_info');
  if (orgTemplate) {
    const orgData = JSON.parse(orgTemplate.content);
    defaults.organizationName = orgData.organizationName;
    defaults.hasNonProfitStatus = orgData.hasNonProfitStatus;
    defaults.ein = orgData.ein;
    defaults.missionStatement = orgData.missionStatement;
    defaults.organizationHistory = orgData.organizationHistory;
    defaults.financial = {
      ...defaults.financial,
      annualBudget: orgData.annualOperatingBudget,
      projectBudget: 0,
      requestedAmount: 0,
      isFullyFunded: false,
      otherFunding: []
    };
  }

  // Get project template
  const projectTemplate = templates.find(t => t.category === 'project_details');
  if (projectTemplate) {
    const projectData = JSON.parse(projectTemplate.content);
    defaults.project = {
      ...defaults.project,
      name: projectData.name || '',
      description: projectData.description || '',
      goals: [projectData.projectGoals],
      targetAudience: projectData.targetAudience,
      alignment: projectData.alignment || '',
      timeline: {
        startDate: '',
        endDate: '',
        milestones: []
      },
      outcomes: projectData.outcomes || '',
      measurement: projectData.evaluationMethods
    };
  }

  // Get financial template
  const financialTemplate = templates.find(t => t.category === 'financial_info');
  if (financialTemplate) {
    const financialData = JSON.parse(financialTemplate.content);
    defaults.financial = {
      ...defaults.financial,
      annualBudget: financialData.annualBudget,
      projectBudget: financialData.projectBudget,
      requestedAmount: financialData.requestedAmount,
      isFullyFunded: financialData.isFullyFunded,
      otherFunding: financialData.otherFunding,
      financialStatements: financialData.financialStatements,
    };
  }

  // Get impact template
  const impactTemplate = templates.find(t => t.category === 'impact_info');
  if (impactTemplate) {
    const impactData = JSON.parse(impactTemplate.content);
    defaults.impact = {
      communityContribution: impactData.communityNeeds,
      communityNeeds: impactData.communityNeeds,
      beneficiaries: impactData.beneficiaryFeedback,
      equity: impactData.equityApproach,
    };
  }

  return defaults;
} 