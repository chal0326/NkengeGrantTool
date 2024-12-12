import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FormField } from '../form/FormField';
import { TextArea } from '../form/TextArea';
import { Button } from '../ui/Button';
import { useTemplates } from '../../hooks/useTemplates';

const organizationTemplateSchema = z.object({
  organizationName: z.string().min(1, 'Organization name is required'),
  hasNonProfitStatus: z.boolean(),
  ein: z.string().regex(/^\d{2}-\d{7}$/, 'Invalid EIN format'),
  missionStatement: z.string().min(1, 'Mission statement is required'),
  organizationHistory: z.string().min(1, 'Organization history is required'),
  annualOperatingBudget: z.number().positive('Annual budget must be positive'),
});

type OrganizationTemplateData = z.infer<typeof organizationTemplateSchema>;

export function OrganizationInfo() {
  const { templates, saveTemplate } = useTemplates();
  const organizationTemplate = templates.find(t => t.category === 'organization_info');

  const { register, handleSubmit, formState: { errors } } = useForm<OrganizationTemplateData>({
    resolver: zodResolver(organizationTemplateSchema),
    defaultValues: organizationTemplate ? JSON.parse(organizationTemplate.content) : undefined,
  });

  const onSubmit = async (data: OrganizationTemplateData) => {
    await saveTemplate({
      name: 'Organization Information',
      category: 'organization_info',
      content: JSON.stringify(data),
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="border-b border-gray-200 pb-6">
        <h2 className="text-xl font-semibold text-gray-900">Organization Information Template</h2>
        <p className="mt-1 text-sm text-gray-500">
          This information will be used as a template for all your grant applications.
        </p>
      </div>

      <FormField<OrganizationTemplateData>
        register={register}
        name="organizationName"
        label="What is the official name of your organization?"
        placeholder="Enter your organization's legal name"
        error={errors.organizationName?.message}
      />

      <FormField<OrganizationTemplateData>
        register={register}
        name="hasNonProfitStatus"
        label="Do you have 501(c)(3) nonprofit status?"
        type="checkbox"
        error={errors.hasNonProfitStatus?.message}
      />

      <FormField<OrganizationTemplateData>
        register={register}
        name="ein"
        label="What is your EIN (Employer Identification Number)?"
        placeholder="XX-XXXXXXX"
        error={errors.ein?.message}
      />

      <TextArea<OrganizationTemplateData>
        register={register}
        name="missionStatement"
        label="What is your organization's mission statement?"
        placeholder="Enter your organization's mission statement"
        error={errors.missionStatement?.message}
      />

      <TextArea<OrganizationTemplateData>
        register={register}
        name="organizationHistory"
        label="Provide a brief history of your organization"
        placeholder="Describe your organization's history and development"
        error={errors.organizationHistory?.message}
      />

      <FormField<OrganizationTemplateData>
        register={register}
        name="annualOperatingBudget"
        label="What is your organization's annual operating budget?"
        type="number"
        placeholder="Enter amount in USD"
        error={errors.annualOperatingBudget?.message}
      />

      <div className="flex justify-end pt-6">
        <Button type="submit">
          Save Organization Template
        </Button>
      </div>
    </form>
  );
} 