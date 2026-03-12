'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function AuthPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-white flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-2xl">TC</span>
            </div>
            <span className="font-bold text-2xl text-gray-900">TranspoConnect</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
          <p className="text-gray-600">Choose how you want to proceed</p>
        </div>

        {/* Auth Cards */}
        <div className="space-y-4">
          {/* Customer Sign In */}
          <Card className="border-2 hover:border-red-600 transition-colors cursor-pointer">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <span className="text-2xl">👤</span>
                Continue as Customer
              </CardTitle>
              <CardDescription>Book rides and track shipments</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/auth/customer-login" className="block">
                <Button className="w-full bg-red-600 hover:bg-red-700 text-white py-6">
                  Continue as Customer
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Driver Sign In */}
          <Card className="border-2 hover:border-red-600 transition-colors cursor-pointer">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <span className="text-2xl">🚗</span>
                Continue as Driver
              </CardTitle>
              <CardDescription>Earn money by offering rides</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/auth/driver-login" className="block">
                <Button className="w-full bg-red-600 hover:bg-red-700 text-white py-6">
                  Continue as Driver
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Admin */}
          <Card className="border-2 hover:border-red-600 transition-colors cursor-pointer">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <span className="text-2xl">⚙️</span>
                Admin Panel
              </CardTitle>
              <CardDescription>Manage platform operations</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/auth/admin-login" className="block">
                <Button className="w-full bg-red-600 hover:bg-red-700 text-white py-6">
                  Admin Login
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Divider */}
        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-600">or</span>
          </div>
        </div>

        {/* Back to Home */}
        <Button variant="outline" className="w-full py-6 border-2 text-gray-900">
          <Link href="/">Back to Home</Link>
        </Button>
      </div>
    </div>
  )
}
