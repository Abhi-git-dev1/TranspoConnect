'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function AvailabilityPage() {
  const [isOnline, setIsOnline] = useState(true)
  const [schedule, setSchedule] = useState([
    { day: 'Monday', start: '08:00', end: '20:00', active: true },
    { day: 'Tuesday', start: '08:00', end: '20:00', active: true },
    { day: 'Wednesday', start: '08:00', end: '20:00', active: true },
    { day: 'Thursday', start: '08:00', end: '20:00', active: true },
    { day: 'Friday', start: '08:00', end: '22:00', active: true },
    { day: 'Saturday', start: '10:00', end: '22:00', active: true },
    { day: 'Sunday', start: '10:00', end: '20:00', active: false }
  ])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Availability Settings</h1>
        <p className="text-gray-600">Manage your online status and working schedule</p>
      </div>

      {/* Online Status Card */}
      <Card className={`${isOnline ? 'border-green-600' : 'border-gray-300'} border-2`}>
        <CardContent className="pt-8 pb-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-2">Current Status</p>
              <div className="flex items-center gap-3">
                <div className={`w-4 h-4 rounded-full ${isOnline ? 'bg-green-600 animate-pulse' : 'bg-red-600'}`}></div>
                <h2 className={`text-2xl font-bold ${isOnline ? 'text-green-600' : 'text-red-600'}`}>
                  {isOnline ? 'Online' : 'Offline'}
                </h2>
              </div>
            </div>

            <Button
              onClick={() => setIsOnline(!isOnline)}
              className={`px-8 py-6 text-lg font-bold ${
                isOnline
                  ? 'bg-red-600 hover:bg-red-700 text-white'
                  : 'bg-green-600 hover:bg-green-700 text-white'
              }`}
            >
              {isOnline ? 'Go Offline' : 'Go Online'}
            </Button>
          </div>

          <div className="mt-6 pt-6 border-t space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Today's Earnings</span>
              <span className="font-bold text-green-600">₹2,450</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Rides Completed</span>
              <span className="font-bold">8</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Online Since</span>
              <span className="font-bold">6 hours 30 mins</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Schedule Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Weekly Schedule</CardTitle>
          <CardDescription>Set your preferred working hours for each day</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {schedule.map((day, index) => (
            <div key={day.day} className="flex items-center gap-4 pb-4 border-b last:border-0">
              <div className="w-24">
                <p className="font-medium text-gray-900">{day.day}</p>
              </div>

              <div className="flex-1 flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={day.active}
                  className="w-5 h-5 cursor-pointer"
                  onChange={(e) => {
                    const newSchedule = [...schedule]
                    newSchedule[index].active = e.target.checked
                    setSchedule(newSchedule)
                  }}
                />
                <span className="text-sm text-gray-600">Available</span>
              </div>

              {day.active && (
                <>
                  <div className="flex items-center gap-2">
                    <input
                      type="time"
                      value={day.start}
                      className="px-3 py-2 border border-gray-300 rounded-lg"
                      onChange={(e) => {
                        const newSchedule = [...schedule]
                        newSchedule[index].start = e.target.value
                        setSchedule(newSchedule)
                      }}
                    />
                    <span className="text-gray-600">to</span>
                    <input
                      type="time"
                      value={day.end}
                      className="px-3 py-2 border border-gray-300 rounded-lg"
                      onChange={(e) => {
                        const newSchedule = [...schedule]
                        newSchedule[index].end = e.target.value
                        setSchedule(newSchedule)
                      }}
                    />
                  </div>
                </>
              )}
            </div>
          ))}

          <Button className="w-full bg-red-600 hover:bg-red-700 text-white py-6 mt-4">
            Save Schedule
          </Button>
        </CardContent>
      </Card>

      {/* Break Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Break Management</CardTitle>
          <CardDescription>Set automatic breaks when you need rest</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">Auto Break After 6 Hours</p>
              <p className="text-sm text-gray-600">Automatically go offline after 6 hours of driving</p>
            </div>
            <input type="checkbox" defaultChecked className="w-5 h-5" />
          </div>

          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">Lunch Break Reminder</p>
              <p className="text-sm text-gray-600">Get notified to take a lunch break</p>
            </div>
            <input type="checkbox" defaultChecked className="w-5 h-5" />
          </div>

          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">Rest Day Notifications</p>
              <p className="text-sm text-gray-600">Weekly rest day reminders</p>
            </div>
            <input type="checkbox" className="w-5 h-5" />
          </div>
        </CardContent>
      </Card>

      {/* Location Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Service Areas</CardTitle>
          <CardDescription>Select areas where you want to accept rides</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {['Delhi', 'Gurgaon', 'Noida', 'Faridabad', 'Greater Noida', 'Chandigarh'].map((city) => (
              <label key={city} className="flex items-center gap-2 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                <input type="checkbox" defaultChecked className="w-4 h-4" />
                <span className="font-medium text-gray-900">{city}</span>
              </label>
            ))}
          </div>

          <Button className="w-full bg-red-600 hover:bg-red-700 text-white py-6">
            Save Service Areas
          </Button>
        </CardContent>
      </Card>

      {/* Performance Stats */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="text-center">
              <p className="text-3xl font-bold text-green-600">98%</p>
              <p className="text-sm text-gray-600">Acceptance Rate</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-blue-600">4.9★</p>
              <p className="text-sm text-gray-600">Your Rating</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-purple-600">234</p>
              <p className="text-sm text-gray-600">Total Rides</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-orange-600">2%</p>
              <p className="text-sm text-gray-600">Cancellation Rate</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
