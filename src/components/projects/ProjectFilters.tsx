import React from 'react';
import { Button } from '../ui/Button';
import { FormField } from '../form/FormField';
import type { ProjectFilters, ProjectStatus } from '../../types/project';

interface ProjectFiltersProps {
  filters: ProjectFilters;
  onFilterChange: (filters: ProjectFilters) => void;
  onReset: () => void;
}

export function ProjectFilters({
  filters,
  onFilterChange,
  onReset,
}: ProjectFiltersProps) {
  const handleChange = (field: keyof ProjectFilters, value: any) => {
    onFilterChange({
      ...filters,
      [field]: value,
    });
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Status</label>
          <select
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md"
            value={filters.status || ''}
            onChange={(e) => handleChange('status', e.target.value as ProjectStatus)}
          >
            <option value="">All Statuses</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
            <option value="on_hold">On Hold</option>
          </select>
        </div>

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

        <FormField
          label="Min Budget"
          type="number"
          step="0.01"
          value={filters.minBudget || ''}
          onChange={(e) => handleChange('minBudget', e.target.value ? Number(e.target.value) : undefined)}
        />

        <FormField
          label="Max Budget"
          type="number"
          step="0.01"
          value={filters.maxBudget || ''}
          onChange={(e) => handleChange('maxBudget', e.target.value ? Number(e.target.value) : undefined)}
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