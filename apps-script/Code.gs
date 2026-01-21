/**
 * Google Apps Script - Lead Form Backend
 *
 * This script receives lead form submissions from the landing page,
 * stores them in a Google Sheet, and sends email notifications.
 *
 * Setup Instructions:
 * 1. Create a new Google Sheet
 * 2. Open Extensions > Apps Script
 * 3. Paste this code
 * 4. Update the configuration constants below
 * 5. Deploy as Web App (see README.md for details)
 */

// ============================================
// CONFIGURATION - UPDATE THESE VALUES
// ============================================

// TODO: Replace with your actual Google Sheet ID
// Find it in the sheet URL: https://docs.google.com/spreadsheets/d/YOUR_SPREADSHEET_ID_HERE/edit
const SPREADSHEET_ID = '1iajcLtCcejs28EpwZOrt8aWqGI2-SpwEkDcThkv1PJ0';

// Sheet name where leads will be stored (will be created if doesn't exist)
const SHEET_NAME = 'Leads';

// TODO: Replace with your email address for notifications
const NOTIFY_EMAIL = 'hadilha1983@gmail.com';

// ============================================
// MAIN HANDLERS
// ============================================

/**
 * Handles POST requests from the landing page form
 * Parses JSON data, writes to sheet, and sends notification email
 *
 * @param {Object} e - Event object containing POST data
 * @returns {ContentService.TextOutput} JSON response
 */
function doPost(e) {
  try {
    // Parse JSON data from request body
    // Note: Using text/plain content type from frontend to avoid CORS preflight
    const data = JSON.parse(e.postData.contents);

    // Validate required fields
    if (!data.fullName || !data.phone || !data.email) {
      throw new Error('Missing required fields');
    }

    // Use LockService to prevent concurrent write conflicts
    const lock = LockService.getScriptLock();
    const hasLock = lock.tryLock(30000); // Wait up to 30 seconds

    if (!hasLock) {
      throw new Error('Could not obtain lock - server busy');
    }

    try {
      // Write lead to spreadsheet
      writeLeadToSheet(data);

      // Send notification email
      sendNotificationEmail(data);

      // Return success response
      return createJsonResponse({ success: true, message: 'Lead saved successfully' });

    } finally {
      // Always release the lock
      lock.releaseLock();
    }

  } catch (error) {
    // Log error for debugging
    console.error('Error processing lead:', error.message);

    // Send error notification email
    sendErrorEmail(error, e.postData ? e.postData.contents : 'No payload');

    // Return error response
    return createJsonResponse({
      success: false,
      error: error.message || 'Unknown error occurred'
    });
  }
}

/**
 * Handles GET requests (for testing/health check)
 *
 * @returns {ContentService.TextOutput} JSON response
 */
function doGet() {
  return createJsonResponse({
    status: 'ok',
    message: 'Lead form API is running',
    timestamp: new Date().toISOString()
  });
}

// ============================================
// SHEET OPERATIONS
// ============================================

/**
 * Writes lead data to the Google Sheet
 * Creates the sheet and headers if they don't exist
 *
 * @param {Object} data - Lead data object
 */
function writeLeadToSheet(data) {
  // Open the spreadsheet
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);

  // Get or create the leads sheet
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    // Add headers for new sheet
    sheet.appendRow(['תאריך', 'שם מלא', 'טלפון', 'אימייל', 'הודעה']);
    // Format header row
    sheet.getRange(1, 1, 1, 5).setFontWeight('bold');
  }

  // Prepare row data in exact column order:
  // 1. Timestamp (ISO)
  // 2. Full name
  // 3. Phone
  // 4. Email
  // 5. Message
  const rowData = [
    data.timestamp || new Date().toISOString(),
    data.fullName || '',
    data.phone || '',
    data.email || '',
    data.message || ''
  ];

  // Append the new row
  sheet.appendRow(rowData);

  // Log success
  console.log('Lead written to sheet:', data.email);
}

// ============================================
// EMAIL NOTIFICATIONS
// ============================================

