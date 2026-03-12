import { Variants } from 'framer-motion'

// Page transitions
export const pageVariants: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
}

// Fade in animation
export const fadeInVariants: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.4 } }
}

// Slide up animation
export const slideUpVariants: Variants = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } }
}

// Slide in from left
export const slideInLeftVariants: Variants = {
  initial: { opacity: 0, x: -30 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.4, ease: 'easeOut' } }
}

// Slide in from right
export const slideInRightVariants: Variants = {
  initial: { opacity: 0, x: 30 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.4, ease: 'easeOut' } }
}

// Scale up animation
export const scaleUpVariants: Variants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: 'easeOut' } }
}

// Stagger container
export const containerVariants: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
}

// Card hover animation
export const cardHoverVariants: Variants = {
  initial: { y: 0 },
  hover: { y: -8, transition: { duration: 0.3, ease: 'easeOut' } }
}

// Pulse animation
export const pulseVariants: Variants = {
  animate: {
    scale: [1, 1.05, 1],
    transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' }
  }
}

// Success checkmark
export const successVariants: Variants = {
  initial: { scale: 0, rotate: -180 },
  animate: { scale: 1, rotate: 0, transition: { duration: 0.5, type: 'spring', stiffness: 100 } }
}

// Loading spinner
export const spinnerVariants: Variants = {
  animate: { rotate: 360, transition: { duration: 2, repeat: Infinity, ease: 'linear' } }
}

// Status chip animation
export const statusChipVariants: Variants = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, scale: 0.8 }
}
