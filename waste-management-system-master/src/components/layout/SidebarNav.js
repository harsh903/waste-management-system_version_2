'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/lib/context/AuthContext';
import { 
  HomeIcon, 
  ClipboardDocumentListIcon, 
  TruckIcon,
  UsersIcon,
  ChartBarIcon,
  DocumentTextIcon,
  CogIcon,
  ArrowLeftOnRectangleIcon,
  Bars3Icon,
  XMarkIcon
} from '@heroicons/react/24/outline';

const SidebarNav = () => {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Define navigation items based on user role
  const getNavigationItems = () => {
    switch (user?.role) {
      case 'business':
        return [
          { name: 'Dashboard', href: '/business/dashboard', icon: HomeIcon },
          { name: 'Request Pickup', href: '/business/request-pickup', icon: TruckIcon },
          { name: 'My Pickups', href: '/business/pickups', icon: ClipboardDocumentListIcon },
          { name: 'Waste Profile', href: '/business/waste-profile', icon: DocumentTextIcon },
          { name: 'Reports', href: '/business/reports', icon: ChartBarIcon },
          { name: 'Settings', href: '/business/settings', icon: CogIcon },
        ];
      case 'provider':
        return [
          { name: 'Dashboard', href: '/provider/dashboard', icon: HomeIcon },
          { name: 'Pickup Requests', href: '/provider/pickup-requests', icon: ClipboardDocumentListIcon },
          { name: 'Routes & Tracking', href: '/provider/tracking', icon: TruckIcon },
          { name: 'Vehicles & Drivers', href: '/provider/fleet', icon: TruckIcon },
          { name: 'Customers', href: '/provider/customers', icon: UsersIcon },
          { name: 'Compliance', href: '/provider/compliance', icon: DocumentTextIcon },
          { name: 'Reports', href: '/provider/reports', icon: ChartBarIcon },
          { name: 'Settings', href: '/provider/settings', icon: CogIcon },
        ];
      case 'government':
        return [
          { name: 'Dashboard', href: '/government/dashboard', icon: HomeIcon },
          { name: 'Waste Providers', href: '/government/providers', icon: TruckIcon },
          { name: 'Businesses', href: '/government/businesses', icon: UsersIcon },
          { name: 'Compliance', href: '/government/compliance', icon: DocumentTextIcon },
          { name: 'Analytics', href: '/government/analytics', icon: ChartBarIcon },
          { name: 'Reports', href: '/government/reports', icon: DocumentTextIcon },
          { name: 'Settings', href: '/government/settings', icon: CogIcon },
        ];
      default:
        return [];
    }
  };

  const navigationItems = getNavigationItems();
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-0 left-0 z-40 w-full bg-white shadow-sm px-4 py-2 flex items-center justify-between">
        <div className="flex items-center">
          <button
            type="button"
            className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-600 hover:bg-gray-100"
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? (
              <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
            ) : (
              <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
            )}
          </button>
          <span className="ml-2 text-lg font-semibold text-primary-600">Waste Management</span>
        </div>
        <button
          onClick={logout}
          className="text-gray-500 hover:text-gray-600 p-2"
        >
          <ArrowLeftOnRectangleIcon className="h-6 w-6" />
        </button>
      </div>

      {/* Mobile menu */}
      <div className={`lg:hidden fixed inset-0 z-30 transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out`}>
        <div className="relative flex flex-col w-72 max-w-xs h-full bg-white border-r border-gray-200 pt-16 pb-4">
          <div className="flex-1 overflow-y-auto">
            <nav className="mt-2 px-2 space-y-1">
              {navigationItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`group flex items-center px-2 py-2 text-base font-medium rounded-md ${
                      isActive
                        ? 'bg-primary-50 text-primary-600'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <item.icon
                      className={`mr-4 flex-shrink-0 h-6 w-6 ${
                        isActive ? 'text-primary-500' : 'text-gray-400 group-hover:text-gray-500'
                      }`}
                      aria-hidden="true"
                    />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>
          <div className="border-t border-gray-200 p-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-full bg-primary-500 flex items-center justify-center text-white font-semibold">
                  {user?.email?.charAt(0).toUpperCase()}
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700">{user?.email}</p>
                <p className="text-xs font-medium text-gray-500 capitalize">{user?.role}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-shrink-0 w-14" aria-hidden="true">
          {/* Force sidebar to shrink to fit close icon */}
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:flex lg:flex-shrink-0">
        <div className="flex flex-col w-64">
          <div className="flex flex-col h-0 flex-1 border-r border-gray-200 bg-white">
            <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
              <div className="flex items-center flex-shrink-0 px-4">
                <h1 className="text-xl font-bold text-primary-600">ZestGoa</h1>
              </div>
              <nav className="mt-8 flex-1 px-4 space-y-1">
                {navigationItems.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                        isActive
                          ? 'bg-primary-50 text-primary-600'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                    >
                      <item.icon
                        className={`mr-3 flex-shrink-0 h-5 w-5 ${
                          isActive ? 'text-primary-500' : 'text-gray-400 group-hover:text-gray-500'
                        }`}
                        aria-hidden="true"
                      />
                      {item.name}
                    </Link>
                  );
                })}
              </nav>
            </div>
            <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
              <div className="flex-shrink-0 w-full group block">
                <div className="flex items-center">
                  <div>
                    <div className="h-10 w-10 rounded-full bg-primary-500 flex items-center justify-center text-white font-semibold">
                      {user?.email?.charAt(0).toUpperCase()}
                    </div>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-700 truncate">{user?.email}</p>
                    <p className="text-xs font-medium text-gray-500 capitalize">{user?.role}</p>
                    <button
                      onClick={logout}
                      className="mt-1 text-xs text-red-500 hover:text-red-700 flex items-center"
                    >
                      <ArrowLeftOnRectangleIcon className="h-3 w-3 mr-1" />
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SidebarNav;