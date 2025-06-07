import React from 'react'
import DashboardLayout from '@/components/layout/DashboardLayout'
import { CalendarIcon, DocumentTextIcon, VideoCameraIcon } from '@heroicons/react/24/outline'

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="card">
          <h1 className="text-2xl font-semibold text-text-primary">Welcome back, John!</h1>
          <p className="mt-2 text-text-secondary">Here&apos;s what&apos;s happening with your health today.</p>
        </div>

        {/* Upcoming Appointment */}
        <div className="card bg-primary-blue bg-opacity-100 border border-primary-blue border-opacity-20">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-white">Upcoming Appointment</h2>
              <p className="mt-1 text-white">Dr. Sarah Wilson - General Checkup</p>
              <p className="text-sm text-white">Tomorrow at 10:00 AM</p>
            </div>
            <button className="btn-primary">View Details</button>
          </div>
        </div>

        {/* Quick Access Tiles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card hover:shadow-md transition-shadow cursor-pointer">
            <CalendarIcon className="w-8 h-8 text-primary-green" />
            <h3 className="mt-4 text-lg font-semibold">Book Appointment</h3>
            <p className="mt-2 text-sm text-text-secondary">Schedule your next visit</p>
          </div>

          <div className="card hover:shadow-md transition-shadow cursor-pointer">
            <DocumentTextIcon className="w-8 h-8 text-primary-blue" />
            <h3 className="mt-4 text-lg font-semibold">Medical Reports</h3>
            <p className="mt-2 text-sm text-text-secondary">View your health records</p>
          </div>

          <div className="card hover:shadow-md transition-shadow cursor-pointer">
            <VideoCameraIcon className="w-8 h-8 text-primary-yellow" />
            <h3 className="mt-4 text-lg font-semibold">Video Consult</h3>
            <p className="mt-2 text-sm text-text-secondary">Start a virtual appointment</p>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="card">
          <h2 className="text-lg font-semibold">Recent Activity</h2>
          <div className="mt-4 space-y-4">
            <div className="flex items-center justify-between py-3 border-b">
              <div>
                <p className="font-medium">Appointment Confirmed</p>
                <p className="text-sm text-text-secondary">General Checkup with Dr. Wilson</p>
              </div>
              <span className="text-sm text-text-secondary">2 days ago</span>
            </div>
            <div className="flex items-center justify-between py-3 border-b">
              <div>
                <p className="font-medium">Medical Report Updated</p>
                <p className="text-sm text-text-secondary">Blood Test Results</p>
              </div>
              <span className="text-sm text-text-secondary">1 week ago</span>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
} 