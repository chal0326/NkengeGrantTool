import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FormField } from '../form/FormField';
import { TextArea } from '../form/TextArea';
import { Button } from '../ui/Button';

const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  target_population: z.string().min(1, 'Target population is required'),
  expected_outcomes: z.array(z.string()).min(1, 'At least one expected outcome is required'),
  measurement_methods: z.array(z.string()).min(1, 'At least one measurement method is required'),
  community_partnerships: z.array(z.string()).min(1, 'At least one community partnership is required'),
});

type FormData = z.infer<typeof formSchema>;

interface ImpactInfoProps {
  initialData?: FormData | null;
  onSave: (data: FormData) => void;
}

export function ImpactInfo({ initialData, onSave }: ImpactInfoProps) {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData?.name || '',
      target_population: initialData?.target_population || '',
      expected_outcomes: initialData?.expected_outcomes || [''],
      measurement_methods: initialData?.measurement_methods || [''],
      community_partnerships: initialData?.community_partnerships || [''],
    },
    mode: 'onChange'
  });

  const { register, handleSubmit, formState: { errors, isSubmitting } } = form;

  const handleFormSubmit = async (data: FormData) => {
    try {
      await onSave(data);
    } catch (error) {
      console.error('Error saving impact info:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <div className="border-b border-gray-200 pb-6">
        <h2 className="text-xl font-semibold text-gray-900">Impact Information</h2>
        <p className="mt-1 text-sm text-gray-500">
          Create an impact information section that can be used in grant applications.
        </p>
      </div>

      <FormField
        label="Section Name"
        placeholder="Enter section name"
        error={errors.name?.message}
        {...register("name")}
      />

      <TextArea
        label="Target Population"
        placeholder="Describe your target population"
        error={errors.target_population?.message}
        {...register("target_population")}
      />

      <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-700">
          Expected Outcomes
        </label>
        {form.watch('expected_outcomes').map((_, index) => (
          <TextArea
            key={index}
            label={`Expected Outcome ${index + 1}`}
            placeholder="Enter expected outcome"
            error={errors.expected_outcomes?.[index]?.message}
            {...register(`expected_outcomes.${index}`)}
          />
        ))}
        <Button
          type="button"
          variant="outline"
          onClick={() => form.setValue('expected_outcomes', [...form.watch('expected_outcomes'), ''])}
        >
          Add Expected Outcome
        </Button>
      </div>

      <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-700">
          Measurement Methods
        </label>
        {form.watch('measurement_methods').map((_, index) => (
          <TextArea
            key={index}
            label={`Measurement Method ${index + 1}`}
            placeholder="Enter measurement method"
            error={errors.measurement_methods?.[index]?.message}
            {...register(`measurement_methods.${index}`)}
          />
        ))}
        <Button
          type="button"
          variant="outline"
          onClick={() => form.setValue('measurement_methods', [...form.watch('measurement_methods'), ''])}
        >
          Add Measurement Method
        </Button>
      </div>

      <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-700">
          Community Partnerships
        </label>
        {form.watch('community_partnerships').map((_, index) => (
          <FormField
            key={index}
            label={`Community Partnership ${index + 1}`}
            placeholder="Enter community partnership"
            error={errors.community_partnerships?.[index]?.message}
            {...register(`community_partnerships.${index}`)}
          />
        ))}
        <Button
          type="button"
          variant="outline"
          onClick={() => form.setValue('community_partnerships', [...form.watch('community_partnerships'), ''])}
        >
          Add Community Partnership
        </Button>
      </div>

      <div className="flex justify-end pt-6">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : 'Save Impact Information'}
        </Button>
      </div>
    </form>
  );
} 