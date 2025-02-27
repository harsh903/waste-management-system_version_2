'use client';

import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { useAuth } from '@/lib/context/AuthContext';
import Button from '@/components/ui/Button';

export default function Reports() {
  const { user } = useAuth();

  // Sample data for waste type distribution
  const wasteTypeData = [
    { name: 'Plastic', value: 200 },
    { name: 'Paper', value: 150 },
    { name: 'Organic', value: 100 },
    { name: 'Metal', value: 50 }
  ];

  // Sample data for monthly waste volume
  const monthlyWasteData = [
    { month: 'Jan', volume: 180 },
    { month: 'Feb', volume: 220 },
    { month: 'Mar', volume: 190 },
    { month: 'Apr', volume: 250 },
    { month: 'May', volume: 210 },
    { month: 'Jun', volume: 200 }
  ];

  // Colors for pie chart
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <DashboardLayout 
      title="Waste Management Reports" 
      allowedRoles={['business']}
    >
      <div className="mb-8">
        <h2 className="text-lg font-medium text-gray-700 mb-2">Comprehensive Waste Reports</h2>
        <p className="text-gray-500">
          Analyze your waste management performance and track environmental impact.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="card">
          <div className="card-header">
            <h3 className="text-lg font-medium text-gray-900">Waste Type Distribution</h3>
          </div>
          <div className="card-content">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={wasteTypeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {wasteTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3 className="text-lg font-medium text-gray-900">Monthly Waste Volume</h3>
          </div>
          <div className="card-content">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyWasteData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="volume" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="text-lg font-medium text-gray-900">Detailed Reporting</h3>
        </div>
        <div className="card-content">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-gray-50 rounded-md">
              <h4 className="text-sm font-medium text-gray-500 mb-2">Total Waste Disposed</h4>
              <p className="text-2xl font-semibold text-gray-900">1,200 kg</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-md">
              <h4 className="text-sm font-medium text-gray-500 mb-2">Recycling Rate</h4>
              <p className="text-2xl font-semibold text-gray-900">65%</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-md">
              <h4 className="text-sm font-medium text-gray-500 mb-2">Carbon Saved</h4>
              <p className="text-2xl font-semibold text-gray-900">320 kg CO2</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <Button>Download Full Report</Button>
      </div>
    </DashboardLayout>
  );
}