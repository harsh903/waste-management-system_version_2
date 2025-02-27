'use client';

import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { 
  DocumentTextIcon, 
  ArrowDownTrayIcon,
  ClockIcon
} from '@heroicons/react/24/outline';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';

const Reports = () => {
  const [reports, setReports] = useState([
    {
      id: 1,
      title: 'Quarterly Waste Management Overview',
      type: 'Quarterly',
      generatedDate: '2025-02-15',
      status: 'completed',
      coverageArea: 'Metropolitan Region',
      fileSize: '2.3 MB'
    },
    {
      id: 2,
      title: 'Annual Environmental Impact Assessment',
      type: 'Annual',
      generatedDate: '2025-01-10',
      status: 'in_progress',
      coverageArea: 'Entire Jurisdiction',
      fileSize: '5.7 MB'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  const getStatusVariant = (status) => {
    switch (status) {
      case 'completed': return 'success';
      case 'in_progress': return 'warning';
      case 'pending': return 'info';
      default: return 'gray';
    }
  };

  const filteredReports = reports.filter(report => 
    report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout 
      title="Reports" 
      allowedRoles={['government']}
    >
      <div className="mb-8">
        <h2 className="text-lg font-medium text-gray-700 mb-2">
          Comprehensive Waste Management Reporting
        </h2>
        <p className="text-gray-500">
          Generate, manage, and review detailed waste management reports.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="stat-card">
          <div className="flex justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Reports</p>
              <p className="mt-1 text-2xl font-semibold text-gray-900">
                {reports.length}
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
              <p className="text-sm font-medium text-gray-500">Completed Reports</p>
              <p className="mt-1 text-2xl font-semibold text-gray-900">
                {reports.filter(r => r.status === 'completed').length}
              </p>
            </div>
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-green-100 text-green-600">
              <ClockIcon className="h-6 w-6" />
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="flex justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Reports In Progress</p>
              <p className="mt-1 text-2xl font-semibold text-gray-900">
                {reports.filter(r => r.status === 'in_progress').length}
              </p>
            </div>
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-yellow-100 text-yellow-600">
              <ClockIcon className="h-6 w-6" />
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-900">
            Generated Reports
          </h3>
          <div className="flex items-center space-x-4">
            <input 
              type="text"
              placeholder="Search reports..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md w-64"
            />
            <Button variant="outline" size="sm">Generate New Report</Button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Report Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Generated Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Coverage Area</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">File Size</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredReports.map((report) => (
                <tr key={report.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {report.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {report.type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {report.generatedDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {report.coverageArea}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {report.fileSize}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge variant={getStatusVariant(report.status)}>
                      {report.status === 'completed' 
                        ? 'Completed' 
                        : report.status === 'in_progress'
                        ? 'In Progress'
                        : 'Pending'}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <Button variant="ghost" size="sm">
                      <ArrowDownTrayIcon className="h-4 w-4 mr-2" />
                      Download
                    </Button>
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

export default Reports;