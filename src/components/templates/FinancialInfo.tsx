import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FormField } from '../form/FormField';
import { TextArea } from '../form/TextArea';
import { Button } from '../ui/Button';
import { FinancialInfoTemplate } from '../../types';

const budgetLineItemSchema = z.object({
  type: z.literal('budget_item'),
  category: z.string().min(1, 'Category is required'),
  description: z.string().min(1, 'Description is required'),
  amount: z.number().positive('Amount must be positive'),
});

const formSchema = z.object({
  fundingStrategy: z.object({
    annualBudget: z.number().min(0),
    projectBudget: z.number().min(0),
    requestedAmount: z.number().min(0),
    isFullyFunded: z.boolean(),
    otherFunding: z.array(z.object({
      source: z.string(),
      amount: z.number(),
      status: z.enum(['pending', 'confirmed', 'rejected']),
    })),
  }),
  budgetingProcess: z.string().min(1, 'Budgeting process is required'),
  financialControls: z.string().min(1, 'Financial controls are required'),
  sustainabilityPlan: z.string().min(1, 'Sustainability plan is required'),
  previousFunding: z.string().min(1, 'Previous funding information is required'),
  inKindSupport: z.string().min(1, 'In-kind support information is required'),
  budgetLineItems: z.array(budgetLineItemSchema).min(1, 'At least one budget line item is required'),
  matchingFunds: z.object({
    required: z.boolean(),
    percentage: z.number().min(0).max(100, 'Percentage must be between 0 and 100'),
    secured: z.number().min(0, 'Secured amount must be non-negative'),
  }),
  indirectCosts: z.object({
    rate: z.number().min(0).max(100, 'Rate must be between 0 and 100'),
    basis: z.string().min(1, 'Basis for indirect costs is required'),
  }),
});

type FormData = z.infer<typeof formSchema>;

interface FinancialInfoProps {
  initialData?: FinancialInfoTemplate | null;
  onSave: (data: FinancialInfoTemplate) => void;
}

const defaultValues: FormData = {
  fundingStrategy: {
    annualBudget: 0,
    projectBudget: 0,
    requestedAmount: 0,
    isFullyFunded: false,
    otherFunding: [],
  },
  budgetingProcess: '',
  financialControls: '',
  sustainabilityPlan: '',
  previousFunding: '',
  inKindSupport: '',
  budgetLineItems: [],
  matchingFunds: {
    required: false,
    percentage: 0,
    secured: 0,
  },
  indirectCosts: {
    rate: 0,
    basis: '',
  },
};

