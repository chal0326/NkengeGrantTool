import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { grantSchema, type GrantFormData } from '../../types/grant';
import OrganizationInfo from './OrganizationInfo';
import ProjectDetails from './ProjectDetails';
import FinancialInfo from './FinancialInfo';
import AdditionalInfo from './AdditionalInfo';
import { Button } from '../ui/Button';

interface GrantApplicationFormProps {
  onSubmit: (data: GrantFormData) => Promise<void>;
  initialData?: Partial<GrantFormData>;
}

export function GrantApplicationForm({ onSubmit, initialData }: GrantApplicationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const methods = useForm<GrantFormData>({
    resolver: zodResolver(grantSchema),
    defaultValues: initialData || {
      name: '',
      organization: '',
      amount: 0,
      deadline: '',
      description: '',
      requirements: '',
      notes: '',
      type: 'identified'
    }
  });

  const handleSubmit = async (data: GrantFormData) => {
    try {
      setIsSubmitting(true);
      setError(null);
      await onSubmit(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-600">{error}</p>
        </div>
      )}

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(handleSubmit)} className="space-y-8">
          <OrganizationInfo />
          <ProjectDetails />
          <FinancialInfo />
          <AdditionalInfo />
          <div className="flex justify-end">
            <Button
              type="submit"
              variant="primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Saving...' : 'Save Application'}
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
} 