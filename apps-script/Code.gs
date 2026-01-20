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
const SPREADSHEET_ID = 'PASTE_SPREADSHEET_ID_HERE';

// Sheet name where leads will be stored (will be created if doesn't exist)
const SHEET_NAME = 'Leads';

// TODO: Replace with your email address for notifications
const NOTIFY_EMAIL = 'notify@example.com';

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
    sheet.appendRow(['Timestamp', 'Full Name', 'Phone', 'Email', 'Message']);
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
 *
 * @param {Object} data - Lead data object
 */
function sendNotificationEmail(data) {
  // Email subject in Hebrew (exact as specified)
  const subject = 'ליד חדש מדף הנחיתה';

  // Build HTML email body
  const htmlBody = `
    <!DOCTYPE html>
    <html dir="rtl" lang="he">
    <head>
      <meta charset="UTF-8">
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          direction: rtl;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }
        h2 {
          color: #1a1a1a;
          border-bottom: 2px solid #e0e0e0;
          padding-bottom: 10px;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 20px;
        }
        th, td {
          padding: 12px;
          text-align: right;
          border-bottom: 1px solid #e0e0e0;
        }
        th {
          background-color: #f8f9fa;
          font-weight: bold;
          width: 120px;
        }
        .ltr {
          direction: ltr;
          text-align: left;
        }
        .footer {
          margin-top: 30px;
          padding-top: 20px;
          border-top: 1px solid #e0e0e0;
          font-size: 12px;
          color: #666;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h2>ליד חדש התקבל מדף הנחיתה</h2>

        <table>
          <tr>
            <th>שם מלא</th>
            <td>${escapeHtml(data.fullName)}</td>
          </tr>
          <tr>
            <th>טלפון</th>
            <td class="ltr">${escapeHtml(data.phone)}</td>
          </tr>
          <tr>
            <th>אימייל</th>
            <td class="ltr">${escapeHtml(data.email)}</td>
          </tr>
          <tr>
            <th>הודעה</th>
            <td>${data.message ? escapeHtml(data.message) : '<em style="color: #999">לא הוזנה הודעה</em>'}</td>
          </tr>
          <tr>
            <th>תאריך שליחה</th>
            <td class="ltr">${formatTimestamp(data.timestamp)}</td>
          </tr>
        </table>

        <div class="footer">
          <p>הודעה זו נשלחה אוטומטית מטופס יצירת קשר באתר.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  // Send the email
  MailApp.sendEmail({
    to: NOTIFY_EMAIL,
    subject: subject,
    htmlBody: htmlBody,
    name: 'מערכת לידים'
  });

  console.log('Notification email sent to:', NOTIFY_EMAIL);
}

/**
 * Sends error notification email when something goes wrong
 *
 * @param {Error} error - The error object
 * @param {string} payload - The original request payload
 */
function sendErrorEmail(error, payload) {
  // Email subject in Hebrew (exact as specified)
  const subject = 'שגיאה בטופס ליד';

  // Build HTML email body
  const htmlBody = `
    <!DOCTYPE html>
    <html dir="rtl" lang="he">
    <head>
      <meta charset="UTF-8">
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          direction: rtl;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }
        h2 {
          color: #dc3545;
          border-bottom: 2px solid #dc3545;
          padding-bottom: 10px;
        }
        .error-box {
          background-color: #fff3f3;
          border: 1px solid #dc3545;
          border-radius: 4px;
          padding: 15px;
          margin: 20px 0;
        }
        pre {
          background-color: #f8f9fa;
          padding: 15px;
          border-radius: 4px;
          overflow-x: auto;
          direction: ltr;
          text-align: left;
          font-size: 12px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h2>שגיאה בטופס ליד</h2>

        <div class="error-box">
          <strong>הודעת שגיאה:</strong>
          <p>${escapeHtml(error.message || 'Unknown error')}</p>
        </div>

        <h3>Payload שהתקבל:</h3>
        <pre>${escapeHtml(payload)}</pre>

        <h3>Stack Trace:</h3>
        <pre>${escapeHtml(error.stack || 'No stack trace available')}</pre>

        <p style="color: #666; font-size: 12px; margin-top: 30px;">
          תאריך: ${new Date().toISOString()}
        </p>
      </div>
    </body>
    </html>
  `;

  // Send the error email
  try {
    MailApp.sendEmail({
      to: NOTIFY_EMAIL,
      subject: subject,
      htmlBody: htmlBody,
      name: 'מערכת לידים - התראת שגיאה'
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
