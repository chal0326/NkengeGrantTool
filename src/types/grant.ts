import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().min(1, 'Contact name is required'),
  title: z.string().min(1, 'Contact title is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().regex(/^\+?[\d\s-()]+$/, 'Invalid phone number'),
});

const milestoneSchema = z.object({
  date: z.string(),
  description: z.string().min(1, 'Milestone description is required'),
});

const fundingSourceSchema = z.object({
  source: z.string().min(1, 'Funding source name is required'),
  amount: z.number().positive('Amount must be positive'),
  status: z.enum(['pending', 'confirmed', 'rejected']),
});

export const grantFormSchema = z.object({
  // Organization Information
  organizationName: z.string().min(1, 'Organization name is required'),
  hasNonProfitStatus: z.boolean(),
  irsLetter: z.instanceof(FileList).optional(),
  ein: z.string().regex(/^\d{2}-\d{7}$/, 'Invalid EIN format'),
  missionStatement: z.string().min(1, 'Mission statement is required'),
  organizationHistory: z.string().min(1, 'Organization history is required'),
  
  // Contact Information
  contact: contactSchema,
  alternateContact: contactSchema,

  // Project Details
  project: z.object({
    name: z.string().min(1, 'Project name is required'),
    description: z.string().min(1, 'Project description is required'),
    goals: z.array(z.string()).min(1, 'At least one goal is required'),
    targetAudience: z.string().min(1, 'Target audience is required'),
    alignment: z.string().min(1, 'Grant alignment is required'),
    timeline: z.object({
      startDate: z.string(),
      endDate: z.string(),
      milestones: z.array(milestoneSchema),
    }),
    outcomes: z.string().min(1, 'Expected outcomes are required'),
    measurement: z.string().min(1, 'Success measurement criteria are required'),
  }),

  // Financial Information
  financial: z.object({
    annualBudget: z.number().positive('Annual budget must be positive'),
    projectBudget: z.number().positive('Project budget must be positive'),
    requestedAmount: z.number().positive('Requested amount must be positive'),
    isFullyFunded: z.boolean(),
    otherFunding: z.array(fundingSourceSchema),
    financialStatements: z.instanceof(FileList).optional(),
  }),

  // Impact Information
  impact: z.object({
    communityContribution: z.string().min(1, 'Community contribution is required'),
    communityNeeds: z.string().min(1, 'Community needs are required'),
    beneficiaries: z.string().min(1, 'Beneficiary information is required'),
    equity: z.string().min(1, 'Equity statement is required'),
  }),

  // Supporting Documents
  workSamples: z.instanceof(FileList).optional(),
  supportLetters: z.instanceof(FileList).optional(),
});

export type GrantFormData = z.infer<typeof grantFormSchema>;