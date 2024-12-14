import { useState, useEffect } from 'react';
import supabase from '../lib/supabase';
import type { GrantSection, GrantSectionType } from '../types';

interface UseGrantSectionsReturn {
  sections: GrantSection[];
  loading: boolean;
  error: Error | null;
  createSection: (data: { type: GrantSectionType; content: any }) => Promise<void>;
  updateSection: (id: string, data: { content: any }) => Promise<void>;
  deleteSection: (id: string) => Promise<void>;
}

export function useGrantSections(): UseGrantSectionsReturn {
  const [sections, setSections] = useState<GrantSection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchSections = async () => {
    try {
      setLoading(true);
      const { data, error: fetchError } = await supabase
        .from('grant_sections')
        .select('*')
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;
      setSections(data || []);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch grant sections'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSections();
  }, []);

  const createSection = async (data: { type: GrantSectionType; content: any }) => {
    try {
      const { error: insertError } = await supabase
        .from('grant_sections')
        .insert({
          type: data.type,
          content: data.content,
          name: `${data.type.replace('_', ' ').toUpperCase()} - ${new Date().toLocaleString()}`,
        });

      if (insertError) throw insertError;
      await fetchSections();
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to create grant section'));
      throw err;
    }
  };

  const updateSection = async (id: string, data: { content: any }) => {
    try {
      const { error: updateError } = await supabase
        .from('grant_sections')
        .update({
          content: data.content,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id);

      if (updateError) throw updateError;
      await fetchSections();
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to update grant section'));
      throw err;
    }
  };

  const deleteSection = async (id: string) => {
    try {
      const { error: deleteError } = await supabase
        .from('grant_sections')
        .delete()
        .eq('id', id);

      if (deleteError) throw deleteError;
      await fetchSections();
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to delete grant section'));
      throw err;
    }
  };

  return {
    sections,
    loading,
    error,
    createSection,
    updateSection,
    deleteSection,
  };
} 