import { useForm } from 'react-hook-form';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { TextArea } from '../ui/TextArea';
import { MultiSelect } from '../ui/MultiSelect';
import { useTemplateOptions } from '../../hooks/useTemplateOptions';
import type { OrganizationInfoTemplate } from '../../types';

interface OrganizationInfoProps {
  initialData?: OrganizationInfoTemplate;
  onSave: (data: OrganizationInfoTemplate) => void;
}

export function OrganizationInfo({ initialData, onSave }: OrganizationInfoProps) {
  const { register, handleSubmit, setValue, watch } = useForm<OrganizationInfoTemplate>({
    defaultValues: initialData || {
      type: 'organization_info',
      organizationName: '',
      hasNonProfitStatus: false,
      ein: '',
      missionStatement: '',
      organizationHistory: '',
      annualOperatingBudget: 0,
      physicalAddress: {
        street: '',
        city: '',
        state: '',
        zipCode: '',
      },
      currentPrograms: [],
      bipocWomenArtsFocus: '',
      keyStaff: [],
      artForms: [],
    },
  });

  const { options: artFormOptions } = useTemplateOptions('art_forms');
  const selectedArtForms = watch('artForms') || [];

  const handleArtFormsChange = (selectedIds: string[]) => {
    setValue('artForms', selectedIds);
  };

  return (
    <form onSubmit={handleSubmit(onSave)} className="space-y-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Organization Name</label>
          <Input {...register('organizationName')} placeholder="Enter organization name" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Non-Profit Status</label>
          <input
            type="checkbox"
            {...register('hasNonProfitStatus')}
            className="h-4 w-4 text-blue-600 rounded border-gray-300"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">EIN</label>
          <Input {...register('ein')} placeholder="Enter EIN" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Mission Statement</label>
          <TextArea
            {...register('missionStatement')}
            placeholder="Enter organization's mission statement"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Organization History</label>
          <TextArea
            {...register('organizationHistory')}
            placeholder="Describe the organization's history"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Annual Operating Budget</label>
          <Input
            type="number"
            {...register('annualOperatingBudget', { valueAsNumber: true })}
            placeholder="Enter annual operating budget"
          />
        </div>

        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">Physical Address</label>
          <div>
            <label className="block text-sm font-medium text-gray-700">Street</label>
            <Input {...register('physicalAddress.street')} placeholder="Enter street address" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">City</label>
            <Input {...register('physicalAddress.city')} placeholder="Enter city" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">State</label>
            <Input {...register('physicalAddress.state')} placeholder="Enter state" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">ZIP Code</label>
            <Input {...register('physicalAddress.zipCode')} placeholder="Enter ZIP code" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Art Forms</label>
          <MultiSelect
            options={artFormOptions.map(opt => ({ id: opt.value, label: opt.label }))}
            selectedIds={selectedArtForms}
            onChange={handleArtFormsChange}
            placeholder="Select art forms..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">BIPOC Women Arts Focus</label>
          <TextArea
            {...register('bipocWomenArtsFocus')}
            placeholder="Describe your focus on BIPOC women in the arts"
          />
        </div>
      </div>

      <div className="flex justify-end">
        <Button type="submit">Save Template</Button>
      </div>
    </form>
  );
} 