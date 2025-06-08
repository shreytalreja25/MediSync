'use client'

import React, { useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import ChatWidget from '@/components/ChatWidget'

export default function Home() {
  const router = useRouter()

  // Redirect if a simple flag indicating login is set
  useEffect(() => {
    const loggedIn = typeof window !== 'undefined' && localStorage.getItem('loggedIn')
    if (loggedIn) {
      router.replace('/dashboard')
    }
  }, [router])

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-4 py-16">
        <h1 className="text-4xl md:text-5xl font-extrabold text-text-primary mb-4">Smarter Healthcare Starts Here</h1>
        <p className="text-lg md:text-xl text-text-secondary mb-8 max-w-2xl mx-auto">
          AI-assisted scheduling, virtual consults, instant reports, and more. MediSync brings modern healthcare to your fingertips—anytime, anywhere.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link href="/login" className="btn-primary text-lg">Login</Link>
          <Link href="/signup" className="bg-primary-blue text-white px-6 py-3 rounded-xl shadow hover:bg-primary-blue/90 text-lg transition">Sign Up</Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-5xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card flex flex-col items-center text-center">
          <span className="mb-2"><svg width="32" height="32" fill="none" viewBox="0 0 24 24"><rect x="3" y="6" width="18" height="12" rx="3" fill="#2E7D32" fillOpacity="0.1"/><rect x="7" y="10" width="10" height="2" rx="1" fill="#2E7D32"/></svg></span>
          <h3 className="font-semibold text-lg mb-1">Book Appointments</h3>
          <p className="text-text-secondary text-sm">Schedule visits in seconds, anytime.</p>
        </div>
        <div className="card flex flex-col items-center text-center">
          <span className="mb-2"><svg width="32" height="32" fill="none" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="20" rx="4" fill="#1976D2" fillOpacity="0.1"/><rect x="8" y="8" width="8" height="2" rx="1" fill="#1976D2"/></svg></span>
          <h3 className="font-semibold text-lg mb-1">Access Reports</h3>
          <p className="text-text-secondary text-sm">All your health records, always available.</p>
        </div>
        <div className="card flex flex-col items-center text-center">
          <span className="mb-2"><svg width="32" height="32" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#F9A825" fillOpacity="0.1"/><rect x="10" y="8" width="4" height="8" rx="2" fill="#F9A825"/></svg></span>
          <h3 className="font-semibold text-lg mb-1">Virtual Consults</h3>
          <p className="text-text-secondary text-sm">See doctors online, from anywhere.</p>
        </div>
        <div className="card flex flex-col items-center text-center">
          <span className="mb-2"><svg width="32" height="32" fill="none" viewBox="0 0 24 24"><rect x="2" y="8" width="20" height="8" rx="4" fill="#1976D2" fillOpacity="0.1"/><rect x="6" y="12" width="12" height="2" rx="1" fill="#2E7D32"/></svg></span>
          <h3 className="font-semibold text-lg mb-1">Smart Alerts</h3>
          <p className="text-text-secondary text-sm">Get reminders and health notifications.</p>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-text-primary text-center mb-8">How it Works</h2>
        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-primary-green/10 flex items-center justify-center mb-2">
              <span className="text-primary-green text-2xl font-bold">1</span>
            </div>
            <span className="font-medium">Sign Up</span>
          </div>
          <span className="hidden md:inline-block text-3xl text-primary-blue">→</span>
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-primary-blue/10 flex items-center justify-center mb-2">
              <span className="text-primary-blue text-2xl font-bold">2</span>
            </div>
            <span className="font-medium">Book Appointment</span>
          </div>
          <span className="hidden md:inline-block text-3xl text-primary-blue">→</span>
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-primary-yellow/10 flex items-center justify-center mb-2">
              <span className="text-primary-yellow text-2xl font-bold">3</span>
            </div>
            <span className="font-medium">Consult Online</span>
          </div>
        </div>
      </section>
    </div>
  )
} 