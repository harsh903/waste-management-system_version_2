'use client';

import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { 
  ShieldCheckIcon, 
  DocumentTextIcon, 
  ExclamationTriangleIcon 
} from '@heroicons/react/24/outline';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';

export default function Compliance() {
  const [complianceDocuments, setComplianceDocuments] = useState([
    {
      id: 1,
      name: 'Environmental Permit 2025',
      type: 'Permit',
      issueDate: '2025-01-15',
      expiryDate: '2026-01-14',
      status: 'active',
      description: 'Annual environmental operations permit'
    },
    {
      id: 2,
      name: 'Waste Handling Certification',
      type: 'Certification',
      issueDate: '2024-11-20',
      expiryDate: '2025-11-19',
      status: 'expiring_soon',
      description: 'Certification for hazardous waste handling'
    }
  ]);

  const [auditLogs, setAuditLogs] = useState([
    {
      id: 1,
      date: '2025-02-25',
      type: 'Internal Audit',
      description: 'Quarterly waste management compliance review',
      result: 'passed',
      auditor: 'Green Compliance Solutions'
    },
    {
      id: 2,
      date: '2025-01-15',
      type: 'External Inspection',
      description: 'Annual environmental compliance inspection',
      result: 'minor_issues',
      auditor: 'State Environmental Agency'
    }
  ]);

  const getStatusVariant = (status) => {
    switch (status) {
      case 'active': return 'success';
      case 'expiring_soon': return 'warning';
      case 'expired': return 'danger';
      case 'passed': return 'success';
      case 'minor_issues': return 'warning';
      case 'failed': return 'danger';
      default: return 'gray';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'active': return 'Active';
      case 'expiring_soon': return 'Expiring Soon';
      case 'expired': return 'Expired';
      case 'passed': return 'Passed';
      case 'minor_issues': return 'Minor Issues';
      case 'failed': return 'Failed';
      default: return 'Unknown';
    }
  };

  return (
    <DashboardLayout 
      title="Compliance" 
      allowedRoles={['provider']}
    >
      <div className="mb-8">
        <h2 className="text-lg font-medium text-gray-700 mb-2">
          Regulatory Compliance Management
        </h2>
        <p className="text-gray-500">
          Track and manage your environmental and operational compliance.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="stat-card">
          <div className="flex justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Active Permits</p>
              <p className="mt-1 text-2xl font-semibold text-gray-900">
                {complianceDocuments.filter(doc => doc.status === 'active').length}
              </p>
            </div>
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-100 text-blue-600">
              <ShieldCheckIcon className="h-6 w-6" />
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="flex justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Expiring Documents</p>
              <p className="mt-1 text-2xl font-semibold text-gray-900">
                {complianceDocuments.filter(doc => doc.status === 'expiring_soon').length}
              </p>
            </div>
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-yellow-100 text-yellow-600">
              <ExclamationTriangleIcon className="h-6 w-6" />
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="flex justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Recent Audits</p>
              <p className="mt-1 text-2xl font-semibold text-gray-900">
                {auditLogs.length}
              </p>
            </div>
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-green-100 text-green-600">
              <DocumentTextIcon className="h-6 w-6" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="card">
          <div className="card-header flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900">
              Compliance Documents
            </h3>
            <Button variant="outline" size="sm">Add Document</Button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Document Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Issue Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Expiry Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {complianceDocuments.map((doc) => (
                  <tr key={doc.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {doc.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {doc.type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {doc.issueDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {doc.expiryDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant={getStatusVariant(doc.status)}>
                        {getStatusLabel(doc.status)}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <Button variant="ghost" size="sm">View Details</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card">
          <div className="card-header flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900">
              Audit Logs
            </h3>
            <Button variant="outline" size="sm">Download Reports</Button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Auditor</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Result</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {auditLogs.map((log) => (
                  <tr key={log.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {log.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {log.type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {log.auditor}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant={getStatusVariant(log.result)}>
                        {getStatusLabel(log.result)}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <Button variant="ghost" size="sm">View Report</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}