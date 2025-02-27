'use client';

import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { 
  UsersIcon, 
  BuildingOffice2Icon, 
  DocumentTextIcon 
} from '@heroicons/react/24/outline';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import Input from '@/components/ui/Input';

const Businesses = () => {
  const [businesses, setBusinesses] = useState([
    {
      id: 1,
      name: 'EcoTech Solutions',
      industry: 'Technology',
      wasteType: ['Electronic', 'Paper'],
      monthlyWasteVolume: 500, // kg
      complianceStatus: 'compliant',
      contactPerson: 'Sarah Johnson',
      email: 'sarah@ecotech.com'
    },
    {
      id: 2,
      name: 'Green Manufacturing Inc.',
      industry: 'Manufacturing',
      wasteType: ['Plastic', 'Metal'],
      monthlyWasteVolume: 1200, // kg
      complianceStatus: 'needs_review',
      contactPerson: 'Michael Lee',
      email: 'michael@greenmanufacturing.com'
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

  const filteredBusinesses = businesses.filter(business => 
    business.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    business.contactPerson.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout 
      title="Businesses" 
      allowedRoles={['government']}
    >
      <div className="mb-8">
        <h2 className="text-lg font-medium text-gray-700 mb-2">
          Business Waste Management Oversight
        </h2>
        <p className="text-gray-500">
          Monitor and manage business waste management practices.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="stat-card">
          <div className="flex justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Businesses</p>
              <p className="mt-1 text-2xl font-semibold text-gray-900">
                {businesses.length}
              </p>
            </div>
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-100 text-blue-600">
              <UsersIcon className="h-6 w-6" />
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="flex justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Waste Volume</p>
              <p className="mt-1 text-2xl font-semibold text-gray-900">
                {businesses.reduce((sum, business) => sum + business.monthlyWasteVolume, 0)} kg
              </p>
            </div>
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-green-100 text-green-600">
              <BuildingOffice2Icon className="h-6 w-6" />
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="flex justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Compliance Status</p>
              <p className="mt-1 text-2xl font-semibold text-gray-900">
                {businesses.filter(b => b.complianceStatus === 'compliant').length} / {businesses.length}
              </p>
            </div>
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-yellow-100 text-yellow-600">
              <DocumentTextIcon className="h-6 w-6" />
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-900">
            Businesses List
          </h3>
          <div className="flex items-center space-x-4">
            <Input 
              placeholder="Search businesses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-64"
            />
            <Button variant="outline" size="sm">Add Business</Button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Business Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Industry</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contact Person</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Waste Types</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Monthly Waste</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Compliance</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredBusinesses.map((business) => (
                <tr key={business.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {business.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {business.industry}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {business.contactPerson}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {business.wasteType.join(', ')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {business.monthlyWasteVolume} kg
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge variant={getStatusVariant(business.complianceStatus)}>
                      {business.complianceStatus === 'compliant' 
                        ? 'Compliant' 
                        : business.complianceStatus === 'needs_review'
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

export default Businesses;