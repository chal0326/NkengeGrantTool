import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '../ui/Button';
import { TextArea } from '../form/TextArea';
import { MultiSelect } from '../ui/MultiSelect';
import { useTemplateOptions } from '../../hooks/useTemplateOptions';
import type { ProjectDetailsTemplate } from '../../types';

const formSchema = z.object({
  name: z.string().min(1, 'Project name is required'),
  projectGoals: z.string().min(1, 'Project goals are required'),
  targetAudience: z.string().min(1, 'Target audience is required'),
  evaluationMethods: z.string().min(1, 'Evaluation methods are required'),
  successCriteria: z.string().min(1, 'Success criteria are required'),
  sustainabilityPlan: z.string().min(1, 'Sustainability plan is required'),
  riskMitigation: z.string().min(1, 'Risk mitigation is required'),
  collaborationStrategy: z.string().min(1, 'Collaboration strategy is required'),
  artProgramDetails: z.string().min(1, 'Art program details are required'),
  projectActivities: z.array(z.object({
    activity: z.string(),
    method: z.string(),
    timeline: z.string(),
    responsibleParty: z.string(),
  })).default([]),
  projectTeam: z.array(z.object({
    name: z.string(),
    title: z.string(),
    bio: z.string(),
    email: z.string().email(),
  })).default([]),
  programTypes: z.array(z.string()).default([]),
});

type FormData = z.infer<typeof formSchema>;

interface ProjectDetailsProps {
  initialData?: ProjectDetailsTemplate | null;
  onSave: (data: ProjectDetailsTemplate) => void;
}

const defaultValues: FormData = {
  name: '',
  projectGoals: '',
  targetAudience: '',
  evaluationMethods: '',
  successCriteria: '',
  sustainabilityPlan: '',
  riskMitigation: '',
  collaborationStrategy: '',
  artProgramDetails: '',
  projectActivities: [],
  projectTeam: [],
  programTypes: [],
};

export function ProjectDetails({ initialData, onSave }: ProjectDetailsProps) {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || defaultValues,
  });

  const { register, handleSubmit, setValue, watch, formState: { errors } } = form;

  const { options: programTypeOptions } = useTemplateOptions('program_types');
  const selectedProgramTypes = watch('programTypes') || [];

  const handleProgramTypesChange = (selectedIds: string[]) => {
    setValue('programTypes', selectedIds);
  };

  const handleFormSubmit = (data: FormData) => {
    onSave({
      ...data,
      type: 'project_details',
    } as ProjectDetailsTemplate);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <div className="border-b border-gray-200 pb-6">
        <h2 className="text-xl font-semibold text-gray-900">Project Details Template</h2>
        <p className="mt-1 text-sm text-gray-500">
          Create a template for project details that can be used in grant applications.
        </p>
      </div>

      <div className="space-y-4">
        <TextArea
          {...register('name')}
          label="Project Name"
          placeholder="Enter project name"
          error={errors.name?.message}
        />

        <TextArea
          {...register('projectGoals')}
          label="Project Goals"
          placeholder="Describe the goals of your project..."
          error={errors.projectGoals?.message}
        />

        <TextArea
          {...register('targetAudience')}
          label="Target Audience"
          placeholder="Describe your target audience..."
          error={errors.targetAudience?.message}
        />

        <TextArea
          {...register('evaluationMethods')}
          label="Evaluation Methods"
          placeholder="Describe how you will evaluate success..."
          error={errors.evaluationMethods?.message}
        />

        <TextArea
          {...register('successCriteria')}
          label="Success Criteria"
          placeholder="Define your success criteria..."
          error={errors.successCriteria?.message}
        />

        <TextArea
          {...register('sustainabilityPlan')}
          label="Sustainability Plan"
          placeholder="Describe your plan for sustainability..."
          error={errors.sustainabilityPlan?.message}
        />

        <TextArea
          {...register('riskMitigation')}
          label="Risk Mitigation"
          placeholder="Describe how you will mitigate risks..."
          error={errors.riskMitigation?.message}
        />

        <TextArea
          {...register('collaborationStrategy')}
          label="Collaboration Strategy"
          placeholder="Describe your collaboration strategy..."
          error={errors.collaborationStrategy?.message}
        />

        <div>
          <label className="block text-sm font-medium text-gray-700">Program Types</label>
          <MultiSelect
            options={programTypeOptions.map(opt => ({ id: opt.value, label: opt.label }))}
            selectedIds={selectedProgramTypes}
            onChange={handleProgramTypesChange}
            placeholder="Select program types..."
          />
        </div>

        <TextArea
          {...register('artProgramDetails')}
          label="Art Program Details"
          placeholder="Describe the artistic components of your program..."
          error={errors.artProgramDetails?.message}
        />
      </div>

      <div className="flex justify-end">
        <Button type="submit">Save Template</Button>
      </div>
    </form>
  );
} 