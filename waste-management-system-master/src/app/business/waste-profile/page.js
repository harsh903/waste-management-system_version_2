'use client';

import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useAuth } from '@/lib/context/AuthContext';
import Button from '@/components/ui/Button';
import { BUSINESSES, WASTE_TYPES } from '@/lib/data/mockData';

export default function WasteProfile() {
  const { user } = useAuth();
  const [businessData, setBusinessData] = useState(
    BUSINESSES.find(b => b.userId === user?.id) || {}
  );

  const wasteTypes = WASTE_TYPES.filter(
    type => businessData.wasteTypeIds?.includes(type.id)
  );

  return (
    <DashboardLayout 
      title="Waste Profile" 
      allowedRoles={['business']}
    >
      <div className="mb-8">
        <h2 className="text-lg font-medium text-gray-700 mb-2">
          {businessData.name} Waste Management Profile
        </h2>
        <p className="text-gray-500">
          Manage and review your company's waste management details.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="card">
          <div className="card-header">
            <h3 className="text-lg font-medium text-gray-900">Company Details</h3>
          </div>
          <div className="card-content">
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Business Name</p>
                <p className="text-gray-900">{businessData.name}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Industry</p>
                <p className="text-gray-900">{businessData.industry || 'Not Specified'}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Contact Email</p>
                <p className="text-gray-900">{user?.email}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3 className="text-lg font-medium text-gray-900">Waste Generation</h3>
          </div>
          <div className="card-content">
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Monthly Waste Volume</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {businessData.monthlyWasteVolume || 0} kg
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Primary Waste Types</p>
                <ul className="list-disc pl-5 text-gray-900">
                  {wasteTypes.map(type => (
                    <li key={type.id}>{type.name}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card mb-8">
        <div className="card-header">
          <h3 className="text-lg font-medium text-gray-900">Sustainability Goals</h3>
        </div>
        <div className="card-content">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-gray-50 rounded-md">
              <h4 className="text-sm font-medium text-gray-500 mb-2">Recycling Target</h4>
              <p className="text-2xl font-semibold text-gray-900">70%</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-md">
              <h4 className="text-sm font-medium text-gray-500 mb-2">Waste Reduction Goal</h4>
              <p className="text-2xl font-semibold text-gray-900">20% by 2026</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-md">
              <h4 className="text-sm font-medium text-gray-500 mb-2">Carbon Offset</h4>
              <p className="text-2xl font-semibold text-gray-900">500 kg CO2</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <Button variant="outline">Edit Profile</Button>
        <Button>Update Waste Types</Button>
      </div>
    </DashboardLayout>
  );
}