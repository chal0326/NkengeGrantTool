import React, { useState } from 'react';
import { useGrants } from '../hooks/useGrants';
import { GrantList } from '../components/grants/GrantList';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Plus, Search as SearchIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const grantSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  organization: z.string().min(1, 'Organization is required'),
  amount: z.number().min(0, 'Amount must be positive'),
  deadline: z.string().min(1, 'Deadline is required'),
  description: z.string().min(1, 'Description is required'),
  requirements: z.string(),
  notes: z.string(),
  status: z.enum(['identified', 'in_progress', 'submitted', 'approved', 'rejected']),
});

type GrantFormData = z.infer<typeof grantSchema>;

export default function Grants() {
  const { grants, loading, error, addGrant } = useGrants();
  const [isCreating, setIsCreating] = useState(false);
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
      setIsCreating(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Grants</h1>
        <Button onClick={() => setIsCreating(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Grant
        </Button>
      </div>

      {isCreating ? (
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
                onClick={() => setIsCreating(false)}
              >
                Cancel
              </Button>
              <Button type="submit">
                Save Grant
              </Button>
            </div>
          </form>
        </Card>
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