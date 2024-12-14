import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '../ui/Button';
import { DemographicCategoryTemplate as DemographicCategoryTemplateType, TemplateType } from '../../types';

const formSchema = z.object({
  category: z.string().min(1, 'Category name is required'),
  description: z.string().min(1, 'Description is required'),
  collectionMethod: z.string().min(1, 'Collection method is required'),
});

type FormData = z.infer<typeof formSchema>;

interface DemographicCategoryTemplateProps {
  initialData?: DemographicCategoryTemplateType | null;
  onSave: (data: DemographicCategoryTemplateType) => void;
}

const defaultValues: FormData = {
  category: '',
  description: '',
  collectionMethod: '',
};

export function DemographicCategoryTemplate({ initialData, onSave }: DemographicCategoryTemplateProps) {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || defaultValues,
  });

  const { register, handleSubmit, formState: { errors } } = form;
  const handleFormSubmit = (data: FormData) => {
    onSave({
      ...data,
      type: 'demographic_category' as TemplateType,
    });
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <div className="border-b border-gray-200 pb-6">
        <h2 className="text-xl font-semibold text-gray-900">Demographic Category Template</h2>
        <p className="mt-1 text-sm text-gray-500">
          Create a reusable demographic category template that can be referenced in impact templates.
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Category Name</label>
        <input
          {...register('category')}
          className="mt-1 shadow-sm focus:ring-purple-500 focus:border-purple-500 block w-full sm:text-sm border-gray-300 rounded-md"
          placeholder="e.g., Age Groups, Gender Identity, Race/Ethnicity"
        />
        {errors.category?.message && (
          <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          {...register('description')}
          rows={3}
          className="mt-1 shadow-sm focus:ring-purple-500 focus:border-purple-500 block w-full sm:text-sm border border-gray-300 rounded-md"
          placeholder="Describe what this demographic category measures and why it's important"
        />
        {errors.description?.message && (
          <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Collection Method</label>
        <textarea
          {...register('collectionMethod')}
          rows={3}
          className="mt-1 shadow-sm focus:ring-purple-500 focus:border-purple-500 block w-full sm:text-sm border border-gray-300 rounded-md"
          placeholder="Describe how this demographic data will be collected"
        />
        {errors.collectionMethod?.message && (
          <p className="mt-1 text-sm text-red-600">{errors.collectionMethod.message}</p>
        )}
      </div>

      <div className="flex justify-end pt-6">
        <Button type="submit">
          Save Demographic Category Template
        </Button>
      </div>
    </form>
  );
} 