import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { IndianRupee, TrendingUp, Clock, Users } from 'lucide-react';
import { StatsCard } from './StatsCard';
import {Coffee, Utensils, Cookie} from 'lucide-react';
const weeklyData = [
    { day: 'Mon', snacks: 450, meals: 780, beverages: 320 },
    { day: 'Tue', snacks: 520, meals: 890, beverages: 350 },
    { day: 'Wed', snacks: 600, meals: 750, beverages: 400 },
    { day: 'Thu', snacks: 480, meals: 810, beverages: 380 },
    { day: 'Fri', snacks: 750, meals: 920, beverages: 420 },
];

const monthlyData = [
    { month: 'January', snacks: 2800, meals: 4150, beverages: 1870 },
    { month: 'February', snacks: 3100, meals: 4300, beverages: 1920 },
    { month: 'March', snacks: 2900, meals: 4250, beverages: 1850 },
    { month: 'April', snacks: 3200, meals: 4400, beverages: 2100 },
    { month: 'May', snacks: 3300, meals: 4600, beverages: 2200 },
    { month: 'June', snacks: 3000, meals: 4200, beverages: 1950 },
    { month: 'July', snacks: 2900, meals: 4100, beverages: 1900 },
    { month: 'August', snacks: 3100, meals: 4300, beverages: 2000 },
    { month: 'September', snacks: 3400, meals: 4700, beverages: 2300 },
    { month: 'October', snacks: 3200, meals: 4500, beverages: 2150 },
    { month: 'November', snacks: 3300, meals: 4600, beverages: 2250 },
    { month: 'December', snacks: 3500, meals: 4800, beverages: 2400 }
];

const yearlyData = [
    { year: '2023', snacks: 36000, meals: 52000, beverages: 24000 },
    { year: '2024', snacks: 38500, meals: 54500, beverages: 25500 },
    { year: '2025', snacks: 41000, meals: 57000, beverages: 27000 }, 
];

const categoryData = {
    beverages: {
        items: ['Coffee', 'Tea', 'Juice', 'Soda', 'Water'],
        icon: Coffee,
        color: '#047857'
    },
    meals: {
        items: ['Breakfast', 'Lunch', 'Dinner', 'Combos', 'Specials'],
        icon: Utensils,
        color: '#059669'
    },
    snacks: {
        items: ['Chips', 'Sandwiches', 'Fruits', 'Cookies', 'Nuts'],
        icon: Cookie,
        color: '#34d399'
    }
};

export const Dashboard = () => {
    const [timeframe, setTimeframe] = useState('weekly');

    const pieData = [
        { name: 'Snacks', value: 35 },
        { name: 'Meals', value: 45 },
        { name: 'Beverages', value: 20 },
    ];

    const COLORS = ['#34d399', '#059669', '#047857'];

    const getActiveData = () => {
        switch (timeframe) {
            case 'weekly': return weeklyData;
            case 'monthly': return monthlyData;
            case 'yearly': return yearlyData;
            default: return weeklyData;
        }
    };

    const getXAxisKey = () => {
        switch (timeframe) {
            case 'weekly': return 'day';
            case 'monthly': return 'month';
            case 'yearly': return 'year';
            default: return 'day';
        }
    };

    return (
        <div className="p-8 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <StatsCard 
                    title="Total Revenue" 
                    value="₹24,780" 
                    icon={IndianRupee}
                    trend={8.2}
                />
                <StatsCard 
                    title="Total Orders" 
                    value="1,245" 
                    icon={TrendingUp}
                    trend={5.4}
                />
                <StatsCard 
                    title="Peak Time" 
                    value="12 PM - 2 PM" 
                    icon={Clock}
                />
                <StatsCard 
                    title="Daily Customers" 
                    value="456" 
                    icon={Users}
                    trend={3.1}
                />
            </div>
            <div className="flex justify-end">
                <Tabs defaultValue="weekly" onValueChange={setTimeframe}>
                    <TabsList className="bg-emerald-100">
                        <TabsTrigger value="weekly">Weekly</TabsTrigger>
                        <TabsTrigger value="monthly">Monthly</TabsTrigger>
                        <TabsTrigger value="yearly">Yearly</TabsTrigger>
                    </TabsList>
                </Tabs>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-white">
                    <CardHeader>
                        <CardTitle className="text-emerald-900">Sales Overview</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={getActiveData()}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis 
                                    dataKey={getXAxisKey()} 
                                    angle={timeframe === 'monthly' ? -45 : 0}
                                    textAnchor={timeframe === 'monthly' ? 'end' : 'middle'}
                                    height={60}
                                />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="snacks" fill="#34d399" />
                                <Bar dataKey="meals" fill="#059669" />
                                <Bar dataKey="beverages" fill="#047857" />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
                <Card className="bg-white">
          <CardHeader>
            <CardTitle className="text-emerald-900">Category Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-₹{index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-white md:col-span-2">
          <CardHeader>
            <CardTitle className="text-emerald-900">Trend Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={getActiveData()}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey={getXAxisKey()} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="snacks" stroke="#34d399" />
                <Line type="monotone" dataKey="meals" stroke="#059669" />
                <Line type="monotone" dataKey="beverages" stroke="#047857" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
            </div>
        </div>
    );
};