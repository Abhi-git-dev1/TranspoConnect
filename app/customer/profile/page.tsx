'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useAuth } from '@/lib/auth-context'

export default function ProfilePage() {
  const { user } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState({
    name: user?.name || 'John Doe',
    email: user?.email || 'john@example.com',
    phone: user?.phone || '9876543210',
    address: 'New Delhi, India'
  })

  const [savedAddresses, setSavedAddresses] = useState([
    { id: 1, label: 'Home', address: 'New Delhi Station, Delhi', default: true },
    { id: 2, label: 'Office', address: 'Mumbai Central, Mumbai', default: false }
  ])

  const handleSave = () => {
    setIsEditing(false)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Profile</h1>
        <p className="text-gray-600">Manage your personal information and preferences</p>
      </div>

      {/* Profile Card */}
      <Card>
        <CardHeader className="flex flex-row justify-between items-start">
          <div>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Update your profile details</CardDescription>
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
            <div className="text-6xl">👤</div>
            <div className="flex-1">
              <p className="font-bold text-2xl text-gray-900">{profile.name}</p>
              <p className="text-gray-600">{profile.email}</p>
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

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                <Input
                  value={profile.address}
                  onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                  className="py-2 border-2"
                />
              </div>

              <Button
                onClick={handleSave}
                className="w-full bg-red-600 hover:bg-red-700 text-white py-6"
              >
                Save Changes
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Full Name</p>
                <p className="font-medium text-gray-900">{profile.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-medium text-gray-900">{profile.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Phone</p>
                <p className="font-medium text-gray-900">+91 {profile.phone}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Address</p>
                <p className="font-medium text-gray-900">{profile.address}</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Saved Addresses */}
      <Card>
        <CardHeader>
          <CardTitle>Saved Addresses</CardTitle>
          <CardDescription>Quick access to your favorite locations</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {savedAddresses.map((addr) => (
            <div key={addr.id} className="flex items-start justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-start gap-3">
                <span className="text-2xl">📍</span>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-bold text-gray-900">{addr.label}</p>
                    {addr.default && (
                      <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs rounded">Default</span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">{addr.address}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="border-2">Edit</Button>
                <Button size="sm" variant="outline" className="border-2">Remove</Button>
              </div>
            </div>
          ))}

          <Button className="w-full border-2 border-red-600 text-red-600 hover:bg-red-50 py-6">
            + Add New Address
          </Button>
        </CardContent>
      </Card>

      {/* Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Preferences</CardTitle>
          <CardDescription>Manage notifications and settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">Push Notifications</p>
              <p className="text-sm text-gray-600">Get updates on bookings</p>
            </div>
            <input type="checkbox" defaultChecked className="w-5 h-5" />
          </div>

          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">Email Notifications</p>
              <p className="text-sm text-gray-600">Receive emails on activities</p>
            </div>
            <input type="checkbox" defaultChecked className="w-5 h-5" />
          </div>

          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">SMS Updates</p>
              <p className="text-sm text-gray-600">SMS for booking confirmations</p>
            </div>
            <input type="checkbox" className="w-5 h-5" />
          </div>
        </CardContent>
      </Card>

      {/* Account Stats */}
      <Card>
        <CardHeader>
          <CardTitle>Account Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-3xl font-bold text-red-600">12</p>
              <p className="text-sm text-gray-600">Total Bookings</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-red-600">4.8★</p>
              <p className="text-sm text-gray-600">Your Rating</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-red-600">₹3,180</p>
              <p className="text-sm text-gray-600">Amount Spent</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-red-600">45 hrs</p>
              <p className="text-sm text-gray-600">Travel Time</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
