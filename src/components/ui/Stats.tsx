import React from 'react';
import { Card } from './Card';

interface StatItemProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
}

export function StatItem({ title, value, icon }: StatItemProps) {
  return (
    <Card className="flex items-center">
      <div className="p-3 rounded-full bg-purple-100 text-purple-600">
        {icon}
      </div>
      <div className="ml-4">
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="text-2xl font-semibold text-gray-900">{value}</p>
      </div>
    </Card>
  );
}