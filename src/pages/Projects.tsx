import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Briefcase, Calendar, DollarSign, Users } from 'lucide-react';
import { ProjectForm } from '../components/projects/ProjectForm';
import { ProjectList } from '../components/projects/ProjectList';
import { ProjectFilters } from '../components/projects/ProjectFilters';
import { ProjectTeamModal } from '../components/projects/ProjectTeamModal';
import { useProjects } from '../hooks/useProjects';
import { useTeam } from '../hooks/useTeam';
import type { Project, ProjectFilters as Filters } from '../types/project';

export default function Projects() {
  const {
    projects,
    stats,
    loading: projectsLoading,
    error: projectsError,
    createProject,
    updateProject,
    deleteProject,
    filterProjects,
    assignTeamMember,
    removeTeamMember,
  } = useProjects();

  const {
    members: teamMembers,
    loading: teamLoading,
    error: teamError,
  } = useTeam();

  const [showForm, setShowForm] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showTeamModal, setShowTeamModal] = useState(false);
  const [filters, setFilters] = useState<Filters>({});

  const handleSubmit = async (data: Omit<Project, 'id' | 'created_at' | 'updated_at'> & { team_members: Array<{ id: string; role: string }> }) => {
    try {
      if (selectedProject) {
        await updateProject(selectedProject.id, data);
      } else {
        await createProject(data);
      }
      setShowForm(false);
      setSelectedProject(null);
    } catch (error) {
      console.error('Error saving project:', error);
    }
  };

  const handleEdit = (project: Project) => {
    setSelectedProject(project);
    setShowForm(true);
  };

  const handleDelete = async (project: Project) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await deleteProject(project.id);
      } catch (error) {
        console.error('Error deleting project:', error);
      }
    }
  };

  const handleManageTeam = (project: Project) => {
    setSelectedProject(project);
    setShowTeamModal(true);
  };

  const handleFilterChange = (newFilters: Filters) => {
    setFilters(newFilters);
    filterProjects(newFilters);
  };

  const resetFilters = () => {
    setFilters({});
    filterProjects({});
  };

  if (projectsLoading || teamLoading) return <div>Loading...</div>;
  if (projectsError) return <div>Error: {projectsError.message}</div>;
  if (teamError) return <div>Error: {teamError.message}</div>;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Projects</h1>
        <Button onClick={() => setShowForm(true)}>New Project</Button>
      </div>

      {/* Project Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Briefcase className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Total Projects</p>
              <p className="text-2xl font-semibold">{stats.totalProjects}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <Calendar className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Active Projects</p>
              <p className="text-2xl font-semibold">{stats.activeProjects}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <DollarSign className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Total Budget</p>
              <p className="text-2xl font-semibold">
                {new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD',
                }).format(stats.totalBudget)}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Users className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Avg Budget</p>
              <p className="text-2xl font-semibold">
                {new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD',
                }).format(stats.averageBudget)}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Project Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-2xl">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                {selectedProject ? 'Edit Project' : 'New Project'}
              </h2>
              <ProjectForm
                initialData={selectedProject || undefined}
                onSubmit={handleSubmit}
                onCancel={() => {
                  setShowForm(false);
                  setSelectedProject(null);
                }}
              />
            </div>
          </Card>
        </div>
      )}

      {/* Team Management Modal */}
      {showTeamModal && selectedProject && (
        <ProjectTeamModal
          project={selectedProject}
          teamMembers={teamMembers}
          onAssign={async (teamMemberId, role) => {
            await assignTeamMember(selectedProject.id, teamMemberId, role);
          }}
          onRemove={async (teamMemberId) => {
            await removeTeamMember(selectedProject.id, teamMemberId);
          }}
          onClose={() => {
            setShowTeamModal(false);
            setSelectedProject(null);
          }}
        />
      )}

      {/* Filters */}
      <ProjectFilters
        filters={filters}
        onFilterChange={handleFilterChange}
        onReset={resetFilters}
      />

      {/* Project List */}
      <ProjectList
        projects={projects}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onManageTeam={handleManageTeam}
      />
    </div>
  );
}
