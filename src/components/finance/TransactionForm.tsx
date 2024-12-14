import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FormField } from '../form/FormField';
import { Button } from '../ui/Button';
import type { FinancialTransaction, TransactionCategory } from '../../types/finance';

const transactionSchema = z.object({
  date: z.string().min(1, 'Date is required'),
  description: z.string().min(1, 'Description is required'),
  amount: z.number().min(0.01, 'Amount must be greater than 0'),
  type: z.enum(['income', 'expense']),
  category_id: z.string().min(1, 'Category is required'),
  grant_id: z.string().optional(),
  project_id: z.string().optional(),
});

type TransactionFormData = z.infer<typeof transactionSchema>;

interface TransactionFormProps {
  initialData?: Partial<FinancialTransaction>;
  categories: TransactionCategory[];
  onSubmit: (data: TransactionFormData) => Promise<void>;
  onCancel: () => void;
}

export function TransactionForm({ initialData, categories, onSubmit, onCancel }: TransactionFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TransactionFormData>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      date: initialData?.date || new Date().toISOString().split('T')[0],
      description: initialData?.description || '',
      amount: initialData?.amount || 0,
      type: initialData?.type || 'expense',
      category_id: initialData?.category_id || '',
      grant_id: initialData?.grant_id,
      project_id: initialData?.project_id,
    },
  });

  const handleFormSubmit = async (data: TransactionFormData) => {
    try {
      await onSubmit(data);
    } catch (error) {
      console.error('Error submitting transaction:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          label="Date"
          type="date"
          error={errors.date?.message}
          {...register('date')}
        />

        <FormField
          label="Amount"
          type="number"
          step="0.01"
          error={errors.amount?.message}
          {...register('amount', { valueAsNumber: true })}
        />

        <div className="col-span-full">
          <FormField
            label="Description"
            error={errors.description?.message}
            {...register('description')}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Type</label>
          <select
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md"
            {...register('type')}
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
          {errors.type?.message && (
            <p className="mt-1 text-sm text-red-600">{errors.type.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <select
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md"
            {...register('category_id')}
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          {errors.category_id?.message && (
            <p className="mt-1 text-sm text-red-600">{errors.category_id.message}</p>
          )}
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : initialData ? 'Update' : 'Create'}
        </Button>
      </div>
    </form>
  );
} 