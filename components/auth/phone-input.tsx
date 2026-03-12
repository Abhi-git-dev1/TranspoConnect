'use client'

import { Input } from '@/components/ui/input'

interface PhoneInputProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function PhoneInput({ value, onChange, placeholder = 'Enter phone number' }: PhoneInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '')
    if (val.length <= 10) {
      onChange(val)
    }
  }

  const formatPhoneDisplay = () => {
    if (!value) return ''
    if (value.length <= 3) return value
    if (value.length <= 6) return `${value.slice(0, 3)}-${value.slice(3)}`
    return `${value.slice(0, 3)}-${value.slice(3, 6)}-${value.slice(6)}`
  }

  return (
    <div className="relative">
      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-xl">🇮🇳</div>
      <Input
        type="tel"
        value={formatPhoneDisplay()}
        onChange={handleChange}
        placeholder="+91 (XXX) XXX-XXXX"
        maxLength={12}
        className="pl-12 py-6 text-lg border-2 border-gray-300 focus:border-red-600"
      />
    </div>
  )
}
