import type { FinancialTransaction } from './finance';
import type { TeamMemberAssignment } from './team';

export type ProjectStatus = 'active' | 'completed' | 'on_hold';

export interface Project {
  id: string;
  name: string;
  description: string;
  status: ProjectStatus;
  start_date: string;
  end_date: string;
  budget: number;
  grant_id?: string;
  created_at: string;
  updated_at: string;

  // Joined fields
  team_members?: TeamMemberAssignment[];
  transactions?: FinancialTransaction[];
}

export interface ProjectFilters {
  status?: ProjectStatus;
  grantId?: string;
  startDate?: string;
  endDate?: string;
  minBudget?: number;
  maxBudget?: number;
  teamMemberId?: string;
}

export interface ProjectTeamAssignment {
  project_id: string;
  team_member_id: string;
  role: string;
  created_at: string;
}

export interface ProjectStats {
  totalProjects: number;
  activeProjects: number;
  completedProjects: number;
  onHoldProjects: number;
  totalBudget: number;
  averageBudget: number;
} 