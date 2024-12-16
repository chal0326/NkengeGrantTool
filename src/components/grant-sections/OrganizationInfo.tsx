import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FormField } from '../form/FormField';
import { TextArea } from '../form/TextArea';
import { Button } from '../ui/Button';
import type { OrganizationInfoSection } from '../../types';

const formSchema = z.object({
  name: z.string().min(1, 'Organization name is required'),
  mission: z.string().min(1, 'Mission statement is required'),
  vision: z.string().min(1, 'Vision statement is required'),
  history: z.string().min(1, 'Organization history is required'),
});

type FormData = z.infer<typeof formSchema>;

interface OrganizationInfoProps {
  initialData?: Partial<OrganizationInfoSection> | null;
  onSave: (data: OrganizationInfoSection) => void;
}

export function OrganizationInfo({ initialData, onSave }: OrganizationInfoProps) {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData?.name || '',
      mission: initialData?.mission || '',
      vision: initialData?.vision || '',
      history: initialData?.history || '',
    },
    mode: 'onChange'
  });

  const { register, handleSubmit, formState: { errors, isSubmitting } } = form;

  const handleFormSubmit = async (data: FormData) => {
    try {
      await onSave({
        ...data,
        type: 'organization_info',
        staff_members: initialData?.staff_members || [],
      });
    } catch (error) {
      console.error('Error saving organization info:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <div className="border-b border-gray-200 pb-6">
        <h2 className="text-xl font-semibold text-gray-900">Organization Information</h2>
        <p className="mt-1 text-sm text-gray-500">
          Create a reusable organization information section that can be referenced in grant applications.
        </p>
      </div>

      <FormField
        label="Organization Name"
        placeholder="Enter organization name"
        error={errors.name?.message}
        {...register("name")}
      />

      <TextArea
        label="Mission Statement"
        placeholder="Enter your organization's mission statement"
        error={errors.mission?.message}
        {...register("mission")}
      />

      <TextArea
        label="Vision Statement"
        placeholder="Enter your organization's vision statement"
        error={errors.vision?.message}
        {...register("vision")}
      />

      <TextArea
        label="Organization History"
        placeholder="Describe your organization's history"
        error={errors.history?.message}
        {...register("history")}
      />

      <div className="flex justify-end pt-6">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : 'Save Organization Information'}
        </Button>
      </div>
    </form>
  );
} 