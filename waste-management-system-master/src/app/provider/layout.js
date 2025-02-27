'use client';

import React from 'react';
import RouteGuard from '@/lib/utils/RouteGuard';

export default function ProviderLayout({ children }) {
  return (
    <RouteGuard allowedRoles={['provider']}>
      {children}
    </RouteGuard>
  );
}