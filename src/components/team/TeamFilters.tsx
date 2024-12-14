import React from 'react';
import { Button } from '../ui/Button';
import { FormField } from '../form/FormField';
import type { TeamFilters, TeamMemberRole } from '../../types/team';

interface TeamFiltersProps {
  roles: TeamMemberRole[];
  filters: TeamFilters;
  onFilterChange: (filters: TeamFilters) => void;
  onReset: () => void;
}

export function TeamFilters({
  roles,
  filters,
  onFilterChange,
  onReset,
}: TeamFiltersProps) {
  const handleChange = (field: keyof TeamFilters, value: any) => {
    onFilterChange({
      ...filters,
      [field]: value,
    });
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <FormField
          label="Search"
          type="text"
          placeholder="Search by name or email"
          value={filters.searchQuery || ''}
          onChange={(e) => handleChange('searchQuery', e.target.value)}
        />

        <div>
          <label className="block text-sm font-medium text-gray-700">Role</label>
          <select
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md"
            value={filters.roleId || ''}
            onChange={(e) => handleChange('roleId', e.target.value)}
          >
            <option value="">All Roles</option>
            {roles.map((role) => (
              <option key={role.id} value={role.id}>
                {role.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Department</label>
          <select
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md"
            value={filters.department || ''}
            onChange={(e) => handleChange('department', e.target.value)}
          >
            <option value="">All Departments</option>
            <option value="Administration">Administration</option>
            <option value="Programs">Programs</option>
            <option value="Finance">Finance</option>
            <option value="Development">Development</option>
            <option value="Marketing">Marketing</option>
          </select>
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <Button variant="outline" onClick={onReset}>
          Reset Filters
        </Button>
      </div>
    </div>
  );
} 