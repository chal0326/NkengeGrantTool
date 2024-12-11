import React from 'react';
import { Grant } from '../../types';
import { Card } from '../ui/Card';
import { Calendar, DollarSign } from 'lucide-react';
import { format } from 'date-fns';

interface GrantListProps {
  grants: Grant[];
  onSelectGrant?: (grant: Grant) => void;
}

export function GrantList({ grants, onSelectGrant }: GrantListProps) {
  return (
    <div className="space-y-4">
      {grants.map((grant) => (
        <Card 
          key={grant.id}
          className="cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => onSelectGrant?.(grant)}
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{grant.name}</h3>
              <p className="text-sm text-gray-600">{grant.organization}</p>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(grant.status)}`}>
              {grant.status.replace('_', ' ')}
            </span>
          </div>
          <div className="mt-4 flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center">
              <DollarSign className="w-4 h-4 mr-1" />
              {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(grant.amount)}
            </div>
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              {format(new Date(grant.deadline), 'MMM d, yyyy')}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

function getStatusColor(status: Grant['status']) {
  const colors = {
    identified: 'bg-gray-100 text-gray-800',
    in_progress: 'bg-blue-100 text-blue-800',
    submitted: 'bg-yellow-100 text-yellow-800',
    approved: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800'
  };
  return colors[status];
}