import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface FormFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'name'> {
  label: string;
  error?: string;
  registration?: UseFormRegisterReturn;
}

export function FormField({
  label,
  error,
  className = '',
  type = 'text',
  registration,
  ...props
}: FormFieldProps) {
  const id = props.id || registration?.name;

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="mt-1">
        {type === 'checkbox' ? (
          <input
            type="checkbox"
            id={id}
            className={`h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded ${className}`}
            {...registration}
            {...props}
          />
        ) : (
          <input
            type={type}
            id={id}
            className={`shadow-sm focus:ring-purple-500 focus:border-purple-500 block w-full sm:text-sm border-gray-300 rounded-md ${className}`}
            {...registration}
            {...props}
          />
        )}
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}