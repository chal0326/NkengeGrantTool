import React from 'react';
import { FormFieldProps } from '../../types/form';

export function FormField<T>({
  register,
  name,
  label,
  type = 'text',
  placeholder,
  error,
}: FormFieldProps<T>) {
  return (
    <div className="space-y-2">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        {...register(name)}
        type={type}
        id={name}
        placeholder={placeholder}
        className={`block w-full rounded-md border ${
          error ? 'border-red-300' : 'border-gray-300'
        } shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm`}
      />
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}