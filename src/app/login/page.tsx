import Link from 'next/link'

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-center text-primary-blue dark:text-primary-yellow">Login to MediSync</h2>
        <form className="flex flex-col gap-4">
          <input type="email" placeholder="Email" className="input input-bordered" required />
          <input type="password" placeholder="Password" className="input input-bordered" required />
          <button type="submit" className="btn-primary w-full">Login</button>
        </form>
        <div className="my-4 flex items-center justify-center gap-2 text-sm text-text-secondary">
          <span>Don&apos;t have an account?</span>
          <Link href="/signup" className="text-primary-green dark:text-primary-yellow hover:underline">Sign Up</Link>
        </div>
        <div className="flex flex-col gap-2 mt-6">
          <button className="w-full flex items-center justify-center gap-2 border border-gray-300 dark:border-gray-700 rounded-lg py-2 hover:bg-gray-50 dark:hover:bg-gray-700 transition">
            <span>🔵</span> Login with Google (placeholder)
          </button>
          <button className="w-full flex items-center justify-center gap-2 border border-gray-300 dark:border-gray-700 rounded-lg py-2 hover:bg-gray-50 dark:hover:bg-gray-700 transition">
            <span>🟦</span> Login with Microsoft (placeholder)
          </button>
          <button className="w-full flex items-center justify-center gap-2 border border-gray-300 dark:border-gray-700 rounded-lg py-2 hover:bg-gray-50 dark:hover:bg-gray-700 transition">
            <span>🍏</span> Login with Apple (placeholder)
          </button>
        </div>
      </div>
    </div>
  )
} 