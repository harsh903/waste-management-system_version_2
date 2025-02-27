'use client';

import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { 
  TruckIcon, 
  UserIcon, 
  PlusIcon 
} from '@heroicons/react/24/outline';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';

export default function VehiclesDrivers() {
  const [vehicles, setVehicles] = useState([
    {
      id: 1,
      plateNumber: 'WM-5678',
      model: 'Volvo FE Electric',
      type: 'Waste Collection',
      capacity: '12 tons',
      status: 'active',
      lastMaintenance: '2025-02-15'
    },
    {
      id: 2,
      plateNumber: 'WM-3456',
      model: 'Mercedes-Benz Econic',
      type: 'Recycling Truck',
      capacity: '10 tons',
      status: 'maintenance',
      lastMaintenance: '2025-01-20'
    }
  ]);

  const [drivers, setDrivers] = useState([
    {
      id: 1,
      name: 'John Smith',
      license: 'CDL-A-12345',
      assignedVehicle: 'WM-5678',
      status: 'active',
      experience: '5 years'
    },
    {
      id: 2,
      name: 'Emily Rodriguez',
      license: 'CDL-A-67890',
      assignedVehicle: 'WM-3456',
      status: 'active',
      experience: '3 years'
    }
  ]);

  const getStatusVariant = (status) => {
    switch (status) {
      case 'active': return 'success';
      case 'maintenance': return 'warning';
      case 'inactive': return 'danger';
      default: return 'gray';
    }
  };

  return (
    <DashboardLayout 
      title="Vehicles & Drivers" 
      allowedRoles={['provider']}
    >
      <div className="mb-8">
        <h2 className="text-lg font-medium text-gray-700 mb-2">
          Fleet Management
        </h2>
        <p className="text-gray-500">
          Manage and track your waste management vehicles and drivers.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="stat-card">
          <div className="flex justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Vehicles</p>
              <p className="mt-1 text-2xl font-semibold text-gray-900">
                {vehicles.length}
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
              <p className="text-sm font-medium text-gray-500">Active Drivers</p>
              <p className="mt-1 text-2xl font-semibold text-gray-900">
                {drivers.filter(d => d.status === 'active').length}
              </p>
            </div>
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-green-100 text-green-600">
              <UserIcon className="h-6 w-6" />
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="flex justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Vehicles in Maintenance</p>
              <p className="mt-1 text-2xl font-semibold text-gray-900">
                {vehicles.filter(v => v.status === 'maintenance').length}
              </p>
            </div>
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-yellow-100 text-yellow-600">
              <PlusIcon className="h-6 w-6" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card">
          <div className="card-header flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900">
              Vehicles
            </h3>
            <Button variant="outline" size="sm">Add Vehicle</Button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Plate Number</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Model</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Capacity</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {vehicles.map((vehicle) => (
                  <tr key={vehicle.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {vehicle.plateNumber}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {vehicle.model}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {vehicle.capacity}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant={getStatusVariant(vehicle.status)}>
                        {vehicle.status.charAt(0).toUpperCase() + vehicle.status.slice(1)}
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

        <div className="card">
          <div className="card-header flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900">
              Drivers
            </h3>
            <Button variant="outline" size="sm">Add Driver</Button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">License</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Vehicle</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {drivers.map((driver) => (
                  <tr key={driver.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {driver.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {driver.license}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {driver.assignedVehicle}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant={getStatusVariant(driver.status)}>
                        {driver.status.charAt(0).toUpperCase() + driver.status.slice(1)}
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
      </div>
    </DashboardLayout>
  );
}