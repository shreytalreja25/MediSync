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
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-center text-primary-blue">Sign Up for MediSync</h2>
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input 
            type="text" 
            name="name"
            placeholder="Full Name" 
            className="input input-bordered" 
            required 
          />
          <input 
            type="email" 
            name="email"
            placeholder="Email" 
            className="input input-bordered" 
            required 
          />
          <input 
            type="password" 
            name="password"
            placeholder="Password" 
            className="input input-bordered" 
            required 
            minLength={6}
          />
          <select 
            name="role" 
            className="input input-bordered" 
            required
          >
            <option value="">Select Role</option>
            <option value="patient">Patient</option>
            <option value="doctor">Doctor</option>
            <option value="admin">Admin</option>
          </select>
          <button 
            type="submit" 
            className="btn-primary w-full"
            disabled={loading}
          >
            {loading ? 'Signing up...' : 'Sign Up'}
          </button>
        </form>
        <div className="my-4 flex items-center justify-center gap-2 text-sm text-text-secondary">
          <span>Already have an account?</span>
          <Link href="/login" className="text-primary-green hover:underline">Login</Link>
        </div>
        <div className="flex flex-col gap-2 mt-6">
          <button className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-2 hover:bg-gray-50 transition">
            <span>🔵</span> Sign up with Google (placeholder)
          </button>
          <button className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-2 hover:bg-gray-50 transition">
            <span>🟦</span> Sign up with Microsoft (placeholder)
          </button>
          <button className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-2 hover:bg-gray-50 transition">
            <span>🍏</span> Sign up with Apple (placeholder)
          </button>
        </div>
      </div>
    </div>
  )
} 