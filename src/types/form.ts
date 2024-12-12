import { UseFormRegister } from 'react-hook-form';

export interface BaseFormFieldProps {
  name: string;
  label: string;
  placeholder?: string;
  error?: string;
  type?: string;
}

export interface FormFieldProps<T> extends BaseFormFieldProps {
  register: UseFormRegister<T>;
}

export interface TextAreaProps<T> extends BaseFormFieldProps {
  register: UseFormRegister<T>;
} 