import type { Database } from './database.types';
import type { TemplateOption, TemplateSelectedOption, TemplateOptionCategory } from './template-options';

export type { Database };

export interface Grant {
  id: string;
  name: string;
  organization: string;
  amount: number;
  deadline: string;
  status: 'identified' | 'in_progress' | 'submitted' | 'approved' | 'rejected';
  description: string;
  requirements: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export type TemplateType = 
  | 'organization_info'
  | 'project_details'
  | 'financial_info'
  | 'impact_info'
  | 'program'
  | 'staff_member'
  | 'project_activity'
  | 'community_partnership';

export interface Template {
  id: string;
  name: string;
  type: TemplateType;
  content: TemplateData;
  created_at: string | null;
  updated_at: string | null;
}

export interface BaseTemplate {
  type: TemplateType;
}

export interface OrganizationInfoTemplate extends BaseTemplate {
  type: 'organization_info';
  name: string;
  organizationName: string;
  hasNonProfitStatus: boolean;
  ein: string;
  missionStatement: string;
  organizationHistory: string;
  annualOperatingBudget: number;
  physicalAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  currentPrograms: ProgramTemplate[];
  bipocWomenArtsFocus: string;
  keyStaff: StaffMemberTemplate[];
  artForms: string[];
}

export interface ProjectDetailsTemplate extends BaseTemplate {
  type: 'project_details';
  name: string;
  projectGoals: string;
  targetAudience: string;
  evaluationMethods: string;
  successCriteria: string;
  sustainabilityPlan: string;
  riskMitigation: string;
  collaborationStrategy: string;
  projectActivities: ProjectActivityTemplate[];
  artProgramDetails: string;
  projectTeam: StaffMemberTemplate[];
  programTypes: string[];
}

export interface FinancialInfoTemplate extends BaseTemplate {
  type: 'financial_info';
  fundingStrategy: {
    annualBudget: number;
    projectBudget: number;
    requestedAmount: number;
    isFullyFunded: boolean;
    otherFunding: Array<{
      source: string;
      amount: number;
      status: 'pending' | 'confirmed' | 'rejected';
    }>;
  };
  budgetLineItems: BudgetItemTemplate[];
  matchingFunds: {
    required: boolean;
    percentage: number;
    secured: number;
  };
  indirectCosts: {
    rate: number;
    basis: string;
  };
}

export interface ImpactInfoTemplate extends BaseTemplate {
  type: 'impact_info';
  name: string;
  communityNeeds: string;
  equityApproach: string;
  beneficiaryFeedback: string;
  communityEngagement: string;
  demographicData: {
    categories: string[];
    collectionMethod: string;
    frequency: string;
  };
  longTermImpact: string;
  communityPartnerships: CommunityPartnershipTemplate[];
  artsSectorImpact: string;
}

export type TemplateData =
  | OrganizationInfoTemplate
  | ProjectDetailsTemplate
  | FinancialInfoTemplate
  | ImpactInfoTemplate
  | ProgramTemplate
  | StaffMemberTemplate
  | ProjectActivityTemplate
  | BudgetItemTemplate
  | DemographicCategoryTemplate
  | CommunityPartnershipTemplate;

export interface ProgramTemplate extends BaseTemplate {
  type: 'program';
  name: string;
  description: string;
  impact: string;
  artForms?: string[];
  programTypes?: string[];
}

export interface StaffMemberTemplate extends BaseTemplate {
  type: 'staff_member';
  name: string;
  title: string;
  bio: string;
  email: string;
}

export interface ProjectActivityTemplate extends BaseTemplate {
  type: 'project_activity';
  activity: string;
  method: string;
  timeline: string;
  responsibleParty: string;
}

export interface BudgetItemTemplate extends BaseTemplate {
  type: 'budget_item';
  category: string;
  description: string;
  amount: number;
}

export interface DemographicCategoryTemplate extends BaseTemplate {
  type: TemplateType;
  category: string;
  description: string;
  collectionMethod: string;
}

export interface CommunityPartnershipTemplate extends BaseTemplate {
  type: 'community_partnership';
  partner: string;
  role: string;
  contribution: string;
}

export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export interface GrantApplication {
  id: string;
  grant_id: string;
  content: string;
  status: 'draft' | 'review' | 'final';
  created_at: string;
  updated_at: string;
}

export type { TemplateOption, TemplateSelectedOption, TemplateOptionCategory };