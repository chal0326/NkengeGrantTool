import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FormField } from '../form/FormField';
import { TextArea } from '../form/TextArea';
import { Button } from '../ui/Button';

const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  partner: z.string().min(1, 'Partner name is required'),
  role: z.string().min(1, 'Role is required'),
  contribution: z.string().min(1, 'Contribution is required'),
});

type FormData = z.infer<typeof formSchema>;

interface CommunityPartnershipProps {
  initialData?: FormData | null;
  onSave: (data: FormData) => void;
}

export function CommunityPartnership({ initialData, onSave }: CommunityPartnershipProps) {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData?.name || '',
      partner: initialData?.partner || '',
      role: initialData?.role || '',
      contribution: initialData?.contribution || '',
    },
    mode: 'onChange'
  });

  const { register, handleSubmit, formState: { errors, isSubmitting } } = form;

  const handleFormSubmit = async (data: FormData) => {
    try {
      await onSave(data);
    } catch (error) {
      console.error('Error saving community partnership:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <div className="border-b border-gray-200 pb-6">
        <h2 className="text-xl font-semibold text-gray-900">Community Partnership</h2>
        <p className="mt-1 text-sm text-gray-500">
          Create a community partnership section that can be used in grant applications.
        </p>
      </div>

      <FormField
        label="Section Name"
        placeholder="Enter section name"
        error={errors.name?.message}
        {...register("name")}
      />

      <FormField
        label="Partner Name"
        placeholder="Enter partner organization name"
        error={errors.partner?.message}
        {...register("partner")}
      />

      <FormField
        label="Partner Role"
        placeholder="Enter partner's role in the project"
        error={errors.role?.message}
        {...register("role")}
      />

      <TextArea
        label="Partner Contribution"
        placeholder="Describe the partner's contribution to the project"
        error={errors.contribution?.message}
        {...register("contribution")}
      />

      <div className="flex justify-end pt-6">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : 'Save Partnership'}
        </Button>
      </div>
    </form>
  );
} 