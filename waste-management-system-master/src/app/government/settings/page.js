'use client';

import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useAuth } from '@/lib/context/AuthContext';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

const Settings = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    smsAlerts: false,
    weeklyReports: true
  });

  const [agencyInfo, setAgencyInfo] = useState({
    agencyName: 'Environmental Protection Department',
    email: user?.email || '',
    phone: '+1 (555) 987-6543',
    address: '789 Sustainability Avenue, Green City'
  });

  const [jurisdictionAreas, setJurisdictionAreas] = useState([
    'Metropolitan Region',
    'Suburban Districts',
    'Industrial Zone'
  ]);

  const handleNotificationToggle = (key) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleAgencyInfoChange = (key, value) => {
    setAgencyInfo(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleAddJurisdictionArea = () => {
    const newArea = prompt('Enter a new jurisdiction area:');
    if (newArea && newArea.trim() !== '') {
      setJurisdictionAreas(prev => [...prev, newArea.trim()]);
    }
  };

  const handleRemoveJurisdictionArea = (areaToRemove) => {
    setJurisdictionAreas(prev => prev.filter(area => area !== areaToRemove));
  };

  const handleSaveChanges = () => {
    // Placeholder for save logic
    console.log('Saving changes:', { agencyInfo, notifications, jurisdictionAreas });
  };

  return (
    <DashboardLayout 
      title="Account Settings" 
      allowedRoles={['government']}
    >
      <div className="mb-8">
        <h2 className="text-lg font-medium text-gray-700 mb-2">
          Manage Government Agency Settings
        </h2>
        <p className="text-gray-500">
          Update your profile, notification preferences, and jurisdiction details.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="card">
          <div className="card-header">
            <h3 className="text-lg font-medium text-gray-900">
              Notification Preferences
            </h3>
          </div>
          <div className="card-content space-y-4">
            <div className="flex items-center justify-between">
              <label htmlFor="email-alerts" className="text-sm text-gray-700">
                Email Alerts
              </label>
              <input
                type="checkbox"
                id="email-alerts"
                checked={notifications.emailAlerts}
                onChange={() => handleNotificationToggle('emailAlerts')}
                className="form-checkbox h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
            </div>
            <div className="flex items-center justify-between">
              <label htmlFor="sms-alerts" className="text-sm text-gray-700">
                SMS Alerts
              </label>
              <input
                type="checkbox"
                id="sms-alerts"
                checked={notifications.smsAlerts}
                onChange={() => handleNotificationToggle('smsAlerts')}
                className="form-checkbox h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
            </div>
            <div className="flex items-center justify-between">
              <label htmlFor="weekly-reports" className="text-sm text-gray-700">
                Weekly Reports
              </label>
              <input
                type="checkbox"
                id="weekly-reports"
                checked={notifications.weeklyReports}
                onChange={() => handleNotificationToggle('weeklyReports')}
                className="form-checkbox h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3 className="text-lg font-medium text-gray-900">
              Agency Information
            </h3>
          </div>
          <div className="card-content space-y-4">
            <div>
              <label htmlFor="agency-name" className="block text-sm font-medium text-gray-700 mb-2">
                Agency Name
              </label>
              <Input
                id="agency-name"
                value={agencyInfo.agencyName}
                onChange={(e) => handleAgencyInfoChange('agencyName', e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Contact Email
              </label>
              <Input
                id="email"
                value={agencyInfo.email}
                onChange={(e) => handleAgencyInfoChange('email', e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <Input
                id="phone"
                value={agencyInfo.phone}
                onChange={(e) => handleAgencyInfoChange('phone', e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                Address
              </label>
              <Input
                id="address"
                value={agencyInfo.address}
                onChange={(e) => handleAgencyInfoChange('address', e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="card mb-8">
        <div className="card-header flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-900">
            Jurisdiction Areas
          </h3>
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleAddJurisdictionArea}
          >
            Add Jurisdiction
          </Button>
        </div>
        <div className="card-content">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {jurisdictionAreas.map((area) => (
              <div 
                key={area} 
                className="flex items-center justify-between p-3 bg-gray-50 rounded-md"
              >
                <span className="text-sm text-gray-700">{area}</span>
                <button
                  onClick={() => handleRemoveJurisdictionArea(area)}
                  className="text-red-500 hover:text-red-700"
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5" 
                    viewBox="0 0 20 20" 
                    fill="currentColor"
                  >
                    <path 
                      fillRule="evenodd" 
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" 
                      clipRule="evenodd" 
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card mb-8">
        <div className="card-header">
          <h3 className="text-lg font-medium text-gray-900">
            Account Security
          </h3>
        </div>
        <div className="card-content">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Change Password
              </label>
              <div className="mt-2">
                <Button variant="outline">Reset Password</Button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Two-Factor Authentication
              </label>
              <div className="flex items-center justify-between mt-2">
                <span className="text-sm text-gray-500">
                  Add an extra layer of security to your account
                </span>
                <input
                  type="checkbox"
                  id="two-factor"
                  checked={false}
                  onChange={() => {}}
                  className="form-checkbox h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <Button variant="outline">Cancel</Button>
        <Button onClick={handleSaveChanges}>Save Changes</Button>
      </div>
    </DashboardLayout>
  );
};

export default Settings;