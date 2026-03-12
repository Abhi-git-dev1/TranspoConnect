'use client'

import { motion } from 'framer-motion'

interface SkeletonLoaderProps {
  count?: number
  type?: 'text' | 'card' | 'avatar' | 'list'
  className?: string
}

export function SkeletonLoader({ count = 1, type = 'text', className = '' }: SkeletonLoaderProps) {
  const shimmer = {
    initial: { backgroundPosition: '200% center' },
    animate: {
      backgroundPosition: '-200% center',
      transition: { duration: 2, repeat: Infinity, ease: 'linear' }
    }
  }

  const getSkeleton = () => {
    switch (type) {
      case 'card':
        return (
          <motion.div
            key="card-skeleton"
            className={`bg-gradient-to-r from-muted via-background to-muted rounded-lg p-6 ${className}`}
            variants={shimmer}
            initial="initial"
            animate="animate"
            style={{
              backgroundSize: '200% 100%',
            }}
          >
            <div className="space-y-3">
              <div className="h-4 bg-muted/50 rounded w-3/4" />
              <div className="h-4 bg-muted/50 rounded w-full" />
              <div className="h-4 bg-muted/50 rounded w-2/3" />
            </div>
          </motion.div>
        )
      case 'avatar':
        return (
          <motion.div
            key="avatar-skeleton"
            className={`bg-gradient-to-r from-muted via-background to-muted rounded-full w-12 h-12 ${className}`}
            variants={shimmer}
            initial="initial"
            animate="animate"
            style={{
              backgroundSize: '200% 100%',
            }}
          />
        )
      case 'list':
        return (
          <motion.div
            key="list-skeleton"
            className={`bg-gradient-to-r from-muted via-background to-muted rounded p-4 ${className}`}
            variants={shimmer}
            initial="initial"
            animate="animate"
            style={{
              backgroundSize: '200% 100%',
            }}
          >
            <div className="space-y-2">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-3 bg-muted/50 rounded w-full" />
              ))}
            </div>
          </motion.div>
        )
      default:
        return (
          <motion.div
            key="text-skeleton"
            className={`bg-gradient-to-r from-muted via-background to-muted rounded h-4 ${className}`}
            variants={shimmer}
            initial="initial"
            animate="animate"
            style={{
              backgroundSize: '200% 100%',
            }}
          />
        )
    }
  }

  return (
    <div className="space-y-3">
      {[...Array(count)].map((_, i) => (
        <div key={i}>
          {getSkeleton()}
        </div>
      ))}
    </div>
  )
}
