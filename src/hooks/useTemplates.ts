import { useState, useEffect } from 'react';
import supabase from '../lib/supabase';
import type { Template, TemplateData, Json } from '../types';

interface SaveTemplateParams {
  id?: string;
  name: string;
  type: Template['type'];
  content: TemplateData;
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
      
      console.log('Raw templates from Supabase:', data);
      
      // Parse the content field for each template
      const parsedTemplates = data?.map(template => {
        // If content is a string, try to parse it
        let parsedContent = template.content;
        if (typeof template.content === 'string') {
          try {
            parsedContent = JSON.parse(template.content);
          } catch (e) {
            console.error('Failed to parse template content:', e);
            parsedContent = template.content;
          }
        }

        // Ensure the content has the correct type field
        if (parsedContent && typeof parsedContent === 'object') {
          parsedContent = {
            ...parsedContent,
            type: template.type || template.category // Use type or fallback to category
          };
        }
        
        return {
          ...template,
          type: template.type || template.category, // Normalize type field
          content: parsedContent as unknown as TemplateData
        };
      }) || [];
      
      console.log('Parsed templates:', parsedTemplates);
      setTemplates(parsedTemplates);
    } catch (err) {
      console.error('Error fetching templates:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch templates');
    } finally {
      setLoading(false);
    }
  };

  const saveTemplate = async ({ id, name, type, content }: SaveTemplateParams) => {
    try {
      // Ensure content has the type field
      const contentWithType = {
        ...content,
        type
      };

      // Create the template data object matching the database schema
      const templateData = {
        name,
        type: type as Template['type'],
        category: type,
        content: contentWithType,
        updated_at: new Date().toISOString()
      };

      if (id) {
        // Update existing template
        const { error: updateError } = await supabase
          .from('templates')
          .update(templateData)
          .eq('id', id);

        if (updateError) throw updateError;
      } else {
        // Create new template
        const { error: insertError } = await supabase
          .from('templates')
          .insert({
            ...templateData,
            created_at: new Date().toISOString(),
          });

        if (insertError) throw insertError;
      }

      // Refresh templates
      await fetchTemplates();
    } catch (err) {
      console.error('Error saving template:', err);
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