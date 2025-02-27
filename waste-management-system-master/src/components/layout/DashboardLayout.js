'use client';

import React from 'react';
import SidebarNav from './SidebarNav';
import RouteGuard from '@/lib/utils/RouteGuard';

const DashboardLayout = ({ 
  children, 
  title, 
  allowedRoles = [],
}) => {
  return (
    <RouteGuard allowedRoles={allowedRoles}>
      <div className="h-screen flex overflow-hidden bg-gray-100">
        <SidebarNav />
        
        <div className="flex flex-col w-0 flex-1 overflow-hidden">
          <main className="flex-1 relative overflow-y-auto focus:outline-none">
            <div className="py-6">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {title && (
                  <h1 className="text-2xl font-semibold text-gray-900 mb-6">{title}</h1>
                )}
                {children}
              </div>
            </div>
          </main>
        </div>
      </div>
    </RouteGuard>
  );
};

export default DashboardLayout;