import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FormField } from '../form/FormField';
import { TextArea } from '../form/TextArea';
import { Button } from '../ui/Button';
import { CommunityPartnershipTemplate as CommunityPartnershipTemplateType } from '../../types';

const formSchema = z.object({
  partner: z.string().min(1, 'Partner name is required'),
  role: z.string().min(1, 'Partner role is required'),
  contribution: z.string().min(1, 'Partner contribution is required'),
});

type FormData = z.infer<typeof formSchema>;

interface CommunityPartnershipTemplateProps {
  initialData?: CommunityPartnershipTemplateType | null;
  onSave: (data: CommunityPartnershipTemplateType) => void;
}

const defaultValues: CommunityPartnershipTemplateType = {
  type: 'community_partnership',
  partner: '',
  role: '',
  contribution: '',
};

export function CommunityPartnershipTemplate({ initialData, onSave }: CommunityPartnershipTemplateProps) {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || defaultValues,
  });

  const { register, handleSubmit, formState: { errors } } = form;

  const handleFormSubmit = (data: FormData) => {
    onSave({
      ...data,
      type: 'community_partnership'
    } as CommunityPartnershipTemplateType);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <div className="border-b border-gray-200 pb-6">
        <h2 className="text-xl font-semibold text-gray-900">Community Partnership Template</h2>
        <p className="mt-1 text-sm text-gray-500">
          Create a reusable community partnership template that can be referenced in impact templates.
        </p>
      </div>
      <FormField
        {...register("partner")}
        label="Partner Organization"
        placeholder="Enter the name of the partner organization"
        error={errors.partner?.message}
      />
      <TextArea
        {...register("role")}
        label="Partner Role"
        placeholder="Describe the partner's role in the project"
        error={errors.role?.message}
      />
      <TextArea
        {...register("contribution")}
        label="Partner Contribution"
        placeholder="Describe how this partner contributes to the project's impact"
        error={errors.contribution?.message}
      />

      <div className="flex justify-end pt-6">
        <Button type="submit">
          Save Community Partnership Template
        </Button>
      </div>
    </form>
  );
} 