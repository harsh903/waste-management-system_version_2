'use client';

import React from 'react';
import RouteGuard from '@/lib/utils/RouteGuard';

export default function BusinessLayout({ children }) {
  return (
    <RouteGuard allowedRoles={['business']}>
      {children}
    </RouteGuard>
  );
}