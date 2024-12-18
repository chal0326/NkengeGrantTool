import React from 'react';
import { useFormContext } from 'react-hook-form';
import type { GrantFormData } from '../../types/grant';

const FinancialInfo: React.FC = () => {
  const { register } = useFormContext<GrantFormData>();

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Financial Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Grant Amount ($)
          </label>
          <input
            type="number"
            {...register('amount', { valueAsNumber: true })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Application Deadline
          </label>
          <input
            type="date"
            {...register('deadline')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Posted Date
          </label>
          <input
            type="date"
            {...register('posted_date')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Close Date
          </label>
          <input
            type="date"
            {...register('close_date')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
      </div>
    </div>
  );
};

export default FinancialInfo; 