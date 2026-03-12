'use client'

import { motion } from 'framer-motion'
import { statusChipVariants, pulseVariants } from '@/lib/animations'
import { Circle } from 'lucide-react'

type Status = 'searching' | 'assigned' | 'arriving' | 'completed' | 'cancelled' | 'pending'

interface StatusBadgeProps {
  status: Status
  label?: string
  animate?: boolean
}

const statusConfig: Record<Status, { color: string; bgColor: string; textColor: string }> = {
  searching: { color: '#FFA500', bgColor: 'bg-yellow-50', textColor: 'text-yellow-700' },
  assigned: { color: '#3B82F6', bgColor: 'bg-blue-50', textColor: 'text-blue-700' },
  arriving: { color: '#10B981', bgColor: 'bg-green-50', textColor: 'text-green-700' },
  completed: { color: '#059669', bgColor: 'bg-emerald-50', textColor: 'text-emerald-700' },
  cancelled: { color: '#EF4444', bgColor: 'bg-red-50', textColor: 'text-red-700' },
  pending: { color: '#8B5CF6', bgColor: 'bg-purple-50', textColor: 'text-purple-700' }
}

export function StatusBadge({ status, label, animate = true }: StatusBadgeProps) {
  const config = statusConfig[status]
  const displayLabel = label || status.charAt(0).toUpperCase() + status.slice(1)

  return (
    <motion.div
      variants={statusChipVariants}
      initial="initial"
      animate="animate"
      className={`${config.bgColor} ${config.textColor} px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2 w-fit`}
    >
      {animate && (
        <motion.div
          variants={pulseVariants}
          animate="animate"
        >
          <Circle size={8} fill={config.color} stroke="none" />
        </motion.div>
      )}
      {!animate && (
        <Circle size={8} fill={config.color} stroke="none" />
      )}
      {displayLabel}
    </motion.div>
  )
}
