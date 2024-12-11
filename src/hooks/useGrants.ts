import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Grant } from '../types';

export function useGrants() {
  const [grants, setGrants] = useState<Grant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchGrants();
  }, []);

  async function fetchGrants() {
    try {
      const { data, error } = await supabase
        .from('grants')
        .select('*')
        .order('deadline', { ascending: true });

      if (error) throw error;
      setGrants(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }

  async function addGrant(grant: Omit<Grant, 'id' | 'created_at' | 'updated_at'>) {
    try {
      const { data, error } = await supabase
        .from('grants')
        .insert([grant])
        .select()
        .single();

      if (error) throw error;
      setGrants(prev => [...prev, data]);
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      return null;
    }
  }

  return { grants, loading, error, fetchGrants, addGrant };
}