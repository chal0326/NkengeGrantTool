import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FormField } from '../form/FormField';
import { TextArea } from '../form/TextArea';
import { Button } from '../ui/Button';

const formSchema = z.object({
  name: z.string().min(1, 'Item name is required'),
  category: z.string().min(1, 'Category is required'),
  description: z.string().min(1, 'Description is required'),
  amount: z.number().min(0, 'Amount must be greater than or equal to 0'),
});

type FormData = z.infer<typeof formSchema>;

interface BudgetItemProps {
  initialData?: FormData | null;
  onSave: (data: FormData) => void;
}

export function BudgetItem({ initialData, onSave }: BudgetItemProps) {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData?.name || '',
      category: initialData?.category || '',
      description: initialData?.description || '',
      amount: initialData?.amount || 0,
    },
    mode: 'onChange'
  });

  const { register, handleSubmit, formState: { errors, isSubmitting } } = form;

  const handleFormSubmit = async (data: FormData) => {
    try {
      await onSave(data);
    } catch (error) {
      console.error('Error saving budget item:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <div className="border-b border-gray-200 pb-6">
        <h2 className="text-xl font-semibold text-gray-900">Budget Item</h2>
        <p className="mt-1 text-sm text-gray-500">
          Create a budget item that can be used in grant applications.
        </p>
      </div>

      <FormField
        label="Item Name"
        placeholder="Enter item name"
        error={errors.name?.message}
        {...register("name")}
      />

      <FormField
        label="Category"
        placeholder="Enter budget category"
        error={errors.category?.message}
        {...register("category")}
      />

      <TextArea
        label="Description"
        placeholder="Describe this budget item"
        error={errors.description?.message}
        {...register("description")}
      />

      <FormField
        label="Amount"
        type="number"
        step="0.01"
        placeholder="Enter amount"
        error={errors.amount?.message}
        {...register("amount", { valueAsNumber: true })}
      />

      <div className="flex justify-end pt-6">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : 'Save Budget Item'}
        </Button>
      </div>
    </form>
  );
} 