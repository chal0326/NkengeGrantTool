import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { TextArea } from '../form/TextArea';
import { Button } from '../ui/Button';
import { useTemplates } from '../../hooks/useTemplates';

const projectTemplateSchema = z.object({
  projectGoals: z.string().min(1, 'Project goals are required'),
  targetAudience: z.string().min(1, 'Target audience is required'),
  evaluationMethods: z.string().min(1, 'Evaluation methods are required'),
  successCriteria: z.string().min(1, 'Success criteria are required'),
  sustainabilityPlan: z.string().min(1, 'Sustainability plan is required'),
  riskMitigation: z.string().min(1, 'Risk mitigation strategy is required'),
  collaborationStrategy: z.string().min(1, 'Collaboration strategy is required'),
});

type ProjectTemplateData = z.infer<typeof projectTemplateSchema>;

export function ProjectDetails() {
  const { templates, saveTemplate } = useTemplates();
  const projectTemplate = templates.find(t => t.category === 'project_details');

  const { register, handleSubmit, formState: { errors } } = useForm<ProjectTemplateData>({
    resolver: zodResolver(projectTemplateSchema),
    defaultValues: projectTemplate ? JSON.parse(projectTemplate.content) : undefined,
  });

  const onSubmit = async (data: ProjectTemplateData) => {
    await saveTemplate({
      name: 'Project Details',
      category: 'project_details',
      content: JSON.stringify(data),
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="border-b border-gray-200 pb-6">
        <h2 className="text-xl font-semibold text-gray-900">Project Details Template</h2>
        <p className="mt-1 text-sm text-gray-500">
          This information will serve as a foundation for describing your projects in grant applications.
        </p>
      </div>

      <TextArea
        register={register}
        name="projectGoals"
        label="What are your typical project goals and objectives?"
        placeholder="Describe the standard goals and objectives your projects aim to achieve"
        error={errors.projectGoals?.message}
      />

      <TextArea
        register={register}
        name="targetAudience"
        label="Who is your typical target audience?"
        placeholder="Describe the demographics and characteristics of your usual beneficiaries"
        error={errors.targetAudience?.message}
      />

      <TextArea
        register={register}
        name="evaluationMethods"
        label="How do you typically evaluate project success?"
        placeholder="Describe your standard evaluation methods and metrics"
        error={errors.evaluationMethods?.message}
      />

      <TextArea
        register={register}
        name="successCriteria"
        label="What are your standard success criteria?"
        placeholder="List the key indicators you use to measure project success"
        error={errors.successCriteria?.message}
      />

      <TextArea
        register={register}
        name="sustainabilityPlan"
        label="What is your typical approach to project sustainability?"
        placeholder="Describe how you ensure project continuity and long-term impact"
        error={errors.sustainabilityPlan?.message}
      />

      <TextArea
        register={register}
        name="riskMitigation"
        label="What is your standard approach to risk management?"
        placeholder="Describe how you identify, assess, and mitigate project risks"
        error={errors.riskMitigation?.message}
      />

      <TextArea
        register={register}
        name="collaborationStrategy"
        label="How do you typically approach partnerships and collaboration?"
        placeholder="Describe your strategy for working with partners and stakeholders"
        error={errors.collaborationStrategy?.message}
      />

      <div className="flex justify-end pt-6">
        <Button type="submit">
          Save Project Template
        </Button>
      </div>
    </form>
  );
} 