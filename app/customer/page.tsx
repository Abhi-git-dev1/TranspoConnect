'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuth } from '@/lib/auth-context'
import { AnimatedPage } from '@/components/animations/animated-page'
import { AnimatedCard } from '@/components/animations/animated-card'
import { ArrowRight, TrendingUp, MapPin, DollarSign, Users, BarChart3, Plus } from 'lucide-react'
import { motion } from 'framer-motion'
import { containerVariants, slideUpVariants } from '@/lib/animations'

export default function CompanyDashboard() {
  const { user } = useAuth()
  const company = user?.company

  // Mock metrics
  const metrics = {
    monthlySpend: company?.monthlySpend || 0,
    activeTrips: 3,
    drivers: 12,
    zones: ['North', 'South', 'East'],
    totalTripsThisMonth: 156,
    avgCostPerTrip: 245,
    savedAmount: 8900
  }

  return (
    <AnimatedPage>
      <div className="space-y-8">
        {/* Hero Section */}
        <motion.div
          initial="initial"
          animate="animate"
          variants={slideUpVariants}
          className="bg-gradient-to-r from-primary to-primary/80 text-white p-8 rounded-xl shadow-lg"
        >
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-4xl font-bold mb-2">{company?.name || 'Company'}</h1>
              <p className="text-primary-foreground/90 text-lg">Manage your logistics efficiently</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-primary-foreground/70">GST</p>
              <p className="text-sm font-mono text-primary-foreground">{company?.gstNumber}</p>
            </div>
          </div>
        </motion.div>

        {/* Key Metrics Grid */}
        <motion.div
          initial="initial"
          animate="animate"
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {/* Monthly Spend Card */}
          <motion.div variants={slideUpVariants} className="lg:col-span-1">
            <Card className="h-full">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Monthly Spend</CardTitle>
                <DollarSign className="h-5 w-5 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">₹{metrics.monthlySpend.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground mt-2">
                  <span className="text-green-600 font-semibold">↓ 12%</span> from last month
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Active Trips */}
          <motion.div variants={slideUpVariants} className="lg:col-span-1">
            <Card className="h-full">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Active Trips</CardTitle>
                <TrendingUp className="h-5 w-5 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{metrics.activeTrips}</div>
                <p className="text-xs text-muted-foreground mt-2">
                  <span className="text-green-600 font-semibold">+2</span> in last hour
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Drivers Available */}
          <motion.div variants={slideUpVariants} className="lg:col-span-1">
            <Card className="h-full">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Connected Drivers</CardTitle>
                <Users className="h-5 w-5 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{metrics.drivers}</div>
                <p className="text-xs text-muted-foreground mt-2">
                  <span className="text-green-600 font-semibold">8</span> online now
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Avg Cost Per Trip */}
          <motion.div variants={slideUpVariants} className="lg:col-span-1">
            <Card className="h-full">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Avg Trip Cost</CardTitle>
                <BarChart3 className="h-5 w-5 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">₹{metrics.avgCostPerTrip}</div>
                <p className="text-xs text-muted-foreground mt-2">
                  <span className="text-green-600 font-semibold">Optimized</span> pricing
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Quick Actions Section */}
        <motion.div
          initial="initial"
          animate="animate"
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <AnimatedCard hoverLift delay={0}>
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="h-5 w-5 text-primary" />
                  Book New Trip
                </CardTitle>
                <CardDescription>Quick booking for immediate needs</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/customer/book" className="w-full">
                  <Button className="w-full gap-2">
                    Book Now <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </AnimatedCard>

          <AnimatedCard hoverLift delay={0.1}>
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  Active Deliveries
                </CardTitle>
                <CardDescription>Track all ongoing shipments</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/customer/tracking" className="w-full">
                  <Button variant="outline" className="w-full gap-2">
                    View Tracking <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </AnimatedCard>

          <AnimatedCard hoverLift delay={0.2}>
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  Reports & Analytics
                </CardTitle>
                <CardDescription>Detailed trip analytics</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/customer/bookings" className="w-full">
                  <Button variant="outline" className="w-full gap-2">
                    View Reports <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </AnimatedCard>
        </motion.div>

        {/* Team & Zones Section */}
        <motion.div
          initial="initial"
          animate="animate"
          variants={containerVariants}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          {/* Operating Zones */}
          <AnimatedCard hoverLift delay={0.3}>
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Operating Zones</CardTitle>
                <CardDescription>Active in {metrics.zones.length} zones</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {metrics.zones.map((zone) => (
                    <div key={zone} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <span className="font-medium">{zone} Delhi</span>
                      <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded">Active</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </AnimatedCard>

          {/* Monthly Stats */}
          <AnimatedCard hoverLift delay={0.4}>
            <Card className="h-full">
              <CardHeader>
                <CardTitle>This Month</CardTitle>
                <CardDescription>Performance overview</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Total Trips</span>
                    <span className="text-2xl font-bold">{metrics.totalTripsThisMonth}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Amount Saved</span>
                    <span className="text-xl font-bold text-green-600">₹{metrics.savedAmount}</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden mt-4">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: '75%' }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                      className="h-full bg-primary"
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">75% of monthly budget</p>
                </div>
              </CardContent>
            </Card>
          </AnimatedCard>
        </motion.div>

        {/* Team Members */}
        <AnimatedCard hoverLift delay={0.5}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Team Members</CardTitle>
                <CardDescription>Manage access and permissions</CardDescription>
              </div>
              <Button variant="outline" size="sm">Add Member</Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { name: 'You', email: user?.email, role: 'Admin' },
                  { name: 'Rajesh Kumar', email: 'rajesh@acme.com', role: 'Manager' },
                  { name: 'Priya Singh', email: 'priya@acme.com', role: 'User' }
                ].map((member) => (
                  <div key={member.email} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium">{member.name}</p>
                      <p className="text-sm text-muted-foreground">{member.email}</p>
                    </div>
                    <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">{member.role}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </AnimatedCard>
      </div>
    </AnimatedPage>
  )
}
