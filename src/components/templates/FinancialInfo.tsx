import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FormField } from '../form/FormField';
import { TextArea } from '../form/TextArea';
import { Button } from '../ui/Button';
import { useTemplates } from '../../hooks/useTemplates';

const financialTemplateSchema = z.object({
  fundingStrategy: z.string().min(1, 'Funding strategy is required'),
  budgetingProcess: z.string().min(1, 'Budgeting process is required'),
  financialControls: z.string().min(1, 'Financial controls information is required'),
  sustainabilityPlan: z.string().min(1, 'Financial sustainability plan is required'),
  previousFunding: z.string().min(1, 'Previous funding information is required'),
  inKindSupport: z.string().min(1, 'In-kind support information is required'),
  overheadRate: z.number().min(0, 'Overhead rate must be non-negative').max(100, 'Overhead rate cannot exceed 100%'),
});

type FinancialTemplateData = z.infer<typeof financialTemplateSchema>;

export function FinancialInfo() {
  const { templates, saveTemplate } = useTemplates();
  const financialTemplate = templates.find(t => t.category === 'financial_info');

  const { register, handleSubmit, formState: { errors } } = useForm<FinancialTemplateData>({
    resolver: zodResolver(financialTemplateSchema),
    defaultValues: financialTemplate ? JSON.parse(financialTemplate.content) : undefined,
  });

  const onSubmit = async (data: FinancialTemplateData) => {
    await saveTemplate({
      name: 'Financial Information',
      category: 'financial_info',
      content: JSON.stringify(data),
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="border-b border-gray-200 pb-6">
        <h2 className="text-xl font-semibold text-gray-900">Financial Information Template</h2>
        <p className="mt-1 text-sm text-gray-500">
          This information will be used as a foundation for financial sections in your grant applications.
        </p>
      </div>

      <TextArea
        register={register}
        name="fundingStrategy"
        label="What is your organization's overall funding strategy?"
        placeholder="Describe your approach to securing and managing funding"
        error={errors.fundingStrategy?.message}
      />

      <TextArea
        register={register}
        name="budgetingProcess"
        label="Describe your budgeting process"
        placeholder="Explain how you develop and manage project budgets"
        error={errors.budgetingProcess?.message}
      />

      <TextArea
        register={register}
        name="financialControls"
        label="What financial controls do you have in place?"
        placeholder="Describe your financial management and oversight procedures"
        error={errors.financialControls?.message}
      />

      <TextArea
        register={register}
        name="sustainabilityPlan"
        label="What is your financial sustainability plan?"
        placeholder="Explain your strategy for long-term financial sustainability"
        error={errors.sustainabilityPlan?.message}
      />

      <TextArea
        register={register}
        name="previousFunding"
        label="Describe your track record with previous funding"
        placeholder="List major funding sources and how funds were utilized"
        error={errors.previousFunding?.message}
      />

      <TextArea
        register={register}
        name="inKindSupport"
        label="What in-kind support do you typically receive?"
        placeholder="Describe non-monetary support and partnerships"
        error={errors.inKindSupport?.message}
      />

      <FormField
        register={register}
        name="overheadRate"
        label="What is your standard overhead rate? (%)"
        type="number"
        placeholder="Enter percentage (0-100)"
        error={errors.overheadRate?.message}
      />

      <div className="flex justify-end pt-6">
        <Button type="submit">
          Save Financial Template
        </Button>
      </div>
    </form>
  );
} 