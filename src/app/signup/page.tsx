import Link from 'next/link'

export default function SignupPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-center text-primary-blue dark:text-primary-yellow">Sign Up for MediSync</h2>
        <form className="flex flex-col gap-4">
          <input type="text" placeholder="Full Name" className="input input-bordered" required />
          <input type="email" placeholder="Email" className="input input-bordered" required />
          <input type="password" placeholder="Password" className="input input-bordered" required />
          <select className="input input-bordered" required>
            <option value="">Select Role</option>
            <option value="patient">Patient</option>
            <option value="doctor">Doctor</option>
            <option value="admin">Admin</option>
          </select>
          <button type="submit" className="btn-primary w-full">Sign Up</button>
        </form>
        <div className="my-4 flex items-center justify-center gap-2 text-sm text-text-secondary">
          <span>Already have an account?</span>
          <Link href="/login" className="text-primary-green dark:text-primary-yellow hover:underline">Login</Link>
        </div>
        <div className="flex flex-col gap-2 mt-6">
          <button className="w-full flex items-center justify-center gap-2 border border-gray-300 dark:border-gray-700 rounded-lg py-2 hover:bg-gray-50 dark:hover:bg-gray-700 transition">
            <span>🔵</span> Sign up with Google (placeholder)
          </button>
          <button className="w-full flex items-center justify-center gap-2 border border-gray-300 dark:border-gray-700 rounded-lg py-2 hover:bg-gray-50 dark:hover:bg-gray-700 transition">
            <span>🟦</span> Sign up with Microsoft (placeholder)
          </button>
          <button className="w-full flex items-center justify-center gap-2 border border-gray-300 dark:border-gray-700 rounded-lg py-2 hover:bg-gray-50 dark:hover:bg-gray-700 transition">
            <span>🍏</span> Sign up with Apple (placeholder)
          </button>
        </div>
      </div>
    </div>
  )
} 