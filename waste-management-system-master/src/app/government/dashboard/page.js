'use client';

import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { 
  ChartBarIcon, 
  TruckIcon,
  BuildingOfficeIcon,
  DocumentTextIcon,
  ArrowTrendingUpIcon,
  ShieldCheckIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';
import { 
  ANALYTICS_DATA, 
  WASTE_PROVIDERS, 
  BUSINESSES,
  COMPLIANCE_REPORTS,
  PICKUP_REQUESTS
} from '@/lib/data/mockData';
import Link from 'next/link';
import Badge from '@/components/ui/Badge';
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

export default function GovernmentDashboard() {
  // Prepare data for charts
  const monthlyData = ANALYTICS_DATA.monthlyCollection;
  const wasteTypeData = ANALYTICS_DATA.wasteByType;
  
  // Count total businesses and providers
  const totalBusinesses = BUSINESSES.length;
  const totalProviders = WASTE_PROVIDERS.length;
  const pendingReports = COMPLIANCE_REPORTS.filter(r => r.status === 'under_review').length;
  const totalPickups = PICKUP_REQUESTS.length;
  const complianceRate = ANALYTICS_DATA.complianceRate;
  
  // Colors for pie chart
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'approved':
        return <Badge variant="success">Approved</Badge>;
      case 'under_review':
        return <Badge variant="warning">Under Review</Badge>;
      case 'rejected':
        return <Badge variant="danger">Rejected</Badge>;
      default:
        return <Badge variant="gray">Submitted</Badge>;
    }
  };

  return (
    <DashboardLayout 
      title="Government Dashboard" 
      allowedRoles={['government']}
    >
      <div className="mb-8">
        <h2 className="text-lg font-medium text-gray-700 mb-2">Welcome to Government Oversight Portal</h2>
        <p className="text-gray-500">
          Monitor waste management activities, ensure compliance, and analyze environmental impact.
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="stat-card">
          <div className="flex justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Registered Businesses</p>
              <p className="mt-1 text-2xl font-semibold text-gray-900">{totalBusinesses}</p>
            </div>
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-100 text-blue-600">
              <BuildingOfficeIcon className="h-6 w-6" />
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="flex justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Waste Providers</p>
              <p className="mt-1 text-2xl font-semibold text-gray-900">{totalProviders}</p>
            </div>
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-green-100 text-green-600">
              <TruckIcon className="h-6 w-6" />
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="flex justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Waste Collections</p>
              <p className="mt-1 text-2xl font-semibold text-gray-900">{totalPickups}</p>
            </div>
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-purple-100 text-purple-600">
              <ChartBarIcon className="h-6 w-6" />
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="flex justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Compliance Rate</p>
              <p className="mt-1 text-2xl font-semibold text-gray-900">{complianceRate}%</p>
            </div>
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-yellow-100 text-yellow-600">
              <ShieldCheckIcon className="h-6 w-6" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="card">
          <h2 className="text-lg font-medium text-gray-900 mb-6">Monthly Waste Collection</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={monthlyData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="amount" name="Waste (kg)" fill="#00982b" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card">
          <h2 className="text-lg font-medium text-gray-900 mb-6">Waste by Type</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={wasteTypeData}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {wasteTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value} kg`} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Provider Performance */}
      <div className="card mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-medium text-gray-900">Provider Performance</h2>
          <Link href="/government/providers">
            <Button variant="outline" size="sm">View All Providers</Button>
          </Link>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Provider
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  On-Time Rate
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Completion Rate
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {ANALYTICS_DATA.servicePerformance.map((provider, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {provider.provider}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {provider.onTimeRate}%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {provider.completionRate}%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge 
                      variant={
                        provider.onTimeRate >= 90 && provider.completionRate >= 95
                          ? 'success'
                          : provider.onTimeRate >= 80 && provider.completionRate >= 85
                            ? 'info'
                            : 'warning'
                      }
                    >
                      {provider.onTimeRate >= 90 && provider.completionRate >= 95
                        ? 'Excellent'
                        : provider.onTimeRate >= 80 && provider.completionRate >= 85
                          ? 'Good'
                          : 'Needs Improvement'}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Compliance Reports */}
      <div className="card mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-medium text-gray-900">Recent Compliance Reports</h2>
          <Link href="/government/compliance">
            <Button variant="outline" size="sm">View All Reports</Button>
          </Link>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Provider
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Report Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Submitted Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {COMPLIANCE_REPORTS.sort((a, b) => new Date(b.submittedDate) - new Date(a.submittedDate)).slice(0, 5).map((report) => {
                const provider = WASTE_PROVIDERS.find(p => p.id === report.providerId);
                return (
                  <tr key={report.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {provider ? provider.companyName : 'Unknown Provider'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {report.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(report.submittedDate)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(report.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <Link href={`/government/compliance/${report.id}`}>
                        <Button variant="ghost" size="sm">Review</Button>
                      </Link>
                    </td>
                  </tr>
                );
              })}
              
              {COMPLIANCE_REPORTS.length === 0 && (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">
                    No compliance reports found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card">
        <h2 className="text-lg font-medium text-gray-900 mb-6">Quick Actions</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/government/providers">
            <div className="dashboard-card hover:border-primary-500 border border-transparent h-full">
              <div className="flex flex-col items-center p-4 text-center">
                <div className="p-2 rounded-full bg-green-100 text-green-600 mb-3">
                  <TruckIcon className="h-6 w-6" />
                </div>
                <h3 className="text-base font-medium text-gray-900 mb-1">
                  Manage Providers
                </h3>
                <p className="text-sm text-gray-500">
                  View and verify waste management providers
                </p>
              </div>
            </div>
          </Link>
          
          <Link href="/government/compliance">
            <div className="dashboard-card hover:border-primary-500 border border-transparent h-full">
              <div className="flex flex-col items-center p-4 text-center">
                <div className="p-2 rounded-full bg-yellow-100 text-yellow-600 mb-3">
                  <DocumentTextIcon className="h-6 w-6" />
                </div>
                <h3 className="text-base font-medium text-gray-900 mb-1">
                  Review Compliance
                </h3>
                <p className="text-sm text-gray-500">
                  {pendingReports} report{pendingReports !== 1 ? 's' : ''} pending review
                </p>
              </div>
            </div>
          </Link>
          
          <Link href="/government/analytics">
            <div className="dashboard-card hover:border-primary-500 border border-transparent h-full">
              <div className="flex flex-col items-center p-4 text-center">
                <div className="p-2 rounded-full bg-purple-100 text-purple-600 mb-3">
                  <ArrowTrendingUpIcon className="h-6 w-6" />
                </div>
                <h3 className="text-base font-medium text-gray-900 mb-1">
                  Advanced Analytics
                </h3>
                <p className="text-sm text-gray-500">
                  Detailed waste management statistics
                </p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </DashboardLayout>
  );
}