import React from 'react';
import { Button } from '../ui/Button';
import { FormField } from '../form/FormField';
import type { TransactionCategory, TransactionFilters } from '../../types/finance';

interface TransactionFiltersProps {
  categories: TransactionCategory[];
  filters: TransactionFilters;
  onFilterChange: (filters: TransactionFilters) => void;
  onReset: () => void;
}

export function TransactionFilters({
  categories,
  filters,
  onFilterChange,
  onReset,
}: TransactionFiltersProps) {
  const handleChange = (field: keyof TransactionFilters, value: any) => {
    onFilterChange({
      ...filters,
      [field]: value,
    });
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <FormField
          label="Start Date"
          type="date"
          value={filters.startDate || ''}
          onChange={(e) => handleChange('startDate', e.target.value)}
        />

        <FormField
          label="End Date"
          type="date"
          value={filters.endDate || ''}
          onChange={(e) => handleChange('endDate', e.target.value)}
        />

        <div>
          <label className="block text-sm font-medium text-gray-700">Type</label>
          <select
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md"
            value={filters.type || ''}
            onChange={(e) => handleChange('type', e.target.value)}
          >
            <option value="">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <select
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md"
            value={filters.categoryId || ''}
            onChange={(e) => handleChange('categoryId', e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <FormField
          label="Min Amount"
          type="number"
          step="0.01"
          value={filters.minAmount || ''}
          onChange={(e) => handleChange('minAmount', e.target.value ? Number(e.target.value) : undefined)}
        />

        <FormField
          label="Max Amount"
          type="number"
          step="0.01"
          value={filters.maxAmount || ''}
          onChange={(e) => handleChange('maxAmount', e.target.value ? Number(e.target.value) : undefined)}
        />
      </div>

      <div className="flex justify-end space-x-4">
        <Button variant="outline" onClick={onReset}>
          Reset Filters
        </Button>
      </div>
    </div>
  );
} 