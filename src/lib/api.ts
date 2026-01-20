/**
 * API utilities for lead form submission
 * Handles communication with Google Apps Script Web App
 */

import type { LeadFormData } from './validation'

/**
 * Response type from the Apps Script endpoint
 */
interface ApiResponse {
  success: boolean
  message?: string
  error?: string
}

/**
 * Payload structure sent to the Apps Script
 */
interface LeadPayload extends LeadFormData {
  /** ISO timestamp of form submission */
  timestamp: string
}

/**
 * Submits lead form data to Google Apps Script Web App
 *
 * IMPORTANT: Uses Content-Type: text/plain to avoid CORS preflight requests
 * Google Apps Script Web Apps do not handle OPTIONS requests properly
 *
 * @param data - Validated form data from Zod schema
 * @returns Promise with success/error response
 */
export async function submitLead(data: LeadFormData): Promise<ApiResponse> {
  const url = import.meta.env.VITE_GAS_WEBAPP_URL

  // Check if the Apps Script URL is configured
  if (!url) {
    console.error('VITE_GAS_WEBAPP_URL environment variable is not configured')
    return {
      success: false,
      error: 'שגיאת תצורה - אנא פנה לתמיכה',
    }
  }

  // Prepare payload with timestamp
  const payload: LeadPayload = {
    ...data,
    timestamp: new Date().toISOString(),
  }

  try {
    const response = await fetch(url, {
      method: 'POST',
      // CRITICAL: Use text/plain to avoid CORS preflight requests
      // Google Apps Script cannot handle OPTIONS requests
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify(payload),
    })

    // Google Apps Script may redirect on success
    // A successful submission typically returns 200 or redirects (302)
    if (response.ok || response.redirected) {
      // Try to parse JSON response if available
      try {
        const text = await response.text()
        if (text) {
          const result = JSON.parse(text)
          if (result.success === false) {
            return {
              success: false,
              error: result.error || 'אירעה שגיאה בשליחת הטופס',
            }
          }
        }
      } catch {
        // If we can't parse the response but got a 200/redirect, assume success
      }

      return {
        success: true,
        message: 'הפרטים נשלחו בהצלחה! נחזור אליך בהקדם.',
      }
    }

    // Handle error response
    const text = await response.text()
    try {
      const result = JSON.parse(text)
      return {
        success: false,
        error: result.error || 'אירעה שגיאה בשליחת הטופס',
      }
    } catch {
      return {
        success: false,
        error: text || 'אירעה שגיאה לא צפויה',
      }
    }
  } catch (error) {
    // Network or other errors
    console.error('Lead submission error:', error)
    return {
      success: false,
      error: error instanceof Error
        ? 'אירעה שגיאת רשת. אנא בדוק את החיבור לאינטרנט ונסה שוב.'
        : 'אירעה שגיאה לא צפויה',
    }
  }
}
