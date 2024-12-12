import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { Template } from '../types';

interface SaveTemplateParams {
  name: string;
  category: Template['category'];
  content: string;
}

export function useTemplates() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    try {
      const { data, error: fetchError } = await supabase
        .from('templates')
        .select('*')
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;
      setTemplates(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch templates');
    } finally {
      setLoading(false);
    }
  };

  const saveTemplate = async ({ name, category, content }: SaveTemplateParams) => {
    try {
      // Check if a template with this category already exists
      const existingTemplate = templates.find(t => t.category === category);

      if (existingTemplate) {
        // Update existing template
        const { error: updateError } = await supabase
          .from('templates')
          .update({ name, content, updated_at: new Date().toISOString() })
          .eq('id', existingTemplate.id);

        if (updateError) throw updateError;
      } else {
        // Create new template
        const { error: insertError } = await supabase
          .from('templates')
          .insert([
            {
              name,
              category,
              content,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            },
          ]);

        if (insertError) throw insertError;
      }

      // Refresh templates
      await fetchTemplates();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save template');
      throw err;
    }
  };

  const deleteTemplate = async (id: string) => {
    try {
      const { error: deleteError } = await supabase
        .from('templates')
        .delete()
        .eq('id', id);

      if (deleteError) throw deleteError;
      await fetchTemplates();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete template');
      throw err;
    }
  };

  return {
    templates,
    loading,
    error,
    saveTemplate,
    deleteTemplate,
    refreshTemplates: fetchTemplates,
  };
}