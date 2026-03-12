'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuth } from '@/lib/auth-context'
import { AnimatedPage } from '@/components/animations/animated-page'
import { AnimatedCard } from '@/components/animations/animated-card'
import { StatusBadge } from '@/components/animations/status-badge'
import { motion } from 'framer-motion'
import { containerVariants, slideUpVariants, pulseVariants } from '@/lib/animations'
import { Clock, MapPin, DollarSign, Star, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react'

interface DailyTrip {
  id: string
  pickupLocation: string
  dropLocation: string
  status: 'searching' | 'assigned' | 'arriving' | 'completed' | 'cancelled'
  fare: number
  rating?: number
  startTime: string
  endTime?: string
}

export default function DriverDashboard() {
  const { user } = useAuth()
  const [dutyStatus, setDutyStatus] = useState<'online' | 'offline'>('online')
  const [selectedTrip, setSelectedTrip] = useState<string | null>(null)

  // Mock daily trips
  const dailyTrips: DailyTrip[] = [
    {
      id: '1',
      pickupLocation: 'Delhi Warehouse',
      dropLocation: 'Gurugram Hub',
      status: 'completed',
      fare: 450,
      rating: 5,
      startTime: '09:15 AM',
      endTime: '10:30 AM'
    },
    {
      id: '2',
      pickupLocation: 'South Delhi Depot',
      dropLocation: 'Noida Distribution',
      status: 'completed',
      fare: 380,
      rating: 4,
      startTime: '11:00 AM',
      endTime: '12:45 PM'
    },
    {
      id: '3',
      pickupLocation: 'East Delhi Center',
      dropLocation: 'Faridabad Exchange',
      status: 'arriving',
      fare: 520,
      startTime: '01:30 PM'
    },
    {
      id: '4',
      pickupLocation: 'Central Delhi Hub',
      dropLocation: 'Ghaziabad Terminal',
      status: 'assigned',
      fare: 620,
      startTime: '03:00 PM (Scheduled)'
    }
  ]

  const metrics = {
    todayEarnings: 2450,
    completedTrips: 2,
    ongoingTrips: 2,
    rating: 4.85,
    totalRides: 234,
    onlineHours: '8.5 hrs'
  }

  return (
    <AnimatedPage>
      <div className="space-y-8">
        {/* Duty Status Header */}
        <motion.div
          initial="initial"
          animate="animate"
          variants={slideUpVariants}
          className="bg-gradient-to-r from-primary to-primary/80 text-white p-8 rounded-xl"
        >
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-4xl font-bold mb-2">Welcome back, {user?.name || 'Driver'}!</h1>
              <p className="text-primary-foreground/90">Ready to earn today?</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-primary-foreground/70">Status</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setDutyStatus(dutyStatus === 'online' ? 'offline' : 'online')}
                  className={`px-6 py-2 rounded-full font-bold transition-all ${
                    dutyStatus === 'online'
                      ? 'bg-green-500 hover:bg-green-600 text-white'
                      : 'bg-gray-500 hover:bg-gray-600 text-white'
                  }`}
                >
                  {dutyStatus === 'online' ? 'Online' : 'Offline'}
                </motion.button>
              </div>
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
          {/* Today's Earnings */}
          <AnimatedCard hoverLift delay={0}>
            <Card className="h-full">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Today's Earnings</CardTitle>
                <DollarSign className="h-5 w-5 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">₹{metrics.todayEarnings}</div>
                <p className="text-xs text-muted-foreground mt-2">
                  <span className="text-green-600 font-semibold">+₹450</span> from yesterday
                </p>
              </CardContent>
            </Card>
          </AnimatedCard>

          {/* Completed Trips */}
          <AnimatedCard hoverLift delay={0.1}>
            <Card className="h-full">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Completed Today</CardTitle>
                <CheckCircle className="h-5 w-5 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{metrics.completedTrips}</div>
                <p className="text-xs text-muted-foreground mt-2">
                  <span className="text-green-600 font-semibold">+1</span> this hour
                </p>
              </CardContent>
            </Card>
          </AnimatedCard>

          {/* Ongoing Trips */}
          <AnimatedCard hoverLift delay={0.2}>
            <Card className="h-full">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Ongoing Trips</CardTitle>
                <motion.div variants={pulseVariants} animate="animate">
                  <MapPin className="h-5 w-5 text-orange-500" />
                </motion.div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{metrics.ongoingTrips}</div>
                <p className="text-xs text-muted-foreground mt-2">
                  1 arriving, 1 assigned
                </p>
              </CardContent>
            </Card>
          </AnimatedCard>

          {/* Rating */}
          <AnimatedCard hoverLift delay={0.3}>
            <Card className="h-full">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Your Rating</CardTitle>
                <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{metrics.rating}★</div>
                <p className="text-xs text-muted-foreground mt-2">
                  Based on {metrics.totalRides} trips
                </p>
              </CardContent>
            </Card>
          </AnimatedCard>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial="initial"
          animate="animate"
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <AnimatedCard hoverLift delay={0.4}>
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  Demand Heatmap
                </CardTitle>
                <CardDescription>Find high-demand zones</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/driver/availability" className="w-full">
                  <Button className="w-full">View Heatmap</Button>
                </Link>
              </CardContent>
            </Card>
          </AnimatedCard>

          <AnimatedCard hoverLift delay={0.5}>
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  Daily Stats
                </CardTitle>
                <CardDescription>Track your performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Online Time</span>
                    <span className="font-bold">{metrics.onlineHours}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Avg Rating</span>
                    <span className="font-bold text-yellow-600">{metrics.rating}★</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </AnimatedCard>

          <AnimatedCard hoverLift delay={0.6}>
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Earnings Trend
                </CardTitle>
                <CardDescription>Last 7 days average</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">₹2,150/day</div>
                <p className="text-xs text-muted-foreground mt-2">
                  <span className="text-green-600">↑ 8%</span> compared to last week
                </p>
              </CardContent>
            </Card>
          </AnimatedCard>
        </motion.div>

        {/* Today's Trips */}
        <AnimatedCard hoverLift delay={0.7}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Today's Trips</CardTitle>
                <CardDescription>Your schedule and earnings</CardDescription>
              </div>
              <StatusBadge status={dutyStatus === 'online' ? 'arriving' : 'pending'} />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dailyTrips.map((trip, idx) => (
                  <motion.div
                    key={trip.id}
                    initial="initial"
                    animate="animate"
                    variants={slideUpVariants}
                    transition={{ delay: idx * 0.1 }}
                    onClick={() => setSelectedTrip(selectedTrip === trip.id ? null : trip.id)}
                    className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                      selectedTrip === trip.id
                        ? 'border-primary bg-primary/5'
                        : 'border-muted hover:border-primary/50'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <StatusBadge status={trip.status} />
                          <p className="text-sm text-muted-foreground">{trip.startTime}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="font-bold">{trip.pickupLocation}</p>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <div className="w-1 h-1 bg-primary rounded-full" />
                            <p className="text-sm">{trip.dropLocation}</p>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-primary">₹{trip.fare}</p>
                        {trip.rating && (
                          <div className="flex items-center justify-end gap-1 mt-1">
                            <Star size={14} className="fill-yellow-500 text-yellow-500" />
                            <span className="text-sm font-bold">{trip.rating}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Expanded Details */}
                    {selectedTrip === trip.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-4 pt-4 border-t space-y-3"
                      >
                        {trip.endTime && (
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Completed at</span>
                            <span className="font-medium">{trip.endTime}</span>
                          </div>
                        )}
                        {trip.status === 'assigned' && (
                          <Button className="w-full">Start Pickup</Button>
                        )}
                        {trip.status === 'arriving' && (
                          <Button className="w-full bg-green-600 hover:bg-green-700">Mark as Arrived</Button>
                        )}
                        {trip.status === 'completed' && (
                          <p className="text-sm text-green-600 font-medium">Trip completed successfully</p>
                        )}
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </AnimatedCard>

        {/* Performance Alert */}
        <motion.div
          initial="initial"
          animate="animate"
          variants={slideUpVariants}
          className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex gap-3"
        >
          <AlertCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-blue-700">
            <p className="font-bold mb-1">Performance Bonus Available</p>
            <p>Complete 3 more trips today to earn an extra ₹200 bonus. You're just 3 away!</p>
          </div>
        </motion.div>
      </div>
    </AnimatedPage>
  )
}
