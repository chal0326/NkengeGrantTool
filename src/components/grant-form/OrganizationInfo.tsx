import React from 'react';
import { useFormContext } from 'react-hook-form';
import type { GrantFormData } from '../../types/grant';

const OrganizationInfo: React.FC = () => {
  const { register } = useFormContext<GrantFormData>();

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Organization Information</h2>
      <div className="grid grid-cols-1 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Organization Name
          </label>
          <input
            type="text"
            {...register('organization')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Grant Name/Title
          </label>
          <input
            type="text"
            {...register('name')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Opportunity Number
          </label>
          <input
            type="text"
            {...register('opportunity_number')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Agency Code
          </label>
          <input
            type="text"
            {...register('agency_code')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
      </div>
    </div>
  );
};

export default OrganizationInfo; 