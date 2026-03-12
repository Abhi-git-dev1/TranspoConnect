'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function RideRequestPage() {
  const [rideRequests, setRideRequests] = useState([
    {
      id: 1,
      customer: 'Rajesh Kumar',
      phone: '9876543210',
      rating: 4.8,
      pickup: 'Connaught Place, Delhi',
      dropoff: 'Delhi Airport',
      distance: '22 km',
      fare: '₹450',
      timeLeft: 45,
      status: 'active'
    },
    {
      id: 2,
      customer: 'Priya Singh',
      phone: '9876543211',
      rating: 4.5,
      pickup: 'GK-1, Delhi',
      dropoff: 'Noida',
      distance: '35 km',
      fare: '₹680',
      timeLeft: 30,
      status: 'active'
    },
    {
      id: 3,
      customer: 'Arjun Patel',
      phone: '9876543212',
      rating: 4.9,
      pickup: 'Defence Colony, Delhi',
      dropoff: 'Gurugram',
      distance: '40 km',
      fare: '₹750',
      timeLeft: 15,
      status: 'active'
    }
  ])

  const handleAccept = (id: number) => {
    setRideRequests(prev => prev.filter(r => r.id !== id))
  }

  const handleReject = (id: number) => {
    setRideRequests(prev => prev.filter(r => r.id !== id))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Incoming Ride Requests</h1>
        <p className="text-gray-600">Accept or reject ride requests from customers</p>
      </div>

      {/* Status Bar */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="pt-6 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Current Status</p>
            <p className="text-2xl font-bold text-blue-700">Online & Accepting Rides</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium">Active</span>
          </div>
        </CardContent>
      </Card>

      {/* Ride Requests */}
      {rideRequests.length > 0 ? (
        <div className="space-y-4">
          {rideRequests.map((ride, index) => (
            <Card key={ride.id} className="border-2 hover:border-red-300">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between mb-4 pb-4 border-b">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-2xl">👤</span>
                      <h3 className="font-bold text-lg">{ride.customer}</h3>
                    </div>
                    <p className="text-sm text-gray-600">Rating: ⭐ {ride.rating}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Request #{index + 1}</p>
                    <p className={`text-lg font-bold ${ride.timeLeft > 30 ? 'text-blue-600' : ride.timeLeft > 15 ? 'text-yellow-600' : 'text-red-600'}`}>
                      {ride.timeLeft}s
                    </p>
                  </div>
                </div>

                {/* Route */}
                <div className="space-y-3 mb-4 pb-4 border-b">
                  <div className="flex items-start gap-3">
                    <span className="text-xl">📍</span>
                    <div>
                      <p className="text-xs text-gray-600">Pickup</p>
                      <p className="font-medium text-gray-900">{ride.pickup}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-xl">📍</span>
                    <div>
                      <p className="text-xs text-gray-600">Dropoff</p>
                      <p className="font-medium text-gray-900">{ride.dropoff}</p>
                    </div>
                  </div>
                </div>

                {/* Details */}
                <div className="grid grid-cols-3 gap-4 mb-4 pb-4 border-b">
                  <div>
                    <p className="text-xs text-gray-600">Distance</p>
                    <p className="font-bold text-gray-900">{ride.distance}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Estimated Fare</p>
                    <p className="font-bold text-red-600 text-lg">{ride.fare}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Your Earnings</p>
                    <p className="font-bold text-green-600 text-lg">₹{parseInt(ride.fare) * 0.75}</p>
                  </div>
                </div>

                {/* Contact */}
                <div className="mb-6 pb-6 border-b">
                  <p className="text-sm text-gray-600 mb-2">Customer Phone</p>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-gray-900">{ride.phone}</span>
                    <Button size="sm" variant="outline" className="border-2">📞 Call</Button>
                  </div>
                </div>

                {/* Actions */}
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    onClick={() => handleAccept(ride.id)}
                    className="bg-green-600 hover:bg-green-700 text-white py-6 font-bold"
                  >
                    ✓ Accept Ride
                  </Button>
                  <Button
                    onClick={() => handleReject(ride.id)}
                    className="border-2 border-red-600 text-red-600 hover:bg-red-50 py-6 font-bold"
                  >
                    ✕ Reject
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="pt-12 pb-12 text-center">
            <p className="text-6xl mb-4">😴</p>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No Active Requests</h3>
            <p className="text-gray-600">You're all caught up! Requests will appear here when customers request a ride.</p>
            <Button className="mt-6 bg-red-600 hover:bg-red-700 text-white">Go Back Online</Button>
          </CardContent>
        </Card>
      )}

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div>
              <p className="text-sm text-gray-600 mb-1">Acceptance Rate</p>
              <p className="text-3xl font-bold text-green-600">98%</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div>
              <p className="text-sm text-gray-600 mb-1">Response Time</p>
              <p className="text-3xl font-bold text-blue-600">2.1s</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div>
              <p className="text-sm text-gray-600 mb-1">Cancellation Rate</p>
              <p className="text-3xl font-bold text-red-600">2%</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
