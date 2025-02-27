'use client';

import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useAuth } from '@/lib/context/AuthContext';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Button from '@/components/ui/Button';

export default function Settings() {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    smsAlerts: false,
    weeklyReports: true
  });

  const [companyInfo, setCompanyInfo] = useState({
    companyName: user?.businessName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || ''
  });

  const handleNotificationToggle = (key) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleCompanyInfoChange = (key, value) => {
    setCompanyInfo(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSaveChanges = () => {
    // Placeholder for save logic
    console.log('Saving changes:', { companyInfo, notifications });
  };

  return (
    <DashboardLayout 
      title="Account Settings" 
      allowedRoles={['business']}
    >
      <div className="mb-8">
        <h2 className="text-lg font-medium text-gray-700 mb-2">
          Manage Your Account
        </h2>
        <p className="text-gray-500">
          Update your profile, notification preferences, and account settings.
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
              <label htmlFor="email-alerts" className="text-sm text-gray-700">Email Alerts</label>
              <input
                type="checkbox"
                id="email-alerts"
                checked={notifications.emailAlerts}
                onChange={() => handleNotificationToggle('emailAlerts')}
                className="form-checkbox h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
            </div>
            <div className="flex items-center justify-between">
              <label htmlFor="sms-alerts" className="text-sm text-gray-700">SMS Alerts</label>
              <input
                type="checkbox"
                id="sms-alerts"
                checked={notifications.smsAlerts}
                onChange={() => handleNotificationToggle('smsAlerts')}
                className="form-checkbox h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
            </div>
            <div className="flex items-center justify-between">
              <label htmlFor="weekly-reports" className="text-sm text-gray-700">Weekly Reports</label>
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
              Company Information
            </h3>
          </div>
          <div className="card-content space-y-4">
            <div>
              <label htmlFor="company-name" className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
              <Input
                id="company-name"
                value={companyInfo.companyName}
                onChange={(e) => handleCompanyInfoChange('companyName', e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Contact Email</label>
              <Input
                id="email"
                value={companyInfo.email}
                onChange={(e) => handleCompanyInfoChange('email', e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
              <Input
                id="phone"
                value={companyInfo.phone}
                onChange={(e) => handleCompanyInfoChange('phone', e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">Address</label>
              <Input
                id="address"
                value={companyInfo.address}
                onChange={(e) => handleCompanyInfoChange('address', e.target.value)}
              />
            </div>
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
              <label className="block text-sm font-medium text-gray-700 mb-2">Change Password</label>
              <div className="mt-2">
                <Button variant="outline">Reset Password</Button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Two-Factor Authentication</label>
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
}