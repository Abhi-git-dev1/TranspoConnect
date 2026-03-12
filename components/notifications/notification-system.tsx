'use client'

import { useNotification } from '@/lib/notification-context'

export function NotificationSystem() {
  const { notifications, removeNotification } = useNotification()

  const getColorClasses = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-green-500 text-white'
      case 'error':
        return 'bg-red-500 text-white'
      case 'warning':
        return 'bg-yellow-500 text-white'
      case 'info':
      default:
        return 'bg-blue-500 text-white'
    }
  }

  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return '✓'
      case 'error':
        return '✕'
      case 'warning':
        return '⚠'
      case 'info':
      default:
        return 'ℹ'
    }
  }

  return (
    <div className="fixed top-4 right-4 space-y-2 z-50 max-w-sm">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`${getColorClasses(notification.type)} p-4 rounded-lg shadow-lg flex justify-between items-start animate-in fade-in slide-in-from-top-2 duration-300`}
        >
          <div className="flex items-start gap-3">
            <span className="text-xl font-bold mt-0.5">{getIcon(notification.type)}</span>
            <div>
              <p className="font-bold">{notification.title}</p>
              <p className="text-sm opacity-90">{notification.message}</p>
            </div>
          </div>
          <button
            onClick={() => removeNotification(notification.id)}
            className="ml-4 opacity-70 hover:opacity-100 text-xl"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  )
}
