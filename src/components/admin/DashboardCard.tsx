'use client';

import { Card, CardContent } from '@/components/ui/card';
import { ReactNode } from 'react';

interface DashboardCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
}

export default function DashboardCard({ title, value, icon }: DashboardCardProps) {
  return (
    <Card className="w-full rounded-2xl shadow hover:shadow-lg transition p-4">
      <CardContent className="flex items-center gap-4">
        <div className="text-4xl text-pink-600">{icon}</div>
        <div>
          <h4 className="text-sm text-gray-500">{title}</h4>
          <p className="text-xl font-semibold text-gray-800">{value}</p>
        </div>
      </CardContent>
    </Card>
  );
}
