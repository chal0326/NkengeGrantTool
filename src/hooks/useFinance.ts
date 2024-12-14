import { useState, useEffect, useCallback } from 'react';
import supabase from '../lib/supabase';
import type { 
  FinancialTransaction, 
  TransactionCategory,
  FinancialSummary,
  TransactionFilters,
  TransactionType 
} from '../types/finance';

interface UseFinanceReturn {
  transactions: FinancialTransaction[];
  categories: TransactionCategory[];
  summary: FinancialSummary;
  loading: boolean;
  error: Error | null;
  addTransaction: (transaction: Omit<FinancialTransaction, 'id' | 'created_at' | 'updated_at'>) => Promise<void>;
  updateTransaction: (id: string, transaction: Partial<FinancialTransaction>) => Promise<void>;
  deleteTransaction: (id: string) => Promise<void>;
  filterTransactions: (filters: TransactionFilters) => Promise<void>;
}

export function useFinance(): UseFinanceReturn {
  const [transactions, setTransactions] = useState<FinancialTransaction[]>([]);
  const [categories, setCategories] = useState<TransactionCategory[]>([]);
  const [summary, setSummary] = useState<FinancialSummary>({
    totalIncome: 0,
    totalExpenses: 0,
    balance: 0,
    grantFunds: 0,
    payrollExpenses: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const calculateSummary = useCallback((transactions: FinancialTransaction[]) => {
    const summary = transactions.reduce(
      (acc, transaction) => {
        if (transaction.type === 'income') {
          acc.totalIncome += transaction.amount;
          if (transaction.category?.name === 'Grant Income') {
            acc.grantFunds += transaction.amount;
          }
        } else {
          acc.totalExpenses += transaction.amount;
          if (transaction.category?.name === 'Payroll') {
            acc.payrollExpenses += transaction.amount;
          }
        }
        return acc;
      },
      {
        totalIncome: 0,
        totalExpenses: 0,
        grantFunds: 0,
        payrollExpenses: 0,
        balance: 0,
      }
    );

    summary.balance = summary.totalIncome - summary.totalExpenses;
    return summary;
  }, []);

  const fetchTransactions = useCallback(async (filters?: TransactionFilters) => {
    try {
      setLoading(true);
      let query = supabase
        .from('financial_transactions')
        .select(`
          *,
          category:transaction_categories(*)
        `)
        .order('date', { ascending: false });

      if (filters) {
        if (filters.startDate) query = query.gte('date', filters.startDate);
        if (filters.endDate) query = query.lte('date', filters.endDate);
        if (filters.type) query = query.eq('type', filters.type);
        if (filters.categoryId) query = query.eq('category_id', filters.categoryId);
        if (filters.grantId) query = query.eq('grant_id', filters.grantId);
        if (filters.projectId) query = query.eq('project_id', filters.projectId);
        if (filters.minAmount) query = query.gte('amount', filters.minAmount);
        if (filters.maxAmount) query = query.lte('amount', filters.maxAmount);
      }

      const { data, error: fetchError } = await query;

      if (fetchError) throw fetchError;

      const typedTransactions = data as FinancialTransaction[];
      setTransactions(typedTransactions);
      setSummary(calculateSummary(typedTransactions));
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch transactions'));
    } finally {
      setLoading(false);
    }
  }, [calculateSummary]);

  const fetchCategories = useCallback(async () => {
    try {
      const { data, error: fetchError } = await supabase
        .from('transaction_categories')
        .select('*')
        .order('name');

      if (fetchError) throw fetchError;
      setCategories(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch categories'));
    }
  }, []);

  useEffect(() => {
    Promise.all([fetchTransactions(), fetchCategories()]);
  }, [fetchTransactions, fetchCategories]);

  const addTransaction = async (transaction: Omit<FinancialTransaction, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { error: insertError } = await supabase
        .from('financial_transactions')
        .insert(transaction);

      if (insertError) throw insertError;
      await fetchTransactions();
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to add transaction'));
      throw err;
    }
  };

  const updateTransaction = async (id: string, transaction: Partial<FinancialTransaction>) => {
    try {
      const { error: updateError } = await supabase
        .from('financial_transactions')
        .update(transaction)
        .eq('id', id);

      if (updateError) throw updateError;
      await fetchTransactions();
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to update transaction'));
      throw err;
    }
  };

  const deleteTransaction = async (id: string) => {
    try {
      const { error: deleteError } = await supabase
        .from('financial_transactions')
        .delete()
        .eq('id', id);

      if (deleteError) throw deleteError;
      await fetchTransactions();
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to delete transaction'));
      throw err;
    }
  };

  const filterTransactions = async (filters: TransactionFilters) => {
    await fetchTransactions(filters);
  };

  return {
    transactions,
    categories,
    summary,
    loading,
    error,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    filterTransactions,
  };
} 