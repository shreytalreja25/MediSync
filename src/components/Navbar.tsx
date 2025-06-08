'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTheme } from 'next-themes'
import ThemeToggle from '@/components/layout/ThemeToggle'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const { theme } = useTheme()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isActive = (path: string) => pathname === path

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-[#8B7355] shadow-md' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className={`text-xl font-semibold ${
              isScrolled ? 'text-white' : 'text-[#8B7355]'
            }`}>
              MediSync
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className={`${
                isActive('/')
                  ? isScrolled ? 'text-white' : 'text-[#8B7355]'
                  : isScrolled ? 'text-white/80 hover:text-white' : 'text-[#8B7355]/80 hover:text-[#8B7355]'
              } transition-colors duration-200`}
            >
              Home
            </Link>
            <Link
              href="/appointments"
              className={`${
                isActive('/appointments')
                  ? isScrolled ? 'text-white' : 'text-[#8B7355]'
                  : isScrolled ? 'text-white/80 hover:text-white' : 'text-[#8B7355]/80 hover:text-[#8B7355]'
              } transition-colors duration-200`}
            >
              Appointments
            </Link>
            <Link
              href="/services"
              className={`${
                isActive('/services')
                  ? isScrolled ? 'text-white' : 'text-[#8B7355]'
                  : isScrolled ? 'text-white/80 hover:text-white' : 'text-[#8B7355]/80 hover:text-[#8B7355]'
              } transition-colors duration-200`}
            >
              Services
            </Link>
            <Link
              href="/about"
              className={`${
                isActive('/about')
                  ? isScrolled ? 'text-white' : 'text-[#8B7355]'
                  : isScrolled ? 'text-white/80 hover:text-white' : 'text-[#8B7355]/80 hover:text-[#8B7355]'
              } transition-colors duration-200`}
            >
              About
            </Link>
            <div className={`${isScrolled ? 'text-white' : 'text-[#8B7355]'}`}>
              <ThemeToggle />
            </div>
            <Link
              href="/login"
              className={`px-4 py-2 rounded-full ${
                isScrolled
                  ? 'bg-white text-[#8B7355] hover:bg-white/90'
                  : 'bg-[#8B7355] text-white hover:bg-[#A67B5B]'
              } transition-colors duration-200`}
            >
              Login
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <div className={`${isScrolled ? 'text-white' : 'text-[#8B7355]'}`}>
              <ThemeToggle />
            </div>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 rounded-md ${
                isScrolled ? 'text-white' : 'text-[#8B7355]'
              }`}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#8B7355]">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              href="/"
              className={`block px-3 py-2 rounded-md ${
                isActive('/')
                  ? 'text-white'
                  : 'text-white/80 hover:text-white'
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/appointments"
              className={`block px-3 py-2 rounded-md ${
                isActive('/appointments')
                  ? 'text-white'
                  : 'text-white/80 hover:text-white'
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Appointments
            </Link>
            <Link
              href="/services"
              className={`block px-3 py-2 rounded-md ${
                isActive('/services')
                  ? 'text-white'
                  : 'text-white/80 hover:text-white'
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Services
            </Link>
            <Link
              href="/about"
              className={`block px-3 py-2 rounded-md ${
                isActive('/about')
                  ? 'text-white'
                  : 'text-white/80 hover:text-white'
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/login"
              className="block px-3 py-2 rounded-md text-white hover:bg-[#A67B5B]"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Login
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
} 