import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'name'> {
  error?: string;
  registration?: UseFormRegisterReturn;
}

export function Input({ className = '', error, registration, ...props }: InputProps) {
  return (
    <div>
      <input
        className={`shadow-sm focus:ring-purple-500 focus:border-purple-500 block w-full sm:text-sm border-gray-300 rounded-md ${className}`}
        {...registration}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
} 