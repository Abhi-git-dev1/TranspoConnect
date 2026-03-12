'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function TrackingPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Live Tracking</h1>
        <p className="text-gray-600">Real-time location tracking of your shipments</p>
      </div>

      {/* Active Bookings */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map Area */}
        <div className="lg:col-span-2">
          <Card className="h-full">
            <CardContent className="pt-6 h-full">
              <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg h-96 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-6xl mb-4">🗺️</p>
                  <p className="text-gray-600">Google Maps Integration</p>
                  <p className="text-sm text-gray-500">Real-time map view would appear here</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Booking Details */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Active Booking</CardTitle>
              <CardDescription>BOOKING-1003</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Status */}
              <div>
                <p className="text-sm text-gray-600 mb-2">Status</p>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
                  <span className="font-bold text-blue-600">In Transit</span>
                </div>
              </div>

              {/* Driver Info */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-2">Driver</p>
                <div className="flex items-center gap-3">
                  <div className="text-4xl">👨‍🚗</div>
                  <div>
                    <p className="font-bold">Arjun Patel</p>
                    <p className="text-sm text-yellow-600">⭐ 4.9 (250 rides)</p>
                  </div>
                </div>
              </div>

              {/* Vehicle Info */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-2">Vehicle</p>
                <p className="font-bold mb-1">Truck</p>
                <p className="text-sm text-gray-600">DL 01 AB 1234</p>
              </div>

              {/* Route */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-3">Route</p>
                <div className="space-y-2">
                  <div>
                    <p className="text-xs text-gray-500">From</p>
                    <p className="font-medium">Chennai Port</p>
                  </div>
                  <div className="flex justify-center py-2">
                    <div className="w-0.5 h-4 bg-red-600"></div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">To</p>
                    <p className="font-medium">Hyderabad</p>
                  </div>
                </div>
              </div>

              {/* Progress */}
              <div>
                <p className="text-sm text-gray-600 mb-2">Progress</p>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-red-600 h-2 rounded-full" style={{ width: '65%' }}></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">65% completed</p>
              </div>

              {/* ETA */}
              <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                <p className="text-sm text-gray-600 mb-1">Estimated Arrival</p>
                <p className="text-2xl font-bold text-red-600">2 hours 15 mins</p>
              </div>

              {/* Actions */}
              <div className="space-y-2 pt-2">
                <Button className="w-full bg-red-600 hover:bg-red-700 text-white">
                  📞 Contact Driver
                </Button>
                <Button variant="outline" className="w-full border-2">
                  📋 View Invoice
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Timeline */}
      <Card>
        <CardHeader>
          <CardTitle>Journey Timeline</CardTitle>
          <CardDescription>Detailed tracking history</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-4 h-4 bg-green-600 rounded-full"></div>
                <div className="w-0.5 h-12 bg-green-600"></div>
              </div>
              <div className="pb-4">
                <p className="font-bold">Order Picked Up</p>
                <p className="text-sm text-gray-600">Chennai Port - 10:30 AM</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-4 h-4 bg-green-600 rounded-full"></div>
                <div className="w-0.5 h-12 bg-green-600"></div>
              </div>
              <div className="pb-4">
                <p className="font-bold">Left Origin</p>
                <p className="text-sm text-gray-600">Started journey - 10:45 AM</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-4 h-4 bg-blue-600 rounded-full animate-pulse"></div>
                <div className="w-0.5 h-12 bg-gray-300"></div>
              </div>
              <div className="pb-4">
                <p className="font-bold">In Transit</p>
                <p className="text-sm text-gray-600">Currently on NH-44 - 1:20 PM</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
              </div>
              <div>
                <p className="font-bold text-gray-400">Arriving at Destination</p>
                <p className="text-sm text-gray-400">ETA: 3:35 PM</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
