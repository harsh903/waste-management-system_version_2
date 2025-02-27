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
import Input from '@/components/ui/Input';

const Compliance = () => {
  const [complianceReports, setComplianceReports] = useState([
    {
      id: 1,
      entityName: 'Green Waste Solutions',
      entityType: 'Provider',
      reportDate: '2025-02-15',
      status: 'compliant',
      violations: 0,
      documentType: 'Annual Waste Management Report'
    },
    {
      id: 2,
      entityName: 'EcoTech Manufacturing',
      entityType: 'Business',
      reportDate: '2025-01-20',
      status: 'needs_review',
      violations: 2,
      documentType: 'Quarterly Environmental Audit'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  const getStatusVariant = (status) => {
    switch (status) {
      case 'compliant': return 'success';
      case 'needs_review': return 'warning';
      case 'non_compliant': return 'danger';
      default: return 'gray';
    }
  };

  const filteredReports = complianceReports.filter(report => 
    report.entityName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.documentType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout 
      title="Compliance" 
      allowedRoles={['government']}
    >
      <div className="mb-8">
        <h2 className="text-lg font-medium text-gray-700 mb-2">
          Regulatory Compliance Monitoring
        </h2>
        <p className="text-gray-500">
          Track and manage waste management regulatory compliance.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="stat-card">
          <div className="flex justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Compliance Reports</p>
              <p className="mt-1 text-2xl font-semibold text-gray-900">
                {complianceReports.length}
              </p>
            </div>
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-100 text-blue-600">
              <DocumentTextIcon className="h-6 w-6" />
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="flex justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Compliant Entities</p>
              <p className="mt-1 text-2xl font-semibold text-gray-900">
                {complianceReports.filter(r => r.status === 'compliant').length}
              </p>
            </div>
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-green-100 text-green-600">
              <ShieldCheckIcon className="h-6 w-6" />
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="flex justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Entities Needing Review</p>
              <p className="mt-1 text-2xl font-semibold text-gray-900">
                {complianceReports.filter(r => r.status === 'needs_review').length}
              </p>
            </div>
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-yellow-100 text-yellow-600">
              <ExclamationTriangleIcon className="h-6 w-6" />
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-900">
            Compliance Reports
          </h3>
          <div className="flex items-center space-x-4">
            <Input 
              placeholder="Search reports..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-64"
            />
            <Button variant="outline" size="sm">Generate Report</Button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Entity Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Entity Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Report Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Document Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Violations</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredReports.map((report) => (
                <tr key={report.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {report.entityName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {report.entityType}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {report.reportDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {report.documentType}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {report.violations}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge variant={getStatusVariant(report.status)}>
                      {report.status === 'compliant' 
                        ? 'Compliant' 
                        : report.status === 'needs_review'
                        ? 'Needs Review'
                        : 'Non-Compliant'}
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
    </DashboardLayout>
  );
};

export default Compliance;