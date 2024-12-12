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

export interface Template {
  id: string;
  name: string;
  content: string;
  category: 'organization_info' | 'project_details' | 'financial_info' | 'impact_info';
  created_at: string;
  updated_at: string;
}

export interface GrantApplication {
  id: string;
  grant_id: string;
  content: string;
  status: 'draft' | 'review' | 'final';
  created_at: string;
  updated_at: string;
}