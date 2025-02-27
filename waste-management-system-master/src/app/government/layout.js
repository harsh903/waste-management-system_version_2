'use client';

import React from 'react';
import RouteGuard from '@/lib/utils/RouteGuard';

export default function GovernmentLayout({ children }) {
  return (
    <RouteGuard allowedRoles={['government']}>
      {children}
    </RouteGuard>
  );
}