'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'

export interface Notification {
  id: string
  type: 'info' | 'success' | 'error' | 'warning'
  title: string
  message: string
  timestamp: Date
}

export interface NotificationContextType {
  notifications: Notification[]
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp'>) => void
  removeNotification: (id: string) => void
  clearNotifications: () => void
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([])

  const addNotification = (notification: Omit<Notification, 'id' | 'timestamp'>) => {
    const id = `notif-${Date.now()}`
    const newNotification: Notification = {
      ...notification,
      id,
      timestamp: new Date()
    }

    setNotifications(prev => [newNotification, ...prev])

    // Auto-remove after 5 seconds for non-error notifications
    if (notification.type !== 'error') {
      setTimeout(() => removeNotification(id), 5000)
    }
  }

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }

  const clearNotifications = () => {
    setNotifications([])
  }

  return (
    <NotificationContext.Provider value={{ notifications, addNotification, removeNotification, clearNotifications }}>
      {children}
    </NotificationContext.Provider>
  )
}

export function useNotification() {
  const context = useContext(NotificationContext)
  if (context === undefined) {
    throw new Error('useNotification must be used within NotificationProvider')
  }
  return context
}
