'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { AnimatedPage } from '@/components/animations/animated-page'
import { AnimatedCard } from '@/components/animations/animated-card'
import { SuccessModal } from '@/components/animations/success-modal'
import { motion } from 'framer-motion'
import { containerVariants, slideUpVariants } from '@/lib/animations'
import { MapPin, Package, Truck, Clock, AlertCircle } from 'lucide-react'
import Link from 'next/link'

type BookingStep = 'location' | 'capacity' | 'schedule' | 'review' | 'payment'

interface BookingData {
  pickupLocation: string
  pickupAddress: string
  dropLocation: string
  dropAddress: string
  capacity: string
  vehicleType: string
  pickupTime: string
  notes: string
  specialHandling: boolean
}

const initialBooking: BookingData = {
  pickupLocation: '',
  pickupAddress: '',
  dropLocation: '',
  dropAddress: '',
  capacity: 'standard',
  vehicleType: 'auto',
  pickupTime: 'now',
  notes: '',
  specialHandling: false
}

const vehicles = [
  { id: 'auto', name: 'Auto', capacity: 'Up to 100kg', icon: '🚗', rate: '₹199' },
  { id: 'bike', name: 'Bike', capacity: 'Up to 25kg', icon: '🏍️', rate: '₹99' },
  { id: 'van', name: 'Van', capacity: 'Up to 500kg', icon: '🚐', rate: '₹299' },
  { id: 'truck', name: 'Truck', capacity: 'Up to 1000kg', icon: '🚚', rate: '₹499' }
]

