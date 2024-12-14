import { useFormContext } from 'react-hook-form';
import { FormField } from '../form/FormField';
import type { GrantFormData } from '../../types/grant';

export function ContactInfo() {
  const { register } = useFormContext<GrantFormData>();

  return (
    <div className="space-y-6">
      <div className="border-b border-gray-200 pb-6">
        <h2 className="text-xl font-semibold text-gray-900">Contact Information</h2>
        <p className="mt-1 text-sm text-gray-500">
          Please provide contact details for the grant application.
        </p>
      </div>

      <FormField
        {...register('contact.name')}
        label="Primary Contact Name"
        placeholder="Enter the name of the primary contact"
      />

      <FormField
        {...register('contact.title')}
        label="Title/Position"
        placeholder="Enter the contact's title or position"
      />

      <FormField
        {...register('contact.email')}
        type="email"
        label="Email Address"
        placeholder="Enter contact email address"
      />

      <FormField
        {...register('contact.phone')}
        label="Phone Number"
        placeholder="Enter contact phone number"
      />

      <FormField
        {...register('alternateContact.name')}
        label="Alternate Contact Name"
        placeholder="Enter the name of an alternate contact"
      />

      <FormField
        {...register('alternateContact.title')}
        label="Alternate Contact Title"
        placeholder="Enter alternate contact's title"
      />

      <FormField
        {...register('alternateContact.email')}
        type="email"
        label="Alternate Contact Email"
        placeholder="Enter alternate contact email"
      />

      <FormField
        {...register('alternateContact.phone')}
        label="Alternate Contact Phone"
        placeholder="Enter alternate contact phone number"
      />
    </div>
  );
}