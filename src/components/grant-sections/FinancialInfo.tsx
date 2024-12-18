import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FormField } from '../form/FormField';
import { TextArea } from '../form/TextArea';
import { Button } from '../ui/Button';

const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  budget_overview: z.string().min(1, 'Budget overview is required'),
  funding_sources: z.array(z.string()).min(1, 'At least one funding source is required'),
  expenses: z.array(z.object({
    category: z.string().min(1, 'Category is required'),
    amount: z.number().min(0, 'Amount must be greater than or equal to 0'),
    description: z.string().min(1, 'Description is required'),
  })).min(1, 'At least one expense is required'),
});

type FormData = z.infer<typeof formSchema>;

interface FinancialInfoProps {
  initialData?: FormData | null;
  onSave: (data: FormData) => void;
}

export function FinancialInfo({ initialData, onSave }: FinancialInfoProps) {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData?.name || '',
      budget_overview: initialData?.budget_overview || '',
      funding_sources: initialData?.funding_sources || [''],
      expenses: initialData?.expenses || [{ category: '', amount: 0, description: '' }],
    },
    mode: 'onChange'
  });

  const { register, handleSubmit, formState: { errors, isSubmitting } } = form;

  const handleFormSubmit = async (data: FormData) => {
    try {
      await onSave(data);
    } catch (error) {
      console.error('Error saving financial info:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <div className="border-b border-gray-200 pb-6">
        <h2 className="text-xl font-semibold text-gray-900">Financial Information</h2>
        <p className="mt-1 text-sm text-gray-500">
          Create a financial information section that can be used in grant applications.
        </p>
      </div>

      <FormField
        label="Section Name"
        placeholder="Enter section name"
        error={errors.name?.message}
        {...register("name")}
      />

      <TextArea
        label="Budget Overview"
        placeholder="Provide an overview of your budget"
        error={errors.budget_overview?.message}
        {...register("budget_overview")}
      />

      <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-700">
          Funding Sources
        </label>
        {form.watch('funding_sources').map((_, index) => (
          <FormField
            key={index}
            label={`Funding Source ${index + 1}`}
            placeholder="Enter funding source"
            error={errors.funding_sources?.[index]?.message}
            {...register(`funding_sources.${index}`)}
          />
        ))}
        <Button
          type="button"
          variant="outline"
          onClick={() => form.setValue('funding_sources', [...form.watch('funding_sources'), ''])}
        >
          Add Funding Source
        </Button>
      </div>

      <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-700">
          Expenses
        </label>
        {form.watch('expenses').map((_, index) => (
          <div key={index} className="space-y-4 p-4 bg-gray-50 rounded-lg">
            <FormField
              label="Category"
              placeholder="Enter expense category"
              error={errors.expenses?.[index]?.category?.message}
              {...register(`expenses.${index}.category`)}
            />
            <FormField
              label="Amount"
              type="number"
              step="0.01"
              placeholder="Enter amount"
              error={errors.expenses?.[index]?.amount?.message}
              {...register(`expenses.${index}.amount`, { valueAsNumber: true })}
            />
            <TextArea
              label="Description"
              placeholder="Describe this expense"
              error={errors.expenses?.[index]?.description?.message}
              {...register(`expenses.${index}.description`)}
            />
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          onClick={() => form.setValue('expenses', [...form.watch('expenses'), { category: '', amount: 0, description: '' }])}
        >
          Add Expense
        </Button>
      </div>

      <div className="flex justify-end pt-6">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : 'Save Financial Information'}
        </Button>
      </div>
    </form>
  );
} 