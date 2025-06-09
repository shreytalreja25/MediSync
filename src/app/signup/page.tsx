'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function SignupPage() {
  const router = useRouter()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('password'),
      role: formData.get('role')
    }

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })

      const result = await res.json()

      if (!res.ok) {
        throw new Error(result.error || 'Something went wrong')
      }

      // Redirect to login page on successful signup
      router.push('/login?message=Account created successfully')
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5F5F0] px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 border border-[#8B7355]/20 flex flex-col items-center">
        <h2 className="text-3xl font-bold mb-6 text-center text-[#8B7355]">Sign Up for MediSync</h2>
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded w-full">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
          <input 
            type="text" 
            name="name"
            placeholder="Full Name" 
            className="px-4 py-2 rounded-lg border border-[#8B7355]/30 bg-white text-[#4A4A4A] focus:outline-none focus:ring-2 focus:ring-[#8B7355]/40"
            required 
          />
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
            minLength={6}
          />
          <select 
            name="role" 
            className="px-4 py-2 rounded-lg border border-[#8B7355]/30 bg-white text-[#4A4A4A] focus:outline-none focus:ring-2 focus:ring-[#8B7355]/40"
            required
          >
            <option value="">Select Role</option>
            <option value="patient">Patient</option>
            <option value="doctor">Doctor</option>
            <option value="admin">Admin</option>
          </select>
          <button 
            type="submit" 
            className="bg-[#8B7355] hover:bg-[#A67B5B] text-white font-semibold rounded-lg px-4 py-2 transition-colors w-full shadow"
            disabled={loading}
          >
            {loading ? 'Signing up...' : 'Sign Up'}
          </button>
        </form>
        <div className="my-4 flex items-center justify-center gap-2 text-sm text-[#8B7355]">
          <span>Already have an account?</span>
          <Link href="/login" className="text-[#A67B5B] hover:underline font-semibold">Login</Link>
        </div>
        <div className="flex flex-col gap-2 mt-6 w-full">
          <button className="w-full flex items-center justify-center gap-2 border border-[#8B7355]/30 rounded-lg py-2 hover:bg-[#F5F5F0] transition text-[#8B7355] font-medium">
            <span>🔵</span> Sign up with Google (placeholder)
          </button>
          <button className="w-full flex items-center justify-center gap-2 border border-[#8B7355]/30 rounded-lg py-2 hover:bg-[#F5F5F0] transition text-[#8B7355] font-medium">
            <span>🟦</span> Sign up with Microsoft (placeholder)
          </button>
          <button className="w-full flex items-center justify-center gap-2 border border-[#8B7355]/30 rounded-lg py-2 hover:bg-[#F5F5F0] transition text-[#8B7355] font-medium">
            <span>🍏</span> Sign up with Apple (placeholder)
          </button>
        </div>
      </div>
    </div>
  )
} 