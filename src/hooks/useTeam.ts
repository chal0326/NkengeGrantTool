import { useState, useEffect, useCallback } from 'react';
import supabase from '../lib/supabase';
import type { 
  TeamMember, 
  TeamMemberRole, 
  TeamFilters,
  TeamStats,
  TeamMemberRoleAssignment 
} from '../types/team';

interface UseTeamReturn {
  members: TeamMember[];
  roles: TeamMemberRole[];
  stats: TeamStats;
  loading: boolean;
  error: Error | null;
  createMember: (data: { 
    name: string;
    title: string;
    email: string;
    phone?: string;
    department?: string;
    bio?: string;
    role_ids: string[];
  }) => Promise<void>;
  updateMember: (id: string, data: Partial<TeamMember> & { role_ids?: string[] }) => Promise<void>;
  deleteMember: (id: string) => Promise<void>;
  assignRole: (memberId: string, roleId: string) => Promise<void>;
  removeRole: (memberId: string, roleId: string) => Promise<void>;
  filterMembers: (filters: TeamFilters) => Promise<void>;
}

export function useTeam(): UseTeamReturn {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [roles, setRoles] = useState<TeamMemberRole[]>([]);
  const [stats, setStats] = useState<TeamStats>({
    totalMembers: 0,
    byDepartment: {},
    byRole: {},
    activeInProjects: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const calculateStats = useCallback((members: TeamMember[]) => {
    const stats: TeamStats = {
      totalMembers: members.length,
      byDepartment: {},
      byRole: {},
      activeInProjects: 0,
    };

    members.forEach(member => {
      // Count by department
      if (member.department) {
        stats.byDepartment[member.department] = (stats.byDepartment[member.department] || 0) + 1;
      }

      // Count by role
      member.roles?.forEach(role => {
        stats.byRole[role.name] = (stats.byRole[role.name] || 0) + 1;
      });

      // Count active in projects
      if (member.projects && member.projects.length > 0) {
        stats.activeInProjects++;
      }
    });

    return stats;
  }, []);

  const fetchMembers = useCallback(async (filters?: TeamFilters) => {
    try {
      setLoading(true);
      let query = supabase
        .from('team_members')
        .select(`
          *,
          roles:team_member_role_assignments(
            role:team_member_roles(*)
          ),
          projects:project_team_assignments(*)
        `);

      if (filters) {
        if (filters.department) query = query.eq('department', filters.department);
        if (filters.roleId) {
          query = query.contains('roles', [{ role: { id: filters.roleId } }]);
        }
        if (filters.projectId) {
          query = query.contains('projects', [{ project_id: filters.projectId }]);
        }
        if (filters.searchQuery) {
          query = query.or(`name.ilike.%${filters.searchQuery}%,email.ilike.%${filters.searchQuery}%`);
        }
      }

      const { data, error: fetchError } = await query;

      if (fetchError) throw fetchError;

      // Transform the data to match our TeamMember type
      const transformedMembers = data?.map(member => ({
        ...member,
        roles: member.roles?.map((r: any) => r.role) || [],
      })) || [];

      setMembers(transformedMembers);
      setStats(calculateStats(transformedMembers));
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch team members'));
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchRoles = useCallback(async () => {
    try {
      const { data, error: fetchError } = await supabase
        .from('team_member_roles')
        .select('*')
        .order('name');

      if (fetchError) throw fetchError;
      setRoles(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch roles'));
    }
  }, []);

  useEffect(() => {
    Promise.all([fetchMembers(), fetchRoles()]);
  }, [fetchMembers, fetchRoles]);

  const createMember = async (data: {
    name: string;
    title: string;
    email: string;
    phone?: string;
    department?: string;
    bio?: string;
    role_ids: string[];
  }) => {
    try {
      // Start a Postgres transaction
      const { data: newMember, error: insertError } = await supabase
        .from('team_members')
        .insert({
          name: data.name,
          title: data.title,
          email: data.email,
          phone: data.phone,
          department: data.department,
          bio: data.bio,
        })
        .select()
        .single();

      if (insertError) throw insertError;
      if (!newMember) throw new Error('Failed to create team member');

      // Insert role assignments
      if (data.role_ids.length > 0) {
        const roleAssignments = data.role_ids.map(roleId => ({
          team_member_id: newMember.id,
          role_id: roleId,
        }));

        const { error: roleError } = await supabase
          .from('team_member_role_assignments')
          .insert(roleAssignments);

        if (roleError) throw roleError;
      }

      await fetchMembers();
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to create team member'));
      throw err;
    }
  };

  const updateMember = async (id: string, data: Partial<TeamMember> & { role_ids?: string[] }) => {
    try {
      const { role_ids, ...memberData } = data;

      // Update member data
      const { error: updateError } = await supabase
        .from('team_members')
        .update(memberData)
        .eq('id', id);

      if (updateError) throw updateError;

      // Update role assignments if provided
      if (role_ids) {
        // Delete existing role assignments
        const { error: deleteError } = await supabase
          .from('team_member_role_assignments')
          .delete()
          .eq('team_member_id', id);

        if (deleteError) throw deleteError;

        // Insert new role assignments
        if (role_ids.length > 0) {
          const roleAssignments = role_ids.map(roleId => ({
            team_member_id: id,
            role_id: roleId,
          }));

          const { error: roleError } = await supabase
            .from('team_member_role_assignments')
            .insert(roleAssignments);

          if (roleError) throw roleError;
        }
      }

      await fetchMembers();
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to update team member'));
      throw err;
    }
  };

  const deleteMember = async (id: string) => {
    try {
      const { error: deleteError } = await supabase
        .from('team_members')
        .delete()
        .eq('id', id);

      if (deleteError) throw deleteError;
      await fetchMembers();
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to delete team member'));
      throw err;
    }
  };

  const assignRole = async (memberId: string, roleId: string) => {
    try {
      const { error: assignError } = await supabase
        .from('team_member_role_assignments')
        .insert({
          team_member_id: memberId,
          role_id: roleId,
        });

      if (assignError) throw assignError;
      await fetchMembers();
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to assign role'));
      throw err;
    }
  };

  const removeRole = async (memberId: string, roleId: string) => {
    try {
      const { error: removeError } = await supabase
        .from('team_member_role_assignments')
        .delete()
        .match({
          team_member_id: memberId,
          role_id: roleId,
        });

      if (removeError) throw removeError;
      await fetchMembers();
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to remove role'));
      throw err;
    }
  };

  const filterMembers = async (filters: TeamFilters) => {
    await fetchMembers(filters);
  };

  return {
    members,
    roles,
    stats,
    loading,
    error,
    createMember,
    updateMember,
    deleteMember,
    assignRole,
    removeRole,
    filterMembers,
  };
} 