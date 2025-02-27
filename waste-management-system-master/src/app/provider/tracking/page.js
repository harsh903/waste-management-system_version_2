'use client';

import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { 
  MapIcon, 
  TruckIcon, 
  ClockIcon 
} from '@heroicons/react/24/outline';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';

export default function RoutesTracking() {
  const [routes, setRoutes] = useState([
    {
      id: 1,
      driver: 'John Smith',
      vehicle: 'WM-Truck 05',
      startTime: '2025-03-02T08:00:00',
      endTime: '2025-03-02T16:30:00',
      status: 'in_progress',
      pickupsPlanned: 12,
      pickupsCompleted: 7,
      totalDistance: 124.5
    },
    {
      id: 2,
      driver: 'Emily Rodriguez',
      vehicle: 'WM-Truck 03',
      startTime: '2025-03-02T07:30:00',
      endTime: '2025-03-02T15:45:00',
      status: 'completed',
      pickupsPlanned: 10,
      pickupsCompleted: 10,
      totalDistance: 98.2
    }
  ]);

  const getStatusVariant = (status) => {
    switch (status) {
      case 'in_progress': return 'warning';
      case 'completed': return 'success';
      case 'scheduled': return 'info';
      default: return 'gray';
    }
  };

  return (
    <DashboardLayout 
      title="Routes & Tracking" 
      allowedRoles={['provider']}
    >
      <div className="mb-8">
        <h2 className="text-lg font-medium text-gray-700 mb-2">
          Real-Time Route Management
        </h2>
        <p className="text-gray-500">
          Monitor and manage your waste collection routes in real-time.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="stat-card">
          <div className="flex justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Active Routes</p>
              <p className="mt-1 text-2xl font-semibold text-gray-900">
                {routes.filter(r => r.status === 'in_progress').length}
              </p>
            </div>
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-100 text-blue-600">
              <MapIcon className="h-6 w-6" />
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="flex justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Vehicles</p>
              <p className="mt-1 text-2xl font-semibold text-gray-900">12</p>
            </div>
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-green-100 text-green-600">
              <TruckIcon className="h-6 w-6" />
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="flex justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Avg. Route Duration</p>
              <p className="mt-1 text-2xl font-semibold text-gray-900">6.5 hrs</p>
            </div>
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-yellow-100 text-yellow-600">
              <ClockIcon className="h-6 w-6" />
            </div>
          </div>
        </div>
      </div>

      <div className="card mb-8">
        <div className="card-header flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-900">
            Today's Routes
          </h3>
          <Button variant="outline" size="sm">Create New Route</Button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Driver</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Vehicle</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Start Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Pickups</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {routes.map((route) => (
                <tr key={route.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {route.driver}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {route.vehicle}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(route.startTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {route.pickupsCompleted}/{route.pickupsPlanned}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge variant={getStatusVariant(route.status)}>
                      {route.status === 'in_progress' ? 'In Progress' : 'Completed'}
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
}