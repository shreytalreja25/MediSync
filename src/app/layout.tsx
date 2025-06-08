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
        <div className="min-h-screen bg-[#F5F5F0] flex flex-col">
          <Navbar />
          <main className="flex-1">{children}</main>
          {/* Footer */}
          <footer className="bg-[#8B7355] text-white">
            <div className="max-w-7xl mx-auto px-4 py-12">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* Company Info */}
                <div className="space-y-4">
                  <h3 className="text-xl font-medium">MediSync</h3>
                  <p className="text-white/80">
                    Transforming healthcare through innovative technology and personalized care.
                  </p>
                </div>

                {/* Quick Links */}
                <div>
                  <h4 className="text-lg font-medium mb-4">Quick Links</h4>
                  <ul className="space-y-2">
                    <li>
                      <Link href="/" className="text-white/80 hover:text-white transition-colors">
                        Home
                      </Link>
                    </li>
                    <li>
                      <Link href="/appointments" className="text-white/80 hover:text-white transition-colors">
                        Book Appointment
                      </Link>
                    </li>
                    <li>
                      <Link href="/services" className="text-white/80 hover:text-white transition-colors">
                        Our Services
                      </Link>
                    </li>
                    <li>
                      <Link href="/about" className="text-white/80 hover:text-white transition-colors">
                        About Us
                      </Link>
                    </li>
                  </ul>
                </div>

                {/* Services */}
                <div>
                  <h4 className="text-lg font-medium mb-4">Services</h4>
                  <ul className="space-y-2">
                    <li>
                      <Link href="/services/telemedicine" className="text-white/80 hover:text-white transition-colors">
                        Telemedicine
                      </Link>
                    </li>
                    <li>
                      <Link href="/services/appointments" className="text-white/80 hover:text-white transition-colors">
                        Online Appointments
                      </Link>
                    </li>
                    <li>
                      <Link href="/services/records" className="text-white/80 hover:text-white transition-colors">
                        Health Records
                      </Link>
                    </li>
                    <li>
                      <Link href="/services/consultations" className="text-white/80 hover:text-white transition-colors">
                        Virtual Consultations
                      </Link>
                    </li>
                  </ul>
                </div>

                {/* Contact */}
                <div>
                  <h4 className="text-lg font-medium mb-4">Contact Us</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center space-x-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <a href="mailto:contact@medisync.com" className="text-white/80 hover:text-white transition-colors">
                        contact@medisync.com
                      </a>
                    </li>
                    <li className="flex items-center space-x-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <a href="tel:+1234567890" className="text-white/80 hover:text-white transition-colors">
                        +1 (234) 567-890
                      </a>
                    </li>
                  </ul>
                  <div className="mt-4 flex space-x-4">
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white transition-colors">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white transition-colors">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>

              {/* Bottom Bar */}
              <div className="mt-12 pt-8 border-t border-white/10">
                <div className="flex flex-col md:flex-row justify-between items-center">
                  <p className="text-white/80 text-sm">
                    &copy; {new Date().getFullYear()} MediSync. All rights reserved.
                  </p>
                  <div className="flex space-x-6 mt-4 md:mt-0">
                    <Link href="/privacy" className="text-white/80 hover:text-white text-sm transition-colors">
                      Privacy Policy
                    </Link>
                    <Link href="/terms" className="text-white/80 hover:text-white text-sm transition-colors">
                      Terms of Service
                    </Link>
                    <Link href="/sitemap" className="text-white/80 hover:text-white text-sm transition-colors">
                      Sitemap
                    </Link>
                  </div>
                </div>
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