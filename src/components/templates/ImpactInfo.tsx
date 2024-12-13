import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { TextArea } from '../form/TextArea';
import { Button } from '../ui/Button';
import { useTemplates } from '../../hooks/useTemplates';

const impactTemplateSchema = z.object({
  communityNeeds: z.string().min(1, 'Community needs assessment is required'),
  impactMeasurement: z.string().min(1, 'Impact measurement approach is required'),
  pastImpact: z.string().min(1, 'Past impact information is required'),
  equityApproach: z.string().min(1, 'Equity approach is required'),
  communityEngagement: z.string().min(1, 'Community engagement strategy is required'),
  longTermImpact: z.string().min(1, 'Long-term impact strategy is required'),
  beneficiaryFeedback: z.string().min(1, 'Beneficiary feedback process is required'),
});

type ImpactTemplateData = z.infer<typeof impactTemplateSchema>;

export function ImpactInfo() {
  const { templates, saveTemplate } = useTemplates();
  const impactTemplate = templates.find(t => t.category === 'impact_info');

  const { register, handleSubmit, formState: { errors } } = useForm<ImpactTemplateData>({
    resolver: zodResolver(impactTemplateSchema),
    defaultValues: impactTemplate ? JSON.parse(impactTemplate.content) : undefined,
  });

  const onSubmit = async (data: ImpactTemplateData) => {
    await saveTemplate({
      name: 'Impact Information',
      category: 'impact_info',
      content: JSON.stringify(data),
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="border-b border-gray-200 pb-6">
        <h2 className="text-xl font-semibold text-gray-900">Impact Information Template</h2>
        <p className="mt-1 text-sm text-gray-500">
          This information will be used to demonstrate your organization's impact in grant applications.
        </p>
      </div>

      <TextArea
        register={register}
        name="communityNeeds"
        label="How do you assess community needs?"
        placeholder="Describe your process for identifying and understanding community needs"
        error={errors.communityNeeds?.message}
      />

      <TextArea
        register={register}
        name="impactMeasurement"
        label="How do you measure and evaluate impact?"
        placeholder="Describe your impact measurement methodology"
        error={errors.impactMeasurement?.message}
      />

      <TextArea
        register={register}
        name="pastImpact"
        label="What impact have you achieved in the past?"
        placeholder="Provide examples of your organization's past achievements and impact"
        error={errors.pastImpact?.message}
      />

      <TextArea
        register={register}
        name="equityApproach"
        label="How do you approach equity in your work?"
        placeholder="Describe your strategy for promoting equity and inclusion"
        error={errors.equityApproach?.message}
      />

      <TextArea
        register={register}
        name="communityEngagement"
        label="How do you engage with the community?"
        placeholder="Describe your community engagement and participation strategies"
        error={errors.communityEngagement?.message}
      />

      <TextArea
        register={register}
        name="longTermImpact"
        label="What is your approach to ensuring long-term impact?"
        placeholder="Describe your strategy for creating sustainable, lasting change"
        error={errors.longTermImpact?.message}
      />

      <TextArea
        register={register}
        name="beneficiaryFeedback"
        label="How do you collect and incorporate beneficiary feedback?"
        placeholder="Describe your process for gathering and acting on feedback from those you serve"
        error={errors.beneficiaryFeedback?.message}
      />

      <div className="flex justify-end pt-6">
        <Button type="submit">
          Save Impact Template
        </Button>
      </div>
    </form>
  );
} 