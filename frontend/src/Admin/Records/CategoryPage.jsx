import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { IndianRupee, Clock, Users } from 'lucide-react';
import { StatsCard } from './StatsCard';
import { categoryData } from './mockData';

export const CategoryPage = ({ category }) => {
  const timeData = [
    { time: '6 AM', sales: 120 },
    { time: '9 AM', sales: 300 },
    { time: '12 PM', sales: 450 },
    { time: '3 PM', sales: 280 },
    { time: '6 PM', sales: 200 }
  ];

  return (
    <div className="p-8 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatsCard 
          title="Daily Sales" 
          value={`${(Math.random() * 1000).toFixed(2)}`} 
          icon={IndianRupee}
          trend={5.2}
        />
        <StatsCard 
          title="Items Sold" 
          value={(Math.random() * 100).toFixed(0)} 
          icon={categoryData[category].icon}
          trend={-2.1}
        />
        <StatsCard 
          title="Peak Hours" 
          value="12 PM - 2 PM" 
          icon={Clock}
        />
        <StatsCard 
          title="Customer Count" 
          value={(Math.random() * 200).toFixed(0)} 
          icon={Users}
          trend={3.8}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="text-emerald-900">Popular Items</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {categoryData[category].items.map((item, index) => (
                <li key={index} className="flex justify-between items-center p-3 bg-emerald-50 rounded">
                  <span>{item}</span>
                  <span className="text-emerald-600 font-medium">
                    {(Math.random() * 100).toFixed(0)} sold
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="text-emerald-900">Sales Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={timeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="sales" stroke={categoryData[category].color} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
