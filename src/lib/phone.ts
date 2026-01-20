/**
 * Israeli phone number validation and normalization utilities
 *
 * Handles various input formats:
 * - International: +972547565895, 972547565895
 * - Local: 0547565895
 * - Formatted: 054-756-5895, 054 756 5895
 */

/**
 * Normalizes an Israeli phone number to the format 05XXXXXXXX
 * Strips all non-digit characters and converts international prefix to local
 *
 * @param phone - The phone number to normalize
 * @returns Normalized phone number (10 digits starting with 0)
 *
 * @example
 * normalizeIsraeliPhone('+972547565895') // '0547565895'
 * normalizeIsraeliPhone('054-756-5895')  // '0547565895'
 */
export function normalizeIsraeliPhone(phone: string): string {
  // Remove all non-digit characters (spaces, hyphens, parentheses, etc.)
  let cleaned = phone.replace(/\D/g, '')

  // Handle +972 or 972 prefix (international format)
  // Convert to local format starting with 0
  if (cleaned.startsWith('972')) {
    cleaned = '0' + cleaned.slice(3)
  }

  return cleaned
}

/**
 * Validates that a phone number is a valid Israeli mobile number
 *
 * Israeli mobile numbers:
 * - Start with 05
 * - Third digit can be 0-9 (covers all carriers: 050, 051, 052, 053, 054, 055, 056, 057, 058, 059)
 * - Total of 10 digits
 *
 * @param phone - The phone number to validate (can be in any format)
 * @returns true if valid Israeli mobile number
 *
 * @example
 * isValidIsraeliMobile('+972547565895') // true
 * isValidIsraeliMobile('0547565895')    // true
 * isValidIsraeliMobile('054-756-5895')  // true
 * isValidIsraeliMobile('123456789')     // false
 */
export function isValidIsraeliMobile(phone: string): boolean {
  const normalized = normalizeIsraeliPhone(phone)

  // Israeli mobile regex: 05X followed by 7 digits (total 10 digits)
  // Valid prefixes: 050, 051, 052, 053, 054, 055, 056, 057, 058, 059
  const mobileRegex = /^05[0-9]\d{7}$/

  return mobileRegex.test(normalized)
}

/**
 * Formats a phone number for display: 054-123-4567
 *
 * @param phone - The phone number to format
 * @returns Formatted phone number or original if invalid
 *
 * @example
 * formatIsraeliPhone('0547565895') // '054-756-5895'
 */
export function formatIsraeliPhone(phone: string): string {
  const normalized = normalizeIsraeliPhone(phone)

  // Only format if it's a valid 10-digit number
  if (normalized.length !== 10) {
    return phone
  }

  // Format as XXX-XXX-XXXX
  return `${normalized.slice(0, 3)}-${normalized.slice(3, 6)}-${normalized.slice(6)}`
}
