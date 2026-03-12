'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useState } from 'react'

export default function CustomersPage() {
  const [searchTerm, setSearchTerm] = useState('')

  const customers = [
    {
      id: 1,
      name: 'Rajesh Kumar',
      email: 'rajesh@example.com',
      phone: '9876543210',
      totalSpent: '₹3,450',
      rides: 12,
      status: 'active',
      joined: '2024-01-10'
    },
    {
      id: 2,
      name: 'Priya Sharma',
      email: 'priya@example.com',
      phone: '9876543211',
      totalSpent: '₹2,180',
      rides: 8,
      status: 'active',
      joined: '2024-02-05'
    },
    {
      id: 3,
      name: 'Amit Singh',
      email: 'amit@example.com',
      phone: '9876543212',
      totalSpent: '₹8,920',
      rides: 35,
      status: 'active',
      joined: '2023-12-20'
    },
    {
      id: 4,
      name: 'Neha Patel',
      email: 'neha@example.com',
      phone: '9876543213',
      totalSpent: '₹450',
      rides: 1,
      status: 'inactive',
      joined: '2024-03-01'
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-700'
      case 'inactive':
        return 'bg-gray-100 text-gray-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Customer Management</h1>
        <p className="text-gray-600">Monitor and manage all registered customers</p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-gray-600 mb-2">Total Customers</p>
            <p className="text-3xl font-bold">6,089</p>
            <p className="text-xs text-green-600 mt-1">+234 this week</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-gray-600 mb-2">Active Users</p>
            <p className="text-3xl font-bold text-green-600">5,234</p>
            <p className="text-xs text-gray-500 mt-1">86% of total</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-gray-600 mb-2">Avg. Spent</p>
            <p className="text-3xl font-bold text-blue-600">₹2,450</p>
            <p className="text-xs text-gray-500 mt-1">Per customer</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-gray-600 mb-2">Avg. Rating</p>
            <p className="text-3xl font-bold text-yellow-600">4.7★</p>
            <p className="text-xs text-gray-500 mt-1">Customer satisfaction</p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
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

      {/* Customers Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Customers</CardTitle>
          <CardDescription>Complete list of registered customers</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-bold text-gray-900">Customer</th>
                  <th className="text-left py-3 px-4 font-bold text-gray-900">Contact</th>
                  <th className="text-left py-3 px-4 font-bold text-gray-900">Total Spent</th>
                  <th className="text-left py-3 px-4 font-bold text-gray-900">Rides</th>
                  <th className="text-left py-3 px-4 font-bold text-gray-900">Status</th>
                  <th className="text-left py-3 px-4 font-bold text-gray-900">Action</th>
                </tr>
              </thead>
              <tbody>
                {customers
                  .filter(c =>
                    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    c.phone.includes(searchTerm)
                  )
                  .map((customer) => (
                    <tr key={customer.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div>
                          <p className="font-medium text-gray-900">{customer.name}</p>
                          <p className="text-xs text-gray-500">Joined: {customer.joined}</p>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="text-sm">
                          <p className="text-gray-900">{customer.email}</p>
                          <p className="text-gray-600">{customer.phone}</p>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <p className="font-bold text-green-600">{customer.totalSpent}</p>
                      </td>
                      <td className="py-3 px-4 text-gray-900 font-medium">{customer.rides}</td>
                      <td className="py-3 px-4">
                        <span className={`px-3 py-1 rounded text-xs font-medium ${getStatusColor(customer.status)}`}>
                          {customer.status}
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
