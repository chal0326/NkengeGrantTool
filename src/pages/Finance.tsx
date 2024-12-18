import { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { DollarSign, FileText, Users, CreditCard } from 'lucide-react';
import { TransactionForm } from '../components/finance/TransactionForm';
import { TransactionList } from '../components/finance/TransactionList';
import { TransactionFilters } from '../components/finance/TransactionFilters';
import { useFinance } from '../hooks/useFinance';
import type { FinancialTransaction, TransactionFilters as Filters } from '../types/finance';

export default function Finance() {
  const {
    transactions,
    categories,
    summary,
    loading,
    error,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    filterTransactions,
  } = useFinance();

  const [showForm, setShowForm] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<FinancialTransaction | null>(null);
  const [filters, setFilters] = useState<Filters>({});

  const handleSubmit = async (data: Omit<FinancialTransaction, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      if (selectedTransaction) {
        await updateTransaction(selectedTransaction.id, data);
      } else {
        await addTransaction(data);
      }
      setShowForm(false);
      setSelectedTransaction(null);
    } catch (error) {
      console.error('Error saving transaction:', error);
    }
  };

  const handleEdit = (transaction: FinancialTransaction) => {
    setSelectedTransaction(transaction);
    setShowForm(true);
  };

  const handleDelete = async (transaction: FinancialTransaction) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      try {
        await deleteTransaction(transaction.id);
      } catch (error) {
        console.error('Error deleting transaction:', error);
      }
    }
  };

  const handleFilterChange = (newFilters: Filters) => {
    setFilters(newFilters);
    filterTransactions(newFilters);
  };

  const resetFilters = () => {
    setFilters({});
    filterTransactions({});
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Finance</h1>
        <div className="space-x-4">
          <Button variant="outline">Export</Button>
          <Button onClick={() => setShowForm(true)}>Add Transaction</Button>
        </div>
      </div>

      {/* Financial Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Total Grant Funds</p>
              <p className="text-2xl font-semibold">
                {new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD',
                }).format(summary.grantFunds)}
              </p>
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <CreditCard className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Total Expenses</p>
              <p className="text-2xl font-semibold">
                {new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD',
                }).format(summary.totalExpenses)}
              </p>
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Payroll</p>
              <p className="text-2xl font-semibold">
                {new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD',
                }).format(summary.payrollExpenses)}
              </p>
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <FileText className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Available Balance</p>
              <p className="text-2xl font-semibold">
                {new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD',
                }).format(summary.balance)}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Transaction Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-2xl">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                {selectedTransaction ? 'Edit Transaction' : 'Add Transaction'}
              </h2>
              <TransactionForm
                initialData={selectedTransaction || undefined}
                categories={categories}
                onSubmit={handleSubmit}
                onCancel={() => {
                  setShowForm(false);
                  setSelectedTransaction(null);
                }}
              />
            </div>
          </Card>
        </div>
      )}

      {/* Filters */}
      <TransactionFilters
        categories={categories}
        filters={filters}
        onFilterChange={handleFilterChange}
        onReset={resetFilters}
      />

      {/* Transaction List */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900">General Ledger</h2>
        </div>
        
        <Card>
          <TransactionList
            transactions={transactions}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </Card>
      </div>
    </div>
  );
}
