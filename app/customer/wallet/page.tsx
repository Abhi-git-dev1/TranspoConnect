'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function WalletPage() {
  const [showTopup, setShowTopup] = useState(false)
  const [amount, setAmount] = useState('')

  const transactions = [
    { id: 1, type: 'debit', description: 'Booking BOOKING-1003', amount: '₹2500', date: '2024-03-12', status: 'completed' },
    { id: 2, type: 'credit', description: 'Refund - Cancelled Booking', amount: '₹250', date: '2024-03-11', status: 'completed' },
    { id: 3, type: 'debit', description: 'Booking BOOKING-1002', amount: '₹180', date: '2024-03-08', status: 'completed' },
    { id: 4, type: 'credit', description: 'Sign-up Bonus', amount: '₹100', date: '2024-03-05', status: 'completed' },
    { id: 5, type: 'debit', description: 'Booking BOOKING-1001', amount: '₹450', date: '2024-03-10', status: 'completed' }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Wallet</h1>
        <p className="text-gray-600">Manage your account balance and payments</p>
      </div>

      {/* Balance Card */}
      <Card className="bg-gradient-to-r from-red-600 to-red-700 text-white border-0">
        <CardContent className="pt-8 pb-8">
          <div className="flex justify-between items-start mb-12">
            <div>
              <p className="text-red-100 mb-2">Available Balance</p>
              <h2 className="text-5xl font-bold">₹1,250</h2>
            </div>
            <div className="text-4xl">💳</div>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-8 pb-8 border-t border-red-500">
            <div className="pt-4">
              <p className="text-red-100 text-sm">Total Spent</p>
              <p className="text-2xl font-bold">₹3,180</p>
            </div>
            <div className="pt-4">
              <p className="text-red-100 text-sm">Rides</p>
              <p className="text-2xl font-bold">12</p>
            </div>
            <div className="pt-4">
              <p className="text-red-100 text-sm">Cashback</p>
              <p className="text-2xl font-bold">₹150</p>
            </div>
          </div>

          <Button
            onClick={() => setShowTopup(!showTopup)}
            className="w-full bg-white text-red-600 hover:bg-red-50 font-bold"
          >
            + Add Money to Wallet
          </Button>
        </CardContent>
      </Card>

      {/* Top-up Form */}
      {showTopup && (
        <Card className="border-2 border-red-600">
          <CardHeader className="bg-red-50">
            <CardTitle>Add Money to Wallet</CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Amount (₹)</label>
              <div className="flex gap-2">
                <Input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter amount"
                  className="py-2 border-2 border-gray-300"
                />
                <Button className="bg-red-600 hover:bg-red-700 text-white">Pay</Button>
              </div>
            </div>

            {/* Quick amounts */}
            <div>
              <p className="text-sm text-gray-600 mb-2">Quick add:</p>
              <div className="grid grid-cols-4 gap-2">
                {['₹100', '₹500', '₹1000', '₹2000'].map((val) => (
                  <Button
                    key={val}
                    onClick={() => setAmount(val.replace('₹', ''))}
                    variant="outline"
                    className="border-2"
                  >
                    {val}
                  </Button>
                ))}
              </div>
            </div>

            <p className="text-xs text-gray-500">
              💡 Tip: Add ₹500 and get ₹50 cashback
            </p>
          </CardContent>
        </Card>
      )}

      {/* Recent Transactions */}
      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
          <CardDescription>Your recent wallet activities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {transactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between pb-4 border-b last:border-0">
                <div className="flex items-center gap-4">
                  <div className="text-2xl">
                    {transaction.type === 'debit' ? '💸' : '💰'}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{transaction.description}</p>
                    <p className="text-sm text-gray-500">{transaction.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-bold text-lg ${
                    transaction.type === 'debit' ? 'text-red-600' : 'text-green-600'
                  }`}>
                    {transaction.type === 'debit' ? '-' : '+'}{transaction.amount}
                  </p>
                  <p className="text-xs text-gray-500">{transaction.status}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Offers */}
      <Card className="bg-blue-50 border border-blue-200">
        <CardHeader>
          <CardTitle className="text-blue-900">Active Offers</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-bold text-gray-900">First 5 Rides - 20% Off</p>
              <p className="text-sm text-gray-600">Use code: FIRST5</p>
            </div>
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">Apply</Button>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <p className="font-bold text-gray-900">Weekend Special - 30% Off</p>
              <p className="text-sm text-gray-600">Valid on Sat & Sun</p>
            </div>
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">Apply</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
