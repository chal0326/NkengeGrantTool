import React from 'react';
import { useFormContext } from 'react-hook-form';
import UploadIcon from 'lucide-react/dist/esm/icons/upload';

interface FileUploadProps {
  name: string;
  label: string;
  accept?: string;
  multiple?: boolean;
  condition?: string;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  name,
  label,
  accept,
  multiple = false,
  condition,
}) => {
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext();

  const conditionValue = condition ? watch(condition) : true;
  const error = errors[name]?.message as string | undefined;

  if (condition && !conditionValue) {
    return null;
  }

  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-gray-400 transition-colors">
        <div className="space-y-1 text-center">
          <UploadIcon className="mx-auto h-12 w-12 text-gray-400" />
          <div className="flex text-sm text-gray-600">
            <label
              htmlFor={name}
              className="relative cursor-pointer rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
            >
              <span>Upload a file</span>
              <input
                {...register(name)}
                id={name}
                type="file"
                className="sr-only"
                accept={accept}
                multiple={multiple}
              />
            </label>
            <p className="pl-1">or drag and drop</p>
          </div>
          <p className="text-xs text-gray-500">
            {accept ? `Accepted file types: ${accept}` : 'Any file type accepted'}
          </p>
        </div>
      </div>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};