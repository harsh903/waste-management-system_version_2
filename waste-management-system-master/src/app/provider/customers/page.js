'use client';

import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { 
  UsersIcon, 
  DocumentTextIcon, 
  ClipboardIcon 
} from '@heroicons/react/24/outline';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import Input from '@/components/ui/Input';

const Customers = () => {
  const [customers, setCustomers] = useState([
    {
      id: 1,
      name: 'EcoTech Solutions',
      type: 'Business',
      contactPerson: 'Sarah Johnson',
      email: 'sarah@ecotech.com',
      phone: '(555) 123-4567',
      totalPickups: 24,
      status: 'active',
      wasteVolume: 500 // kg per month
    },
    {
      id: 2,
      name: 'Green Manufacturing Inc.',
      type: 'Industrial',
      contactPerson: 'Michael Lee',
      email: 'michael@greenmanufacturing.com',
      phone: '(555) 987-6543',
      totalPickups: 36,
      status: 'active',
      wasteVolume: 1200 // kg per month
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  const getStatusVariant = (status) => {
    switch (status) {
      case 'active': return 'success';
      case 'inactive': return 'danger';
      case 'pending': return 'warning';
      default: return 'gray';
    }
  };

  const filteredCustomers = customers.filter(customer => 
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.contactPerson.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout 
      title="Customers" 
      allowedRoles={['provider']}
    >
      <div className="mb-8">
        <h2 className="text-lg font-medium text-gray-700 mb-2">
          Customer Management
        </h2>
        <p className="text-gray-500">
          View and manage your waste management customers.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="stat-card">
          <div className="flex justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Customers</p>
              <p className="mt-1 text-2xl font-semibold text-gray-900">
                {customers.length}
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
              <p className="text-sm font-medium text-gray-500">Total Pickups</p>
              <p className="mt-1 text-2xl font-semibold text-gray-900">
                {customers.reduce((sum, customer) => sum + customer.totalPickups, 0)}
              </p>
            </div>
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-green-100 text-green-600">
              <ClipboardIcon className="h-6 w-6" />
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="flex justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Waste Volume</p>
              <p className="mt-1 text-2xl font-semibold text-gray-900">
                {customers.reduce((sum, customer) => sum + customer.wasteVolume, 0)} kg
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
            Customer List
          </h3>
          <div className="flex items-center space-x-4">
            <Input 
              placeholder="Search customers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-64"
            />
            <Button variant="outline" size="sm">Add Customer</Button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contact Person</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Pickups</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Waste Volume</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCustomers.map((customer) => (
                <tr key={customer.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {customer.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {customer.type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {customer.contactPerson}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {customer.totalPickups}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {customer.wasteVolume} kg
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge variant={getStatusVariant(customer.status)}>
                      {customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}
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

export default Customers;