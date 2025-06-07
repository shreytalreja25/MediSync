import React from 'react'
import DashboardLayout from '@/components/layout/DashboardLayout'
import { CreditCardIcon, CalendarIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline'

const mockInvoices = [
  {
    id: 'INV-001',
    title: 'General Consultation',
    date: '2024-03-15',
    amount: 150.00,
    status: 'Paid',
  },
  {
    id: 'INV-002',
    title: 'Laboratory Tests',
    date: '2024-03-10',
    amount: 85.50,
    status: 'Pending',
  },
  {
    id: 'INV-003',
    title: 'Specialist Consultation',
    date: '2024-03-05',
    amount: 200.00,
    status: 'Paid',
  },
]

export default function BillingPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-text-primary">Billing & Payments</h1>
          <button className="btn-primary">View Payment History</button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card bg-primary-green bg-opacity-5">
            <h3 className="text-lg font-medium text-text-primary">Total Paid</h3>
            <p className="mt-2 text-2xl font-semibold text-primary-green">$350.00</p>
          </div>
          <div className="card bg-primary-blue bg-opacity-5">
            <h3 className="text-lg font-medium text-text-primary">Pending Amount</h3>
            <p className="mt-2 text-2xl font-semibold text-primary-blue">$85.50</p>
          </div>
          <div className="card bg-primary-yellow bg-opacity-5">
            <h3 className="text-lg font-medium text-text-primary">Next Payment Due</h3>
            <p className="mt-2 text-2xl font-semibold text-primary-yellow">$85.50</p>
            <p className="text-sm text-text-secondary">Due in 5 days</p>
          </div>
        </div>

        {/* Invoices List */}
        <div className="card">
          <h2 className="text-lg font-semibold mb-4">Recent Invoices</h2>
          <div className="space-y-4">
            {mockInvoices.map((invoice) => (
              <div
                key={invoice.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:shadow-sm transition-shadow"
              >
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-primary-yellow bg-opacity-10 rounded-full">
                    <CreditCardIcon className="w-6 h-6 text-primary-yellow" />
                  </div>
                  <div>
                    <h3 className="font-medium">{invoice.title}</h3>
                    <div className="flex items-center space-x-4 mt-1 text-sm text-text-secondary">
                      <div className="flex items-center">
                        <CalendarIcon className="w-4 h-4 mr-1" />
                        {invoice.date}
                      </div>
                      <span>•</span>
                      <span>Invoice #{invoice.id}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="font-medium">${invoice.amount.toFixed(2)}</span>
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      invoice.status === 'Paid'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {invoice.status}
                  </span>
                  <button className="text-primary-yellow hover:text-primary-yellow/80 flex items-center">
                    <ArrowDownTrayIcon className="w-4 h-4 mr-1" />
                    Download
                  </button>
                  {invoice.status === 'Pending' && (
                    <button className="btn-primary">Pay Now</button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
} 