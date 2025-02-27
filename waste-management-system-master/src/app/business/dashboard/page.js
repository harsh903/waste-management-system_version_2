'use client';

import React, { useEffect, useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { 
  CalendarIcon, 
  TruckIcon,
  ClipboardDocumentCheckIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';
import { PICKUP_REQUESTS, BUSINESSES, WASTE_TYPES } from '@/lib/data/mockData';
import { useAuth } from '@/lib/context/AuthContext';
import Link from 'next/link';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';

export default function BusinessDashboard() {
  const { user } = useAuth();
  const [businessData, setBusinessData] = useState(null);
  const [pickups, setPickups] = useState([]);
  
  useEffect(() => {
    if (user) {
      // Find business data for the logged-in user
      const business = BUSINESSES.find(b => b.userId === user.id);
      setBusinessData(business);
      
      // Find pickups for this business
      if (business) {
        const businessPickups = PICKUP_REQUESTS.filter(p => p.businessId === business.id);
        setPickups(businessPickups);
      }
    }
  }, [user]);

  const getStatusVariant = (status) => {
    switch (status) {
      case 'scheduled':
        return 'info';
      case 'in_progress':
        return 'warning';
      case 'completed':
        return 'success';
      case 'cancelled':
        return 'danger';
      default:
        return 'gray';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'scheduled':
        return 'Scheduled';
      case 'in_progress':
        return 'In Progress';
      case 'completed':
        return 'Completed';
      case 'cancelled':
        return 'Cancelled';
      default:
        return 'Pending';
    }
  };

  // Calculate statistics
  const completedPickups = pickups.filter(p => p.status === 'completed').length;
  const scheduledPickups = pickups.filter(p => p.status === 'scheduled').length;
  const inProgressPickups = pickups.filter(p => p.status === 'in_progress').length;
  const totalWasteDisposed = pickups
    .filter(p => p.status === 'completed')
    .reduce((sum, p) => sum + p.volumeKg, 0);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getWasteTypeName = (id) => {
    const wasteType = WASTE_TYPES.find(w => w.id === id);
    return wasteType ? wasteType.name : 'Unknown';
  };

  return (
    <DashboardLayout 
      title="Business Dashboard" 
      allowedRoles={['business']}
    >
      {businessData ? (
        <>
          <div className="mb-8">
            <h2 className="text-lg font-medium text-gray-700 mb-2">Welcome, {businessData.name}</h2>
            <p className="text-gray-500">
              Manage your waste collection services and monitor your environmental impact.
            </p>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="stat-card">
              <div className="flex justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Completed Pickups</p>
                  <p className="mt-1 text-2xl font-semibold text-gray-900">{completedPickups}</p>
                </div>
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-green-100 text-green-600">
                  <ClipboardDocumentCheckIcon className="h-6 w-6" />
                </div>
              </div>
            </div>

            <div className="stat-card">
              <div className="flex justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Scheduled Pickups</p>
                  <p className="mt-1 text-2xl font-semibold text-gray-900">{scheduledPickups}</p>
                </div>
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-100 text-blue-600">
                  <CalendarIcon className="h-6 w-6" />
                </div>
              </div>
            </div>

            <div className="stat-card">
              <div className="flex justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">In Progress</p>
                  <p className="mt-1 text-2xl font-semibold text-gray-900">{inProgressPickups}</p>
                </div>
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-yellow-100 text-yellow-600">
                  <TruckIcon className="h-6 w-6" />
                </div>
              </div>
            </div>

            <div className="stat-card">
              <div className="flex justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Total Waste Disposed</p>
                  <p className="mt-1 text-2xl font-semibold text-gray-900">{totalWasteDisposed} kg</p>
                </div>
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-purple-100 text-purple-600">
                  <ExclamationTriangleIcon className="h-6 w-6" />
                </div>
              </div>
            </div>
          </div>

          {/* Recent Pickups */}
          <div className="card mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-medium text-gray-900">Recent Pickups</h2>
              <Link href="/business/pickups">
                <Button variant="outline" size="sm">View All</Button>
              </Link>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Waste Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Volume
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
                  {pickups.slice(0, 5).map((pickup) => (
                    <tr key={pickup.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(pickup.scheduledDate)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {getWasteTypeName(pickup.wasteTypeId)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {pickup.volumeKg} kg
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge variant={getStatusVariant(pickup.status)}>
                          {getStatusLabel(pickup.status)}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <Link href={`/business/pickups/${pickup.id}`}>
                          <Button variant="ghost" size="sm">View Details</Button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                  
                  {pickups.length === 0 && (
                    <tr>
                      <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">
                        No pickups found
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
              <Link href="/business/request-pickup">
                <div className="dashboard-card hover:border-primary-500 border border-transparent h-full">
                  <div className="flex flex-col items-center p-4 text-center">
                    <div className="p-2 rounded-full bg-primary-100 text-primary-600 mb-3">
                      <TruckIcon className="h-6 w-6" />
                    </div>
                    <h3 className="text-base font-medium text-gray-900 mb-1">
                      Request Pickup
                    </h3>
                    <p className="text-sm text-gray-500">
                      Schedule a new waste collection
                    </p>
                  </div>
                </div>
              </Link>
              
              <Link href="/business/reports">
                <div className="dashboard-card hover:border-primary-500 border border-transparent h-full">
                  <div className="flex flex-col items-center p-4 text-center">
                    <div className="p-2 rounded-full bg-blue-100 text-blue-600 mb-3">
                      <ClipboardDocumentCheckIcon className="h-6 w-6" />
                    </div>
                    <h3 className="text-base font-medium text-gray-900 mb-1">
                      View Reports
                    </h3>
                    <p className="text-sm text-gray-500">
                      Check your waste management reports
                    </p>
                  </div>
                </div>
              </Link>
              
              <Link href="/business/profile">
                <div className="dashboard-card hover:border-primary-500 border border-transparent h-full">
                  <div className="flex flex-col items-center p-4 text-center">
                    <div className="p-2 rounded-full bg-purple-100 text-purple-600 mb-3">
                      <ExclamationTriangleIcon className="h-6 w-6" />
                    </div>
                    <h3 className="text-base font-medium text-gray-900 mb-1">
                      Update Waste Profile
                    </h3>
                    <p className="text-sm text-gray-500">
                      Manage your waste types and volumes
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500">Loading business data...</p>
        </div>
      )}
    </DashboardLayout>
  );
}