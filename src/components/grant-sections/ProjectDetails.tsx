import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FormField } from '../form/FormField';
import { TextArea } from '../form/TextArea';
import { Button } from '../ui/Button';
import type { ProjectDetailsSection } from '../../types';

const formSchema = z.object({
  name: z.string().min(1, 'Project name is required'),
  description: z.string().min(1, 'Project description is required'),
  objectives: z.array(z.string()).min(1, 'At least one objective is required'),
  timeline: z.string().min(1, 'Timeline is required'),
  deliverables: z.array(z.string()).min(1, 'At least one deliverable is required'),
});

type FormData = z.infer<typeof formSchema>;

interface ProjectDetailsProps {
  initialData?: Partial<ProjectDetailsSection> | null;
  onSave: (data: ProjectDetailsSection) => void;
}

export function ProjectDetails({ initialData, onSave }: ProjectDetailsProps) {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData?.name || '',
      description: initialData?.description || '',
      objectives: initialData?.objectives || [''],
      timeline: initialData?.timeline || '',
      deliverables: initialData?.deliverables || [''],
    },
    mode: 'onChange'
  });

  const { register, handleSubmit, formState: { errors, isSubmitting } } = form;

  const handleFormSubmit = async (data: FormData) => {
    try {
      await onSave({
        ...data,
        type: 'project_details',
      });
    } catch (error) {
      console.error('Error saving project details:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <div className="border-b border-gray-200 pb-6">
        <h2 className="text-xl font-semibold text-gray-900">Project Details</h2>
        <p className="mt-1 text-sm text-gray-500">
          Create a reusable project details section that can be referenced in grant applications.
        </p>
      </div>

      <FormField
        label="Project Name"
        placeholder="Enter project name"
        error={errors.name?.message}
        {...register("name")}
      />

      <TextArea
        label="Project Description"
        placeholder="Describe your project"
        error={errors.description?.message}
        {...register("description")}
      />

      <TextArea
        label="Project Objectives"
        placeholder="List your project objectives (one per line)"
        error={errors.objectives?.message}
        {...register("objectives.0")}
      />

      <TextArea
        label="Project Timeline"
        placeholder="Outline your project timeline"
        error={errors.timeline?.message}
        {...register("timeline")}
      />

      <TextArea
        label="Project Deliverables"
        placeholder="List your project deliverables (one per line)"
        error={errors.deliverables?.message}
        {...register("deliverables.0")}
      />

      <div className="flex justify-end pt-6">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : 'Save Project Details'}
        </Button>
      </div>
    </form>
  );
} 