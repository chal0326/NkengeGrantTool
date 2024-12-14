export type TransactionType = 'income' | 'expense';

export interface TransactionCategory {
  id: string;
  name: string;
  type: TransactionType;
  description?: string;
  created_at: string;
  updated_at: string;
}

export interface FinancialTransaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: TransactionType;
  category_id: string;
  grant_id?: string;
  project_id?: string;
  created_at: string;
  updated_at: string;
  
  // Joined fields
  category?: TransactionCategory;
}

export interface FinancialSummary {
  totalIncome: number;
  totalExpenses: number;
  balance: number;
  grantFunds: number;
  payrollExpenses: number;
}

export interface TransactionFilters {
  startDate?: string;
  endDate?: string;
  type?: TransactionType;
  categoryId?: string;
  grantId?: string;
  projectId?: string;
  minAmount?: number;
  maxAmount?: number;
} 