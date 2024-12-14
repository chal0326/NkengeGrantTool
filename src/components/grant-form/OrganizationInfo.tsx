import { useFormContext } from 'react-hook-form';
import { FormField } from '../form/FormField';
import { TextArea } from '../form/TextArea';
import { FileUpload } from '../form/FileUpload';
import type { GrantFormData } from '../../types/grant';

export function OrganizationInfo() {
  const { register } = useFormContext<GrantFormData>();

  return (
    <div className="space-y-6">
      <div className="border-b border-gray-200 pb-6">
        <h2 className="text-xl font-semibold text-gray-900">Organization Information</h2>
        <p className="mt-1 text-sm text-gray-500">
          Please provide basic information about your organization.
        </p>
      </div>

      <FormField
        {...register('organizationName')}
        label="What is the official name of your organization?"
        placeholder="Enter your organization's legal name"
      />

      <FormField
        {...register('hasNonProfitStatus')}
        type="checkbox"
        label="Do you have 501(c)(3) nonprofit status?"
      />

      <FileUpload
        name="irsLetter"
        label="Upload IRS determination letter"
        accept=".pdf,.doc,.docx"
        condition="hasNonProfitStatus"
      />

      <FormField
        {...register('ein')}
        label="What is your EIN (Employer Identification Number)?"
        placeholder="XX-XXXXXXX"
      />

      <TextArea
        {...register('missionStatement')}
        label="What is your organization's mission statement?"
        placeholder="Enter your organization's mission statement"
      />

      <TextArea
        {...register('organizationHistory')}
        label="Provide a brief history of your organization"
        placeholder="Describe your organization's history and development"
      />
    </div>
  );
}