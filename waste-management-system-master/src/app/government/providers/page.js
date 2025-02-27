'use client';

import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { 
  TruckIcon, 
  DocumentTextIcon, 
  ShieldCheckIcon 
} from '@heroicons/react/24/outline';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import Input from '@/components/ui/Input';

const WasteProviders = () => {
  const [providers, setProviders] = useState([
    {
      id: 1,
      name: 'Green Waste Solutions',
      type: 'Recycling',
      totalCustomers: 45,
      wasteProcessed: 5200, // kg per month
      complianceStatus: 'compliant',
      contactPerson: 'Emily Johnson',
      email: 'emily@greenwaste.com'
    },
    {
      id: 2,
      name: 'Eco Disposal Inc.',
      type: 'Waste Management',
      totalCustomers: 32,
      wasteProcessed: 4100, // kg per month
      complianceStatus: 'needs_review',
      contactPerson: 'Michael Chen',
      email: 'michael@ecodisposal.com'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  const getStatusVariant = (status) => {
    switch (status) {
      case 'compliant': return 'success';
      case 'needs_review': return 'warning';
      case 'non_compliant': return 'danger';
      default: return 'gray';
    }
  };

  const filteredProviders = providers.filter(provider => 
    provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    provider.contactPerson.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout 
      title="Waste Providers" 
      allowedRoles={['government']}
    >
      <div className="mb-8">
        <h2 className="text-lg font-medium text-gray-700 mb-2">
          Waste Management Provider Oversight
        </h2>
        <p className="text-gray-500">
          Monitor and manage waste management service providers.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="stat-card">
          <div className="flex justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Providers</p>
              <p className="mt-1 text-2xl font-semibold text-gray-900">
                {providers.length}
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
              <p className="text-sm font-medium text-gray-500">Total Waste Processed</p>
              <p className="mt-1 text-2xl font-semibold text-gray-900">
                {providers.reduce((sum, provider) => sum + provider.wasteProcessed, 0)} kg
              </p>
            </div>
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-green-100 text-green-600">
              <DocumentTextIcon className="h-6 w-6" />
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="flex justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Compliance Status</p>
              <p className="mt-1 text-2xl font-semibold text-gray-900">
                {providers.filter(p => p.complianceStatus === 'compliant').length} / {providers.length}
              </p>
            </div>
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-yellow-100 text-yellow-600">
              <ShieldCheckIcon className="h-6 w-6" />
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-900">
            Providers List
          </h3>
          <div className="flex items-center space-x-4">
            <Input 
              placeholder="Search providers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-64"
            />
            <Button variant="outline" size="sm">Add Provider</Button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Provider Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contact Person</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Customers</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Waste Processed</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Compliance</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProviders.map((provider) => (
                <tr key={provider.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {provider.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {provider.type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {provider.contactPerson}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {provider.totalCustomers}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {provider.wasteProcessed} kg
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge variant={getStatusVariant(provider.complianceStatus)}>
                      {provider.complianceStatus === 'compliant' 
                        ? 'Compliant' 
                        : provider.complianceStatus === 'needs_review'
                        ? 'Needs Review'
                        : 'Non-Compliant'}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <Button variant="ghost" size="sm">View Details</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default WasteProviders;