'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { successVariants, fadeInVariants } from '@/lib/animations'
import { CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ReactNode } from 'react'

interface SuccessModalProps {
  isOpen: boolean
  title: string
  message?: string
  actionLabel?: string
  onAction?: () => void
  children?: ReactNode
  autoClose?: boolean
  autoCloseDuration?: number
}

export function SuccessModal({
  isOpen,
  title,
  message,
  actionLabel = 'Continue',
  onAction,
  children,
  autoClose = true,
  autoCloseDuration = 2000
}: SuccessModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
        >
          <motion.div
            initial="initial"
            animate="animate"
            exit="initial"
            variants={fadeInVariants}
            className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full mx-4"
          >
            <div className="flex flex-col items-center text-center">
              <motion.div
                variants={successVariants}
                initial="initial"
                animate="animate"
              >
                <CheckCircle className="w-16 h-16 text-green-500" />
              </motion.div>

              <h2 className="mt-6 text-2xl font-bold text-foreground">{title}</h2>

              {message && (
                <p className="mt-2 text-muted-foreground">{message}</p>
              )}

              {children && (
                <div className="mt-4 w-full">
                  {children}
                </div>
              )}

              {onAction && (
                <Button
                  onClick={onAction}
                  className="mt-6 w-full"
                >
                  {actionLabel}
                </Button>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
