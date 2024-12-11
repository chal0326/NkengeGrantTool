import React from 'react';
import { FormField } from '../form/FormField';
import { TextArea } from '../form/TextArea';
import { FileUpload } from '../form/FileUpload';

export function OrganizationInfo() {
  return (
    <div className="space-y-6">
      <div className="border-b border-gray-200 pb-6">
        <h2 className="text-xl font-semibold text-gray-900">Organization Information</h2>
        <p className="mt-1 text-sm text-gray-500">
          Please provide basic information about your organization.
        </p>
      </div>

      <FormField
        name="organizationName"
        label="What is the official name of your organization?"
        placeholder="Enter your organization's legal name"
      />

      <FormField
        name="hasNonProfitStatus"
        label="Do you have 501(c)(3) nonprofit status?"
        type="checkbox"
      />

      <FileUpload
        name="irsLetter"
        label="Upload IRS determination letter"
        accept=".pdf,.doc,.docx"
        condition="hasNonProfitStatus"
      />

      <FormField
        name="ein"
        label="What is your EIN (Employer Identification Number)?"
        placeholder="XX-XXXXXXX"
      />

      <TextArea
        name="missionStatement"
        label="What is your organization's mission statement?"
        placeholder="Enter your organization's mission statement"
      />

      <TextArea
        name="organizationHistory"
        label="Provide a brief history of your organization"
        placeholder="Describe your organization's history and development"
      />
    </div>
  );
}