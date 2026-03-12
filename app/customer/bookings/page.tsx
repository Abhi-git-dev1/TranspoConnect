'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function BookingsPage() {
  const bookings = [
    {
      id: 'BOOKING-1001',
      pickup: 'New Delhi Station',
      dropoff: 'Mumbai Central',
      vehicle: 'SUV',
      status: 'completed',
      date: '2024-03-10',
      fare: '₹450',
      driver: 'Raj Kumar',
      rating: 4.8
    },
    {
      id: 'BOOKING-1002',
      pickup: 'Bangalore Airport',
      dropoff: 'MG Road',
      vehicle: 'Auto Rickshaw',
      status: 'completed',
      date: '2024-03-08',
      fare: '₹180',
      driver: 'Vikram Singh',
      rating: 4.5
    },
    {
      id: 'BOOKING-1003',
      pickup: 'Chennai Port',
      dropoff: 'Hyderabad',
      vehicle: 'Truck',
      status: 'active',
      date: '2024-03-12',
      fare: '₹2500',
      driver: 'Arjun Patel',
      rating: 4.9
    }
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">Completed</span>
      case 'active':
        return <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">In Transit</span>
      case 'pending':
        return <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm">Pending</span>
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Bookings</h1>
        <p className="text-gray-600">View all your transport bookings</p>
      </div>

      {/* Filters */}
      <div className="flex gap-4 overflow-x-auto pb-2">
        <Button variant="outline" className="border-2 border-red-600 text-red-600">All</Button>
        <Button variant="outline" className="border-2">Active</Button>
        <Button variant="outline" className="border-2">Completed</Button>
      </div>

      {/* Bookings List */}
      <div className="space-y-4">
        {bookings.map((booking) => (
          <Card key={booking.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left: Route Info */}
                <div>
                  <div className="flex items-start gap-3 mb-4">
                    <div className="text-2xl">📍</div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-600">From</p>
                      <p className="font-bold text-gray-900">{booking.pickup}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="text-2xl">📍</div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-600">To</p>
                      <p className="font-bold text-gray-900">{booking.dropoff}</p>
                    </div>
                  </div>
                </div>

                {/* Right: Details */}
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600">Booking ID & Status</p>
                    <div className="flex justify-between items-start">
                      <p className="font-bold text-gray-900">{booking.id}</p>
                      {getStatusBadge(booking.status)}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Vehicle</p>
                      <p className="font-bold text-gray-900">{booking.vehicle}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Date</p>
                      <p className="font-bold text-gray-900">{booking.date}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Driver</p>
                      <p className="font-bold text-gray-900">{booking.driver}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Total Fare</p>
                      <p className="font-bold text-red-600 text-lg">{booking.fare}</p>
                    </div>
                  </div>

                  {booking.status === 'completed' && (
                    <div className="pt-2 border-t">
                      <p className="text-sm text-gray-600 mb-1">Your Rating</p>
                      <p className="text-lg">⭐ {booking.rating}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="mt-6 pt-6 border-t flex gap-3">
                {booking.status === 'active' && (
                  <Button className="bg-red-600 hover:bg-red-700 text-white flex-1">
                    Track Live
                  </Button>
                )}
                {booking.status === 'completed' && (
                  <>
                    <Button className="bg-red-600 hover:bg-red-700 text-white flex-1">
                      View Receipt
                    </Button>
                    <Button variant="outline" className="border-2 flex-1">
                      Rate Driver
                    </Button>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* New Booking Button */}
      <Link href="/customer/book">
        <Button className="w-full bg-red-600 hover:bg-red-700 text-white py-6">
          + Book New Ride
        </Button>
      </Link>
    </div>
  )
}
