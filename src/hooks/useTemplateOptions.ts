import { useEffect, useState, useCallback } from 'react';
import supabase from '../lib/supabase';
import type { TemplateOption, TemplateOptionCategory } from '../types/template-options';

interface UseTemplateOptionsReturn {
  options: TemplateOption[];
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export function useTemplateOptions(category?: TemplateOptionCategory): UseTemplateOptionsReturn {
  const [options, setOptions] = useState<TemplateOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchOptions = useCallback(async () => {
    try {
      setLoading(true);
      let query = supabase.from('template_options').select('*');
      
      if (category) {
        query = query.eq('category', category);
      }

      const { data, error: err } = await query.order('label');
      if (err) throw err;
      setOptions(data.map((option: any) => ({
        ...option,
        category: option.category as TemplateOptionCategory
      })) || []);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch template options'));
    } finally {
      setLoading(false);
    }
  }, [category]);

  useEffect(() => {
    fetchOptions();
  }, [fetchOptions]);

  return {
    options,
    loading,
    error,
    refetch: fetchOptions
  };
} 