import { useState, useEffect } from 'react';
import supabase from '../lib/supabase';
import type { Grant, GrantFormData } from '../types/grant';

interface UseGrantsReturn {
  grants: Grant[];
  loading: boolean;
  error: string | null;
  addGrant: (data: GrantFormData) => Promise<boolean>;
  addGrants: (data: Partial<GrantFormData>[]) => Promise<void>;
  updateGrant: (id: string, data: Partial<GrantFormData>) => Promise<boolean>;
  deleteGrant: (id: string) => Promise<boolean>;
}

export function useGrants(): UseGrantsReturn {
  const [grants, setGrants] = useState<Grant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchGrants();
  }, []);

  const fetchGrants = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('grants')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setGrants(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const addGrant = async (data: GrantFormData): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from('grants')
        .insert([{
          ...data,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }]);

      if (error) throw error;
      await fetchGrants();
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      return false;
    }
  };

  const addGrants = async (data: Partial<GrantFormData>[]): Promise<void> => {
    try {
      const validGrants = data.filter(grant => 
        grant.name || grant.opportunity_number || grant.organization
      ).map(grant => ({
        ...grant,
        type: grant.type || 'identified',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }));

      if (validGrants.length === 0) {
        throw new Error('No valid grants to import');
      }

      const { error } = await supabase
        .from('grants')
        .insert(validGrants);

      if (error) throw error;
      await fetchGrants();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    }
  };

  const updateGrant = async (id: string, data: Partial<GrantFormData>): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from('grants')
        .update({
          ...data,
          updated_at: new Date().toISOString()
        })
        .eq('id', id);

      if (error) throw error;
      await fetchGrants();
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      return false;
    }
  };

  const deleteGrant = async (id: string): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from('grants')
        .delete()
        .eq('id', id);

      if (error) throw error;
      await fetchGrants();
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      return false;
    }
  };

  return {
    grants,
    loading,
    error,
    addGrant,
    addGrants,
    updateGrant,
    deleteGrant,
  };
}