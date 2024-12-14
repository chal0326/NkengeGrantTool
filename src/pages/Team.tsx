import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Users, Briefcase, Building2, UserPlus } from 'lucide-react';
import { TeamMemberForm } from '../components/team/TeamMemberForm';
import { TeamMemberList } from '../components/team/TeamMemberList';
import { TeamFilters } from '../components/team/TeamFilters';
import { useTeam } from '../hooks/useTeam';
import type { TeamMember, TeamFilters as Filters } from '../types/team';

export default function Team() {
  const {
    members,
    roles,
    stats,
    loading,
    error,
    createMember,
    updateMember,
    deleteMember,
    filterMembers,
  } = useTeam();

  const [showForm, setShowForm] = useState(false);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [filters, setFilters] = useState<Filters>({});

  const handleSubmit = async (data: any) => {
    try {
      if (selectedMember) {
        await updateMember(selectedMember.id, {
          name: data.name,
          title: data.title,
          email: data.email,
          phone: data.phone,
          department: data.department,
          bio: data.bio,
          role_ids: data.role_ids,
        });
      } else {
        await createMember({
          name: data.name,
          title: data.title,
          email: data.email,
          phone: data.phone,
          department: data.department,
          bio: data.bio,
          role_ids: data.role_ids,
        });
      }
      setShowForm(false);
      setSelectedMember(null);
    } catch (error) {
      console.error('Error saving team member:', error);
    }
  };

  const handleEdit = (member: TeamMember) => {
    setSelectedMember(member);
    setShowForm(true);
  };

  const handleDelete = async (member: TeamMember) => {
    if (window.confirm('Are you sure you want to delete this team member?')) {
      try {
        await deleteMember(member.id);
      } catch (error) {
        console.error('Error deleting team member:', error);
      }
    }
  };

  const handleFilterChange = (newFilters: Filters) => {
    setFilters(newFilters);
    filterMembers(newFilters);
  };

  const resetFilters = () => {
    setFilters({});
    filterMembers({});
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Team</h1>
        <Button onClick={() => setShowForm(true)}>
          <UserPlus className="h-4 w-4 mr-2" />
          Add Team Member
        </Button>
      </div>

      {/* Team Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Total Members</p>
              <p className="text-2xl font-semibold">{stats.totalMembers}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <Briefcase className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Active in Projects</p>
              <p className="text-2xl font-semibold">{stats.activeInProjects}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Building2 className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Departments</p>
              <p className="text-2xl font-semibold">
                {Object.keys(stats.byDepartment).length}
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
              <p className="text-sm text-gray-500">Roles</p>
              <p className="text-2xl font-semibold">
                {Object.keys(stats.byRole).length}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Team Member Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-2xl">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                {selectedMember ? 'Edit Team Member' : 'Add Team Member'}
              </h2>
              <TeamMemberForm
                initialData={selectedMember || undefined}
                roles={roles}
                onSubmit={handleSubmit}
                onCancel={() => {
                  setShowForm(false);
                  setSelectedMember(null);
                }}
              />
            </div>
          </Card>
        </div>
      )}

      {/* Filters */}
      <TeamFilters
        roles={roles}
        filters={filters}
        onFilterChange={handleFilterChange}
        onReset={resetFilters}
      />

      {/* Team Member List */}
      <TeamMemberList
        members={members}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}
