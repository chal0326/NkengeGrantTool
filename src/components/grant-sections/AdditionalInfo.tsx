import { useFormContext } from 'react-hook-form';

export function AdditionalInfo() {
  const { register } = useFormContext();

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Additional Information</h2>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Additional Comments
        </label>
        <textarea
          {...register('additionalComments')}
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>
    </div>
  );
} 