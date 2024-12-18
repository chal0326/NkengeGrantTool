import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().min(1, 'Contact name is required'),
  title: z.string().min(1, 'Contact title is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().regex(/^\+?[\d\s-()]+$/, 'Invalid phone number'),
});

export const milestoneSchema = z.object({
  date: z.string(),
  description: z.string().min(1, 'Milestone description is required'),
});

export const fundingSourceSchema = z.object({
  source: z.string().min(1, 'Funding source name is required'),
  amount: z.number().positive('Amount must be positive'),
  status: z.enum(['pending', 'confirmed', 'rejected']),
});

// This should match the grant types in the database
export const grantTypeEnum = [
  'identified',
  'in_progress',
  'submitted',
  'approved',
  'rejected'
] as const;

export type GrantType = typeof grantTypeEnum[number];

export const grantSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  organization: z.string().min(1, 'Organization is required'),
  amount: z.number().min(0, 'Amount must be positive'),
  deadline: z.string().min(1, 'Deadline is required'),
  description: z.string().min(1, 'Description is required'),
  requirements: z.string(),
  notes: z.string(),
  type: z.enum(grantTypeEnum),
  opportunity_number: z.string().optional(),
  opportunity_url: z.string().optional(),
  agency_code: z.string().optional(),
  opportunity_status: z.string().optional(),
  posted_date: z.string().optional(),
  close_date: z.string().optional(),
  source_fields: z.record(z.string(), z.string()).optional(),
});

export type Grant = z.infer<typeof grantSchema> & {
  id: string;
  created_at: string;
  updated_at: string;
};

export type GrantFormData = z.infer<typeof grantSchema>;

// CSV import types
export interface CSVMapping {
  fieldName: string;
  mappedTo: keyof GrantFormData | string;
  required: boolean;
}

export interface CSVImportConfig {
  mappings: CSVMapping[];
  defaultValues?: Partial<GrantFormData>;
}