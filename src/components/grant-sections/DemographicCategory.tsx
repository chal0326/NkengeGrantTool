import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FormField } from '../form/FormField';
import { TextArea } from '../form/TextArea';
import { Button } from '../ui/Button';

const formSchema = z.object({
  name: z.string().min(1, 'Category name is required'),
  category: z.string().min(1, 'Category is required'),
  description: z.string().min(1, 'Description is required'),
  collectionMethod: z.string().min(1, 'Collection method is required'),
});

type FormData = z.infer<typeof formSchema>;

interface DemographicCategoryProps {
  initialData?: FormData | null;
  onSave: (data: FormData) => void;
}

export function DemographicCategory({ initialData, onSave }: DemographicCategoryProps) {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData?.name || '',
      category: initialData?.category || '',
      description: initialData?.description || '',
      collectionMethod: initialData?.collectionMethod || '',
    },
    mode: 'onChange'
  });

  const { register, handleSubmit, formState: { errors, isSubmitting } } = form;

  const handleFormSubmit = async (data: FormData) => {
    try {
      await onSave(data);
    } catch (error) {
      console.error('Error saving demographic category:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <div className="border-b border-gray-200 pb-6">
        <h2 className="text-xl font-semibold text-gray-900">Demographic Category</h2>
        <p className="mt-1 text-sm text-gray-500">
          Define demographic categories for tracking program participants and impact.
        </p>
      </div>

      <FormField
        label="Category Name"
        placeholder="Enter category name"
        error={errors.name?.message}
        {...register("name")}
      />

      <FormField
        label="Category Type"
        placeholder="Enter category type (e.g., Age, Gender, Race/Ethnicity)"
        error={errors.category?.message}
        {...register("category")}
      />

      <TextArea
        label="Description"
        placeholder="Describe this demographic category"
        error={errors.description?.message}
        {...register("description")}
      />

      <TextArea
        label="Collection Method"
        placeholder="Describe how this data will be collected"
        error={errors.collectionMethod?.message}
        {...register("collectionMethod")}
      />

      <div className="flex justify-end pt-6">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : 'Save Category'}
        </Button>
      </div>
    </form>
  );
} 