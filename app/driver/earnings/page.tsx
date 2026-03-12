'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function EarningsPage() {
  const earnings = [
    { date: '2024-03-12', rides: 8, amount: 2450, expenses: 150, net: 2300 },
    { date: '2024-03-11', rides: 6, amount: 1850, expenses: 120, net: 1730 },
    { date: '2024-03-10', rides: 10, amount: 3200, expenses: 200, net: 3000 },
    { date: '2024-03-09', rides: 7, amount: 2100, expenses: 100, net: 2000 }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Earnings Dashboard</h1>
        <p className="text-gray-600">Track your income and manage withdrawals</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-gray-600 mb-2">Today's Earnings</p>
            <p className="text-3xl font-bold text-green-600">₹2,300</p>
            <p className="text-xs text-gray-500 mt-1">8 rides completed</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-gray-600 mb-2">This Week</p>
            <p className="text-3xl font-bold text-green-600">₹16,030</p>
            <p className="text-xs text-gray-500 mt-1">31 rides completed</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-gray-600 mb-2">This Month</p>
            <p className="text-3xl font-bold text-green-600">₹68,450</p>
            <p className="text-xs text-gray-500 mt-1">145 rides completed</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-gray-600 mb-2">Available to Withdraw</p>
            <p className="text-3xl font-bold text-blue-600">₹12,500</p>
            <p className="text-xs text-gray-500 mt-1">5 business days hold</p>
          </CardContent>
        </Card>
      </div>

      {/* Withdrawal Card */}
      <Card className="bg-gradient-to-r from-red-50 to-orange-50 border-red-200">
        <CardHeader>
          <CardTitle>Withdraw Earnings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600 mb-2">Amount to Withdraw</p>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="12500"
                  className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-lg"
                />
                <Button className="bg-red-600 hover:bg-red-700 text-white px-6">Withdraw</Button>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-2">Bank Account</p>
              <select className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg">
                <option>HDFC - 1234 5678 9012</option>
                <option>ICICI - 9876 5432 1098</option>
              </select>
            </div>
          </div>
          <p className="text-xs text-gray-600">
            💡 Tip: Withdrawals are processed within 2-3 business days. Minimum withdrawal: ₹100
          </p>
        </CardContent>
      </Card>

      {/* Daily Earnings Table */}
      <Card>
        <CardHeader>
          <CardTitle>Daily Earnings</CardTitle>
          <CardDescription>Breakdown of your earnings by day</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-bold text-gray-900">Date</th>
                  <th className="text-left py-3 px-4 font-bold text-gray-900">Rides</th>
                  <th className="text-left py-3 px-4 font-bold text-gray-900">Total</th>
                  <th className="text-left py-3 px-4 font-bold text-gray-900">Expenses</th>
                  <th className="text-left py-3 px-4 font-bold text-gray-900">Net Earnings</th>
                  <th className="text-left py-3 px-4 font-bold text-gray-900">Action</th>
                </tr>
              </thead>
              <tbody>
                {earnings.map((earning) => (
                  <tr key={earning.date} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 text-gray-900">{earning.date}</td>
                    <td className="py-3 px-4 text-gray-900 font-medium">{earning.rides}</td>
                    <td className="py-3 px-4 text-gray-900 font-medium">₹{earning.amount}</td>
                    <td className="py-3 px-4 text-red-600">-₹{earning.expenses}</td>
                    <td className="py-3 px-4 text-green-600 font-bold">₹{earning.net}</td>
                    <td className="py-3 px-4">
                      <Button size="sm" variant="outline" className="border-2">View Details</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Withdrawal History */}
      <Card>
        <CardHeader>
          <CardTitle>Withdrawal History</CardTitle>
          <CardDescription>Your recent withdrawal requests</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between items-center pb-4 border-b">
              <div>
                <p className="font-medium text-gray-900">Withdrawal #WD-001</p>
                <p className="text-sm text-gray-600">₹10,000 → HDFC</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium px-3 py-1 bg-green-100 text-green-700 rounded">Completed</p>
                <p className="text-xs text-gray-500 mt-1">Mar 10, 2024</p>
              </div>
            </div>

            <div className="flex justify-between items-center pb-4 border-b">
              <div>
                <p className="font-medium text-gray-900">Withdrawal #WD-002</p>
                <p className="text-sm text-gray-600">₹5,000 → ICICI</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium px-3 py-1 bg-yellow-100 text-yellow-700 rounded">Pending</p>
                <p className="text-xs text-gray-500 mt-1">Mar 11, 2024</p>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium text-gray-900">Withdrawal #WD-003</p>
                <p className="text-sm text-gray-600">₹7,500 → HDFC</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium px-3 py-1 bg-green-100 text-green-700 rounded">Completed</p>
                <p className="text-xs text-gray-500 mt-1">Mar 08, 2024</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
