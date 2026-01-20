import { forwardRef, type TextareaHTMLAttributes } from 'react'
import { cn } from '@/lib/cn'

/**
 * Textarea component props
 */
export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Show error state styling */
  hasError?: boolean
}

/**
 * Reusable Textarea component
 * Styled to match Input component with gold focus ring
 */
const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, hasError, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          // Base styles
          'flex min-h-[120px] w-full rounded-lg',
          'border border-brand-gray/50 bg-white',
          'px-4 py-3 text-base text-brand-black',
          'placeholder:text-brand-gray',
          'transition-colors duration-200',
          'resize-y',

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

Textarea.displayName = 'Textarea'

export { Textarea }
