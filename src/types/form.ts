import { UseFormRegister, FieldValues } from 'react-hook-form';

export interface BaseFormFieldProps {
  name: string;
  label: string;
  placeholder?: string;
  error?: string;
  type?: string;
}

export interface FormFieldProps<T extends FieldValues> extends BaseFormFieldProps {
  register: UseFormRegister<T>;
}

export interface TextAreaProps<T extends FieldValues> extends BaseFormFieldProps {
  register: UseFormRegister<T>;
  name: keyof T & string;
} 