import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FormField } from '../form/FormField';
import { TextArea } from '../form/TextArea';
import { Button } from '../ui/Button';
import { StaffMemberTemplate as StaffMemberTemplateType } from '../../types';

const formSchema = z.object({
  name: z.string().min(1, 'Staff member name is required'),
  title: z.string().min(1, 'Title is required'),
  bio: z.string().min(1, 'Bio is required'),
  email: z.string().email('Valid email is required'),
});

type FormData = z.infer<typeof formSchema>;

interface StaffMemberTemplateProps {
  initialData?: StaffMemberTemplateType | null;
  onSave: (data: StaffMemberTemplateType) => void;
}

const defaultValues: StaffMemberTemplateType = {
  type: 'staff_member',
  name: '',
  title: '',
  bio: '',
  email: '',
};

export function StaffMemberTemplate({ initialData, onSave }: StaffMemberTemplateProps) {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || defaultValues,
  });

  const { register, handleSubmit, formState: { errors } } = form;

  const handleFormSubmit = (data: FormData) => {
    onSave({
      ...data,
      type: 'staff_member'
    } as StaffMemberTemplateType);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <div className="border-b border-gray-200 pb-6">
        <h2 className="text-xl font-semibold text-gray-900">Staff Member Template</h2>
        <p className="mt-1 text-sm text-gray-500">
          Create a reusable staff member template that can be referenced in organization and project templates.
        </p>
      </div>
      <FormField
        {...register("name")}
        label="Staff Member Name"
        placeholder="Enter the staff member's full name"
        error={errors.name?.message}
      />
      <FormField
        {...register("title")}
        label="Title/Position"
        placeholder="Enter the staff member's title or position"
        error={errors.title?.message}
      />
      <FormField
        {...register("email")}
        label="Email Address"
        type="email"
        placeholder="Enter the staff member's email address"
        error={errors.email?.message}
      />
      <TextArea
        {...register("bio")}
        label="Biography"
        placeholder="Enter the staff member's biography and qualifications"
        error={errors.bio?.message}
      />

      <div className="flex justify-end pt-6">
        <Button type="submit">
          Save Staff Member Template
        </Button>
      </div>
    </form>
  );
} 