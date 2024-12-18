import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FormField } from '../form/FormField';
import { TextArea } from '../form/TextArea';
import { Button } from '../ui/Button';

const formSchema = z.object({
  name: z.string().min(1, 'Activity name is required'),
  activity: z.string().min(1, 'Activity description is required'),
  method: z.string().min(1, 'Implementation method is required'),
  timeline: z.string().min(1, 'Timeline is required'),
  responsibleParty: z.string().min(1, 'Responsible party is required'),
});

type FormData = z.infer<typeof formSchema>;

interface ProjectActivityProps {
  initialData?: FormData | null;
  onSave: (data: FormData) => void;
}

export function ProjectActivity({ initialData, onSave }: ProjectActivityProps) {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData?.name || '',
      activity: initialData?.activity || '',
      method: initialData?.method || '',
      timeline: initialData?.timeline || '',
      responsibleParty: initialData?.responsibleParty || '',
    },
    mode: 'onChange'
  });

  const { register, handleSubmit, formState: { errors, isSubmitting } } = form;

  const handleFormSubmit = async (data: FormData) => {
    try {
      await onSave(data);
    } catch (error) {
      console.error('Error saving project activity:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <div className="border-b border-gray-200 pb-6">
        <h2 className="text-xl font-semibold text-gray-900">Project Activity</h2>
        <p className="mt-1 text-sm text-gray-500">
          Create a project activity that can be referenced in project sections.
        </p>
      </div>

      <FormField
        label="Activity Name"
        placeholder="Enter activity name"
        error={errors.name?.message}
        {...register("name")}
      />

      <TextArea
        label="Activity Description"
        placeholder="Describe the project activity"
        error={errors.activity?.message}
        {...register("activity")}
      />

      <TextArea
        label="Implementation Method"
        placeholder="Describe how the activity will be implemented"
        error={errors.method?.message}
        {...register("method")}
      />

      <FormField
        label="Timeline"
        placeholder="Specify the timeline for this activity"
        error={errors.timeline?.message}
        {...register("timeline")}
      />

      <FormField
        label="Responsible Party"
        placeholder="Who is responsible for this activity"
        error={errors.responsibleParty?.message}
        {...register("responsibleParty")}
      />

      <div className="flex justify-end pt-6">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : 'Save Activity'}
        </Button>
      </div>
    </form>
  );
} 