'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export type UserType = 'company' | 'driver' | null
export type VerificationStatus = 'pending' | 'approved' | 'rejected'
export type UserRole = 'admin' | 'manager' | 'user'

export interface Company {
  id: string
  name: string
  gstNumber: string
  registeredAddress: string
  billingAddress: string
  city: string
  zone: string
  monthlySpend: number
  verifiedAt?: string
}

export interface User {
  id: string
  phone: string
  email: string
  name: string
  userType: UserType
  role?: UserRole
  companyId?: string
  company?: Company
  verified: boolean
  createdAt: string
  profile?: {
    address?: string
    vehicleType?: string
    licenseNumber?: string
    verificationStatus?: VerificationStatus
  }
}

export interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (phone: string, password: string) => Promise<void>
  signup: (phone: string, email: string, password: string, userType: 'customer' | 'driver') => Promise<void>
  logout: () => void
  verifyOTP: (phone: string, otp: string) => Promise<void>
  sendOTP: (phone: string) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Check if user is logged in on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        console.error('Failed to parse stored user:', error)
        localStorage.removeItem('user')
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (phone: string, password: string, userType: 'company' | 'driver' = 'company') => {
    // Mock login - in production, this would call an API
    const company: Company = {
      id: `company_${Date.now()}`,
      name: 'Acme Logistics',
      gstNumber: '18AABCT1234A1Z0',
      registeredAddress: '123 Business Park, Delhi',
      billingAddress: '123 Business Park, Delhi',
      city: 'Delhi',
      zone: 'North',
      monthlySpend: 15000,
      verifiedAt: new Date().toISOString()
    }

    const mockUser: User = {
      id: `user_${Date.now()}`,
      phone,
      email: `${phone}@transpoconnect.com`,
      name: userType === 'company' ? 'Admin User' : 'Driver User',
      userType,
      role: userType === 'company' ? 'admin' : undefined,
      companyId: userType === 'company' ? company.id : undefined,
      company: userType === 'company' ? company : undefined,
      verified: true,
      createdAt: new Date().toISOString()
    }
    
    setUser(mockUser)
    localStorage.setItem('user', JSON.stringify(mockUser))
  }

  const signup = async (phone: string, email: string, password: string, userType: 'company' | 'driver', companyData?: Partial<Company>) => {
    // Mock signup
    const company: Company | undefined = userType === 'company' ? {
      id: `company_${Date.now()}`,
      name: companyData?.name || 'My Company',
      gstNumber: companyData?.gstNumber || '',
      registeredAddress: companyData?.registeredAddress || '',
      billingAddress: companyData?.billingAddress || '',
      city: companyData?.city || 'Delhi',
      zone: companyData?.zone || 'North',
      monthlySpend: 0
    } : undefined

    const mockUser: User = {
      id: `user_${Date.now()}`,
      phone,
      email,
      name: companyData?.name || email.split('@')[0],
      userType,
      role: userType === 'company' ? 'admin' : undefined,
      companyId: company?.id,
      company,
      verified: false,
      createdAt: new Date().toISOString(),
      profile: userType === 'driver' ? {
        verificationStatus: 'pending'
      } : undefined
    }
    
    setUser(mockUser)
    localStorage.setItem('user', JSON.stringify(mockUser))
  }

  const sendOTP = async (phone: string) => {
    // Mock OTP sending
    console.log(`OTP sent to ${phone}`)
    // In production, this would call an API to send OTP via SMS
  }

  const verifyOTP = async (phone: string, otp: string) => {
    // Mock OTP verification
    if (otp === '000000') {
      const mockUser: User = {
        id: `user_${Date.now()}`,
        phone,
        userType: null,
        verified: true,
        createdAt: new Date().toISOString()
      }
      setUser(mockUser)
      localStorage.setItem('user', JSON.stringify(mockUser))
    } else {
      throw new Error('Invalid OTP')
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    signup,
    logout,
    verifyOTP,
    sendOTP
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
