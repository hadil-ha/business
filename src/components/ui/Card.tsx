import { type HTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/cn'

/**
 * Card container component
 * Off-white cards with subtle navy border
 */
const Card = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        // Base styles with medium rounded corners and shadow
        'rounded-xl border border-brand-gray/30',
        'bg-brand-white shadow-sm',
        'transition-shadow duration-200',
        className
      )}
      {...props}
    />
  )
)
Card.displayName = 'Card'

/**
 * Card header section
 */
const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex flex-col gap-1.5 p-6', className)}
      {...props}
    />
  )
)
CardHeader.displayName = 'CardHeader'

/**
 * Card title - typically an h3
 */
const CardTitle = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn(
        'text-xl font-semibold leading-tight',
        'text-brand-navy',
        className
      )}
      {...props}
    />
  )
)
CardTitle.displayName = 'CardTitle'

/**
 * Card description text
 */
const CardDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn('text-base text-brand-black/70', className)}
      {...props}
    />
  )
)
CardDescription.displayName = 'CardDescription'

/**
 * Card content/body section
 */
const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
  )
)
CardContent.displayName = 'CardContent'

/**
 * Card footer section
 */
const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex items-center p-6 pt-0', className)}
      {...props}
    />
  )
)
CardFooter.displayName = 'CardFooter'

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter }
