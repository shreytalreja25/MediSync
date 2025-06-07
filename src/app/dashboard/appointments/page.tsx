import React from 'react'
import DashboardLayout from '@/components/layout/DashboardLayout'
import { CalendarIcon, ClockIcon, UserIcon } from '@heroicons/react/24/outline'

const mockAppointments = [
  {
    id: 1,
    doctor: 'Dr. Sarah Wilson',
    type: 'General Checkup',
    date: '2024-03-20',
    time: '10:00 AM',
    status: 'confirmed',
  },
  {
    id: 2,
    doctor: 'Dr. Michael Chen',
    type: 'Follow-up Consultation',
    date: '2024-03-25',
    time: '2:30 PM',
    status: 'pending',
  },
  {
    id: 3,
    doctor: 'Dr. Emily Brown',
    type: 'Specialist Consultation',
    date: '2024-03-15',
    time: '11:15 AM',
    status: 'completed',
  },
]

export default function AppointmentsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-text-primary">Appointments</h1>
          <button className="btn-primary">Book New Appointment</button>
        </div>

        {/* Appointments List */}
        <div className="card">
          <div className="space-y-4">
            {mockAppointments.map((appointment) => (
              <div
                key={appointment.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:shadow-sm transition-shadow"
              >
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-primary-green bg-opacity-10 rounded-full">
                    <CalendarIcon className="w-6 h-6 text-primary-green" />
                  </div>
                  <div>
                    <h3 className="font-medium">{appointment.type}</h3>
                    <div className="flex items-center space-x-4 mt-1 text-sm text-text-secondary">
                      <div className="flex items-center">
                        <UserIcon className="w-4 h-4 mr-1" />
                        {appointment.doctor}
                      </div>
                      <div className="flex items-center">
                        <ClockIcon className="w-4 h-4 mr-1" />
                        {appointment.date} at {appointment.time}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      appointment.status === 'confirmed'
                        ? 'bg-green-100 text-green-800'
                        : appointment.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                  </span>
                  <button className="text-primary-green hover:text-primary-green/80">
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