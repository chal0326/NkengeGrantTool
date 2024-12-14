import { useForm } from 'react-hook-form';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { TextArea } from '../form/TextArea';
import { MultiSelect } from '../ui/MultiSelect';
import { useTemplateOptions } from '../../hooks/useTemplateOptions';
import type { ImpactInfoTemplate } from '../../types';

interface ImpactInfoProps {
  initialData?: ImpactInfoTemplate;
  onSave: (data: ImpactInfoTemplate) => void;
}

export function ImpactInfo({ initialData, onSave }: ImpactInfoProps) {
  const { register, handleSubmit, setValue, watch } = useForm<ImpactInfoTemplate>({
    defaultValues: initialData || {
      type: 'impact_info',
      communityNeeds: '',
      equityApproach: '',
      beneficiaryFeedback: '',
      communityEngagement: '',
      demographicData: {
        categories: [],
        collectionMethod: '',
        frequency: '',
      },
      longTermImpact: '',
      communityPartnerships: [],
      artsSectorImpact: '',
    },
  });

  const { options: demographicOptions } = useTemplateOptions('demographics');
  const selectedDemographics = watch('demographicData.categories') || [];

  const handleDemographicsChange = (selectedIds: string[]) => {
    setValue('demographicData.categories', selectedIds);
  };

  return (
    <form onSubmit={handleSubmit(onSave)} className="space-y-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Community Needs</label>
          <TextArea
            label="Community Needs"
            {...register('communityNeeds')}
            placeholder="Describe the community needs this project addresses..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Equity Approach</label>
          <TextArea
            label="Equity Approach"
            {...register('equityApproach')}
            placeholder="Describe your approach to equity and inclusion..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Beneficiary Feedback</label>
          <TextArea
            label="Beneficiary Feedback"
            {...register('beneficiaryFeedback')}
            placeholder="Describe how you collect and incorporate beneficiary feedback..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Community Engagement</label>
          <TextArea
            label="Community Engagement"
            {...register('communityEngagement')}
            placeholder="Describe your community engagement strategies..."
          />
        </div>

        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">Demographic Data</label>
          <div>
            <label className="block text-sm font-medium text-gray-700">Categories</label>
            <MultiSelect
              options={demographicOptions.map(opt => ({ id: opt.value, label: opt.label }))}
              selectedIds={selectedDemographics}
              onChange={handleDemographicsChange}
              placeholder="Select demographic categories..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Collection Method</label>
            <Input
              registration={register('demographicData.collectionMethod')}
              placeholder="How will demographic data be collected?"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Frequency</label>
            <Input
              registration={register('demographicData.frequency')}
              placeholder="How often will data be collected?"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Long Term Impact</label>
          <TextArea
            label="Long Term Impact"
            {...register('longTermImpact')}
            placeholder="Describe the expected long-term impact..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Arts Sector Impact</label>
          <TextArea
            label="Arts Sector Impact"
            {...register('artsSectorImpact')}
            placeholder="Describe the impact on the arts sector..."
          />
        </div>
      </div>

      <div className="flex justify-end">
        <Button type="submit">Save Template</Button>
      </div>
    </form>
  );
} 