import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Link from 'next/link'
import ThemeToggle from '@/components/layout/ThemeToggle'
import ChatWidget from '@/components/ChatWidget'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'MediSync - Healthcare Platform',
  description: 'Modern healthcare scheduling and triage system',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
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
          <main className="flex-1">{children}</main>
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
      </body>
    </html>
  )
} 