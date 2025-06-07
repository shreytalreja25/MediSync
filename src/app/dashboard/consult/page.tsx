import React from 'react'
import DashboardLayout from '@/components/layout/DashboardLayout'
import { VideoCameraIcon, MicrophoneIcon, PhoneIcon, ChatBubbleLeftIcon } from '@heroicons/react/24/outline'

const mockConsultations = [
  {
    id: 1,
    doctor: 'Dr. Sarah Wilson',
    type: 'Follow-up Consultation',
    date: '2024-03-20',
    time: '10:00 AM',
    status: 'upcoming',
  },
  {
    id: 2,
    doctor: 'Dr. Michael Chen',
    type: 'Initial Consultation',
    date: '2024-03-25',
    time: '2:30 PM',
    status: 'scheduled',
  },
]

export default function ConsultPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-text-primary">Video Consultations</h1>
          <button className="btn-primary">Schedule New Consult</button>
        </div>

        {/* Active Consultation */}
        <div className="card bg-primary-blue bg-opacity-5 border border-primary-blue border-opacity-20">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-primary-blue">Active Consultation</h2>
              <p className="mt-1 text-text-secondary">Dr. Sarah Wilson - Follow-up Consultation</p>
              <p className="text-sm text-text-secondary">Room ID: MEDI-1234</p>
            </div>
            <button className="btn-primary">Join Now</button>
          </div>
        </div>

        {/* Video Controls */}
        <div className="card">
          <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <VideoCameraIcon className="w-12 h-12 text-gray-400 mx-auto" />
              <p className="mt-2 text-gray-400">Video consultation will start here</p>
            </div>
          </div>
          <div className="mt-4 flex justify-center space-x-4">
            <button className="p-3 rounded-full bg-gray-100 hover:bg-gray-200">
              <MicrophoneIcon className="w-6 h-6 text-gray-600" />
            </button>
            <button className="p-3 rounded-full bg-gray-100 hover:bg-gray-200">
              <VideoCameraIcon className="w-6 h-6 text-gray-600" />
            </button>
            <button className="p-3 rounded-full bg-red-500 hover:bg-red-600">
              <PhoneIcon className="w-6 h-6 text-white" />
            </button>
            <button className="p-3 rounded-full bg-gray-100 hover:bg-gray-200">
              <ChatBubbleLeftIcon className="w-6 h-6 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Upcoming Consultations */}
        <div className="card">
          <h2 className="text-lg font-semibold mb-4">Upcoming Consultations</h2>
          <div className="space-y-4">
            {mockConsultations.map((consultation) => (
              <div
                key={consultation.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:shadow-sm transition-shadow"
              >
                <div>
                  <h3 className="font-medium">{consultation.type}</h3>
                  <p className="text-sm text-text-secondary">{consultation.doctor}</p>
                  <p className="text-sm text-text-secondary">
                    {consultation.date} at {consultation.time}
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      consultation.status === 'upcoming'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}
                  >
                    {consultation.status.charAt(0).toUpperCase() + consultation.status.slice(1)}
                  </span>
                  <button className="text-primary-blue hover:text-primary-blue/80">
                    View Details
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