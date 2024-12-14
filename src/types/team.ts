import type { ProjectTeamAssignment } from './project';

export interface TeamMember {
  id: string;
  name: string;
  title: string;
  email: string;
  phone?: string;
  department?: string;
  bio?: string;
  created_at: string;
  updated_at: string;

  // Joined fields
  roles?: TeamMemberRole[];
  projects?: ProjectTeamAssignment[];
}

export interface TeamMemberRole {
  id: string;
  name: string;
  description?: string;
  created_at: string;
}

export interface TeamMemberRoleAssignment {
  team_member_id: string;
  role_id: string;
  created_at: string;
}

export interface TeamMemberAssignment {
  team_member: TeamMember;
  role: string;
  created_at: string;
}

export interface TeamFilters {
  department?: string;
  roleId?: string;
  projectId?: string;
  searchQuery?: string;
}

export interface TeamStats {
  totalMembers: number;
  byDepartment: Record<string, number>;
  byRole: Record<string, number>;
  activeInProjects: number;
} 