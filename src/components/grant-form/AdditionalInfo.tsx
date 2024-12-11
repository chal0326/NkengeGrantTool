import React from 'react';
import { TextArea } from '../form/TextArea';
import { FileUpload } from '../form/FileUpload';

export function AdditionalInfo() {
  return (
    <div className="space-y-6">
      <div className="border-b border-gray-200 pb-6">
        <h2 className="text-xl font-semibold text-gray-900">Additional Information</h2>
        <p className="mt-1 text-sm text-gray-500">
          Provide supporting documentation and additional context.
        </p>
      </div>

      <TextArea
        name="impact.communityContribution"
        label="How does your organization contribute to the community?"
        placeholder="Describe your community impact"
      />

      <TextArea
        name="impact.communityNeeds"
        label="What specific community needs does this project address?"
        placeholder="Explain the needs your project will address"
      />

      <TextArea
        name="impact.beneficiaries"
        label="How many people will benefit directly and indirectly from this project?"
        placeholder="Provide estimated numbers and descriptions of beneficiaries"
      />

      <FileUpload
        name="workSamples"
        label="Upload samples of your work (photos, videos, portfolios, etc.)"
        accept=".pdf,.jpg,.jpeg,.png,.mp4"
        multiple
      />

      <FileUpload
        name="supportLetters"
        label="Upload letters of support or testimonials"
        accept=".pdf,.doc,.docx"
        multiple
      />

      <TextArea
        name="impact.equity"
        label="How does this project promote equity, diversity, and inclusion?"
        placeholder="Describe your approach to EDI"
      />
    </div>
  );
}