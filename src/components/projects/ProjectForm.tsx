import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FormField } from '../form/FormField';
import { TextArea } from '../form/TextArea';
import { Button } from '../ui/Button';
import { useTeam } from '../../hooks/useTeam';
import type { Project, ProjectStatus } from '../../types/project';
import type { TeamMember } from '../../types/team';

const projectSchema = z.object({
  name: z.string().min(1, 'Project name is required'),
  description: z.string().min(1, 'Description is required'),
  status: z.enum(['active', 'completed', 'on_hold'] as const),
  start_date: z.string().min(1, 'Start date is required'),
  end_date: z.string().min(1, 'End date is required'),
  budget: z.number().min(0, 'Budget must be greater than or equal to 0'),
  grant_id: z.string().optional(),
  team_members: z.array(z.object({
    id: z.string(),
    role: z.string().min(1, 'Role is required')
  }))
});

type ProjectFormData = z.infer<typeof projectSchema>;

interface ProjectFormProps {
  initialData?: Partial<Project>;
  onSubmit: (data: ProjectFormData) => Promise<void>;
  onCancel: () => void;
}

export function ProjectForm({ initialData, onSubmit, onCancel }: ProjectFormProps) {
  const { members } = useTeam();
  const [selectedMembers, setSelectedMembers] = React.useState<Array<{ id: string; role: string }>>([]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch
  } = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: initialData?.name || '',
      description: initialData?.description || '',
      status: initialData?.status || 'active',
      start_date: initialData?.start_date || new Date().toISOString().split('T')[0],
      end_date: initialData?.end_date || '',
      budget: initialData?.budget || 0,
      grant_id: initialData?.grant_id,
      team_members: initialData?.team_members?.map(tm => ({
        id: tm.team_member.id,
        role: tm.role
      })) || []
    },
  });

  const handleAddTeamMember = () => {
    const newMember = { id: '', role: '' };
    setSelectedMembers([...selectedMembers, newMember]);
    setValue('team_members', [...selectedMembers, newMember]);
  };

  const handleRemoveTeamMember = (index: number) => {
    const updatedMembers = selectedMembers.filter((_, i) => i !== index);
    setSelectedMembers(updatedMembers);
    setValue('team_members', updatedMembers);
  };

  const handleTeamMemberChange = (index: number, field: 'id' | 'role', value: string) => {
    const updatedMembers = [...selectedMembers];
    updatedMembers[index] = {
      ...updatedMembers[index],
      [field]: value
    };
    setSelectedMembers(updatedMembers);
    setValue('team_members', updatedMembers);
  };

  const handleFormSubmit = async (data: ProjectFormData) => {
    try {
      await onSubmit(data);
    } catch (error) {
      console.error('Error submitting project:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <FormField
        label="Project Name"
        error={errors.name?.message}
        {...register('name')}
        className="border border-gray-300 rounded-md shadow-sm"
      />

      <TextArea
        label="Description"
        error={errors.description?.message}
        {...register('description')}
        className="border border-gray-300 rounded-md shadow-sm"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Status</label>
          <select
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md shadow-sm"
            {...register('status')}
          >
            <option value="active">Active</option>
            <option value="completed">Completed</option>
            <option value="on_hold">On Hold</option>
          </select>
          {errors.status?.message && (
            <p className="mt-1 text-sm text-red-600">{errors.status.message}</p>
          )}
        </div>

        <FormField
          label="Budget"
          type="number"
          step="0.01"
          error={errors.budget?.message}
          {...register('budget', { valueAsNumber: true })}
          className="border border-gray-300 rounded-md shadow-sm"
        />

        <FormField
          label="Start Date"
          type="date"
          error={errors.start_date?.message}
          {...register('start_date')}
          className="border border-gray-300 rounded-md shadow-sm"
        />

        <FormField
          label="End Date"
          type="date"
          error={errors.end_date?.message}
          {...register('end_date')}
          className="border border-gray-300 rounded-md shadow-sm"
        />
      </div>

      {/* Team Members Section */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-900">Team Members</h3>
          <Button
            type="button"
            variant="outline"
            onClick={handleAddTeamMember}
          >
            Add Team Member
          </Button>
        </div>

        {selectedMembers.map((member, index) => (
          <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
            <div>
              <label className="block text-sm font-medium text-gray-700">Team Member</label>
              <select
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md shadow-sm"
                value={member.id}
                onChange={(e) => handleTeamMemberChange(index, 'id', e.target.value)}
              >
                <option value="">Select a team member</option>
                {members.map((tm) => (
                  <option key={tm.id} value={tm.id}>
                    {tm.name} - {tm.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Role in Project</label>
              <input
                type="text"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md shadow-sm"
                placeholder="Enter role (e.g. Project Manager)"
                value={member.role}
                onChange={(e) => handleTeamMemberChange(index, 'role', e.target.value)}
              />
            </div>

            <div className="flex items-end">
              <Button
                type="button"
                variant="outline"
                onClick={() => handleRemoveTeamMember(index)}
                className="text-red-600 hover:text-red-700"
              >
                Remove
              </Button>
            </div>
          </div>
        ))}
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