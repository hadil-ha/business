import { forwardRef, type InputHTMLAttributes } from 'react'
import { cn } from '@/lib/cn'

/**
 * Input component props
 */
export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  /** Show error state styling */
  hasError?: boolean
}

/**
 * Reusable Input component
 * Handles RTL for phone/email inputs automatically via CSS
 * Gold focus ring accent
 */
const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, hasError, ...props }, ref) => {
    return (
      <input
        type={type}
        ref={ref}
        className={cn(
          // Base styles
          'flex h-11 w-full rounded-lg',
          'border border-brand-gray/50 bg-white',
          'px-4 py-2 text-base text-brand-black',
          'placeholder:text-brand-gray',
          'transition-colors duration-200',

          // Focus styles - gold accent
          'focus-visible:outline-none',
          'focus-visible:ring-2 focus-visible:ring-offset-0',
          'focus-visible:ring-brand-gold',
          'focus-visible:border-brand-gold',

          // Disabled styles
          'disabled:cursor-not-allowed disabled:opacity-50',
          'disabled:bg-brand-gray/10',

          // Error state
          hasError && [
            'border-red-500',
            'focus-visible:ring-red-500 focus-visible:border-red-500',
          ],

          className
        )}
        {...props}
      />
    )
  }
)

Input.displayName = 'Input'

export { Input }
