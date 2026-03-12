'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function DriversPage() {
  const [searchTerm, setSearchTerm] = useState('')

  const drivers = [
    {
      id: 1,
      name: 'Raj Kumar',
      email: 'raj@example.com',
      phone: '9876543210',
      vehicleType: 'Truck',
      status: 'active',
      rating: 4.8,
      rides: 234,
      joined: '2024-01-15'
    },
    {
      id: 2,
      name: 'Priya Singh',
      email: 'priya@example.com',
      phone: '9876543211',
      vehicleType: 'Auto',
      status: 'active',
      rating: 4.5,
      rides: 189,
      joined: '2024-02-10'
    },
    {
      id: 3,
      name: 'Vikram Patel',
      email: 'vikram@example.com',
      phone: '9876543212',
      vehicleType: 'SUV',
      status: 'offline',
      rating: 4.6,
      rides: 156,
      joined: '2024-01-20'
    },
    {
      id: 4,
      name: 'Harjit Singh',
      email: 'harjit@example.com',
      phone: '9876543213',
      vehicleType: 'Bike',
      status: 'suspended',
      rating: 2.1,
      rides: 45,
      joined: '2024-03-01'
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-700'
      case 'offline':
        return 'bg-gray-100 text-gray-700'
      case 'suspended':
        return 'bg-red-100 text-red-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Driver Management</h1>
        <p className="text-gray-600">Manage and monitor all active drivers</p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-gray-600 mb-2">Total Drivers</p>
            <p className="text-3xl font-bold">2,145</p>
            <p className="text-xs text-green-600 mt-1">+89 this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-gray-600 mb-2">Online Now</p>
            <p className="text-3xl font-bold text-green-600">967</p>
            <p className="text-xs text-gray-500 mt-1">45% of total</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-gray-600 mb-2">Avg Rating</p>
            <p className="text-3xl font-bold text-blue-600">4.6★</p>
            <p className="text-xs text-gray-500 mt-1">Platform wide</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-gray-600 mb-2">Suspended</p>
            <p className="text-3xl font-bold text-red-600">12</p>
            <p className="text-xs text-gray-500 mt-1">Under review</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <Input
              placeholder="Search by name, email, or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 py-2 border-2"
            />
            <Button className="bg-red-600 hover:bg-red-700 text-white">Search</Button>
          </div>
        </CardContent>
      </Card>

      {/* Drivers Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Drivers</CardTitle>
          <CardDescription>Complete list of registered drivers</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-bold text-gray-900">Driver</th>
                  <th className="text-left py-3 px-4 font-bold text-gray-900">Contact</th>
                  <th className="text-left py-3 px-4 font-bold text-gray-900">Vehicle</th>
                  <th className="text-left py-3 px-4 font-bold text-gray-900">Rating</th>
                  <th className="text-left py-3 px-4 font-bold text-gray-900">Rides</th>
                  <th className="text-left py-3 px-4 font-bold text-gray-900">Status</th>
                  <th className="text-left py-3 px-4 font-bold text-gray-900">Action</th>
                </tr>
              </thead>
              <tbody>
                {drivers
                  .filter(d =>
                    d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    d.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    d.phone.includes(searchTerm)
                  )
                  .map((driver) => (
                    <tr key={driver.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div>
                          <p className="font-medium text-gray-900">{driver.name}</p>
                          <p className="text-xs text-gray-500">Joined: {driver.joined}</p>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="text-sm">
                          <p className="text-gray-900">{driver.email}</p>
                          <p className="text-gray-600">{driver.phone}</p>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-gray-900">{driver.vehicleType}</td>
                      <td className="py-3 px-4">
                        <p className="font-bold text-yellow-600">{driver.rating}★</p>
                      </td>
                      <td className="py-3 px-4 text-gray-900">{driver.rides}</td>
                      <td className="py-3 px-4">
                        <span className={`px-3 py-1 rounded text-xs font-medium ${getStatusColor(driver.status)}`}>
                          {driver.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <Button size="sm" variant="outline" className="border-2">
                          View
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
