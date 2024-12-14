import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FormField } from '../form/FormField';
import { TextArea } from '../form/TextArea';
import { Button } from '../ui/Button';
import type { StaffMemberSection as StaffMemberSectionType } from '../../types';

const formSchema = z.object({
  name: z.string().min(1, 'Staff member name is required'),
  title: z.string().min(1, 'Title is required'),
  bio: z.string().min(1, 'Bio is required'),
  email: z.string().email('Valid email is required'),
});

type FormData = z.infer<typeof formSchema>;

interface StaffMemberSectionProps {
  initialData?: StaffMemberSectionType | null;
  onSave: (data: StaffMemberSectionType) => void;
}

const defaultValues: StaffMemberSectionType = {
  type: 'staff_member',
  name: '',
  title: '',
  bio: '',
  email: '',
};

export function StaffMemberSection({ initialData, onSave }: StaffMemberSectionProps) {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || defaultValues,
    mode: 'onChange'
  });

  const { register, handleSubmit, formState: { errors, isSubmitting } } = form;

  const handleFormSubmit = async (data: FormData) => {
    try {
      await onSave({
        ...data,
        type: 'staff_member',
      });
    } catch (error) {
      console.error('Error saving staff member section:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <div className="border-b border-gray-200 pb-6">
        <h2 className="text-xl font-semibold text-gray-900">Staff Member Information</h2>
        <p className="mt-1 text-sm text-gray-500">
          Create a reusable staff member section that can be referenced in organization and project sections.
        </p>
      </div>
      <FormField
        label="Staff Member Name"
        placeholder="Enter the staff member's full name"
        error={errors.name?.message}
        {...register("name")}
      />
      <FormField
        label="Title/Position"
        placeholder="Enter the staff member's title or position"
        error={errors.title?.message}
        {...register("title")}
      />
      <FormField
        label="Email Address"
        type="email"
        placeholder="Enter the staff member's email address"
        error={errors.email?.message}
        {...register("email")}
      />
      <TextArea
        label="Biography"
        placeholder="Enter the staff member's biography and qualifications"
        error={errors.bio?.message}
        {...register("bio")}
      />

      <div className="flex justify-end pt-6">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : 'Save Staff Member Information'}
        </Button>
      </div>
    </form>
  );
} 