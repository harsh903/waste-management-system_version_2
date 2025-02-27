'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '../context/AuthContext';

export default function RouteGuard({ children, allowedRoles = [] }) {
  const { user, loading, isAuthenticated } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Auth guard logic
    if (!loading) {
      // If not authenticated and trying to access a protected route
      if (!isAuthenticated && !pathname.startsWith('/login')) {
        router.push('/login');
      }
      
      // If authenticated but trying to access login page
      if (isAuthenticated && pathname === '/login') {
        router.push(getDashboardPath(user.role));
      }
      
      // If authenticated but not authorized for this role-specific route
      if (isAuthenticated && allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
        router.push(getDashboardPath(user.role));
      }
    }
  }, [isAuthenticated, loading, pathname, router, user, allowedRoles]);

  // Show loading indicator while checking authentication
  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  return children;
}

// Helper function to get the dashboard path based on user role
function getDashboardPath(role) {
  switch (role) {
    case 'business':
      return '/business/dashboard';
    case 'provider':
      return '/provider/dashboard';
    case 'government':
      return '/government/dashboard';
    default:
      return '/login';
  }
}