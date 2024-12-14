import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { X } from 'lucide-react';
import type { Project } from '../../types/project';
import type { TeamMember } from '../../types/team';

interface ProjectTeamModalProps {
  project: Project;
  teamMembers: TeamMember[];
  onAssign: (teamMemberId: string, role: string) => Promise<void>;
  onRemove: (teamMemberId: string) => Promise<void>;
  onClose: () => void;
}

export function ProjectTeamModal({
  project,
  teamMembers,
  onAssign,
  onRemove,
  onClose,
}: ProjectTeamModalProps) {
  const [selectedMember, setSelectedMember] = useState('');
  const [role, setRole] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAssign = async () => {
    if (!selectedMember || !role) return;

    try {
      setIsSubmitting(true);
      await onAssign(selectedMember, role);
      setSelectedMember('');
      setRole('');
    } catch (error) {
      console.error('Error assigning team member:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRemove = async (teamMemberId: string) => {
    if (window.confirm('Are you sure you want to remove this team member?')) {
      try {
        await onRemove(teamMemberId);
      } catch (error) {
        console.error('Error removing team member:', error);
      }
    }
  };

  const availableMembers = teamMembers.filter(
    (member) => !project.team_members?.some((tm) => tm.team_member.id === member.id)
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Manage Team - {project.name}
            </h2>
            <Button variant="outline" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Add Team Member Form */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Add Team Member</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Team Member
                </label>
                <select
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md"
                  value={selectedMember}
                  onChange={(e) => setSelectedMember(e.target.value)}
                >
                  <option value="">Select a team member</option>
                  {availableMembers.map((member) => (
                    <option key={member.id} value={member.id}>
                      {member.name} - {member.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Role</label>
                <input
                  type="text"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md"
                  placeholder="Enter role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                />
              </div>
            </div>

            <div className="mt-4 flex justify-end">
              <Button
                onClick={handleAssign}
                disabled={!selectedMember || !role || isSubmitting}
              >
                {isSubmitting ? 'Adding...' : 'Add to Team'}
              </Button>
            </div>
          </div>

          {/* Current Team Members */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Current Team</h3>
            <div className="space-y-4">
              {project.team_members?.map((member) => (
                <div
                  key={member.team_member.id}
                  className="flex items-center justify-between p-4 bg-white border rounded-lg"
                >
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">
                      {member.team_member.name}
                    </h4>
                    <p className="text-sm text-gray-500">
                      {member.team_member.title} • {member.role}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleRemove(member.team_member.id)}
                  >
                    Remove
                  </Button>
                </div>
              ))}
              {(!project.team_members || project.team_members.length === 0) && (
                <p className="text-sm text-gray-500 text-center py-4">
                  No team members assigned yet
                </p>
              )}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
} 