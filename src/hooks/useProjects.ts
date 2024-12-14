import { useState, useEffect, useCallback } from 'react';
import supabase from '../lib/supabase';
import type { 
  Project, 
  ProjectStatus, 
  ProjectFilters,
  ProjectStats,
  ProjectTeamAssignment 
} from '../types/project';

interface UseProjectsReturn {
  projects: Project[];
  stats: ProjectStats;
  loading: boolean;
  error: Error | null;
  createProject: (project: Omit<Project, 'id' | 'created_at' | 'updated_at'>) => Promise<void>;
  updateProject: (id: string, project: Partial<Project>) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
  filterProjects: (filters: ProjectFilters) => Promise<void>;
  assignTeamMember: (projectId: string, teamMemberId: string, role: string) => Promise<void>;
  removeTeamMember: (projectId: string, teamMemberId: string) => Promise<void>;
}

export function useProjects(): UseProjectsReturn {
  const [projects, setProjects] = useState<Project[]>([]);
  const [stats, setStats] = useState<ProjectStats>({
    totalProjects: 0,
    activeProjects: 0,
    completedProjects: 0,
    onHoldProjects: 0,
    totalBudget: 0,
    averageBudget: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const calculateStats = useCallback((projects: Project[]) => {
    const stats = projects.reduce(
      (acc, project) => {
        acc.totalProjects++;
        acc.totalBudget += project.budget;

        switch (project.status) {
          case 'active':
            acc.activeProjects++;
            break;
          case 'completed':
            acc.completedProjects++;
            break;
          case 'on_hold':
            acc.onHoldProjects++;
            break;
        }

        return acc;
      },
      {
        totalProjects: 0,
        activeProjects: 0,
        completedProjects: 0,
        onHoldProjects: 0,
        totalBudget: 0,
        averageBudget: 0,
      }
    );

    stats.averageBudget = stats.totalProjects > 0 
      ? stats.totalBudget / stats.totalProjects 
      : 0;

    return stats;
  }, []);

  const fetchProjects = useCallback(async (filters?: ProjectFilters) => {
    try {
      setLoading(true);
      let query = supabase
        .from('projects')
        .select(`
          *,
          team_members:project_team_assignments(
            team_member:team_members(*),
            role,
            created_at
          )
        `)
        .order('created_at', { ascending: false });

      if (filters) {
        if (filters.status) query = query.eq('status', filters.status);
        if (filters.grantId) query = query.eq('grant_id', filters.grantId);
        if (filters.startDate) query = query.gte('start_date', filters.startDate);
        if (filters.endDate) query = query.lte('end_date', filters.endDate);
        if (filters.minBudget) query = query.gte('budget', filters.minBudget);
        if (filters.maxBudget) query = query.lte('budget', filters.maxBudget);
        if (filters.teamMemberId) {
          query = query.contains('team_members', [{ team_member_id: filters.teamMemberId }]);
        }
      }

      const { data, error: fetchError } = await query;

      if (fetchError) throw fetchError;

      const typedProjects = data as Project[];
      setProjects(typedProjects);
      setStats(calculateStats(typedProjects));
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch projects'));
    } finally {
      setLoading(false);
    }
  }, [calculateStats]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const createProject = async (data: Omit<Project, 'id' | 'created_at' | 'updated_at'> & { team_members: Array<{ id: string; role: string }> }) => {
    try {
      const { team_members, ...projectData } = data;

      // Create project
      const { data: newProject, error: insertError } = await supabase
        .from('projects')
        .insert(projectData)
        .select()
        .single();

      if (insertError) throw insertError;
      if (!newProject) throw new Error('Failed to create project');

      // Assign team members
      if (team_members.length > 0) {
        const teamAssignments = team_members.map(member => ({
          project_id: newProject.id,
          team_member_id: member.id,
          role: member.role,
        }));

        const { error: teamError } = await supabase
          .from('project_team_assignments')
          .insert(teamAssignments);

        if (teamError) throw teamError;
      }

      await fetchProjects();
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to create project'));
      throw err;
    }
  };

  const updateProject = async (id: string, data: Partial<Project> & { team_members?: Array<{ id: string; role: string }> }) => {
    try {
      const { team_members, ...projectData } = data;

      // Update project data
      const { error: updateError } = await supabase
        .from('projects')
        .update(projectData)
        .eq('id', id);

      if (updateError) throw updateError;

      // Update team assignments if provided
      if (team_members) {
        // Delete existing team assignments
        const { error: deleteError } = await supabase
          .from('project_team_assignments')
          .delete()
          .eq('project_id', id);

        if (deleteError) throw deleteError;

        // Insert new team assignments
        if (team_members.length > 0) {
          const teamAssignments = team_members.map(member => ({
            project_id: id,
            team_member_id: member.id,
            role: member.role,
          }));

          const { error: teamError } = await supabase
            .from('project_team_assignments')
            .insert(teamAssignments);

          if (teamError) throw teamError;
        }
      }

      await fetchProjects();
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to update project'));
      throw err;
    }
  };

  const deleteProject = async (id: string) => {
    try {
      const { error: deleteError } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);

      if (deleteError) throw deleteError;
      await fetchProjects();
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to delete project'));
      throw err;
    }
  };

  const assignTeamMember = async (projectId: string, teamMemberId: string, role: string) => {
    try {
      const { error: assignError } = await supabase
        .from('project_team_assignments')
        .insert({
          project_id: projectId,
          team_member_id: teamMemberId,
          role,
        });

      if (assignError) throw assignError;
      await fetchProjects();
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to assign team member'));
      throw err;
    }
  };

  const removeTeamMember = async (projectId: string, teamMemberId: string) => {
    try {
      const { error: removeError } = await supabase
        .from('project_team_assignments')
        .delete()
        .match({
          project_id: projectId,
          team_member_id: teamMemberId,
        });

      if (removeError) throw removeError;
      await fetchProjects();
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to remove team member'));
      throw err;
    }
  };

  const filterProjects = async (filters: ProjectFilters) => {
    await fetchProjects(filters);
  };

  return {
    projects,
    stats,
    loading,
    error,
    createProject,
    updateProject,
    deleteProject,
    filterProjects,
    assignTeamMember,
    removeTeamMember,
  };
} 