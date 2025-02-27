'use client';

import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { 
  ChartBarIcon, 
  TruckIcon,
  ArrowDownTrayIcon,
  ChartPieIcon
} from '@heroicons/react/24/outline';
import Button from '@/components/ui/Button';
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

const Analytics = () => {
  // Sample data for waste collection volume by provider
  const wasteProviderData = [
    { provider: 'Green Waste Solutions', volume: 5200 },
    { provider: 'Eco Disposal Inc.', volume: 4100 },
    { provider: 'Urban Recycling Co.', volume: 3800 },
    { provider: 'Sustainable Waste Management', volume: 2900 }
  ];

  // Sample data for waste type distribution
  const wasteTypeData = [
    { name: 'Industrial', value: 40 },
    { name: 'Commercial', value: 30 },
    { name: 'Residential', value: 20 },
    { name: 'Other', value: 10 }
  ];

  // Colors for pie chart
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <DashboardLayout 
      title="Analytics" 
      allowedRoles={['government']}
    >
      <div className="mb-8">
        <h2 className="text-lg font-medium text-gray-700 mb-2">
          Comprehensive Waste Management Analytics
        </h2>
        <p className="text-gray-500">
          Analyze waste management performance and trends across the region.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="stat-card">
          <div className="flex justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Waste Collected</p>
              <p className="mt-1 text-2xl font-semibold text-gray-900">
                15,000 kg
              </p>
            </div>
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-100 text-blue-600">
              <TruckIcon className="h-6 w-6" />
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="flex justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Recycling Rate</p>
              <p className="mt-1 text-2xl font-semibold text-gray-900">
                65%
              </p>
            </div>
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-green-100 text-green-600">
              <ChartBarIcon className="h-6 w-6" />
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="flex justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Carbon Offset</p>
              <p className="mt-1 text-2xl font-semibold text-gray-900">
                3,200 kg CO2
              </p>
            </div>
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-yellow-100 text-yellow-600">
              <ChartPieIcon className="h-6 w-6" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="card">
          <div className="card-header flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900">
              Waste Collection by Provider
            </h3>
            <Button variant="ghost" size="sm">
              <ArrowDownTrayIcon className="h-5 w-5 mr-2" />
              Export
            </Button>
          </div>
          <div className="card-content">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={wasteProviderData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="provider" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="volume" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card">
          <div className="card-header flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900">
              Waste Type Distribution
            </h3>
            <Button variant="ghost" size="sm">
              <ArrowDownTrayIcon className="h-5w-5 mr-2" />
              Export
            </Button>
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
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="text-lg font-medium text-gray-900">
            Detailed Environmental Impact Metrics
          </h3>
        </div>
        <div className="card-content grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-gray-50 rounded-md">
            <h4 className="text-sm font-medium text-gray-500 mb-2">Average Waste per Business</h4>
            <p className="text-2xl font-semibold text-gray-900">750 kg</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-md">
            <h4 className="text-sm font-medium text-gray-500 mb-2">Landfill Diversion Rate</h4>
            <p className="text-2xl font-semibold text-gray-900">55%</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-md">
            <h4 className="text-sm font-medium text-gray-500 mb-2">Energy Saved</h4>
            <p className="text-2xl font-semibold text-gray-900">42 MWh</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Analytics;