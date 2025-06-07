import React from 'react'
import DashboardLayout from '@/components/layout/DashboardLayout'
import { DocumentTextIcon, CalendarIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline'

const mockReports = [
  {
    id: 1,
    title: 'Blood Test Results',
    date: '2024-03-15',
    type: 'Laboratory',
    doctor: 'Dr. Sarah Wilson',
    status: 'Available',
  },
  {
    id: 2,
    title: 'X-Ray Report',
    date: '2024-03-10',
    type: 'Imaging',
    doctor: 'Dr. Michael Chen',
    status: 'Available',
  },
  {
    id: 3,
    title: 'General Health Checkup',
    date: '2024-03-05',
    type: 'Consultation',
    doctor: 'Dr. Emily Brown',
    status: 'Available',
  },
]

export default function ReportsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-text-primary">Medical Reports</h1>
          <button className="btn-primary">Request New Report</button>
        </div>

        {/* Reports List */}
        <div className="card">
          <div className="space-y-4">
            {mockReports.map((report) => (
              <div
                key={report.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:shadow-sm transition-shadow"
              >
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-primary-blue bg-opacity-10 rounded-full">
                    <DocumentTextIcon className="w-6 h-6 text-primary-blue" />
                  </div>
                  <div>
                    <h3 className="font-medium">{report.title}</h3>
                    <div className="flex items-center space-x-4 mt-1 text-sm text-text-secondary">
                      <div className="flex items-center">
                        <CalendarIcon className="w-4 h-4 mr-1" />
                        {report.date}
                      </div>
                      <span>•</span>
                      <span>{report.type}</span>
                      <span>•</span>
                      <span>{report.doctor}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">
                    {report.status}
                  </span>
                  <button className="text-primary-blue hover:text-primary-blue/80 flex items-center">
                    <ArrowDownTrayIcon className="w-4 h-4 mr-1" />
                    Download
                  </button>
                  <button className="text-primary-blue hover:text-primary-blue/80">
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
} 