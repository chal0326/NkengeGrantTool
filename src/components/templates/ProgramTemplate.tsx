import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FormField } from '../form/FormField';
import { TextArea } from '../form/TextArea';
import { Button } from '../ui/Button';
import { MultiSelect } from '../ui/MultiSelect';
import { useTemplateOptions } from '../../hooks/useTemplateOptions';
import type { ProgramTemplate as ProgramTemplateType } from '../../types';

const formSchema = z.object({
  name: z.string().min(1, 'Program name is required'),
  description: z.string().min(1, 'Description is required'),
  impact: z.string().min(1, 'Impact description is required'),
  artForms: z.array(z.string()).optional(),
  programTypes: z.array(z.string()).optional(),
});

type FormData = z.infer<typeof formSchema>;

interface ProgramTemplateProps {
  initialData?: ProgramTemplateType | null;
  onSave: (data: ProgramTemplateType) => void;
}

const defaultValues: FormData = {
  name: '',
  description: '',
  impact: '',
  artForms: [],
  programTypes: [],
};

export function ProgramTemplate({ initialData, onSave }: ProgramTemplateProps) {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || defaultValues,
  });

  const { register, handleSubmit, setValue, watch, formState: { errors } } = form;

  const { options: artFormOptions } = useTemplateOptions('art_forms');
  const { options: programTypeOptions } = useTemplateOptions('program_types');

  const selectedArtForms = watch('artForms') || [];
  const selectedProgramTypes = watch('programTypes') || [];

  const handleArtFormsChange = (selectedIds: string[]) => {
    setValue('artForms', selectedIds);
  };

  const handleProgramTypesChange = (selectedIds: string[]) => {
    setValue('programTypes', selectedIds);
  };

  const handleFormSubmit = (data: FormData) => {
    onSave({
      ...data,
      type: 'program',
    } as ProgramTemplateType);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <div className="border-b border-gray-200 pb-6">
        <h2 className="text-xl font-semibold text-gray-900">Program Template</h2>
        <p className="mt-1 text-sm text-gray-500">
          Create a reusable program template that can be referenced in organization templates.
        </p>
      </div>
      <FormField
        {...register('name')}
        label="Program Name"
        placeholder="Enter the program name"
        error={errors.name?.message}
      />
      <TextArea
        {...register('description')}
        label="Program Description"
        placeholder="Describe the program's purpose and activities"
        error={errors.description?.message}
      />
      <TextArea
        {...register('impact')}
        label="Program Impact"
        placeholder="Describe the program's impact on the community"
        error={errors.impact?.message}
      />

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
        <label className="block text-sm font-medium text-gray-700">Program Types</label>
        <MultiSelect
          options={programTypeOptions.map(opt => ({ id: opt.value, label: opt.label }))}
          selectedIds={selectedProgramTypes}
          onChange={handleProgramTypesChange}
          placeholder="Select program types..."
        />
      </div>

      <div className="flex justify-end pt-6">
        <Button type="submit">
          Save Program Template
        </Button>
      </div>
    </form>
  );
} 