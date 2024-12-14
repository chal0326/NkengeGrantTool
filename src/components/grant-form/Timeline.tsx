import { useFieldArray, useFormContext } from 'react-hook-form';
import { FormField } from '../form/FormField';
import { TextArea } from '../form/TextArea';
import { Button } from '../ui/Button';
import type { GrantFormData } from '../../types/grant';

export function Timeline() {
  const { register, control } = useFormContext<GrantFormData>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'project.timeline.milestones'
  });

  return (
    <div className="space-y-6">
      <div className="border-b border-gray-200 pb-6">
        <h2 className="text-xl font-semibold text-gray-900">Project Timeline</h2>
        <p className="mt-1 text-sm text-gray-500">
          Outline the key milestones and timeline for your project.
        </p>
      </div>

      <div className="space-y-4">
        <FormField
          {...register('project.timeline.startDate')}
          type="date"
          label="Project Start Date"
        />
        <FormField
          {...register('project.timeline.endDate')}
          type="date"
          label="Project End Date"
        />
      </div>

      <div className="space-y-4">
        {fields.map((field, index) => (
          <div key={field.id} className="flex gap-4 items-start">
            <div className="flex-1 space-y-4">
              <FormField
                {...register(`project.timeline.milestones.${index}.date`)}
                type="date"
                label="Milestone Date"
              />
              <TextArea
                {...register(`project.timeline.milestones.${index}.description`)}
                label="Milestone Description"
                placeholder="Describe this milestone"
              />
            </div>
            <Button
              type="button"
              variant="outline"
              onClick={() => remove(index)}
              className="mt-8"
            >
              Remove
            </Button>
          </div>
        ))}

        <Button
          type="button"
          variant="secondary"
          onClick={() => append({ date: '', description: '' })}
          className="w-full"
        >
          Add Milestone
        </Button>
      </div>
    </div>
  );
}