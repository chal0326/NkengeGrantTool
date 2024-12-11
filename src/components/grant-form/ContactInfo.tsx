import React from 'react';
import { FormField } from '../form/FormField';

export function ContactInfo() {
  return (
    <div className="space-y-6">
      <div className="border-b border-gray-200 pb-6">
        <h2 className="text-xl font-semibold text-gray-900">Contact Information</h2>
        <p className="mt-1 text-sm text-gray-500">
          Please provide contact details for the grant application.
        </p>
      </div>

      <FormField
        name="contact.name"
        label="Primary Contact Name"
        placeholder="Enter the name of the primary contact"
      />

      <FormField
        name="contact.title"
        label="Title/Position"
        placeholder="Enter the contact's title or position"
      />

      <FormField
        name="contact.email"
        label="Email Address"
        type="email"
        placeholder="Enter contact email address"
      />

      <FormField
        name="contact.phone"
        label="Phone Number"
        placeholder="Enter contact phone number"
      />

      <FormField
        name="alternateContact.name"
        label="Alternate Contact Name"
        placeholder="Enter the name of an alternate contact"
      />

      <FormField
        name="alternateContact.email"
        label="Alternate Contact Email"
        type="email"
        placeholder="Enter alternate contact email"
      />
    </div>
  );
}