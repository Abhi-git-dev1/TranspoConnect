'use client'

import { motion } from 'framer-motion'
import { cardHoverVariants, slideUpVariants } from '@/lib/animations'
import { ReactNode } from 'react'

interface AnimatedCardProps {
  children: ReactNode
  className?: string
  delay?: number
  hoverLift?: boolean
  onClick?: () => void
}

export function AnimatedCard({ 
  children, 
  className = '', 
  delay = 0,
  hoverLift = true,
  onClick
}: AnimatedCardProps) {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={slideUpVariants}
      transition={{ delay }}
      whileHover={hoverLift ? 'hover' : {}}
      variants={hoverLift ? { ...slideUpVariants, hover: cardHoverVariants.hover } : slideUpVariants}
      onClick={onClick}
      className={className}
    >
      {children}
    </motion.div>
  )
}
