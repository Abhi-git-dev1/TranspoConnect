'use client'

import { motion } from 'framer-motion'
import { pageVariants } from '@/lib/animations'
import { ReactNode } from 'react'

interface AnimatedPageProps {
  children: ReactNode
  className?: string
}

export function AnimatedPage({ children, className = '' }: AnimatedPageProps) {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      className={className}
    >
      {children}
    </motion.div>
  )
}
