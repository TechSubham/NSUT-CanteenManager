import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

export const StatsCard = ({ title, value, icon: Icon, trend }) => (
  <Card className="bg-white">
    <CardContent className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <h3 className="text-2xl font-bold text-emerald-900 mt-2">{value}</h3>
          {trend && (
            <p className={`text-sm mt-2 ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}% from last period
            </p>
          )}
        </div>
        <div className="p-4 bg-emerald-100 rounded-full">
          <Icon className="w-6 h-6 text-emerald-600" />
        </div>
      </div>
    </CardContent>
  </Card>
);