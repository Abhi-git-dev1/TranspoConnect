'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function ActiveRidePage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Active Ride</h1>
        <p className="text-gray-600">Navigate to destination and manage current ride</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map Area */}
        <div className="lg:col-span-2">
          <Card className="h-full">
            <CardContent className="pt-6 h-full">
              <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg h-96 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-6xl mb-4">🗺️</p>
                  <p className="text-gray-600">Google Maps Integration</p>
                  <p className="text-sm text-gray-500">Navigation map view would appear here</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Ride Details */}
        <div className="space-y-4">
          {/* Ride Status */}
          <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
            <CardContent className="pt-6">
              <div>
                <p className="text-sm text-gray-600 mb-2">Ride Status</p>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 bg-blue-600 rounded-full animate-pulse"></div>
                  <span className="font-bold text-blue-700">In Progress</span>
                </div>
                <p className="text-2xl font-bold text-blue-700">Ride #5234</p>
              </div>
            </CardContent>
          </Card>

          {/* Customer Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Customer</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="text-4xl">👤</span>
                <div>
                  <p className="font-bold text-gray-900">Rajesh Kumar</p>
                  <p className="text-sm text-yellow-600">⭐ 4.8 (150 rides)</p>
                </div>
              </div>
              <div className="pt-3 border-t space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Phone</span>
                  <span className="font-medium">9876543210</span>
                </div>
                <Button className="w-full border-2 border-gray-300 text-gray-700 hover:bg-gray-50">
                  📞 Call Customer
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Route Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Route</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-xs text-gray-600 mb-1">From</p>
                <p className="font-bold text-gray-900">Connaught Place, Delhi</p>
              </div>
              
              <div className="flex justify-center">
                <div className="w-0.5 h-8 bg-red-600"></div>
              </div>

              <div>
                <p className="text-xs text-gray-600 mb-1">To</p>
                <p className="font-bold text-gray-900">Delhi Airport T3</p>
              </div>

              <div className="pt-3 border-t space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Distance</span>
                  <span className="font-bold">22 km</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">ETA</span>
                  <span className="font-bold">28 mins</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Fare</span>
                  <span className="font-bold text-red-600">₹450</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Progress */}
          <Card>
            <CardContent className="pt-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Progress</span>
                  <span className="text-sm font-medium">62%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-red-600 h-2 rounded-full" style={{ width: '62%' }}></div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="space-y-2">
            <Button className="w-full bg-green-600 hover:bg-green-700 text-white py-6">
              ✓ Completed Ride
            </Button>
            <Button className="w-full border-2 border-red-600 text-red-600 hover:bg-red-50 py-6">
              🚫 Cancel Ride
            </Button>
          </div>
        </div>
      </div>

      {/* Ride Chat */}
      <Card>
        <CardHeader>
          <CardTitle>Messages</CardTitle>
          <CardDescription>Chat with customer</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 mb-4 max-h-64 overflow-y-auto">
            <div className="flex gap-3">
              <span className="text-2xl">👤</span>
              <div className="bg-gray-100 p-3 rounded-lg max-w-xs">
                <p className="text-sm text-gray-900">Hi! What's the ETA?</p>
                <p className="text-xs text-gray-500 mt-1">10:25 AM</p>
              </div>
            </div>

            <div className="flex gap-3 justify-end">
              <div className="bg-red-600 p-3 rounded-lg max-w-xs">
                <p className="text-sm text-white">About 28 minutes</p>
                <p className="text-xs text-red-100 mt-1">10:26 AM</p>
              </div>
              <span className="text-2xl">🚗</span>
            </div>
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Type a message..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
            />
            <Button className="bg-red-600 hover:bg-red-700 text-white">Send</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
