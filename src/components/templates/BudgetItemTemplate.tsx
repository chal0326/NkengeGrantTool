import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FormField } from '../form/FormField';
import { TextArea } from '../form/TextArea';
import { Button } from '../ui/Button';
import { BudgetItemTemplate as BudgetItemTemplateType } from '../../types';

const formSchema = z.object({
  category: z.string().min(1, 'Category is required'),
  description: z.string().min(1, 'Description is required'),
  amount: z.number().positive('Amount must be positive'),
});

type FormData = z.infer<typeof formSchema>;

interface BudgetItemTemplateProps {
  initialData?: BudgetItemTemplateType | null;
  onSave: (data: BudgetItemTemplateType) => void;
}

const defaultValues: BudgetItemTemplateType = {
  type: 'budget_item',
  category: '',
  description: '',
  amount: 0,
};

export function BudgetItemTemplate({ initialData, onSave }: BudgetItemTemplateProps) {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || defaultValues,
  });

  const { register, handleSubmit, formState: { errors } } = form;

  const handleFormSubmit = (data: FormData) => {
    onSave({
      ...data,
      type: 'budget_item'
    } as BudgetItemTemplateType);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <div className="border-b border-gray-200 pb-6">
        <h2 className="text-xl font-semibold text-gray-900">Budget Item Template</h2>
        <p className="mt-1 text-sm text-gray-500">
          Create a reusable budget item template that can be referenced in financial templates.
        </p>
      </div>
      <FormField
        {...register("category")}
        label="Budget Category"
        placeholder="e.g., Personnel, Equipment, Travel"
        error={errors.category?.message}
      />
      <TextArea
        {...register("description")}
        label="Description"
        placeholder="Detailed description of the budget item"
        error={errors.description?.message}
      />
      <FormField
        {...register("amount")}
        label="Amount"
        type="number"
        placeholder="Enter amount in USD"
        error={errors.amount?.message}
      />

      <div className="flex justify-end pt-6">
        <Button type="submit">
          Save Budget Item Template
        </Button>
      </div>
    </form>
  );
} 