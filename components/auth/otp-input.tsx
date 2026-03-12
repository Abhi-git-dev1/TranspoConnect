'use client'

import { useEffect, useRef, useState } from 'react'

interface OTPInputProps {
  value: string
  onChange: (value: string) => void
  length?: number
}

export function OTPInput({ value, onChange, length = 6 }: OTPInputProps) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])
  const [otp, setOtp] = useState<string[]>(value.split('').slice(0, length).concat(Array(length).fill('')).slice(0, length))

  useEffect(() => {
    inputRefs.current[0]?.focus()
  }, [])

  const handleChange = (index: number, val: string) => {
    if (!/^\d*$/.test(val)) return

    const newOtp = [...otp]
    newOtp[index] = val.slice(-1)
    setOtp(newOtp)
    onChange(newOtp.join(''))

    if (val && index < length - 1) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      if (!otp[index] && index > 0) {
        inputRefs.current[index - 1]?.focus()
      }
    }
  }

  return (
    <div className="flex gap-3 justify-center">
      {otp.map((digit, index) => (
        <input
          key={index}
          ref={(el) => {
            inputRefs.current[index] = el
          }}
          type="text"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          className="w-12 h-14 text-center text-2xl font-bold border-2 border-gray-300 rounded-lg focus:outline-none focus:border-red-600 transition-colors"
        />
      ))}
    </div>
  )
}
