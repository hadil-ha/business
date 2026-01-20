import { z } from 'zod'
import { normalizeIsraeliPhone, isValidIsraeliMobile } from './phone'

/**
 * Zod validation schema for the lead capture form
 * All error messages are in Hebrew for the target audience
 */
export const leadFormSchema = z.object({
  // Full name - required, minimum 2 characters
  fullName: z
    .string()
    .min(1, { message: 'שם מלא הוא שדה חובה' })
    .min(2, { message: 'שם חייב להכיל לפחות 2 תווים' })
    .max(100, { message: 'שם ארוך מדי' }),

  // Phone - required, must be valid Israeli mobile
  // Uses custom validation and transforms to normalized format
  phone: z
    .string()
    .min(1, { message: 'טלפון הוא שדה חובה' })
    .refine(
      (val) => isValidIsraeliMobile(val),
      { message: 'מספר טלפון לא תקין. יש להזין מספר נייד ישראלי (לדוגמה: 054-123-4567)' }
    )
    // Transform to normalized format (0547565895) before submission
    .transform(normalizeIsraeliPhone),

  // Email - required, standard email validation
  email: z
    .string()
    .min(1, { message: 'אימייל הוא שדה חובה' })
    .email({ message: 'כתובת אימייל לא תקינה' }),

  // Message - optional free text
  message: z
    .string()
    .max(1000, { message: 'ההודעה ארוכה מדי (מקסימום 1000 תווים)' })
    .optional()
    .or(z.literal('')),
})

/**
 * TypeScript type inferred from the Zod schema
 * Use this for form data typing
 */
export type LeadFormData = z.infer<typeof leadFormSchema>

/**
 * Raw form input type (before Zod transformations)
 * Phone is still a string, not transformed
 */
export type LeadFormInput = z.input<typeof leadFormSchema>
