import React, { useState } from 'react';
import { useGrants } from '../hooks/useGrants';
import { GrantList } from '../components/grants/GrantList';
import { GrantCSVImport } from '../components/grants/GrantCSVImport';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Plus, Search as SearchIcon, Upload } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { grantSchema } from '../types/grant';
import type { GrantFormData } from '../types/grant';

type Mode = 'view' | 'create' | 'import';

export default function Grants() {
  const { grants, loading, error, addGrant, addGrants } = useGrants();
  const [mode, setMode] = useState<Mode>('view');
  const [searchTerm, setSearchTerm] = useState('');
  
  const { register, handleSubmit, formState: { errors } } = useForm<GrantFormData>({
    resolver: zodResolver(grantSchema),
    defaultValues: {
      status: 'identified',
      requirements: '',
      notes: '',
    },
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const filteredGrants = grants.filter(grant => 
    grant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    grant.organization.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const onSubmit = async (data: GrantFormData) => {
    const result = await addGrant(data);
    if (result) {
      setMode('view');
    }
  };

  const handleImport = async (grants: Partial<GrantFormData>[]) => {
    await addGrants(grants);
    setMode('view');
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Grants</h1>
        <div className="flex space-x-4">
          <Button onClick={() => setMode('import')}>
            <Upload className="w-4 h-4 mr-2" />
            Import CSV
          </Button>
          <Button onClick={() => setMode('create')}>
            <Plus className="w-4 h-4 mr-2" />
            Add Grant
          </Button>
        </div>
      </div>

      {mode === 'create' ? (
        <Card>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  {...register('name')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Organization</label>
                <input
                  type="text"
                  {...register('organization')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                />
                {errors.organization && (
                  <p className="mt-1 text-sm text-red-600">{errors.organization.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Amount</label>
                <input
                  type="number"
                  {...register('amount', { valueAsNumber: true })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                />
                {errors.amount && (
                  <p className="mt-1 text-sm text-red-600">{errors.amount.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Deadline</label>
                <input
                  type="date"
                  {...register('deadline')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                />
                {errors.deadline && (
                  <p className="mt-1 text-sm text-red-600">{errors.deadline.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Opportunity Number</label>
                <input
                  type="text"
                  {...register('opportunity_number')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">URL</label>
                <input
                  type="url"
                  {...register('opportunity_url')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Agency Code</label>
                <input
                  type="text"
                  {...register('agency_code')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Posted Date</label>
                <input
                  type="date"
                  {...register('posted_date')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                {...register('description')}
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Requirements</label>
              <textarea
                {...register('requirements')}
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Notes</label>
              <textarea
                {...register('notes')}
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Status</label>
              <select
                {...register('status')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              >
                <option value="identified">Identified</option>
                <option value="in_progress">In Progress</option>
                <option value="submitted">Submitted</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>

            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setMode('view')}
              >
                Cancel
              </Button>
              <Button type="submit">
                Save Grant
              </Button>
            </div>
          </form>
        </Card>
      ) : mode === 'import' ? (
        <GrantCSVImport
          onImport={handleImport}
          onCancel={() => setMode('view')}
        />
      ) : (
        <>
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search grants..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            />
          </div>
          <GrantList grants={filteredGrants} />
        </>
      )}
    </div>
  );
}