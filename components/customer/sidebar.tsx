'use client'

import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/lib/auth-context'

export function CustomerSidebar() {
  const router = useRouter()
  const pathname = usePathname()
  const { logout } = useAuth()

  const links = [
    { href: '/customer', label: 'Dashboard', icon: '🏠' },
    { href: '/customer/book', label: 'Book Ride', icon: '🚗' },
    { href: '/customer/bookings', label: 'My Bookings', icon: '📋' },
    { href: '/customer/tracking', label: 'Track Shipment', icon: '📍' },
    { href: '/customer/wallet', label: 'Wallet', icon: '💰' },
    { href: '/customer/profile', label: 'Profile', icon: '👤' }
  ]

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  return (
    <aside className="w-64 bg-gray-900 text-white min-h-screen flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-800">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">TC</span>
          </div>
          <span className="font-bold text-lg">TranspoConnect</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {links.map((link) => {
          const isActive = pathname === link.href
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-red-600 text-white'
                  : 'text-gray-300 hover:bg-gray-800'
              }`}
            >
              <span className="text-xl">{link.icon}</span>
              <span className="font-medium">{link.label}</span>
            </Link>
          )
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-800">
        <Button
          onClick={handleLogout}
          className="w-full bg-red-600 hover:bg-red-700 text-white"
        >
          Logout
        </Button>
      </div>
    </aside>
  )
}
