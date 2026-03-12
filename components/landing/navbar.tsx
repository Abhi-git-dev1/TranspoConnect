'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function Navbar() {
  return (
    <nav className="fixed top-0 w-full bg-white border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">TC</span>
            </div>
            <span className="font-bold text-xl text-gray-900">TranspoConnect</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="#services" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
              Services
            </Link>
            <Link href="#how-it-works" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
              How It Works
            </Link>
            <Link href="#pricing" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
              Pricing
            </Link>
            <Link href="#contact" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
              Contact
            </Link>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center gap-4">
            <Link href="/auth">
              <Button variant="ghost" className="hidden sm:flex text-gray-700 hover:text-gray-900">
                Sign In
              </Button>
            </Link>
            <Link href="/auth">
              <Button className="bg-red-600 hover:bg-red-700 text-white">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
