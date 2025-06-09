'use client'

import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [formError, setFormError] = useState('')

  useEffect(() => {
    const message = searchParams.get('message')
    if (message) {
      setMessage(message)
    }
  }, [searchParams])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    setFormError('')
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    // Client-side validation
    if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setFormError('Please enter a valid email address.')
      setLoading(false)
      return
    }
    if (!password) {
      setFormError('Please enter your password.')
      setLoading(false)
      return
    }

    const data = { email, password }

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })

      const result = await res.json()

      if (!res.ok) {
        throw new Error(result.error || 'Invalid credentials')
      }

      // Redirect to dashboard on successful login
      router.push('/dashboard')
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5F5F0] px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 border border-[#8B7355]/20 flex flex-col items-center">
        <h2 className="text-3xl font-bold mb-6 text-center text-[#8B7355]">Login to MediSync</h2>
        {formError && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded w-full">
            {formError}
          </div>
        )}
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded w-full">
            {error}
          </div>
        )}
        {message && (
          <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded w-full">
            {message}
          </div>
        )}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
          <input 
            type="email" 
            name="email"
            placeholder="Email" 
            className="px-4 py-2 rounded-lg border border-[#8B7355]/30 bg-white text-[#4A4A4A] focus:outline-none focus:ring-2 focus:ring-[#8B7355]/40"
            required 
          />
          <input 
            type="password" 
            name="password"
            placeholder="Password" 
            className="px-4 py-2 rounded-lg border border-[#8B7355]/30 bg-white text-[#4A4A4A] focus:outline-none focus:ring-2 focus:ring-[#8B7355]/40"
            required 
          />
          <button 
            type="submit" 
            className="bg-[#8B7355] hover:bg-[#A67B5B] text-white font-semibold rounded-lg px-4 py-2 transition-colors w-full shadow"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <div className="my-4 flex items-center justify-center gap-2 text-sm text-[#8B7355]">
          <span>Don&apos;t have an account?</span>
          <Link href="/signup" className="text-[#A67B5B] hover:underline font-semibold">Sign Up</Link>
        </div>
        <div className="flex flex-col gap-2 mt-6 w-full">
          <button className="w-full flex items-center justify-center gap-2 border border-[#8B7355]/30 rounded-lg py-2 hover:bg-[#F5F5F0] transition text-[#8B7355] font-medium">
            <span>🔵</span> Login with Google (placeholder)
          </button>
          <button className="w-full flex items-center justify-center gap-2 border border-[#8B7355]/30 rounded-lg py-2 hover:bg-[#F5F5F0] transition text-[#8B7355] font-medium">
            <span>🟦</span> Login with Microsoft (placeholder)
          </button>
          <button className="w-full flex items-center justify-center gap-2 border border-[#8B7355]/30 rounded-lg py-2 hover:bg-[#F5F5F0] transition text-[#8B7355] font-medium">
            <span>🍏</span> Login with Apple (placeholder)
          </button>
        </div>
      </div>
    </div>
  )
} 