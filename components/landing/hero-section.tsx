'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function HeroSection() {
  return (
    <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <div className="inline-block mb-6 px-4 py-2 bg-red-50 border border-red-200 rounded-full">
              <span className="text-red-600 font-medium text-sm">Lightning-fast Logistics</span>
            </div>
            
            <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Fast, Reliable Transport <span className="text-red-600">Simplified</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-lg">
              Book vehicles instantly, track shipments in real-time, and connect with professional drivers. TranspoConnect is your complete logistics solution.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link href="/auth">
                <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white text-lg px-8 py-6">
                  Book Now
                </Button>
              </Link>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg px-8 py-6 border-2 border-gray-300 text-gray-900 hover:bg-gray-50"
              >
                Watch Demo
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8">
              <div>
                <div className="text-3xl font-bold text-gray-900">5K+</div>
                <p className="text-gray-600 text-sm">Active Drivers</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900">50K+</div>
                <p className="text-gray-600 text-sm">Completed Bookings</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900">24/7</div>
                <p className="text-gray-600 text-sm">Support</p>
              </div>
            </div>
          </div>

          {/* Right Visual */}
          <div className="hidden lg:block">
            <div className="relative">
              {/* Main box with gradient border */}
              <div className="absolute inset-0 bg-gradient-to-br from-red-600 to-red-500 rounded-2xl transform rotate-1"></div>
              <div className="relative bg-white p-8 rounded-2xl shadow-2xl transform -rotate-1">
                <div className="bg-gradient-to-br from-red-50 to-red-100 p-8 rounded-xl">
                  <div className="space-y-4">
                    <div className="h-12 w-12 bg-red-600 rounded-lg flex items-center justify-center">
                      <span className="text-white text-2xl">📍</span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">Book Your Ride</h3>
                    <p className="text-gray-600">Select pickup location, choose vehicle type, and get instant confirmation</p>
                    <div className="pt-4 space-y-3 text-sm text-gray-700">
                      <div className="flex items-center gap-3">
                        <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                        <span>Competitive pricing</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                        <span>Real-time tracking</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                        <span>Professional drivers</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
