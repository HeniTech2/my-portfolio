import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'

interface SectionProps {
  id?: string
  children: ReactNode
  className?: string
}

interface RevealProps {
  children: ReactNode
  delay?: number
  className?: string
}

// One shared width + padding for every section.
// Wide on big screens (up to 1800px), small side padding, so there is little empty space left and right.
export const CONTAINER_CLASS = 'mx-auto w-full max-w-[1800px] px-4 sm:px-6 lg:px-10 xl:px-16'

// Fast, light reveal: starts a little before the section enters the screen
const VIEWPORT = { once: true, amount: 0.1, margin: '0px 0px -40px 0px' } as const
const EASE = [0.22, 1, 0.36, 1] as const

// Whole-section reveal. Use this as the wrapper of every section.
const Section = ({ id, children, className = '' }: SectionProps) => {
  const reduce = useReducedMotion()

  return (
    <section
      id={id}
      className={`py-16 md:py-24 ${className}`}
      style={{ scrollMarginTop: '6rem' }}
    >
      <div className={CONTAINER_CLASS}>
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.4, ease: EASE }}
        >
          {children}
        </motion.div>
      </div>
    </section>
  )
}

// Small reveal for cards/items inside a section (delay is capped so it never feels slow)
export const Reveal = ({ children, delay = 0, className = '' }: RevealProps) => {
  const reduce = useReducedMotion()

  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.35, delay: Math.min(delay, 0.2), ease: EASE }}
    >
      {children}
    </motion.div>
  )
}

export default Section