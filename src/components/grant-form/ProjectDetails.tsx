import { useFormContext } from 'react-hook-form';
import { FormField } from '../form/FormField';
import { TextArea } from '../form/TextArea';
import type { GrantFormData } from '../../types/grant';

export function ProjectDetails() {
  const { register } = useFormContext<GrantFormData>();

  return (
    <div className="space-y-6">
      <div className="border-b border-gray-200 pb-6">
        <h2 className="text-xl font-semibold text-gray-900">Project Details</h2>
        <p className="mt-1 text-sm text-gray-500">
          Tell us about your proposed project or program.
        </p>
      </div>

      <FormField
        {...register('project.name')}
        label="What is the name of the project/program for which you are seeking funding?"
        placeholder="Enter project name"
      />

      <TextArea
        {...register('project.description')}
        label="Briefly describe the project/program"
        placeholder="Provide a detailed description of your project"
      />

      <TextArea
        {...register('project.goals.0')}
        label="What are the primary goals and objectives of this project?"
        placeholder="List the main goals and objectives"
      />

      <TextArea
        {...register('project.targetAudience')}
        label="Who is the target audience or population served by this project?"
        placeholder="Describe your target audience"
      />

      <TextArea
        {...register('project.alignment')}
        label="How will this project/program align with the goals of the grant you're applying for?"
        placeholder="Explain how your project aligns with the grant goals"
      />

      <TextArea
        {...register('project.outcomes')}
        label="What are the expected outcomes of this project?"
        placeholder="Describe the expected outcomes"
      />

      <TextArea
        {...register('project.measurement')}
        label="How will you measure success?"
        placeholder="Describe your evaluation methods"
      />

      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Timeline</h3>
        <FormField
          {...register('project.timeline.startDate')}
          type="date"
          label="Project Start Date"
        />
        <FormField
          {...register('project.timeline.endDate')}
          type="date"
          label="Project End Date"
        />
      </div>
    </div>
  );
}