export default function BookingPage() {
  const [step, setStep] = useState<BookingStep>('location')
  const [booking, setBooking] = useState<BookingData>(initialBooking)
  const [showSuccess, setShowSuccess] = useState(false)
  const [estimatedFare, setEstimatedFare] = useState(299)

  const handleInputChange = (field: keyof BookingData, value: any) => {
    setBooking(prev => ({ ...prev, [field]: value }))
  }

  const calculateFare = () => {
    const baseRates: Record<string, number> = {
      auto: 199,
      bike: 99,
      van: 299,
      truck: 499
    }
    const surge = 1.1
    const fare = baseRates[booking.vehicleType] * surge
    setEstimatedFare(Math.round(fare))
  }

  const handleNext = () => {
    const steps: BookingStep[] = ['location', 'capacity', 'schedule', 'review', 'payment']
    const currentIndex = steps.indexOf(step)
    if (currentIndex < steps.length - 1) {
      if (step === 'capacity') {
        calculateFare()
      }
      setStep(steps[currentIndex + 1])
    }
  }

  const handlePrevious = () => {
    const steps: BookingStep[] = ['location', 'capacity', 'schedule', 'review', 'payment']
    const currentIndex = steps.indexOf(step)
    if (currentIndex > 0) {
      setStep(steps[currentIndex - 1])
    }
  }

  const handleConfirm = () => {
    setShowSuccess(true)
    setTimeout(() => {
      setShowSuccess(false)
      setStep('location')
      setBooking(initialBooking)
    }, 3000)
  }

  return (
    <AnimatedPage>
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          initial="initial"
          animate="animate"
          variants={slideUpVariants}
          className="bg-gradient-to-r from-primary to-primary/80 text-white p-8 rounded-xl"
        >
          <h1 className="text-3xl font-bold mb-2">Book a Delivery</h1>
          <p className="text-primary-foreground/90">Fast, reliable logistics for your business</p>
        </motion.div>

        {/* Progress Indicator */}
        <motion.div
          initial="initial"
          animate="animate"
          variants={slideUpVariants}
          className="flex justify-between mb-8"
        >
          {['location', 'capacity', 'schedule', 'review', 'payment'].map((s, idx) => (
            <div key={s} className="flex items-center flex-1">
              <motion.div
                animate={{ scale: step === s ? 1.1 : 1 }}
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-colors ${
                  ['location', 'capacity', 'schedule', 'review', 'payment'].indexOf(step) >= idx
                    ? 'bg-primary text-white'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                {idx + 1}
              </motion.div>
              {idx < 4 && (
                <div
                  className={`flex-1 h-1 mx-2 transition-colors ${
                    ['location', 'capacity', 'schedule', 'review', 'payment'].indexOf(step) > idx
                      ? 'bg-primary'
                      : 'bg-muted'
                  }`}
                />
              )}
            </div>
          ))}
        </motion.div>

        {/* Location Step */}
        {step === 'location' && (
          <AnimatedCard hoverLift>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  Pickup & Delivery Locations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <label className="text-sm font-medium">Pickup Location</label>
                  <Input
                    placeholder="Enter warehouse/office name"
                    value={booking.pickupLocation}
                    onChange={(e) => handleInputChange('pickupLocation', e.target.value)}
                  />
                  <Input
                    placeholder="Full address with pincode"
                    value={booking.pickupAddress}
                    onChange={(e) => handleInputChange('pickupAddress', e.target.value)}
                  />
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-medium">Delivery Location</label>
                  <Input
                    placeholder="Enter destination"
                    value={booking.dropLocation}
                    onChange={(e) => handleInputChange('dropLocation', e.target.value)}
                  />
                  <Input
                    placeholder="Full address with pincode"
                    value={booking.dropAddress}
                    onChange={(e) => handleInputChange('dropAddress', e.target.value)}
                  />
                </div>

                <div className="flex justify-between pt-4">
                  <Button variant="outline" asChild>
                    <Link href="/customer">Cancel</Link>
                  </Button>
                  <Button
                    onClick={handleNext}
                    disabled={!booking.pickupLocation || !booking.dropLocation}
                  >
                    Continue
                  </Button>
                </div>
              </CardContent>
            </Card>
          </AnimatedCard>
        )}

        {/* Capacity & Vehicle Step */}
        {step === 'capacity' && (
          <AnimatedCard hoverLift>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="h-5 w-5 text-primary" />
                  Choose Vehicle Type
                </CardTitle>
                <CardDescription>Select based on your cargo requirements</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {vehicles.map((vehicle) => (
                    <motion.div
                      key={vehicle.id}
                      whileHover={{ scale: 1.02 }}
                      onClick={() => handleInputChange('vehicleType', vehicle.id)}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        booking.vehicleType === vehicle.id
                          ? 'border-primary bg-primary/5'
                          : 'border-muted hover:border-primary/50'
                      }`}
                    >
                      <div className="text-3xl mb-2">{vehicle.icon}</div>
                      <h3 className="font-bold">{vehicle.name}</h3>
                      <p className="text-sm text-muted-foreground">{vehicle.capacity}</p>
                      <p className="text-lg font-bold text-primary mt-2">{vehicle.rate}</p>
                    </motion.div>
                  ))}
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-medium">Special Handling Required?</label>
                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={booking.specialHandling}
                        onChange={(e) => handleInputChange('specialHandling', e.target.checked)}
                        className="w-4 h-4"
                      />
                      <span className="text-sm">Fragile items, temperature control, etc.</span>
                    </label>
                  </div>
                </div>

                <div className="flex justify-between pt-4">
                  <Button variant="outline" onClick={handlePrevious}>
                    Back
                  </Button>
                  <Button onClick={handleNext}>Continue</Button>
                </div>
              </CardContent>
            </Card>
          </AnimatedCard>
        )}

        {/* Schedule Step */}
        {step === 'schedule' && (
          <AnimatedCard hoverLift>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  Pickup Timing
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <label className="text-sm font-medium">When do you need the pickup?</label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {['now', 'in-2-hours', 'in-4-hours'].map((time) => (
                      <motion.button
                        key={time}
                        whileHover={{ scale: 1.02 }}
                        onClick={() => handleInputChange('pickupTime', time)}
                        className={`p-3 border-2 rounded-lg transition-all ${
                          booking.pickupTime === time
                            ? 'border-primary bg-primary/5'
                            : 'border-muted hover:border-primary/50'
                        }`}
                      >
                        <p className="font-bold">
                          {time === 'now' ? 'Now' : time === 'in-2-hours' ? 'In 2 Hours' : 'In 4 Hours'}
                        </p>
                      </motion.button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-medium">Additional Notes</label>
                  <textarea
                    placeholder="Any special instructions for the driver"
                    value={booking.notes}
                    onChange={(e) => handleInputChange('notes', e.target.value)}
                    className="w-full p-3 border rounded-lg focus:outline-none focus:border-primary"
                    rows={4}
                  />
                </div>

                <div className="flex justify-between pt-4">
                  <Button variant="outline" onClick={handlePrevious}>
                    Back
                  </Button>
                  <Button onClick={handleNext}>Continue</Button>
                </div>
              </CardContent>
            </Card>
          </AnimatedCard>
        )}

        {/* Review Step */}
        {step === 'review' && (
          <AnimatedCard hoverLift>
            <Card>
              <CardHeader>
                <CardTitle>Review Your Booking</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">Pickup</p>
                    <p className="font-bold">{booking.pickupLocation}</p>
                    <p className="text-sm">{booking.pickupAddress}</p>
                  </div>

                  <div className="bg-muted/50 p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">Delivery</p>
                    <p className="font-bold">{booking.dropLocation}</p>
                    <p className="text-sm">{booking.dropAddress}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <p className="text-sm text-muted-foreground mb-1">Vehicle</p>
                      <p className="font-bold">{vehicles.find(v => v.id === booking.vehicleType)?.name}</p>
                    </div>
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <p className="text-sm text-muted-foreground mb-1">Pickup Time</p>
                      <p className="font-bold">{booking.pickupTime === 'now' ? 'ASAP' : booking.pickupTime}</p>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between mb-2">
                    <span>Base Fare</span>
                    <span>₹{Math.round(estimatedFare / 1.1)}</span>
                  </div>
                  <div className="flex justify-between mb-3 pb-3 border-b text-sm text-muted-foreground">
                    <span>Surge Pricing (10%)</span>
                    <span>₹{Math.round(estimatedFare * 0.1)}</span>
                  </div>
                  <div className="flex justify-between text-xl font-bold text-primary">
                    <span>Total Fare</span>
                    <span>₹{estimatedFare}</span>
                  </div>
                </div>

                <div className="flex justify-between pt-4">
                  <Button variant="outline" onClick={handlePrevious}>
                    Back
                  </Button>
                  <Button onClick={handleNext}>Proceed to Payment</Button>
                </div>
              </CardContent>
            </Card>
          </AnimatedCard>
        )}

        {/* Payment Step */}
        {step === 'payment' && (
          <AnimatedCard hoverLift>
            <Card>
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  {[
                    { id: 'wallet', name: 'Company Wallet', balance: 45000 },
                    { id: 'credit', name: 'Credit Card', balance: null },
                    { id: 'bank', name: 'Bank Transfer', balance: null }
                  ].map((method) => (
                    <div
                      key={method.id}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all`}
                    >
                      <div className="flex items-center gap-3">
                        <input type="radio" name="payment" defaultChecked={method.id === 'wallet'} />
                        <div className="flex-1">
                          <p className="font-bold">{method.name}</p>
                          {method.balance && (
                            <p className="text-sm text-muted-foreground">Balance: ₹{method.balance.toLocaleString()}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex gap-3">
                  <AlertCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-blue-700">
                    Your company wallet will be debited ₹{estimatedFare}. GST invoice will be generated after completion.
                  </p>
                </div>

                <div className="flex justify-between pt-4">
                  <Button variant="outline" onClick={handlePrevious}>
                    Back
                  </Button>
                  <Button onClick={handleConfirm} className="gap-2">
                    Confirm & Book
                  </Button>
                </div>
              </CardContent>
            </Card>
          </AnimatedCard>
        )}
      </div>

      {/* Success Modal */}
      <SuccessModal
        isOpen={showSuccess}
        title="Booking Confirmed!"
        message="Your delivery has been booked successfully. Driver will arrive soon."
        actionLabel="View Tracking"
        onAction={() => {
          window.location.href = '/customer/tracking'
        }}
      />
    </AnimatedPage>
  )
}
