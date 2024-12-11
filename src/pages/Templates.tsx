import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Palette } from 'lucide-react';
import { OrganizationInfo } from '../components/grant-form/OrganizationInfo';
import { ContactInfo } from '../components/grant-form/ContactInfo';
import { ProjectDetails } from '../components/grant-form/ProjectDetails';
import { Timeline } from '../components/grant-form/Timeline';
import { FinancialInfo } from '../components/grant-form/FinancialInfo';
import { AdditionalInfo } from '../components/grant-form/AdditionalInfo';
import { saveGrantApplication } from '../lib/grant-services';
import { grantFormSchema, type GrantFormData } from '../types/grant';

export function Templates() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const methods = useForm<GrantFormData>({
    resolver: zodResolver(grantFormSchema),
  });

  const onSubmit = async (data: GrantFormData) => {
    try {
      setIsSubmitting(true);
      setError(null);
      await saveGrantApplication(data);
      setSuccess(true);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'An error occurred while saving the form'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  type TemplateFormData = z.infer<typeof templateSchema>;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-3">
            <Palette className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">
              BIPOC Arts Grant Portal
            </h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white shadow rounded-lg p-6">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-600">{error}</p>
            </div>
          )}

          {success && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-md">
              <p className="text-green-600">
                Grant application saved successfully!
              </p>
            </div>
          )}

          <FormProvider {...methods}>
            <form
              onSubmit={methods.handleSubmit(onSubmit)}
              className="space-y-12"
            >
              <OrganizationInfo />
              <ContactInfo />
              <ProjectDetails />
              <Timeline />
              <FinancialInfo />
              <AdditionalInfo />

              <div className="flex justify-end pt-6 border-t border-gray-200">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`${
                    isSubmitting
                      ? 'bg-blue-400'
                      : 'bg-blue-600 hover:bg-blue-700'
                  } text-white px-6 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
                >
                  {isSubmitting ? 'Saving...' : 'Save Progress'}
                </button>
              </div>
            </form>
          </FormProvider>
        </div>
      </main>
    </div>
  );
}
