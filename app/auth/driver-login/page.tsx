'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { PhoneInput } from '@/components/auth/phone-input'
import { useAuth } from '@/lib/auth-context'

export default function DriverLoginPage() {
  const router = useRouter()
  const { signup } = useAuth()
  const [isSignup, setIsSignup] = useState(true)
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [vehicleType, setVehicleType] = useState('bike')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      if (isSignup) {
        if (password !== confirmPassword) {
          throw new Error('Passwords do not match')
        }
        if (phone.length !== 10) {
          throw new Error('Phone number must be 10 digits')
        }
        await signup(phone, email, password, 'driver')
        router.push('/driver/documents')
      } else {
        if (phone.length !== 10) {
          throw new Error('Phone number must be 10 digits')
        }
        await signup(phone, email, password, 'driver')
        router.push('/driver')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-white flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {isSignup ? 'Become a Driver' : 'Driver Login'}
          </h1>
          <p className="text-gray-600">
            {isSignup ? 'Join TranspoConnect and earn money' : 'Access your driver account'}
          </p>
        </div>

        <Card className="border-2 border-gray-200">
          <CardHeader>
            <CardTitle className="text-2xl">🚗 Driver</CardTitle>
            <CardDescription>
              {isSignup ? 'Create driver account' : 'Sign in to driver portal'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <PhoneInput value={phone} onChange={setPhone} />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="py-2 border-2 border-gray-300"
                />
              </div>

              {isSignup && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Vehicle Type</label>
                  <select
                    value={vehicleType}
                    onChange={(e) => setVehicleType(e.target.value)}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-red-600"
                  >
                    <option value="bike">Two-wheeler</option>
                    <option value="auto">Auto Rickshaw</option>
                    <option value="suv">SUV</option>
                    <option value="truck">Truck</option>
                  </select>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="py-2 border-2 border-gray-300"
                />
              </div>

              {isSignup && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
                  <Input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm your password"
                    className="py-2 border-2 border-gray-300"
                  />
                </div>
              )}

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-red-600 hover:bg-red-700 text-white py-6"
              >
                {isLoading ? 'Processing...' : isSignup ? 'Create Driver Account' : 'Sign In'}
              </Button>
            </form>

            {/* Toggle Sign Up / Sign In */}
            <div className="text-center mt-6 pt-6 border-t border-gray-200">
              <p className="text-gray-600 mb-3">
                {isSignup ? 'Already have an account?' : "Don't have an account?"}
              </p>
              <Button
                variant="outline"
                onClick={() => setIsSignup(!isSignup)}
                className="w-full border-2 text-gray-700"
              >
                {isSignup ? 'Sign In Instead' : 'Create New Account'}
              </Button>
            </div>

            {/* Back to Auth Hub */}
            <div className="text-center mt-4">
              <Link href="/auth" className="text-red-600 hover:text-red-700 font-medium text-sm">
                ← Back to Auth Options
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