/**
 * Sends email notification for new lead
 * Uses HTML body with RTL support for Hebrew
 * Luxury aesthetic with brand colors
 *
 * @param {Object} data - Lead data object
 */
function sendNotificationEmail(data) {
  // Email subject in Hebrew
  const subject = '✨ ליד חדש התקבל';

  // Build HTML email body with luxury brand aesthetic
  const htmlBody = `
    <!DOCTYPE html>
    <html dir="rtl" lang="he">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="margin: 0; padding: 0; background-color: #f8f7f5; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #f8f7f5;">
        <tr>
          <td align="center" style="padding: 40px 20px;">
            <!-- Main Container -->
            <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="max-width: 600px; width: 100%;">

              <!-- Header with Navy Background -->
              <tr>
                <td style="background: linear-gradient(135deg, #0a1628 0%, #132238 100%); padding: 40px 40px 30px; border-radius: 16px 16px 0 0; text-align: center;">
                  <!-- Gold Decorative Line -->
                  <table role="presentation" width="60" cellspacing="0" cellpadding="0" border="0" align="center">
                    <tr>
                      <td style="height: 3px; background: linear-gradient(90deg, transparent, #d4a853, transparent);"></td>
                    </tr>
                  </table>
                  <h1 style="color: #f8f7f5; font-size: 28px; font-weight: 300; margin: 20px 0 10px; letter-spacing: 1px;">ליד חדש התקבל</h1>
                  <p style="color: #d4a853; font-size: 14px; margin: 0; font-weight: 500;">מדף הנחיתה שלך</p>
                </td>
              </tr>

              <!-- Content Area -->
              <tr>
                <td style="background-color: #ffffff; padding: 0;">

                  <!-- Lead Info Card -->
                  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                    <tr>
                      <td style="padding: 40px;">

                        <!-- Name Section -->
                        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-bottom: 24px;">
                          <tr>
                            <td style="padding: 20px; background-color: #faf9f7; border-radius: 12px; border-right: 4px solid #d4a853;">
                              <p style="color: #8b8680; font-size: 12px; margin: 0 0 6px; text-transform: uppercase; letter-spacing: 1px;">שם מלא</p>
                              <p style="color: #0a1628; font-size: 20px; margin: 0; font-weight: 600;">${escapeHtml(data.fullName)}</p>
                            </td>
                          </tr>
                        </table>

                        <!-- Contact Details Grid -->
                        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-bottom: 24px;">
                          <tr>
                            <!-- Phone -->
                            <td width="48%" style="padding: 16px 20px; background-color: #0a1628; border-radius: 10px; vertical-align: top;">
                              <p style="color: #d4a853; font-size: 11px; margin: 0 0 6px; text-transform: uppercase; letter-spacing: 1px;">טלפון</p>
                              <p style="color: #f8f7f5; font-size: 16px; margin: 0; font-weight: 500; direction: ltr; text-align: right;">${escapeHtml(data.phone)}</p>
                            </td>
                            <td width="4%"></td>
                            <!-- Email -->
                            <td width="48%" style="padding: 16px 20px; background-color: #0a1628; border-radius: 10px; vertical-align: top;">
                              <p style="color: #d4a853; font-size: 11px; margin: 0 0 6px; text-transform: uppercase; letter-spacing: 1px;">אימייל</p>
                              <p style="color: #f8f7f5; font-size: 14px; margin: 0; font-weight: 500; direction: ltr; text-align: right; word-break: break-all;">${escapeHtml(data.email)}</p>
                            </td>
                          </tr>
                        </table>

                        <!-- Message Section -->
                        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-bottom: 24px;">
                          <tr>
                            <td style="padding: 20px; background-color: #faf9f7; border-radius: 12px; border: 1px solid #e8e6e3;">
                              <p style="color: #8b8680; font-size: 12px; margin: 0 0 10px; text-transform: uppercase; letter-spacing: 1px;">הודעה</p>
                              <p style="color: #0a1628; font-size: 15px; margin: 0; line-height: 1.7;">${data.message ? escapeHtml(data.message) : '<span style="color: #b5b0a8; font-style: italic;">לא הוזנה הודעה</span>'}</p>
                            </td>
                          </tr>
                        </table>

                        <!-- Timestamp -->
                        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                          <tr>
                            <td align="center">
                              <p style="color: #b5b0a8; font-size: 12px; margin: 0;">
                                <span style="color: #d4a853;">●</span>&nbsp;&nbsp;התקבל בתאריך: ${formatTimestamp(data.timestamp)}&nbsp;&nbsp;<span style="color: #d4a853;">●</span>
                              </p>
                            </td>
                          </tr>
                        </table>

                      </td>
                    </tr>
                  </table>

                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td style="background: linear-gradient(135deg, #0a1628 0%, #132238 100%); padding: 30px 40px; border-radius: 0 0 16px 16px; text-align: center;">
                  <!-- Gold Line -->
                  <table role="presentation" width="40" cellspacing="0" cellpadding="0" border="0" align="center" style="margin-bottom: 16px;">
                    <tr>
                      <td style="height: 2px; background-color: #d4a853;"></td>
                    </tr>
                  </table>
                  <p style="color: #7a8599; font-size: 12px; margin: 0 0 8px;">הודעה זו נשלחה אוטומטית ממערכת הלידים</p>
                  <p style="color: #4a5568; font-size: 11px; margin: 0;">הדיל חלבי חסון | ייעוץ פנסיוני ופיננסי</p>
                </td>
              </tr>

            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;

  // Send the email
  MailApp.sendEmail({
    to: NOTIFY_EMAIL,
    subject: subject,
    htmlBody: htmlBody,
    name: 'הדיל - מערכת לידים'
  });

  console.log('Notification email sent to:', NOTIFY_EMAIL);
}

/**
 * Sends error notification email when something goes wrong
 * Styled with brand aesthetic
 *
 * @param {Error} error - The error object
 * @param {string} payload - The original request payload
 */
function sendErrorEmail(error, payload) {
  // Email subject in Hebrew
  const subject = '⚠️ שגיאה במערכת הלידים';

  // Build HTML email body with brand aesthetic
  const htmlBody = `
    <!DOCTYPE html>
    <html dir="rtl" lang="he">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="margin: 0; padding: 0; background-color: #f8f7f5; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #f8f7f5;">
        <tr>
          <td align="center" style="padding: 40px 20px;">
            <!-- Main Container -->
            <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="max-width: 600px; width: 100%;">

              <!-- Header with Error Theme -->
              <tr>
                <td style="background: linear-gradient(135deg, #8b2635 0%, #6b1d29 100%); padding: 40px 40px 30px; border-radius: 16px 16px 0 0; text-align: center;">
                  <!-- Warning Icon -->
                  <p style="font-size: 40px; margin: 0 0 10px;">⚠️</p>
                  <h1 style="color: #f8f7f5; font-size: 24px; font-weight: 300; margin: 0 0 10px; letter-spacing: 1px;">שגיאה במערכת</h1>
                  <p style="color: #f5c6cb; font-size: 14px; margin: 0;">נדרשת בדיקה</p>
                </td>
              </tr>

              <!-- Content Area -->
              <tr>
                <td style="background-color: #ffffff; padding: 40px;">

                  <!-- Error Message -->
                  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-bottom: 24px;">
                    <tr>
                      <td style="padding: 20px; background-color: #fef2f2; border-radius: 12px; border-right: 4px solid #dc3545;">
                        <p style="color: #8b2635; font-size: 12px; margin: 0 0 8px; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">הודעת שגיאה</p>
                        <p style="color: #0a1628; font-size: 15px; margin: 0; line-height: 1.6;">${escapeHtml(error.message || 'שגיאה לא ידועה')}</p>
                      </td>
                    </tr>
                  </table>

                  <!-- Payload Section -->
                  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-bottom: 24px;">
                    <tr>
                      <td>
                        <p style="color: #8b8680; font-size: 12px; margin: 0 0 10px; text-transform: uppercase; letter-spacing: 1px;">נתונים שהתקבלו</p>
                        <div style="padding: 16px; background-color: #0a1628; border-radius: 10px; overflow-x: auto;">
                          <pre style="color: #a0aec0; font-size: 12px; margin: 0; direction: ltr; text-align: left; white-space: pre-wrap; word-break: break-all; font-family: 'Courier New', monospace;">${escapeHtml(payload)}</pre>
                        </div>
                      </td>
                    </tr>
                  </table>

                  <!-- Stack Trace -->
                  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-bottom: 24px;">
                    <tr>
                      <td>
                        <p style="color: #8b8680; font-size: 12px; margin: 0 0 10px; text-transform: uppercase; letter-spacing: 1px;">פרטים טכניים</p>
                        <div style="padding: 16px; background-color: #faf9f7; border-radius: 10px; border: 1px solid #e8e6e3; overflow-x: auto;">
                          <pre style="color: #4a5568; font-size: 11px; margin: 0; direction: ltr; text-align: left; white-space: pre-wrap; word-break: break-all; font-family: 'Courier New', monospace;">${escapeHtml(error.stack || 'אין מידע נוסף')}</pre>
                        </div>
                      </td>
                    </tr>
                  </table>

                  <!-- Timestamp -->
                  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                    <tr>
                      <td align="center">
                        <p style="color: #b5b0a8; font-size: 12px; margin: 0;">
                          תאריך: ${new Date().toLocaleString('he-IL')}
                        </p>
                      </td>
                    </tr>
                  </table>

                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td style="background: linear-gradient(135deg, #0a1628 0%, #132238 100%); padding: 24px 40px; border-radius: 0 0 16px 16px; text-align: center;">
                  <p style="color: #7a8599; font-size: 12px; margin: 0;">התראה אוטומטית ממערכת הלידים</p>
                </td>
              </tr>

            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;

  // Send the error email
  try {
    MailApp.sendEmail({
      to: NOTIFY_EMAIL,
      subject: subject,
      htmlBody: htmlBody,
      name: 'הדיל - התראת מערכת'
    });
    console.log('Error notification email sent');
  } catch (emailError) {
    console.error('Failed to send error email:', emailError.message);
  }
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Creates a JSON response with proper CORS headers
 *
 * @param {Object} data - Response data object
 * @returns {ContentService.TextOutput} JSON response
 */
function createJsonResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Escapes HTML special characters to prevent XSS
 *
 * @param {string} text - Text to escape
 * @returns {string} Escaped text
 */
function escapeHtml(text) {
  if (!text) return '';
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Formats ISO timestamp for display
 *
 * @param {string} isoTimestamp - ISO format timestamp
 * @returns {string} Formatted date string
 */
function formatTimestamp(isoTimestamp) {
  if (!isoTimestamp) return new Date().toLocaleString('he-IL');
  try {
    const date = new Date(isoTimestamp);
    return date.toLocaleString('he-IL', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch (e) {
    return isoTimestamp;
  }
}

// ============================================
// TEST FUNCTIONS (for development)
// ============================================

/**
 * Test function to verify sheet write works
 * Run this from the Apps Script editor to test
 */
function testWriteToSheet() {
  const testData = {
    timestamp: new Date().toISOString(),
    fullName: 'Test User',
    phone: '0541234567',
    email: 'test@example.com',
    message: 'This is a test message'
  };

  writeLeadToSheet(testData);
  console.log('Test write completed');
}

/**
 * Test function to verify email notification works
 * Run this from the Apps Script editor to test
 */
function testSendEmail() {
  const testData = {
    timestamp: new Date().toISOString(),
    fullName: 'Test User',
    phone: '0541234567',
    email: 'test@example.com',
    message: 'This is a test message'
  };

  sendNotificationEmail(testData);
  console.log('Test email sent');
}
