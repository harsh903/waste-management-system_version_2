'use client';

import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { PICKUP_REQUESTS, BUSINESSES, WASTE_TYPES, WASTE_PROVIDERS } from '@/lib/data/mockData';
import { useAuth } from '@/lib/context/AuthContext';
import Link from 'next/link';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { MagnifyingGlassIcon, FunnelIcon, ChevronDownIcon, XMarkIcon } from '@heroicons/react/24/outline';

export default function BusinessPickups() {
  const { user } = useAuth();
  const [businessData, setBusinessData] = useState(null);
  const [pickups, setPickups] = useState([]);
  const [filteredPickups, setFilteredPickups] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    if (user) {
      // Find business data for the logged-in user
      const business = BUSINESSES.find(b => b.userId === user.id);
      setBusinessData(business);
      
      // Find pickups for this business
      if (business) {
        const businessPickups = PICKUP_REQUESTS.filter(p => p.businessId === business.id);
        setPickups(businessPickups);
        setFilteredPickups(businessPickups);
      }
    }
  }, [user]);

  useEffect(() => {
    // Apply filters
    let result = pickups;
    
    if (statusFilter !== 'all') {
      result = result.filter(pickup => pickup.status === statusFilter);
    }
    
    if (searchTerm) {
      const lowerSearchTerm = searchTerm.toLowerCase();
      result = result.filter(pickup => {
        const wasteType = WASTE_TYPES.find(w => w.id === pickup.wasteTypeId);
        const wasteTypeName = wasteType ? wasteType.name.toLowerCase() : '';
        const provider = WASTE_PROVIDERS.find(p => p.id === pickup.providerId);
        const providerName = provider ? provider.companyName.toLowerCase() : '';
        
        return (
          wasteTypeName.includes(lowerSearchTerm) ||
          providerName.includes(lowerSearchTerm) ||
          pickup.notes?.toLowerCase().includes(lowerSearchTerm) ||
          pickup.pickupAddress?.toLowerCase().includes(lowerSearchTerm)
        );
      });
    }
    
    setFilteredPickups(result);
  }, [statusFilter, searchTerm, pickups]);

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

  const getProviderName = (id) => {
    const provider = WASTE_PROVIDERS.find(p => p.id === id);
    return provider ? provider.companyName : 'Unknown Provider';
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setStatusFilter('all');
  };

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  return (
    <DashboardLayout 
      title="My Pickup Requests" 
      allowedRoles={['business']}
    >
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div className="mb-4 sm:mb-0">
          <p className="text-gray-500">
            Manage and track all your waste pickup requests
          </p>
        </div>
        <Link href="/business/request-pickup">
          <Button variant="primary">New Pickup Request</Button>
        </Link>
      </div>

      {/* Search and filters */}
      <div className="card mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              placeholder="Search by waste type, provider, address..."
              className="input-field pl-10"
            />
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative">
              <button
                type="button"
                onClick={toggleFilter}
                className="w-full sm:w-auto inline-flex items-center justify-between px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
              >
                <FunnelIcon className="h-4 w-4 mr-2" />
                Filter by Status
                <ChevronDownIcon className="h-4 w-4 ml-2" />
              </button>
              
              {isFilterOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 z-10">
                  <div className="py-1">
                    <button
                      className={`block px-4 py-2 text-sm w-full text-left ${
                        statusFilter === 'all' ? 'bg-gray-100 text-gray-900' : 'text-gray-700 hover:bg-gray-50'
                      }`}
                      onClick={() => {
                        setStatusFilter('all');
                        setIsFilterOpen(false);
                      }}
                    >
                      All Status
                    </button>
                    <button
                      className={`block px-4 py-2 text-sm w-full text-left ${
                        statusFilter === 'scheduled' ? 'bg-gray-100 text-gray-900' : 'text-gray-700 hover:bg-gray-50'
                      }`}
                      onClick={() => {
                        setStatusFilter('scheduled');
                        setIsFilterOpen(false);
                      }}
                    >
                      Scheduled
                    </button>
                    <button
                      className={`block px-4 py-2 text-sm w-full text-left ${
                        statusFilter === 'in_progress' ? 'bg-gray-100 text-gray-900' : 'text-gray-700 hover:bg-gray-50'
                      }`}
                      onClick={() => {
                        setStatusFilter('in_progress');
                        setIsFilterOpen(false);
                      }}
                    >
                      In Progress
                    </button>
                    <button
                      className={`block px-4 py-2 text-sm w-full text-left ${
                        statusFilter === 'completed' ? 'bg-gray-100 text-gray-900' : 'text-gray-700 hover:bg-gray-50'
                      }`}
                      onClick={() => {
                        setStatusFilter('completed');
                        setIsFilterOpen(false);
                      }}
                    >
                      Completed
                    </button>
                    <button
                      className={`block px-4 py-2 text-sm w-full text-left ${
                        statusFilter === 'cancelled' ? 'bg-gray-100 text-gray-900' : 'text-gray-700 hover:bg-gray-50'
                      }`}
                      onClick={() => {
                        setStatusFilter('cancelled');
                        setIsFilterOpen(false);
                      }}
                    >
                      Cancelled
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            {(searchTerm || statusFilter !== 'all') && (
              <button
                type="button"
                onClick={clearFilters}
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
              >
                <XMarkIcon className="h-4 w-4 mr-2" />
                Clear Filters
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Pickups list */}
      <div className="card">
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
                  Provider
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Volume
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Payment
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPickups.length > 0 ? (
                filteredPickups.map((pickup) => (
                  <tr key={pickup.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(pickup.scheduledDate)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {getWasteTypeName(pickup.wasteTypeId)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {getProviderName(pickup.providerId)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {pickup.volumeKg} kg
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant={getStatusVariant(pickup.status)}>
                        {getStatusLabel(pickup.status)}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge 
                        variant={
                          pickup.paymentStatus === 'paid' 
                            ? 'success' 
                            : pickup.paymentStatus === 'pending' 
                              ? 'warning' 
                              : 'danger'
                        }
                      >
                        {pickup.paymentStatus === 'paid' 
                          ? 'Paid' 
                          : pickup.paymentStatus === 'pending' 
                            ? 'Pending' 
                            : 'Failed'}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <Link href={`/business/pickups/${pickup.id}`}>
                        <Button variant="ghost" size="sm">View Details</Button>
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="px-6 py-10 text-center text-sm text-gray-500">
                    {searchTerm || statusFilter !== 'all' ? (
                      <div>
                        <p className="font-medium">No matching pickup requests found</p>
                        <p className="mt-1">Try adjusting your search or filter criteria</p>
                      </div>
                    ) : (
                      <div>
                        <p className="font-medium">No pickup requests yet</p>
                        <p className="mt-1">Create your first pickup request to get started</p>
                      </div>
                    )}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}