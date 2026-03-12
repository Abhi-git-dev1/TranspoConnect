'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Platform Analytics</h1>
        <p className="text-gray-600">Comprehensive metrics and performance data</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-gray-600 mb-2">Total Revenue (MTD)</p>
            <p className="text-3xl font-bold text-green-600">₹28,45,000</p>
            <p className="text-xs text-green-600 mt-1">+18% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-gray-600 mb-2">Total Bookings (MTD)</p>
            <p className="text-3xl font-bold text-blue-600">5,234</p>
            <p className="text-xs text-green-600 mt-1">+25% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-gray-600 mb-2">Avg Order Value</p>
            <p className="text-3xl font-bold text-purple-600">₹543</p>
            <p className="text-xs text-gray-500 mt-1">Per booking</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-gray-600 mb-2">User Growth</p>
            <p className="text-3xl font-bold text-orange-600">12.5%</p>
            <p className="text-xs text-gray-500 mt-1">This month</p>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Revenue by Vehicle Type</CardTitle>
            <CardDescription>Platform revenue distribution</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">SUV</p>
                <div className="w-64 bg-gray-200 rounded-full h-2 mt-1">
                  <div className="bg-red-600 h-2 rounded-full" style={{ width: '40%' }}></div>
                </div>
              </div>
              <p className="font-bold">₹11.38L</p>
            </div>

            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Truck</p>
                <div className="w-64 bg-gray-200 rounded-full h-2 mt-1">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '35%' }}></div>
                </div>
              </div>
              <p className="font-bold">₹9.95L</p>
            </div>

            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Auto</p>
                <div className="w-64 bg-gray-200 rounded-full h-2 mt-1">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '20%' }}></div>
                </div>
              </div>
              <p className="font-bold">₹5.69L</p>
            </div>

            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Bike</p>
                <div className="w-64 bg-gray-200 rounded-full h-2 mt-1">
                  <div className="bg-purple-600 h-2 rounded-full" style={{ width: '5%' }}></div>
                </div>
              </div>
              <p className="font-bold">₹1.43L</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>User Demographics</CardTitle>
            <CardDescription>Distribution of users by type</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center pb-4 border-b">
              <p className="text-sm text-gray-600 mb-2">Customers vs Drivers</p>
              <div className="flex justify-around">
                <div>
                  <p className="text-2xl font-bold text-blue-600">6,089</p>
                  <p className="text-sm text-gray-600">Customers</p>
                </div>
                <div className="w-0.5 h-12 bg-gray-300"></div>
                <div>
                  <p className="text-2xl font-bold text-red-600">2,145</p>
                  <p className="text-sm text-gray-600">Drivers</p>
                </div>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">New Signups</span>
                <span className="text-sm font-bold">234 today</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: '78%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Active Users</span>
                <span className="text-sm font-bold">7,156 online</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '85%' }}></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Metrics */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Metrics</CardTitle>
          <CardDescription>Platform health indicators</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 border border-gray-200 rounded-lg">
              <p className="text-2xl font-bold text-green-600">99.8%</p>
              <p className="text-xs text-gray-600 mt-2">Platform Uptime</p>
            </div>
            <div className="text-center p-4 border border-gray-200 rounded-lg">
              <p className="text-2xl font-bold text-blue-600">1.2s</p>
              <p className="text-xs text-gray-600 mt-2">Avg Response Time</p>
            </div>
            <div className="text-center p-4 border border-gray-200 rounded-lg">
              <p className="text-2xl font-bold text-purple-600">2.3%</p>
              <p className="text-xs text-gray-600 mt-2">Cancellation Rate</p>
            </div>
            <div className="text-center p-4 border border-gray-200 rounded-lg">
              <p className="text-2xl font-bold text-yellow-600">4.6★</p>
              <p className="text-xs text-gray-600 mt-2">Avg Platform Rating</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Top Performing Cities */}
      <Card>
        <CardHeader>
          <CardTitle>Top Performing Cities</CardTitle>
          <CardDescription>Revenue and bookings by city</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center pb-4 border-b">
              <div>
                <p className="font-bold">Delhi NCR</p>
                <p className="text-sm text-gray-600">₹12.45L revenue • 1,234 bookings</p>
              </div>
              <span className="text-2xl font-bold text-red-600">43.8%</span>
            </div>

            <div className="flex justify-between items-center pb-4 border-b">
              <div>
                <p className="font-bold">Mumbai</p>
                <p className="text-sm text-gray-600">₹8.12L revenue • 823 bookings</p>
              </div>
              <span className="text-2xl font-bold text-blue-600">28.5%</span>
            </div>

            <div className="flex justify-between items-center pb-4 border-b">
              <div>
                <p className="font-bold">Bangalore</p>
                <p className="text-sm text-gray-600">₹5.23L revenue • 456 bookings</p>
              </div>
              <span className="text-2xl font-bold text-green-600">18.4%</span>
            </div>

            <div className="flex justify-between items-center">
              <div>
                <p className="font-bold">Others</p>
                <p className="text-sm text-gray-600">₹2.65L revenue • 350 bookings</p>
              </div>
              <span className="text-2xl font-bold text-purple-600">9.3%</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
