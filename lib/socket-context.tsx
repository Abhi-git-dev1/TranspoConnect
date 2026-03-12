'use client'

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react'

export interface SocketContextType {
  isConnected: boolean
  emit: (event: string, data: any) => void
  on: (event: string, callback: (data: any) => void) => void
  off: (event: string, callback?: (data: any) => void) => void
}

const SocketContext = createContext<SocketContextType | undefined>(undefined)

// Mock socket implementation for MVP
class MockSocket {
  private listeners: { [key: string]: ((data: any) => void)[] } = {}
  private isConnected = true

  connect() {
    this.isConnected = true
    console.log('[Socket] Connected to server')
  }

  disconnect() {
    this.isConnected = false
    console.log('[Socket] Disconnected from server')
  }

  emit(event: string, data: any) {
    console.log(`[Socket] Emit ${event}:`, data)
    // Simulate server response for certain events
    setTimeout(() => {
      if (event === 'ride:request') {
        this.simulateRideResponse()
      } else if (event === 'location:update') {
        this.simulateLocationBroadcast()
      }
    }, 500)
  }

  on(event: string, callback: (data: any) => void) {
    if (!this.listeners[event]) {
      this.listeners[event] = []
    }
    this.listeners[event].push(callback)
  }

  off(event: string, callback?: (data: any) => void) {
    if (!this.listeners[event]) return
    if (callback) {
      this.listeners[event] = this.listeners[event].filter(cb => cb !== callback)
    } else {
      this.listeners[event] = []
    }
  }

  private emit_internal(event: string, data: any) {
    if (this.listeners[event]) {
      this.listeners[event].forEach(cb => cb(data))
    }
  }

  private simulateRideResponse() {
    this.emit_internal('ride:accepted', {
      bookingId: 'BOOKING-' + Math.floor(Math.random() * 9000) + 1000,
      driverId: 'DRIVER-' + Math.floor(Math.random() * 9000) + 1000
    })
  }

  private simulateLocationBroadcast() {
    // Simulate location update every second
    const coords = {
      lat: 28.6139 + Math.random() * 0.01,
      lng: 77.2090 + Math.random() * 0.01,
      timestamp: Date.now()
    }
    this.emit_internal('location:updated', coords)
  }
}

export function SocketProvider({ children }: { children: ReactNode }) {
  const [socket] = useState(() => new MockSocket())
  const [isConnected, setIsConnected] = useState(true)

  useEffect(() => {
    socket.connect()

    // Listen for connection events
    socket.on('connect', () => setIsConnected(true))
    socket.on('disconnect', () => setIsConnected(false))

    return () => {
      socket.disconnect()
    }
  }, [socket])

  const value: SocketContextType = {
    isConnected,
    emit: (event, data) => socket.emit(event, data),
    on: (event, callback) => socket.on(event, callback),
    off: (event, callback) => socket.off(event, callback)
  }

  return (
    <SocketContext.Provider value={value}>
      {children}
    </SocketContext.Provider>
  )
}

export function useSocket() {
  const context = useContext(SocketContext)
  if (context === undefined) {
    throw new Error('useSocket must be used within SocketProvider')
  }
  return context
}
