import { type ReactNode } from 'react'
import { motion, type Variants } from 'framer-motion'
import { cn } from '@/lib/cn'

/**
 * Animation variants for section entrance
 */
const variants: Record<string, Variants> = {
  fade: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  },
  slideUp: {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  },
  slideRight: {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  },
}

/**
 * Stagger animation for child elements
 */
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
}

/**
 * Section component props
 */
interface SectionProps {
  /** Section ID for anchor navigation */
  id: string
  /** Section content */
  children: ReactNode
  /** Additional CSS classes */
  className?: string
  /** Animation variant to use */
  variant?: 'fade' | 'slideUp' | 'slideRight'
  /** Background color variant */
  background?: 'default' | 'dark' | 'accent'
}

/**
 * Reusable Section wrapper component
 * Provides consistent padding, animations, and semantic HTML
 *
 * Background variants:
 * - default: Off-white (#f8f6f7)
 * - dark: Near black (#1c1c1b)
 * - accent: Deep navy (#09213a)
 */
export function Section({
  id,
  children,
  className,
  variant = 'slideUp',
  background = 'default',
}: SectionProps) {
  return (
    <motion.section
      id={id}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={variants[variant]}
      className={cn(
        // Base padding
        'section-padding',

        // Background variants with appropriate text colors
        {
          default: 'bg-brand-white text-brand-black',
          dark: 'bg-brand-black text-brand-white',
          accent: 'bg-brand-navy text-brand-white',
        }[background],

        className
      )}
    >
      <div className="container-padded">{children}</div>
    </motion.section>
  )
}

/**
 * Section title component
 */
interface SectionTitleProps {
  /** Title text */
  children: ReactNode
  /** Optional subtitle */
  subtitle?: string
  /** Center align text */
  centered?: boolean
  /** Use light text (for dark/accent backgrounds) */
  light?: boolean
}

export function SectionTitle({ children, subtitle, centered = true, light = false }: SectionTitleProps) {
  return (
    <div className={cn('mb-12', centered && 'text-center')}>
      <h2 className={cn(
        'text-3xl md:text-4xl font-bold mb-4',
        light ? 'text-brand-white' : 'text-brand-navy'
      )}>
        {children}
      </h2>
      {subtitle && (
        <p className={cn(
          'text-lg max-w-2xl mx-auto',
          light ? 'text-brand-white/80' : 'text-brand-black/70'
        )}>
          {subtitle}
        </p>
      )}
    </div>
  )
}
