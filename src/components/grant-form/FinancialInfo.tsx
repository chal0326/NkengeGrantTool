import { useFormContext } from 'react-hook-form';
import { FormField } from '../form/FormField';
import { TextArea } from '../form/TextArea';
import { FileUpload } from '../form/FileUpload';
import type { GrantFormData } from '../../types/grant';

export function FinancialInfo() {
  const { register } = useFormContext<GrantFormData>();

  return (
    <div className="space-y-6">
      <div className="border-b border-gray-200 pb-6">
        <h2 className="text-xl font-semibold text-gray-900">Financial Information</h2>
        <p className="mt-1 text-sm text-gray-500">
          Provide details about your organization's finances and funding needs.
        </p>
      </div>

      <FormField
        {...register('financial.annualBudget', { valueAsNumber: true })}
        type="number"
        label="What is your organization's annual operating budget?"
        placeholder="Enter amount in USD"
      />

      <FormField
        {...register('financial.projectBudget', { valueAsNumber: true })}
        type="number"
        label="What is the total budget for the proposed project/program?"
        placeholder="Enter amount in USD"
      />

      <FormField
        {...register('financial.requestedAmount', { valueAsNumber: true })}
        type="number"
        label="How much funding are you requesting from this grant?"
        placeholder="Enter amount in USD"
      />

      <FormField
        {...register('financial.isFullyFunded')}
        type="checkbox"
        label="Will this grant fully fund the project?"
      />

      <TextArea
        {...register('financial.otherFunding')}
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