import React from 'react';
import { useFormContext } from 'react-hook-form';
import type { GrantFormData } from '../../types/grant';

const AdditionalInfo: React.FC = () => {
  const { register } = useFormContext<GrantFormData>();

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Additional Information</h2>
      <div className="grid grid-cols-1 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Grant Type
          </label>
          <select
            {...register('type')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="identified">Identified</option>
            <option value="in_progress">In Progress</option>
            <option value="submitted">Submitted</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Opportunity Status
          </label>
          <input
            type="text"
            {...register('opportunity_status')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
      </div>
    </div>
  );
};

export default AdditionalInfo; 