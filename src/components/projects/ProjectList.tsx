import React from 'react';
import { format } from 'date-fns';
import { Edit2, Trash2, Users } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import type { Project } from '../../types/project';

interface ProjectListProps {
  projects: Project[];
  onEdit: (project: Project) => void;
  onDelete: (project: Project) => void;
  onManageTeam: (project: Project) => void;
}

export function ProjectList({ projects, onEdit, onDelete, onManageTeam }: ProjectListProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const getStatusColor = (status: Project['status']) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'on_hold':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <Card key={project.id} className="p-6 hover:shadow-lg transition-shadow">
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-medium text-gray-900">{project.name}</h3>
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                    project.status
                  )}`}
                >
                  {project.status.replace('_', ' ').toUpperCase()}
                </span>
              </div>
              <p className="mt-1 text-sm text-gray-500">{project.description}</p>
            </div>

            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-500">Budget</span>
              <span className="font-medium">{formatCurrency(project.budget)}</span>
            </div>

            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-500">Timeline</span>
              <span className="font-medium">
                {format(new Date(project.start_date), 'MMM d, yyyy')} -{' '}
                {format(new Date(project.end_date), 'MMM d, yyyy')}
              </span>
            </div>

            {project.team_members && (
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <Users className="h-4 w-4" />
                <span>{project.team_members.length} team members</span>
              </div>
            )}

            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onManageTeam(project)}
              >
                Manage Team
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onEdit(project)}
              >
                <Edit2 className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onDelete(project)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      ))}
      {projects.length === 0 && (
        <Card className="col-span-full p-6">
          <div className="text-center">
            <h3 className="text-lg font-medium text-gray-900">No projects found</h3>
            <p className="mt-1 text-sm text-gray-500">
              Get started by creating a new project.
            </p>
          </div>
        </Card>
      )}
    </div>
  );
} 