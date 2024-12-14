import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FormField } from '../form/FormField';
import { TextArea } from '../form/TextArea';
import { Button } from '../ui/Button';
import { ProjectActivityTemplate as ProjectActivityTemplateType } from '../../types';

const formSchema = z.object({
  activity: z.string().min(1, 'Activity description is required'),
  method: z.string().min(1, 'Implementation method is required'),
  timeline: z.string().min(1, 'Timeline is required'),
  responsibleParty: z.string().min(1, 'Responsible party is required'),
});

type FormData = z.infer<typeof formSchema>;

interface ProjectActivityTemplateProps {
  initialData?: ProjectActivityTemplateType | null;
  onSave: (data: ProjectActivityTemplateType) => void;
}

const defaultValues: ProjectActivityTemplateType = {
  type: 'project_activity',
  activity: '',
  method: '',
  timeline: '',
  responsibleParty: '',
};

export function ProjectActivityTemplate({ initialData, onSave }: ProjectActivityTemplateProps) {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || defaultValues,
  });

  const { register, handleSubmit, formState: { errors } } = form;

  const handleFormSubmit = (data: FormData) => {
    onSave({
      ...data,
      type: 'project_activity'
    } as ProjectActivityTemplateType);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <div className="border-b border-gray-200 pb-6">
        <h2 className="text-xl font-semibold text-gray-900">Project Activity Template</h2>
        <p className="mt-1 text-sm text-gray-500">
          Create a reusable project activity template that can be referenced in project templates.
        </p>
      </div>
      <TextArea
        {...register("activity")}
        label="Activity Description"
        placeholder="Describe the project activity"
        error={errors.activity?.message}
      />
      <TextArea
        {...register("method")}
        label="Implementation Method"
        placeholder="Describe how the activity will be implemented"
        error={errors.method?.message}
      />
      <FormField
        {...register("timeline")}
        label="Timeline"
        placeholder="Specify the timeline for this activity"
        error={errors.timeline?.message}
      />
      <FormField
        {...register("responsibleParty")}
        label="Responsible Party"
        placeholder="Who is responsible for this activity"
        error={errors.responsibleParty?.message}
      />

      <div className="flex justify-end pt-6">
        <Button type="submit">
          Save Project Activity Template
        </Button>
      </div>
    </form>
  );
} 