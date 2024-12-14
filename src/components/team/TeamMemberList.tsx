import React from 'react';
import { Edit2, Trash2, Mail, Phone } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import type { TeamMember } from '../../types/team';

interface TeamMemberListProps {
  members: TeamMember[];
  onEdit: (member: TeamMember) => void;
  onDelete: (member: TeamMember) => void;
}

export function TeamMemberList({ members, onEdit, onDelete }: TeamMemberListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {members.map((member) => (
        <Card key={member.id} className="p-6 hover:shadow-lg transition-shadow">
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{member.name}</h3>
                  <p className="text-sm text-gray-500">{member.title}</p>
                </div>
                {member.department && (
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-800">
                    {member.department}
                  </span>
                )}
              </div>
              {member.bio && (
                <p className="mt-2 text-sm text-gray-500 line-clamp-3">{member.bio}</p>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex items-center text-sm text-gray-500">
                <Mail className="h-4 w-4 mr-2" />
                <a
                  href={`mailto:${member.email}`}
                  className="hover:text-purple-600"
                >
                  {member.email}
                </a>
              </div>
              {member.phone && (
                <div className="flex items-center text-sm text-gray-500">
                  <Phone className="h-4 w-4 mr-2" />
                  <a
                    href={`tel:${member.phone}`}
                    className="hover:text-purple-600"
                  >
                    {member.phone}
                  </a>
                </div>
              )}
            </div>

            {member.roles && member.roles.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {member.roles.map((role) => (
                  <span
                    key={role.id}
                    className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800"
                  >
                    {role.name}
                  </span>
                ))}
              </div>
            )}

            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onEdit(member)}
              >
                <Edit2 className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onDelete(member)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      ))}
      {members.length === 0 && (
        <Card className="col-span-full p-6">
          <div className="text-center">
            <h3 className="text-lg font-medium text-gray-900">No team members found</h3>
            <p className="mt-1 text-sm text-gray-500">
              Get started by adding a new team member.
            </p>
          </div>
        </Card>
      )}
    </div>
  );
} 