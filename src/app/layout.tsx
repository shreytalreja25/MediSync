import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
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
        <div className="min-h-screen bg-[#F5F5F0] dark:bg-gray-900 flex flex-col">
          <Navbar />
          <main className="flex-1">{children}</main>
          {/* Footer */}
          <footer className="bg-white/80 dark:bg-gray-900/80 backdrop-blur border-t py-6 mt-auto">
            <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between text-sm text-[#666] dark:text-gray-400">
              <span>&copy; {new Date().getFullYear()} MediSync. All rights reserved.</span>
              <div className="flex items-center gap-4 mt-2 md:mt-0">
                <Link href="/about" className="hover:text-[#8B7355] dark:hover:text-[#A67B5B] transition-colors">About</Link>
                <Link href="/contact" className="hover:text-[#8B7355] dark:hover:text-[#A67B5B] transition-colors">Contact</Link>
                <a href="#" className="hover:text-[#8B7355] dark:hover:text-[#A67B5B] transition-colors">LinkedIn</a>
                <a href="#" className="hover:text-[#8B7355] dark:hover:text-[#A67B5B] transition-colors">Twitter</a>
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