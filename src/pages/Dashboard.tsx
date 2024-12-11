import React from 'react';
import { StatItem } from '../components/ui/Stats';
import { GrantList } from '../components/grants/GrantList';
import { useGrants } from '../hooks/useGrants';
import { Target, DollarSign, Clock, Award } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const { grants, loading, error } = useGrants();
  const navigate = useNavigate();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const totalGrants = grants.length;
  const totalAmount = grants.reduce((sum, grant) => sum + grant.amount, 0);
  const activeGrants = grants.filter(g => g.status === 'in_progress').length;
  const approvedGrants = grants.filter(g => g.status === 'approved').length;

  const upcomingGrants = grants
    .filter(g => g.status === 'in_progress')
    .sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime())
    .slice(0, 5);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <Button onClick={() => navigate('/grants')}>
          Search Grants
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatItem
          title="Total Grants"
          value={totalGrants}
          icon={<Target className="w-6 h-6" />}
        />
        <StatItem
          title="Total Amount"
          value={new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(totalAmount)}
          icon={<DollarSign className="w-6 h-6" />}
        />
        <StatItem
          title="Active Applications"
          value={activeGrants}
          icon={<Clock className="w-6 h-6" />}
        />
        <StatItem
          title="Approved Grants"
          value={approvedGrants}
          icon={<Award className="w-6 h-6" />}
        />
      </div>

      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Upcoming Deadlines</h2>
        <GrantList 
          grants={upcomingGrants}
          onSelectGrant={(grant) => navigate(`/grants/${grant.id}`)}
        />
      </div>
    </div>
  );
}