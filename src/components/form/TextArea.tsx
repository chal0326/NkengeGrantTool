import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface TextAreaProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'name'> {
  label: string;
  error?: string;
  registration?: UseFormRegisterReturn;
}

export function TextArea({
  label,
  error,
  className = '',
  rows = 3,
  registration,
  ...props
}: TextAreaProps) {
  const id = props.id || registration?.name;

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="mt-1">
        <textarea
          id={id}
          rows={rows}
          className={`shadow-sm focus:ring-purple-500 focus:border-purple-500 block w-full sm:text-sm border border-gray-300 rounded-md ${className}`}
          {...registration}
          {...props}
        />
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}