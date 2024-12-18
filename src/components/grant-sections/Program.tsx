import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FormField } from '../form/FormField';
import { TextArea } from '../form/TextArea';
import { Button } from '../ui/Button';

const formSchema = z.object({
  name: z.string().min(1, 'Program name is required'),
  description: z.string().min(1, 'Description is required'),
  impact: z.string().min(1, 'Impact statement is required'),
  artForms: z.array(z.string()).optional(),
  programTypes: z.array(z.string()).optional(),
});

type FormData = z.infer<typeof formSchema>;

interface ProgramProps {
  initialData?: FormData | null;
  onSave: (data: FormData) => void;
}

export function Program({ initialData, onSave }: ProgramProps) {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData?.name || '',
      description: initialData?.description || '',
      impact: initialData?.impact || '',
      artForms: initialData?.artForms || [],
      programTypes: initialData?.programTypes || [],
    },
    mode: 'onChange'
  });

  const { register, handleSubmit, formState: { errors, isSubmitting } } = form;

  const handleFormSubmit = async (data: FormData) => {
    try {
      await onSave(data);
    } catch (error) {
      console.error('Error saving program:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <div className="border-b border-gray-200 pb-6">
        <h2 className="text-xl font-semibold text-gray-900">Program Information</h2>
        <p className="mt-1 text-sm text-gray-500">
          Create a program section that can be used in grant applications.
        </p>
      </div>

      <FormField
        label="Program Name"
        placeholder="Enter program name"
        error={errors.name?.message}
        {...register("name")}
      />

      <TextArea
        label="Program Description"
        placeholder="Describe your program"
        error={errors.description?.message}
        {...register("description")}
      />

      <TextArea
        label="Program Impact"
        placeholder="Describe the impact of your program"
        error={errors.impact?.message}
        {...register("impact")}
      />

      <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-700">
          Art Forms
        </label>
        {form.watch('artForms')?.map((_, index) => (
          <FormField
            key={index}
            label={`Art Form ${index + 1}`}
            placeholder="Enter art form"
            error={errors.artForms?.[index]?.message}
            {...register(`artForms.${index}`)}
          />
        ))}
        <Button
          type="button"
          variant="outline"
          onClick={() => form.setValue('artForms', [...(form.watch('artForms') || []), ''])}
        >
          Add Art Form
        </Button>
      </div>

      <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-700">
          Program Types
        </label>
        {form.watch('programTypes')?.map((_, index) => (
          <FormField
            key={index}
            label={`Program Type ${index + 1}`}
            placeholder="Enter program type"
            error={errors.programTypes?.[index]?.message}
            {...register(`programTypes.${index}`)}
          />
        ))}
        <Button
          type="button"
          variant="outline"
          onClick={() => form.setValue('programTypes', [...(form.watch('programTypes') || []), ''])}
        >
          Add Program Type
        </Button>
      </div>

      <div className="flex justify-end pt-6">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : 'Save Program'}
        </Button>
      </div>
    </form>
  );
} 