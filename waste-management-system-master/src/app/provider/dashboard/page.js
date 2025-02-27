'use client';

import React, { useEffect, useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { 
  CalendarIcon, 
  TruckIcon,
  ClipboardDocumentCheckIcon,
  BuildingOfficeIcon,
  MapPinIcon,
  UsersIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline';
import { 
  PICKUP_REQUESTS, 
  WASTE_PROVIDERS, 
  BUSINESSES,
  WASTE_TYPES, 
  VEHICLES, 
  DRIVERS 
} from '@/lib/data/mockData';
import { useAuth } from '@/lib/context/AuthContext';
import Link from 'next/link';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';

export default function ProviderDashboard() {
  const { user } = useAuth();
  const [providerData, setProviderData] = useState(null);
  const [pickups, setPickups] = useState([]);
  const [providerVehicles, setProviderVehicles] = useState([]);
  const [providerDrivers, setProviderDrivers] = useState([]);
  
  useEffect(() => {
    if (user) {
      // Find provider data for the logged-in user
      const provider = WASTE_PROVIDERS.find(p => p.userId === user.id);
      setProviderData(provider);
      
      // Find pickups for this provider
      if (provider) {
        const providerPickups = PICKUP_REQUESTS.filter(p => p.providerId === provider.id);
        setPickups(providerPickups);
        
        // Get vehicles and drivers for this provider
        const vehicles = VEHICLES.filter(v => v.providerId === provider.id);
        setProviderVehicles(vehicles);
        
        const drivers = DRIVERS.filter(d => d.providerId === provider.id);
        setProviderDrivers(drivers);
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
  const totalPickups = pickups.length;
  const completedPickups = pickups.filter(p => p.status === 'completed').length;
  const pendingPickups = pickups.filter(p => p.status === 'scheduled').length;
  const inProgressPickups = pickups.filter(p => p.status === 'in_progress').length;
  const totalWasteCollected = pickups
    .filter(p => p.status === 'completed' || p.status === 'in_progress')
    .reduce((sum, p) => sum + p.volumeKg, 0);
  const totalBusinesses = [...new Set(pickups.map(p => p.businessId))].length;

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

  const getBusinessName = (id) => {
    const business = BUSINESSES.find(b => b.id === id);
    return business ? business.name : 'Unknown Business';
  };

  return (
    <DashboardLayout 
      title="Collector Dashboard" 
      allowedRoles={['provider']}
    >
      {providerData ? (
        <>
          <div className="mb-8">
            <h2 className="text-lg font-medium text-gray-700 mb-2">Welcome, {providerData.companyName}</h2>
            <p className="text-gray-500">
              Manage your waste collection operations, track pickups, and maintain compliance.
            </p>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="stat-card">
              <div className="flex justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Total Pickups</p>
                  <p className="mt-1 text-2xl font-semibold text-gray-900">{totalPickups}</p>
                </div>
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-gray-100 text-gray-500">
                  <ClipboardDocumentCheckIcon className="h-6 w-6" />
                </div>
              </div>
            </div>

            <div className="stat-card">
              <div className="flex justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Pending Pickups</p>
                  <p className="mt-1 text-2xl font-semibold text-gray-900">{pendingPickups}</p>
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
                  <p className="text-sm font-medium text-gray-500">Total Waste Collected</p>
                  <p className="mt-1 text-2xl font-semibold text-gray-900">{totalWasteCollected} kg</p>
                </div>
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-green-100 text-green-600">
                  <DocumentTextIcon className="h-6 w-6" />
                </div>
              </div>
            </div>
          </div>

          {/* Fleet Status */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-medium text-gray-900">Vehicle Status</h2>
                <Link href="/provider/fleet">
                  <Button variant="outline" size="sm">Manage Fleet</Button>
                </Link>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Vehicle Number
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Type
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {providerVehicles.map((vehicle) => (
                      <tr key={vehicle.id}>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                          {vehicle.vehicleNumber}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                          {vehicle.vehicleType}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <Badge 
                            variant={
                              vehicle.status === 'active' 
                                ? 'success' 
                                : vehicle.status === 'maintenance' 
                                  ? 'warning' 
                                  : 'danger'
                            }
                          >
                            {vehicle.status === 'active' 
                              ? 'Active' 
                              : vehicle.status === 'maintenance' 
                                ? 'Maintenance' 
                                : 'Inactive'}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                    
                    {providerVehicles.length === 0 && (
                      <tr>
                        <td colSpan="3" className="px-4 py-3 text-center text-sm text-gray-500">
                          No vehicles found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-medium text-gray-900">Driver Status</h2>
                <Link href="/provider/fleet">
                  <Button variant="outline" size="sm">Manage Drivers</Button>
                </Link>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        License
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {providerDrivers.map((driver) => (
                      <tr key={driver.id}>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                          {driver.name}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                          {driver.licenseNumber}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <Badge 
                            variant={
                              driver.status === 'on_duty' 
                                ? 'success' 
                                : driver.status === 'off_duty' 
                                  ? 'gray' 
                                  : 'warning'
                            }
                          >
                            {driver.status === 'on_duty' 
                              ? 'On Duty' 
                              : driver.status === 'off_duty' 
                                ? 'Off Duty' 
                                : 'On Leave'}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                    
                    {providerDrivers.length === 0 && (
                      <tr>
                        <td colSpan="3" className="px-4 py-3 text-center text-sm text-gray-500">
                          No drivers found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Upcoming Pickups */}
          <div className="card mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-medium text-gray-900">Upcoming Pickups</h2>
              <Link href="/provider/pickup-requests">
                <Button variant="outline" size="sm">View All</Button>
              </Link>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Business
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Waste Type
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Volume
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {pickups
                    .filter(p => p.status === 'scheduled' || p.status === 'in_progress')
                    .sort((a, b) => new Date(a.scheduledDate) - new Date(b.scheduledDate))
                    .slice(0, 5)
                    .map((pickup) => (
                      <tr key={pickup.id}>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                          {formatDate(pickup.scheduledDate)}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                          {getBusinessName(pickup.businessId)}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                          {getWasteTypeName(pickup.wasteTypeId)}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                          {pickup.volumeKg} kg
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <Badge variant={getStatusVariant(pickup.status)}>
                            {getStatusLabel(pickup.status)}
                          </Badge>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                          <Link href={`/provider/pickup-requests/${pickup.id}`}>
                            <Button variant="ghost" size="sm">View Details</Button>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  
                  {pickups.filter(p => p.status === 'scheduled' || p.status === 'in_progress').length === 0 && (
                    <tr>
                      <td colSpan="6" className="px-4 py-4 text-center text-sm text-gray-500">
                        No upcoming pickups found
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
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Link href="/provider/pickup-requests">
                <div className="dashboard-card hover:border-primary-500 border border-transparent h-full">
                  <div className="flex flex-col items-center p-4 text-center">
                    <div className="p-2 rounded-full bg-primary-100 text-primary-600 mb-3">
                      <ClipboardDocumentCheckIcon className="h-6 w-6" />
                    </div>
                    <h3 className="text-base font-medium text-gray-900 mb-1">
                      Manage Pickups
                    </h3>
                    <p className="text-sm text-gray-500">
                      View and update pickup requests
                    </p>
                  </div>
                </div>
              </Link>
              
              <Link href="/provider/tracking">
                <div className="dashboard-card hover:border-primary-500 border border-transparent h-full">
                  <div className="flex flex-col items-center p-4 text-center">
                    <div className="p-2 rounded-full bg-blue-100 text-blue-600 mb-3">
                      <MapPinIcon className="h-6 w-6" />
                    </div>
                    <h3 className="text-base font-medium text-gray-900 mb-1">
                      Track Routes
                    </h3>
                    <p className="text-sm text-gray-500">
                      Monitor active routes and pickups
                    </p>
                  </div>
                </div>
              </Link>
              
              <Link href="/provider/fleet">
                <div className="dashboard-card hover:border-primary-500 border border-transparent h-full">
                  <div className="flex flex-col items-center p-4 text-center">
                    <div className="p-2 rounded-full bg-yellow-100 text-yellow-600 mb-3">
                      <TruckIcon className="h-6 w-6" />
                    </div>
                    <h3 className="text-base font-medium text-gray-900 mb-1">
                      Manage Fleet
                    </h3>
                    <p className="text-sm text-gray-500">
                      Vehicles and driver assignments
                    </p>
                  </div>
                </div>
              </Link>
              
              <Link href="/provider/compliance">
                <div className="dashboard-card hover:border-primary-500 border border-transparent h-full">
                  <div className="flex flex-col items-center p-4 text-center">
                    <div className="p-2 rounded-full bg-green-100 text-green-600 mb-3">
                      <DocumentTextIcon className="h-6 w-6" />
                    </div>
                    <h3 className="text-base font-medium text-gray-900 mb-1">
                      Compliance Reports
                    </h3>
                    <p className="text-sm text-gray-500">
                      Submit regulatory compliance reports
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500">Loading collector data...</p>
        </div>
      )}
    </DashboardLayout>
  );
}