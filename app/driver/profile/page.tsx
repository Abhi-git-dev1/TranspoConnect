'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useAuth } from '@/lib/auth-context'

export default function DriverProfilePage() {
  const { user } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState({
    name: user?.name || 'Arjun Patel',
    email: user?.email || 'arjun@example.com',
    phone: user?.phone || '9876543210',
    licenseNumber: 'DL-0001234',
    vehicleType: 'Truck',
    vehicleNumber: 'KA-01-AB-1234',
    bankAccount: 'HDFC - 1234 5678 9012'
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Profile</h1>
        <p className="text-gray-600">Manage your driver profile and vehicle information</p>
      </div>

      {/* Profile Header */}
      <Card>
        <CardHeader className="flex flex-row justify-between items-start">
          <div>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Your profile details</CardDescription>
          </div>
          <Button
            onClick={() => setIsEditing(!isEditing)}
            variant="outline"
            className="border-2"
          >
            {isEditing ? 'Cancel' : 'Edit'}
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-6 pb-6 border-b">
            <div className="text-6xl">👨‍🚗</div>
            <div className="flex-1">
              <p className="font-bold text-2xl text-gray-900">{profile.name}</p>
              <p className="text-gray-600">Driver ID: #DRV-12345</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600 mb-1">Rating</p>
              <p className="text-3xl font-bold text-yellow-600">4.9★</p>
            </div>
          </div>

          {isEditing ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <Input
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className="py-2 border-2"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <Input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    className="py-2 border-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <Input
                    type="tel"
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    className="py-2 border-2"
                    disabled
                  />
                </div>
              </div>

              <Button
                onClick={() => setIsEditing(false)}
                className="w-full bg-red-600 hover:bg-red-700 text-white py-6"
              >
                Save Changes
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-medium text-gray-900">{profile.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Phone</p>
                <p className="font-medium text-gray-900">+91 {profile.phone}</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Vehicle Information */}
      <Card>
        <CardHeader>
          <CardTitle>Vehicle Information</CardTitle>
          <CardDescription>Your vehicle details and registration</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Vehicle Type</p>
              <p className="font-medium text-gray-900">{profile.vehicleType}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Vehicle Number</p>
              <p className="font-medium text-gray-900">{profile.vehicleNumber}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">License Number</p>
              <p className="font-medium text-gray-900">{profile.licenseNumber}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Insurance Status</p>
              <p className="font-medium text-green-600">✓ Active</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bank Account */}
      <Card>
        <CardHeader>
          <CardTitle>Banking Information</CardTitle>
          <CardDescription>Where your earnings are credited</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center p-4 border border-gray-200 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">{profile.bankAccount}</p>
              <p className="text-sm text-gray-600">Primary Account</p>
            </div>
            <Button variant="outline" className="border-2">Edit</Button>
          </div>
          <Button className="w-full border-2 border-red-600 text-red-600 hover:bg-red-50">
            + Add Another Account
          </Button>
        </CardContent>
      </Card>

      {/* Performance Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 border border-gray-200 rounded-lg">
              <p className="text-2xl font-bold text-red-600">234</p>
              <p className="text-xs text-gray-600 mt-1">Total Rides</p>
            </div>
            <div className="text-center p-4 border border-gray-200 rounded-lg">
              <p className="text-2xl font-bold text-green-600">4.9★</p>
              <p className="text-xs text-gray-600 mt-1">Your Rating</p>
            </div>
            <div className="text-center p-4 border border-gray-200 rounded-lg">
              <p className="text-2xl font-bold text-blue-600">98%</p>
              <p className="text-xs text-gray-600 mt-1">Acceptance</p>
            </div>
            <div className="text-center p-4 border border-gray-200 rounded-lg">
              <p className="text-2xl font-bold text-purple-600">2%</p>
              <p className="text-xs text-gray-600 mt-1">Cancellation</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Account Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Account Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">Two-Factor Authentication</p>
              <p className="text-sm text-gray-600">Secure your account</p>
            </div>
            <input type="checkbox" defaultChecked className="w-5 h-5" />
          </div>

          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">Email Notifications</p>
              <p className="text-sm text-gray-600">Get updates on earnings</p>
            </div>
            <input type="checkbox" defaultChecked className="w-5 h-5" />
          </div>

          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">SMS Alerts</p>
              <p className="text-sm text-gray-600">Ride confirmations</p>
            </div>
            <input type="checkbox" defaultChecked className="w-5 h-5" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
