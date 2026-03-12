'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function BookingsPage() {
  const bookings = [
    {
      id: 'BOOKING-1001',
      customer: 'Rajesh Kumar',
      driver: 'Raj Kumar',
      pickup: 'Delhi Central',
      dropoff: 'Delhi Airport',
      fare: '₹450',
      date: '2024-03-12',
      status: 'completed'
    },
    {
      id: 'BOOKING-1002',
      customer: 'Priya Singh',
      driver: 'Priya Singh',
      pickup: 'Bangalore',
      dropoff: 'Pune',
      fare: '₹2,800',
      date: '2024-03-12',
      status: 'in_transit'
    },
    {
      id: 'BOOKING-1003',
      customer: 'Amit Singh',
      driver: 'Vikram Patel',
      pickup: 'Mumbai',
      dropoff: 'Gurgaon',
      fare: '₹3,200',
      date: '2024-03-11',
      status: 'completed'
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-700'
      case 'in_transit':
        return 'bg-blue-100 text-blue-700'
      case 'cancelled':
        return 'bg-red-100 text-red-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Booking Management</h1>
        <p className="text-gray-600">Monitor and manage all platform bookings</p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-gray-600 mb-2">Today's Bookings</p>
            <p className="text-3xl font-bold">234</p>
            <p className="text-xs text-green-600 mt-1">+12% from yesterday</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-gray-600 mb-2">Active Rides</p>
            <p className="text-3xl font-bold text-blue-600">45</p>
            <p className="text-xs text-gray-500 mt-1">In progress</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-gray-600 mb-2">Total Revenue</p>
            <p className="text-3xl font-bold text-green-600">₹1,24,500</p>
            <p className="text-xs text-gray-500 mt-1">Today</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-gray-600 mb-2">Cancellation Rate</p>
            <p className="text-3xl font-bold text-red-600">2.3%</p>
            <p className="text-xs text-gray-500 mt-1">Platform wide</p>
          </CardContent>
        </Card>
      </div>

      {/* Bookings Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Bookings</CardTitle>
          <CardDescription>All bookings on the platform</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-bold text-gray-900">Booking ID</th>
                  <th className="text-left py-3 px-4 font-bold text-gray-900">Customer</th>
                  <th className="text-left py-3 px-4 font-bold text-gray-900">Driver</th>
                  <th className="text-left py-3 px-4 font-bold text-gray-900">Route</th>
                  <th className="text-left py-3 px-4 font-bold text-gray-900">Fare</th>
                  <th className="text-left py-3 px-4 font-bold text-gray-900">Date</th>
                  <th className="text-left py-3 px-4 font-bold text-gray-900">Status</th>
                  <th className="text-left py-3 px-4 font-bold text-gray-900">Action</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 font-mono text-gray-900">{booking.id}</td>
                    <td className="py-3 px-4 text-gray-900">{booking.customer}</td>
                    <td className="py-3 px-4 text-gray-900">{booking.driver}</td>
                    <td className="py-3 px-4">
                      <div className="text-sm">
                        <p className="text-gray-900">{booking.pickup}</p>
                        <p className="text-gray-600">→ {booking.dropoff}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4 font-bold text-green-600">{booking.fare}</td>
                    <td className="py-3 px-4 text-gray-900">{booking.date}</td>
                    <td className="py-3 px-4">
                      <span className={`px-3 py-1 rounded text-xs font-medium ${getStatusColor(booking.status)}`}>
                        {booking.status === 'in_transit' ? 'In Transit' : booking.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <Button size="sm" variant="outline" className="border-2">
                        View Details
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
