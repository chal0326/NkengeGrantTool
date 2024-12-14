import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FormField } from '../form/FormField';
import { TextArea } from '../form/TextArea';
import { Button } from '../ui/Button';
import type { TeamMember, TeamMemberRole } from '../../types/team';

const teamMemberSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  title: z.string().min(1, 'Title is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  department: z.string().optional(),
  bio: z.string().optional(),
  role_ids: z.array(z.string()).min(1, 'At least one role is required'),
});

type TeamMemberFormData = z.infer<typeof teamMemberSchema>;

interface TeamMemberFormProps {
  initialData?: Partial<TeamMember>;
  roles: TeamMemberRole[];
  onSubmit: (data: TeamMemberFormData) => Promise<void>;
  onCancel: () => void;
}

export function TeamMemberForm({
  initialData,
  roles,
  onSubmit,
  onCancel,
}: TeamMemberFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TeamMemberFormData>({
    resolver: zodResolver(teamMemberSchema),
    defaultValues: {
      name: initialData?.name || '',
      title: initialData?.title || '',
      email: initialData?.email || '',
      phone: initialData?.phone || '',
      department: initialData?.department || '',
      bio: initialData?.bio || '',
      role_ids: initialData?.roles?.map((role) => role.id) || [],
    },
  });

  const handleFormSubmit = async (data: TeamMemberFormData) => {
    try {
      await onSubmit(data);
    } catch (error) {
      console.error('Error submitting team member:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          label="Name"
          error={errors.name?.message}
          {...register('name')}
        />

        <FormField
          label="Title"
          error={errors.title?.message}
          {...register('title')}
        />

        <FormField
          label="Email"
          type="email"
          error={errors.email?.message}
          {...register('email')}
        />

        <FormField
          label="Phone"
          error={errors.phone?.message}
          {...register('phone')}
        />

        <FormField
          label="Department"
          error={errors.department?.message}
          {...register('department')}
        />

        <div>
          <label className="block text-sm font-medium text-gray-700">Roles</label>
          <div className="mt-2 space-y-2">
            {roles.map((role) => (
              <div key={role.id} className="flex items-center">
                <input
                  type="checkbox"
                  id={`role-${role.id}`}
                  value={role.id}
                  className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                  {...register('role_ids')}
                />
                <label
                  htmlFor={`role-${role.id}`}
                  className="ml-2 block text-sm text-gray-900"
                >
                  {role.name}
                </label>
              </div>
            ))}
          </div>
          {errors.role_ids?.message && (
            <p className="mt-1 text-sm text-red-600">{errors.role_ids.message}</p>
          )}
        </div>
      </div>

      <TextArea
        label="Bio"
        error={errors.bio?.message}
        {...register('bio')}
      />

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