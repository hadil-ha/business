import { forwardRef, type ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/cn'

/**
 * Button component variants
 * Uses brand colors: navy for primary, gold for accents
 */
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Button style variant */
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  /** Button size */
  size?: 'sm' | 'md' | 'lg'
  /** Full width button */
  fullWidth?: boolean
}

/**
 * Reusable Button component with multiple variants
 * Follows shadcn/ui patterns with RTL support
 */
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cn(
          // Base styles
          'inline-flex items-center justify-center gap-2',
          'font-medium rounded-lg',
          'transition-all duration-200',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
          'disabled:pointer-events-none disabled:opacity-50',

          // Variant styles
          {
            // Primary - navy background with gold hover
            primary: [
              'bg-brand-navy text-brand-white',
              'hover:bg-brand-gold hover:text-brand-black',
              'focus-visible:ring-brand-gold',
            ],
            // Secondary - light background
            secondary: [
              'bg-brand-gray/30 text-brand-black',
              'hover:bg-brand-gray/50',
              'focus-visible:ring-brand-navy',
            ],
            // Outline - bordered button
            outline: [
              'border-2 border-brand-navy bg-transparent',
              'text-brand-navy',
              'hover:bg-brand-navy hover:text-brand-white',
              'focus-visible:ring-brand-navy',
            ],
            // Ghost - minimal button
            ghost: [
              'bg-transparent',
              'text-brand-navy',
              'hover:bg-brand-navy/10',
              'focus-visible:ring-brand-navy',
            ],
          }[variant],

          // Size styles
          {
            sm: 'h-9 px-4 text-sm',
            md: 'h-11 px-6 text-base',
            lg: 'h-13 px-8 text-lg',
          }[size],

          // Full width
          fullWidth && 'w-full',

          className
        )}
        {...props}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'

export { Button }