export function FinancialInfo({ initialData, onSave }: FinancialInfoProps) {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || defaultValues,
  });

  const { register, handleSubmit, formState: { errors }, watch, setValue } = form;
  const matchingRequired = watch('matchingFunds.required');

  const handleFormSubmit = (data: FormData) => {
    onSave({
      ...data,
      type: 'financial_info'
    });
  };

  const addBudgetItem = () => {
    const currentItems = watch('budgetLineItems') || [];
    setValue('budgetLineItems', [
      ...currentItems,
      { type: 'budget_item', category: '', description: '', amount: 0 }
    ]);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <div className="border-b border-gray-200 pb-6">
        <h2 className="text-xl font-semibold text-gray-900">Financial Information Template</h2>
        <p className="mt-1 text-sm text-gray-500">
          This information will be used as a foundation for financial sections in your grant applications.
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Funding Strategy</h3>
        <FormField
          registration={register('fundingStrategy.annualBudget', { valueAsNumber: true })}
          type="number"
          label="Annual Budget"
          placeholder="Enter annual budget"
          error={errors.fundingStrategy?.annualBudget?.message}
        />
        <FormField
          registration={register('fundingStrategy.projectBudget', { valueAsNumber: true })}
          type="number"
          label="Project Budget"
          placeholder="Enter project budget"
          error={errors.fundingStrategy?.projectBudget?.message}
        />
        <FormField
          registration={register('fundingStrategy.requestedAmount', { valueAsNumber: true })}
          type="number"
          label="Requested Amount"
          placeholder="Enter requested amount"
          error={errors.fundingStrategy?.requestedAmount?.message}
        />
        <FormField
          registration={register('fundingStrategy.isFullyFunded')}
          type="checkbox"
          label="Is Fully Funded?"
          error={errors.fundingStrategy?.isFullyFunded?.message}
        />
      </div>

      <TextArea
        registration={register('budgetingProcess')}
        label="Describe your budgeting process"
        placeholder="Explain how you develop and manage project budgets"
        error={errors.budgetingProcess?.message}
      />

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">Budget Line Items</h3>
          <Button type="button" onClick={addBudgetItem} variant="outline">
            Add Budget Item
          </Button>
        </div>
        {watch('budgetLineItems')?.map((_, index) => (
          <div key={index} className="space-y-4 p-4 border rounded-md">
            <FormField
              registration={register(`budgetLineItems.${index}.category`)}
              label="Category"
              placeholder="e.g., Personnel, Equipment, Travel"
              error={errors.budgetLineItems?.[index]?.category?.message}
            />
            <TextArea
              registration={register(`budgetLineItems.${index}.description`)}
              label="Description"
              placeholder="Detailed description of the budget item"
              error={errors.budgetLineItems?.[index]?.description?.message}
            />
            <FormField
              registration={register(`budgetLineItems.${index}.amount`, { valueAsNumber: true })}
              label="Amount"
              type="number"
              placeholder="Enter amount in USD"
              error={errors.budgetLineItems?.[index]?.amount?.message}
            />
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Matching Funds</h3>
        <FormField
          registration={register('matchingFunds.required')}
          type="checkbox"
          label="Are matching funds typically required?"
          error={errors.matchingFunds?.required?.message}
        />
        {matchingRequired && (
          <>
            <FormField
              registration={register('matchingFunds.percentage', { valueAsNumber: true })}
              type="number"
              label="What percentage of matching is typically required?"
              placeholder="Enter percentage (0-100)"
              error={errors.matchingFunds?.percentage?.message}
            />
            <FormField
              registration={register('matchingFunds.secured', { valueAsNumber: true })}
              type="number"
              label="Amount of matching funds typically secured"
              placeholder="Enter amount in USD"
              error={errors.matchingFunds?.secured?.message}
            />
          </>
        )}
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Indirect Costs</h3>
        <FormField
          registration={register('indirectCosts.rate', { valueAsNumber: true })}
          type="number"
          label="What is your standard indirect cost rate?"
          placeholder="Enter percentage (0-100)"
          error={errors.indirectCosts?.rate?.message}
        />
        <TextArea
          registration={register('indirectCosts.basis')}
          label="What is the basis for your indirect costs?"
          placeholder="Explain how indirect costs are calculated"
          error={errors.indirectCosts?.basis?.message}
        />
      </div>

      <TextArea
        registration={register('financialControls')}
        label="What financial controls do you have in place?"
        placeholder="Describe your financial management and oversight procedures"
        error={errors.financialControls?.message}
      />

      <TextArea
        registration={register('sustainabilityPlan')}
        label="What is your financial sustainability plan?"
        placeholder="Explain your strategy for long-term financial sustainability"
        error={errors.sustainabilityPlan?.message}
      />

      <TextArea
        registration={register('previousFunding')}
        label="Describe your track record with previous funding"
        placeholder="List major funding sources and how funds were utilized"
        error={errors.previousFunding?.message}
      />

      <TextArea
        registration={register('inKindSupport')}
        label="What in-kind support do you typically receive?"
        placeholder="Describe non-monetary support and partnerships"
        error={errors.inKindSupport?.message}
      />

      <div className="flex justify-end pt-6">
        <Button type="submit">
          Save Template
        </Button>
      </div>
    </form>
  );
} 