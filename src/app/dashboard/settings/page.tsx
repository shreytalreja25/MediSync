import React from 'react'
import DashboardLayout from '@/components/layout/DashboardLayout'
import { UserIcon, BellIcon, ShieldCheckIcon, GlobeAltIcon } from '@heroicons/react/24/outline'

export default function SettingsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-text-primary">Settings</h1>
        </div>

        {/* Profile Section */}
        <div className="card">
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center">
              <UserIcon className="w-10 h-10 text-gray-400" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">John Doe</h2>
              <p className="text-text-secondary">john.doe@example.com</p>
              <button className="mt-2 text-primary-green hover:text-primary-green/80">
                Edit Profile
              </button>
            </div>
          </div>
        </div>

        {/* Settings Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Account Settings */}
          <div className="card">
            <h3 className="text-lg font-semibold mb-4">Account Settings</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <UserIcon className="w-5 h-5 text-primary-green" />
                  <span>Personal Information</span>
                </div>
                <button className="text-primary-green hover:text-primary-green/80">Edit</button>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <BellIcon className="w-5 h-5 text-primary-blue" />
                  <span>Notifications</span>
                </div>
                <button className="text-primary-green hover:text-primary-green/80">Edit</button>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <ShieldCheckIcon className="w-5 h-5 text-primary-yellow" />
                  <span>Security</span>
                </div>
                <button className="text-primary-green hover:text-primary-green/80">Edit</button>
              </div>
            </div>
          </div>

          {/* Preferences */}
          <div className="card">
            <h3 className="text-lg font-semibold mb-4">Preferences</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <GlobeAltIcon className="w-5 h-5 text-primary-blue" />
                  <span>Language</span>
                </div>
                <select className="border rounded-md px-3 py-1">
                  <option>English</option>
                  <option>Spanish</option>
                  <option>French</option>
                </select>
              </div>
              <div className="flex items-center justify-between">
                <span>Email Notifications</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-green/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-green"></div>
                </label>
              </div>
              <div className="flex items-center justify-between">
                <span>SMS Notifications</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-green/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-green"></div>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="card border border-red-200">
          <h3 className="text-lg font-semibold text-red-600 mb-4">Danger Zone</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Delete Account</p>
                <p className="text-sm text-text-secondary">Permanently delete your account and all data</p>
              </div>
              <button className="px-4 py-2 text-red-600 border border-red-600 rounded-lg hover:bg-red-50">
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
} 