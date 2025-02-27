'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { 
  PICKUP_REQUESTS, 
  BUSINESSES, 
  WASTE_TYPES,
  WASTE_PROVIDERS
} from '@/lib/data/mockData';
import { useAuth } from '@/lib/context/AuthContext';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { 
  TruckIcon, 
  MapPinIcon,
  CalendarIcon,
  ScaleIcon,
  ClipboardDocumentCheckIcon,
  CreditCardIcon,
  ArrowLeftIcon,
  PhoneIcon,
  EnvelopeIcon,
  XCircleIcon
} from '@heroicons/react/24/outline';

export default function PickupDetails() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const [pickup, setPickup] = useState(null);
  const [business, setBusiness] = useState(null);
  const [wasteType, setWasteType] = useState(null);
  const [provider, setProvider] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showCancelModal, setShowCancelModal] = useState(false);
  
  useEffect(() => {
    if (params.id) {
      // Find pickup by ID
      const foundPickup = PICKUP_REQUESTS.find(p => p.id === params.id);
      
      if (foundPickup) {
        setPickup(foundPickup);
        
        // Find related data
        const foundBusiness = BUSINESSES.find(b => b.id === foundPickup.businessId);
        const foundWasteType = WASTE_TYPES.find(w => w.id === foundPickup.wasteTypeId);
        const foundProvider = WASTE_PROVIDERS.find(p => p.id === foundPickup.providerId);
        
        setBusiness(foundBusiness);
        setWasteType(foundWasteType);
        setProvider(foundProvider);
      }
      
      setLoading(false);
    }
  }, [params.id]);

  // Security check to ensure the business can only see their own pickups
  useEffect(() => {
    if (!loading && business && user) {
      if (business.userId !== user.id) {
        // Redirect to the pickups list if trying to access another business's pickup
        router.push('/business/pickups');
      }
    }
  }, [loading, business, user, router]);

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

  const getEstimatedArrival = () => {
    if (!pickup || !pickup.trackingDetails || !pickup.trackingDetails.estimatedArrival) {
      return 'Not available';
    }
    return formatDate(pickup.trackingDetails.estimatedArrival);
  };

  const handleCancel = () => {
    // In a real app, this would make an API call
    setShowCancelModal(false);
    
    // Simulate API response
    setTimeout(() => {
      alert('Pickup request has been cancelled');
      router.push('/business/pickups');
    }, 1000);
  };

  if (loading) {
    return (
      <DashboardLayout allowedRoles={['business']}>
        <div className="text-center py-12">
          <p className="text-gray-500">Loading pickup details...</p>
        </div>
      </DashboardLayout>
    );
  }

  if (!pickup) {
    return (
      <DashboardLayout allowedRoles={['business']}>
        <div className="text-center py-12">
          <p className="text-gray-500">Pickup request not found</p>
          <Button 
            variant="primary" 
            className="mt-4"
            onClick={() => router.push('/business/pickups')}
          >
            Back to Pickups
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout allowedRoles={['business']}>
      <div className="mb-6">
        <button
          type="button"
          onClick={() => router.push('/business/pickups')}
          className="flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeftIcon className="h-4 w-4 mr-1" />
          Back to Pickups
        </button>
      </div>
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Pickup Request Detail
          </h1>
          <p className="text-gray-500 mt-1">
            View details and track the status of your waste pickup
          </p>
        </div>
        
        <div className="mt-4 md:mt-0">
          <Badge 
            variant={getStatusVariant(pickup.status)}
            className="text-sm px-3 py-1"
          >
            {getStatusLabel(pickup.status)}
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main info column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Pickup Overview */}
          <Card title="Pickup Overview">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <div className="flex items-start mb-4">
                  <div className="flex-shrink-0 mr-3">
                    <div className="p-2 bg-blue-100 rounded-full">
                      <CalendarIcon className="h-5 w-5 text-blue-600" />
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Scheduled Date</p>
                    <p className="text-base text-gray-900">{formatDate(pickup.scheduledDate)}</p>
                  </div>
                </div>
                
                <div className="flex items-start mb-4">
                  <div className="flex-shrink-0 mr-3">
                    <div className="p-2 bg-green-100 rounded-full">
                      <ScaleIcon className="h-5 w-5 text-green-600" />
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Waste Type & Volume</p>
                    <p className="text-base text-gray-900">
                      {wasteType ? wasteType.name : 'Unknown'} - {pickup.volumeKg} kg
                    </p>
                    {wasteType && wasteType.hazardous && (
                      <span className="inline-flex items-center mt-1 px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                        Hazardous
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-3">
                    <div className="p-2 bg-purple-100 rounded-full">
                      <ClipboardDocumentCheckIcon className="h-5 w-5 text-purple-600" />
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Notes</p>
                    <p className="text-base text-gray-900">{pickup.notes || 'No additional notes'}</p>
                  </div>
                </div>
              </div>
              
              <div>
                <div className="flex items-start mb-4">
                  <div className="flex-shrink-0 mr-3">
                    <div className="p-2 bg-indigo-100 rounded-full">
                      <TruckIcon className="h-5 w-5 text-indigo-600" />
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Waste Provider</p>
                    <p className="text-base text-gray-900">{provider ? provider.companyName : 'Unknown Provider'}</p>
                  </div>
                </div>
                
                <div className="flex items-start mb-4">
                  <div className="flex-shrink-0 mr-3">
                    <div className="p-2 bg-yellow-100 rounded-full">
                      <MapPinIcon className="h-5 w-5 text-yellow-600" />
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Pickup Address</p>
                    <p className="text-base text-gray-900">{pickup.pickupAddress}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-3">
                    <div className="p-2 bg-red-100 rounded-full">
                      <CreditCardIcon className="h-5 w-5 text-red-600" />
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Payment Status</p>
                    <div className="flex items-center mt-1">
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
                      <span className="ml-2 text-gray-900">
                        ${pickup.totalAmount.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Tracking Information */}
          {(pickup.status === 'scheduled' || pickup.status === 'in_progress') && (
            <Card title="Tracking Information">
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 border border-gray-200 rounded-md">
                    <p className="text-sm font-medium text-gray-500">Estimated Arrival</p>
                    <p className="text-lg font-medium text-gray-900">{getEstimatedArrival()}</p>
                  </div>
                  
                  {pickup.trackingDetails && (
                    <div className="p-4 border border-gray-200 rounded-md">
                      <p className="text-sm font-medium text-gray-500">Current Status</p>
                      <p className="text-lg font-medium text-gray-900 capitalize">
                        {pickup.trackingDetails.currentStatus?.replace(/_/g, ' ') || 'Pending'}
                      </p>
                    </div>
                  )}
                </div>
                
                {pickup.trackingDetails && (
                  <div className="border-t border-gray-200 pt-4">
                    <h4 className="font-medium text-gray-900 mb-2">Assigned Personnel</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {pickup.trackingDetails.assignedDriver && (
                        <div className="p-3 bg-gray-50 rounded-md">
                          <p className="text-sm font-medium text-gray-900">Driver</p>
                          <p className="text-sm text-gray-500">{pickup.trackingDetails.assignedDriver}</p>
                        </div>
                      )}
                      
                      {pickup.trackingDetails.assignedVehicle && (
                        <div className="p-3 bg-gray-50 rounded-md">
                          <p className="text-sm font-medium text-gray-900">Vehicle</p>
                          <p className="text-sm text-gray-500">{pickup.trackingDetails.assignedVehicle}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
                
                {/* Placeholder for tracking map - in a real application this would be a real map */}
                <div className="border border-gray-200 rounded-md p-4 flex flex-col items-center justify-center h-64 bg-gray-50">
                  <MapPinIcon className="h-12 w-12 text-gray-400 mb-2" />
                  <p className="text-gray-500 text-center">
                    Live tracking map would appear here
                  </p>
                </div>
              </div>
            </Card>
          )}
        </div>

        {/* Sidebar column */}
        <div className="space-y-6">
          {/* Actions Card */}
          <Card title="Actions">
            <div className="space-y-4">
              {pickup.status === 'scheduled' && (
                <Button
                  variant="danger"
                  type="button"
                  fullWidth
                  onClick={() => setShowCancelModal(true)}
                >
                  <XCircleIcon className="h-5 w-5 mr-2" />
                  Cancel Pickup
                </Button>
              )}
              
              {pickup.paymentStatus === 'pending' && (
                <Button
                  variant="primary"
                  type="button"
                  fullWidth
                >
                  <CreditCardIcon className="h-5 w-5 mr-2" />
                  Make Payment
                </Button>
              )}
              
              {pickup.status === 'completed' && (
                <Button
                  variant="outline"
                  type="button"
                  fullWidth
                >
                  <ClipboardDocumentCheckIcon className="h-5 w-5 mr-2" />
                  Download Receipt
                </Button>
              )}
            </div>
          </Card>

          {/* Provider Contact Card */}
          {provider && (
            <Card title="Provider Contact">
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Company</p>
                  <p className="text-base text-gray-900">{provider.companyName}</p>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-gray-500">Contact Person</p>
                  <p className="text-base text-gray-900">{provider.contactPerson}</p>
                </div>
                
                <div className="flex items-center">
                  <PhoneIcon className="h-4 w-4 text-gray-400 mr-2" />
                  <a 
                    href={`tel:${provider.phone}`} 
                    className="text-primary-600 hover:text-primary-700"
                  >
                    {provider.phone}
                  </a>
                </div>
                
                <div className="flex items-center">
                  <EnvelopeIcon className="h-4 w-4 text-gray-400 mr-2" />
                  <a 
                    href={`mailto:${provider.email}`} 
                    className="text-primary-600 hover:text-primary-700"
                  >
                    {provider.email}
                  </a>
                </div>
                
                <div className="pt-2">
                  <Button
                    variant="outline"
                    type="button"
                    fullWidth
                  >
                    Contact Provider
                  </Button>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>

      {/* Cancel Confirmation Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Cancel Pickup Request?
            </h3>
            <p className="text-gray-500 mb-6">
              Are you sure you want to cancel this pickup request? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-4">
              <Button
                variant="outline"
                type="button"
                onClick={() => setShowCancelModal(false)}
              >
                No, Keep It
              </Button>
              <Button
                variant="danger"
                type="button"
                onClick={handleCancel}
              >
                Yes, Cancel Pickup
              </Button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}