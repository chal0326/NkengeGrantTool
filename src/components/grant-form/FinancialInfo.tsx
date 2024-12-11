import React from 'react';
import { FormField } from '../form/FormField';
import { TextArea } from '../form/TextArea';
import { FileUpload } from '../form/FileUpload';

export function FinancialInfo() {
  return (
    <div className="space-y-6">
      <div className="border-b border-gray-200 pb-6">
        <h2 className="text-xl font-semibold text-gray-900">Financial Information</h2>
        <p className="mt-1 text-sm text-gray-500">
          Provide details about your organization's finances and funding needs.
        </p>
      </div>

      <FormField
        name="financial.annualBudget"
        label="What is your organization's annual operating budget?"
        type="number"
        placeholder="Enter amount in USD"
      />

      <FormField
        name="financial.projectBudget"
        label="What is the total budget for the proposed project/program?"
        type="number"
        placeholder="Enter amount in USD"
      />

      <FormField
        name="financial.requestedAmount"
        label="How much funding are you requesting from this grant?"
        type="number"
        placeholder="Enter amount in USD"
      />

      <FormField
        name="financial.isFullyFunded"
        label="Will this grant fully fund the project?"
        type="checkbox"
      />

      <TextArea
        name="financial.otherFunding"
        label="What are your other sources of funding?"
        placeholder="List other funding sources and amounts"
      />

      <FileUpload
        name="financialStatements"
        label="Upload audited financial statements for the last fiscal year"
        accept=".pdf,.xls,.xlsx"
      />
    </div>
  );
}