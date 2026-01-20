import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { HiCheckCircle, HiExclamationCircle } from 'react-icons/hi'
import { leadFormSchema, type LeadFormInput } from '@/lib/validation'
import { submitLead } from '@/lib/api'
import { Button } from './ui/Button'
import { Input } from './ui/Input'
import { Textarea } from './ui/Textarea'

/**
 * Form status states
 */
type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

/**
 * Lead capture form component
 * Uses React Hook Form with Zod validation
 * Submits to Google Apps Script endpoint
 */
export function LeadForm() {
  const [status, setStatus] = useState<FormStatus>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LeadFormInput>({
    resolver: zodResolver(leadFormSchema),
    defaultValues: {
      fullName: '',
      phone: '',
      email: '',
      message: '',
    },
  })

  /**
   * Handle form submission
   * Validates with Zod, then submits to Apps Script
   */
  const onSubmit = async (data: LeadFormInput) => {
    setStatus('submitting')
    setErrorMessage('')

    try {
      // Zod has already validated and transformed the phone number
      const result = await submitLead(data)

      if (result.success) {
        setStatus('success')
        reset()
      } else {
        setStatus('error')
        setErrorMessage(result.error || 'אירעה שגיאה בשליחת הטופס')
      }
    } catch (error) {
      setStatus('error')
      setErrorMessage('אירעה שגיאה בשליחת הטופס. אנא נסו שוב.')
      console.error('Form submission error:', error)
    }
  }

  // Success state - show confirmation message
  if (status === 'success') {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
          <HiCheckCircle className="w-10 h-10 text-green-600" />
        </div>
        <h3 className="text-xl font-semibold text-brand-navy mb-2">
          הטופס נשלח בהצלחה!
        </h3>
        <p className="text-brand-black/70 mb-6">
          תודה על פנייתך. אחזור אליך בהקדם האפשרי.
        </p>
        <Button
          type="button"
          variant="outline"
          onClick={() => setStatus('idle')}
        >
          שלח טופס נוסף
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      {/* Full Name Field */}
      <div>
        <label
          htmlFor="fullName"
          className="block text-sm font-medium text-brand-black mb-1.5"
        >
          שם מלא <span className="text-red-500">*</span>
        </label>
        <Input
          id="fullName"
          {...register('fullName')}
          placeholder="הזן את שמך המלא"
          hasError={!!errors.fullName}
          aria-invalid={!!errors.fullName}
          aria-describedby={errors.fullName ? 'fullName-error' : undefined}
        />
        {errors.fullName && (
          <p
            id="fullName-error"
            className="text-red-500 text-sm mt-1 flex items-center gap-1"
          >
            <HiExclamationCircle className="w-4 h-4" />
            {errors.fullName.message}
          </p>
        )}
      </div>

      {/* Phone Field */}
      <div>
        <label
          htmlFor="phone"
          className="block text-sm font-medium text-brand-black mb-1.5"
        >
          טלפון נייד <span className="text-red-500">*</span>
        </label>
        <Input
          id="phone"
          type="tel"
          {...register('phone')}
          placeholder="054-123-4567"
          hasError={!!errors.phone}
          aria-invalid={!!errors.phone}
          aria-describedby={errors.phone ? 'phone-error' : undefined}
          dir="ltr"
          className="text-end"
        />
        {errors.phone && (
          <p
            id="phone-error"
            className="text-red-500 text-sm mt-1 flex items-center gap-1"
          >
            <HiExclamationCircle className="w-4 h-4" />
            {errors.phone.message}
          </p>
        )}
      </div>

      {/* Email Field */}
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-brand-black mb-1.5"
        >
          אימייל <span className="text-red-500">*</span>
        </label>
        <Input
          id="email"
          type="email"
          {...register('email')}
          placeholder="your@email.com"
          hasError={!!errors.email}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'email-error' : undefined}
          dir="ltr"
          className="text-end"
        />
        {errors.email && (
          <p
            id="email-error"
            className="text-red-500 text-sm mt-1 flex items-center gap-1"
          >
            <HiExclamationCircle className="w-4 h-4" />
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Message Field (Optional) */}
      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-brand-black mb-1.5"
        >
          הודעה <span className="text-brand-gray">(אופציונלי)</span>
        </label>
        <Textarea
          id="message"
          {...register('message')}
          placeholder="ספר/י לי במה אוכל לעזור..."
          rows={4}
          hasError={!!errors.message}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? 'message-error' : undefined}
        />
        {errors.message && (
          <p
            id="message-error"
            className="text-red-500 text-sm mt-1 flex items-center gap-1"
          >
            <HiExclamationCircle className="w-4 h-4" />
            {errors.message.message}
          </p>
        )}
      </div>

      {/* Error Message */}
      {status === 'error' && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 text-sm flex items-center gap-2">
            <HiExclamationCircle className="w-5 h-5 flex-shrink-0" />
            {errorMessage}
          </p>
        </div>
      )}

      {/* Submit Button */}
      <Button
        type="submit"
        fullWidth
        disabled={isSubmitting}
        className="mt-6"
      >
        {isSubmitting ? 'שולח...' : 'שלח פרטים'}
      </Button>

      {/* Privacy Note */}
      <p className="text-xs text-brand-gray text-center">
        הפרטים שלך ישמרו בסודיות ולא יועברו לצד שלישי
      </p>
    </form>
  )
}
