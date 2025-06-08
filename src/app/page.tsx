'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import ChatWidget from '@/components/ChatWidget'

function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const [dark, setDark] = useState(false)

  // Set initial theme on mount
  useEffect(() => {
    setMounted(true)
    const saved = localStorage.getItem('theme')
    if (saved === 'dark') {
      setDark(true)
      document.documentElement.classList.add('dark')
    } else if (saved === 'light') {
      setDark(false)
      document.documentElement.classList.remove('dark')
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setDark(true)
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      setDark(false)
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [])

  // Toggle theme on click
  const toggle = () => {
    if (dark) {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
      setDark(false)
    } else {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
      setDark(true)
    }
  }

  // Prevent hydration mismatch
  if (!mounted) {
    return null
  }

  return (
    <button
      aria-label="Toggle dark mode"
      onClick={toggle}
      className="text-2xl px-2 focus:outline-none hover:scale-110 transition-transform"
      title={dark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {dark ? '🌙' : '☀️'}
    </button>
  )
}

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
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-yellow-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white/80 dark:bg-gray-900/80 backdrop-blur shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className="text-2xl font-bold text-primary-blue dark:text-primary-yellow tracking-tight">MediSync</span>
          <nav className="flex items-center space-x-4">
            <ThemeToggle />
            <Link href="/login" className="font-medium text-primary-green dark:text-primary-yellow hover:underline">Login</Link>
            <Link href="/signup" className="font-medium text-white bg-primary-green dark:bg-primary-yellow dark:text-gray-900 px-4 py-2 rounded-xl shadow hover:bg-primary-green/90 dark:hover:bg-primary-yellow/90 transition">Sign Up</Link>
          </nav>
        </div>
      </header>

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

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur border-t py-6 mt-auto">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between text-sm text-text-secondary">
          <span>&copy; {new Date().getFullYear()} MediSync. All rights reserved.</span>
          <div className="flex items-center gap-4 mt-2 md:mt-0">
            <Link href="/about" className="hover:underline">About</Link>
            <Link href="/contact" className="hover:underline">Contact</Link>
            <a href="#" className="hover:underline">LinkedIn</a>
            <a href="#" className="hover:underline">Twitter</a>
          </div>
        </div>
      </footer>

      {/* Chat Widget */}
      <ChatWidget />
    </div>
  )
} 