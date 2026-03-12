'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { AnimatedPage } from '@/components/animations/animated-page'
import { AnimatedCard } from '@/components/animations/animated-card'
import { StatusBadge } from '@/components/animations/status-badge'
import { motion } from 'framer-motion'
import { containerVariants, slideUpVariants } from '@/lib/animations'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { TrendingUp, Users, MapPin, DollarSign, AlertCircle, CheckCircle, Clock } from 'lucide-react'

// Mock data for charts
const revenueData = [
  { date: 'Mon', revenue: 24500, trips: 145 },
  { date: 'Tue', revenue: 32100, trips: 189 },
  { date: 'Wed', revenue: 28900, trips: 167 },
  { date: 'Thu', revenue: 35600, trips: 201 },
  { date: 'Fri', revenue: 42300, trips: 234 },
  { date: 'Sat', revenue: 48900, trips: 267 },
  { date: 'Sun', revenue: 38200, trips: 219 }
]

const zoneData = [
  { name: 'North', value: 28, fill: '#DC2626' },
  { name: 'South', value: 22, fill: '#EF4444' },
  { name: 'East', value: 25, fill: '#F87171' },
  { name: 'West', value: 25, fill: '#FCA5A5' }
]

export default function AdminDashboard() {
  const [selectedZone, setSelectedZone] = useState<string | null>(null)

  const kpis = [
    {
      title: 'Total Revenue',
      value: '₹2,48,500',
      subtitle: '+12% from last week',
      icon: DollarSign,
      color: 'text-green-600',
      bg: 'bg-green-50'
    },
    {
      title: 'Active Companies',
      value: '342',
      subtitle: '+28 this month',
      icon: Users,
      color: 'text-blue-600',
      bg: 'bg-blue-50'
    },
    {
      title: 'Connected Drivers',
      value: '2,145',
      subtitle: '1,234 online now',
      icon: TrendingUp,
      color: 'text-orange-600',
      bg: 'bg-orange-50'
    },
    {
      title: 'Pending Verification',
      value: '23',
      subtitle: 'Requires action',
      icon: AlertCircle,
      color: 'text-red-600',
      bg: 'bg-red-50'
    }
  ]

  const zones = [
    { name: 'North Delhi', drivers: 245, demand: 'High', avgWaitTime: '3.2 min', status: 'optimal' },
    { name: 'South Delhi', drivers: 189, demand: 'Medium', avgWaitTime: '5.1 min', status: 'optimal' },
    { name: 'East Delhi', drivers: 156, demand: 'High', avgWaitTime: '4.5 min', status: 'warning' },
    { name: 'West Delhi', drivers: 198, demand: 'Low', avgWaitTime: '2.8 min', status: 'optimal' }
  ]

  return (
    <AnimatedPage>
      <div className="space-y-8">
        {/* Header */}
        <motion.div
          initial="initial"
          animate="animate"
          variants={slideUpVariants}
          className="bg-gradient-to-r from-primary to-primary/80 text-white p-8 rounded-xl"
        >
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
              <p className="text-primary-foreground/90">Real-time platform operations</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-primary-foreground/70">Last updated</p>
              <p className="text-sm font-mono text-primary-foreground">Now</p>
            </div>
          </div>
        </motion.div>

        {/* KPI Cards */}
        <motion.div
          initial="initial"
          animate="animate"
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {kpis.map((kpi, idx) => {
            const Icon = kpi.icon
            return (
              <AnimatedCard key={kpi.title} hoverLift delay={idx * 0.1}>
                <Card className="h-full">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">{kpi.title}</CardTitle>
                    <Icon className={`h-5 w-5 ${kpi.color}`} />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{kpi.value}</div>
                    <p className="text-xs text-muted-foreground mt-2">{kpi.subtitle}</p>
                  </CardContent>
                </Card>
              </AnimatedCard>
            )
          })}
        </motion.div>

        {/* Charts Section */}
        <motion.div
          initial="initial"
          animate="animate"
          variants={containerVariants}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          {/* Revenue & Trips Chart */}
          <AnimatedCard hoverLift delay={0.4} className="lg:col-span-2">
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Weekly Performance</CardTitle>
                <CardDescription>Revenue and trip volume</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="date" stroke="#888" />
                    <YAxis stroke="#888" />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: '#fff',
                        border: '1px solid #ccc',
                        borderRadius: '8px'
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="revenue" 
                      stroke="#DC2626" 
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      name="Revenue (₹)"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </AnimatedCard>

          {/* Zone Distribution Pie */}
          <AnimatedCard hoverLift delay={0.5}>
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Zone Distribution</CardTitle>
                <CardDescription>% of active trips</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={zoneData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={(entry) => `${entry.name}: ${entry.value}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {zoneData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </AnimatedCard>
        </motion.div>

        {/* Zone Management */}
        <AnimatedCard hoverLift delay={0.6}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  Zone Management
                </CardTitle>
                <CardDescription>Real-time zone metrics and driver allocation</CardDescription>
              </div>
              <Button variant="outline" size="sm">Configure Zones</Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {zones.map((zone, idx) => (
                  <motion.div
                    key={zone.name}
                    initial="initial"
                    animate="animate"
                    variants={slideUpVariants}
                    transition={{ delay: idx * 0.1 }}
                    onClick={() => setSelectedZone(selectedZone === zone.name ? null : zone.name)}
                    className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                      selectedZone === zone.name
                        ? 'border-primary bg-primary/5'
                        : 'border-muted hover:border-primary/50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-bold">{zone.name}</h4>
                        <StatusBadge 
                          status={zone.status === 'optimal' ? 'completed' : 'pending'}
                          label={zone.demand}
                          animate={false}
                        />
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-primary">{zone.drivers}</p>
                        <p className="text-xs text-muted-foreground">Drivers</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Avg Wait Time</span>
                      <span className="font-medium">{zone.avgWaitTime}</span>
                    </div>

                    {/* Demand Bar */}
                    <div className="mt-3 flex items-center gap-2">
                      <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: zone.demand === 'High' ? '85%' : zone.demand === 'Medium' ? '60%' : '35%' }}
                          transition={{ duration: 1, ease: 'easeOut' }}
                          className={`h-full ${
                            zone.demand === 'High' 
                              ? 'bg-red-500' 
                              : zone.demand === 'Medium'
                              ? 'bg-yellow-500'
                              : 'bg-green-500'
                          }`}
                        />
                      </div>
                      <span className="text-xs font-medium">{zone.demand}</span>
                    </div>

                    {/* Expanded Details */}
                    {selectedZone === zone.name && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-4 pt-4 border-t space-y-3"
                      >
                        <div className="grid grid-cols-3 gap-3 text-sm">
                          <div className="bg-muted/50 p-2 rounded">
                            <p className="text-muted-foreground text-xs">Active Trips</p>
                            <p className="font-bold">{zone.drivers * 0.8}</p>
                          </div>
                          <div className="bg-muted/50 p-2 rounded">
                            <p className="text-muted-foreground text-xs">Idle Drivers</p>
                            <p className="font-bold">{zone.drivers * 0.2}</p>
                          </div>
                          <div className="bg-muted/50 p-2 rounded">
                            <p className="text-muted-foreground text-xs">Pickup Rate</p>
                            <p className="font-bold">87%</p>
                          </div>
                        </div>
                        <Button variant="outline" className="w-full">Rebalance Drivers</Button>
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </AnimatedCard>

        {/* Quick Actions */}
        <motion.div
          initial="initial"
          animate="animate"
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <AnimatedCard hoverLift delay={0.7}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-orange-600" />
                  Pending Verifications
                </CardTitle>
                <CardDescription>23 drivers awaiting approval</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/admin/verification" className="w-full">
                  <Button className="w-full">Review Now</Button>
                </Link>
              </CardContent>
            </Card>
          </AnimatedCard>

          <AnimatedCard hoverLift delay={0.8}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-blue-600" />
                  Company Clients
                </CardTitle>
                <CardDescription>342 active business accounts</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/admin/customers" className="w-full">
                  <Button variant="outline" className="w-full">Manage Clients</Button>
                </Link>
              </CardContent>
            </Card>
          </AnimatedCard>

          <AnimatedCard hoverLift delay={0.9}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-green-600" />
                  Live Monitoring
                </CardTitle>
                <CardDescription>All systems operational</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-sm font-medium">All zones online</span>
                </div>
              </CardContent>
            </Card>
          </AnimatedCard>
        </motion.div>
      </div>
    </AnimatedPage>
  )
}
