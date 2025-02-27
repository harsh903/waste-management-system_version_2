'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Button from '@/components/ui/Button';
import { WASTE_TYPES, WASTE_PROVIDERS, BUSINESSES } from '@/lib/data/mockData';
import { useAuth } from '@/lib/context/AuthContext';

export default function RequestPickup() {
  const { user } = useAuth();
  const router = useRouter();
  const [businessData, setBusinessData] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors },
    setValue,
    watch
  } = useForm();
  
  const selectedWasteType = watch('wasteTypeId');
  const selectedDate = watch('scheduledDate');
  
  useEffect(() => {
    if (user) {
      // Find business data for the logged-in user
      const business = BUSINESSES.find(b => b.userId === user.id);
      setBusinessData(business);
      
      // Set address values from business profile
      if (business) {
        setValue('pickupAddress', business.address);
        setValue('city', business.city);
        setValue('state', business.state);
        setValue('postalCode', business.postalCode);
      }
    }
  }, [user, setValue]);

  // Format waste type options for select
  const wasteTypeOptions = WASTE_TYPES.map(type => ({
    value: type.id,
    label: `${type.name}${type.hazardous ? ' (Hazardous)' : ''}`
  }));
  
  // Format provider options for select
  const providerOptions = WASTE_PROVIDERS.map(provider => ({
    value: provider.id,
    label: provider.companyName
  }));
  
  // Helper function to get minimum date (tomorrow)
  const getMinDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  // Form submission handler
  const onSubmit = (data) => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Submitted pickup request:', data);
      setIsSubmitting(false);
      setSubmitSuccess(true);
      
      // Redirect to pickups list after short delay
      setTimeout(() => {
        router.push('/business/pickups');
      }, 2000);
    }, 1000);
  };

  const getSelectedWasteTypeDetails = () => {
    if (!selectedWasteType) return null;
    return WASTE_TYPES.find(type => type.id === selectedWasteType);
  };

  const selectedWasteTypeDetails = getSelectedWasteTypeDetails();

  return (
    <DashboardLayout 
      title="Request Waste Pickup" 
      allowedRoles={['business']}
    >
      {submitSuccess ? (
        <div className="card">
          <div className="flex flex-col items-center justify-center py-12">
            <div className="flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Pickup Request Submitted!</h2>
            <p className="text-gray-500 text-center mb-6">
              Your pickup request has been successfully submitted. You will be redirected to your pickups list shortly.
            </p>
            <Button
              onClick={() => router.push('/business/pickups')}
              variant="primary"
            >
              Go to My Pickups
            </Button>
          </div>
        </div>
      ) : (
        <div className="card">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Waste Details</h3>
                
                <Select
                  label="Waste Type"
                  id="wasteTypeId"
                  options={wasteTypeOptions}
                  required
                  error={errors.wasteTypeId?.message}
                  {...register('wasteTypeId', { 
                    required: 'Waste type is required' 
                  })}
                />
                
                {selectedWasteTypeDetails && (
                  <div className={`p-4 rounded-md mt-2 mb-4 ${
                    selectedWasteTypeDetails.hazardous 
                      ? 'bg-red-50 text-red-800 border border-red-200' 
                      : 'bg-green-50 text-green-800 border border-green-200'
                  }`}>
                    <p className="text-sm">
                      {selectedWasteTypeDetails.description}
                      {selectedWasteTypeDetails.hazardous && (
                        <span className="block mt-2 font-semibold">
                          This is classified as hazardous waste and requires special handling.
                        </span>
                      )}
                    </p>
                  </div>
                )}
                
                <Input
                  label="Estimated Volume (kg)"
                  id="volumeKg"
                  type="number"
                  min="1"
                  step="0.1"
                  required
                  error={errors.volumeKg?.message}
                  {...register('volumeKg', { 
                    required: 'Volume is required',
                    min: {
                      value: 1,
                      message: 'Volume must be at least 1 kg'
                    }
                  })}
                />
                
                <Input
                  label="Additional Notes"
                  id="notes"
                  type="textarea"
                  placeholder="Any special instructions or details"
                  {...register('notes')}
                />
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Pickup Details</h3>
                
                <Select
                  label="Waste Provider"
                  id="providerId"
                  options={providerOptions}
                  required
                  error={errors.providerId?.message}
                  {...register('providerId', { 
                    required: 'Provider is required' 
                  })}
                />
                
                <Input
                  label="Scheduled Date"
                  id="scheduledDate"
                  type="date"
                  required
                  min={getMinDate()}
                  error={errors.scheduledDate?.message}
                  {...register('scheduledDate', { 
                    required: 'Scheduled date is required' 
                  })}
                />
                
                <Input
                  label="Pickup Address"
                  id="pickupAddress"
                  required
                  error={errors.pickupAddress?.message}
                  {...register('pickupAddress', { 
                    required: 'Pickup address is required' 
                  })}
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="City"
                    id="city"
                    required
                    error={errors.city?.message}
                    {...register('city', { 
                      required: 'City is required' 
                    })}
                  />
                  
                  <Input
                    label="State"
                    id="state"
                    required
                    error={errors.state?.message}
                    {...register('state', { 
                      required: 'State is required' 
                    })}
                  />
                </div>
                
                <Input
                  label="Postal Code"
                  id="postalCode"
                  required
                  error={errors.postalCode?.message}
                  {...register('postalCode', { 
                    required: 'Postal code is required' 
                  })}
                />
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-6">
              <div className="flex justify-end">
                <Button
                  type="button"
                  variant="outline"
                  className="mr-4"
                  onClick={() => router.back()}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Request'}
                </Button>
              </div>
            </div>
          </form>
        </div>
      )}
    </DashboardLayout>
  );
}