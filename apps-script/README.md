# Google Apps Script - Lead Form Backend

This folder contains the Google Apps Script code for handling lead form submissions from the landing page.

## Features

- Receives lead form submissions via POST request
- Stores leads in a Google Sheet
- Sends HTML email notifications in Hebrew
- Error handling with email alerts
- Concurrency protection with LockService

## Setup Instructions

### 1. Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new blank spreadsheet
3. Name it something like "Landing Page Leads"
4. Copy the Spreadsheet ID from the URL:
   ```
   https://docs.google.com/spreadsheets/d/SPREADSHEET_ID_HERE/edit
   ```

### 2. Create Apps Script Project

1. In your Google Sheet, go to **Extensions > Apps Script**
2. Delete any existing code in `Code.gs`
3. Copy the entire contents of `Code.gs` from this folder
4. Paste it into the Apps Script editor

### 3. Update Configuration

At the top of the script, update these values:

```javascript
// Replace with your actual spreadsheet ID
const SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID_HERE';

// Replace with your email for notifications
const NOTIFY_EMAIL = 'your-email@example.com';
```

### 4. Test the Script

Before deploying, test the script:

1. In the Apps Script editor, select `testWriteToSheet` from the function dropdown
2. Click **Run**
3. Grant necessary permissions when prompted
4. Check your Google Sheet for the test row
5. Select `testSendEmail` and run to test email notifications
6. Check your inbox for the test email

### 5. Deploy as Web App

1. In Apps Script, click **Deploy > New deployment**
2. Click the gear icon next to "Select type" and choose **Web app**
3. Configure:
   - **Description**: "Lead Form API v1.0"
   - **Execute as**: "Me (your email)"
   - **Who has access**: "Anyone"

   > ⚠️ **Important**: "Anyone" is required for the form to submit without authentication

4. Click **Deploy**
5. Copy the **Web app URL** - it will look like:
   ```
   https://script.google.com/macros/s/AKfycb.../exec
   ```

### 6. Configure Frontend

1. In your landing page project, create a `.env` file (copy from `.env.example`)
2. Add your Web App URL:
   ```
   VITE_GAS_WEBAPP_URL=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
   ```

## Updating the Script

When you make changes to the script:

1. Edit the code in Apps Script
2. Click **Deploy > Manage deployments**
3. Click the pencil icon on your deployment
4. Select **New version** from the version dropdown
5. Click **Deploy**

> The URL stays the same, but the new code is used.

## CORS Troubleshooting

If you encounter CORS errors:

### Problem: Preflight (OPTIONS) request fails

Google Apps Script doesn't handle OPTIONS requests. The solution is already implemented in the frontend:

```javascript
// The frontend uses text/plain to avoid preflight
headers: { 'Content-Type': 'text/plain;charset=utf-8' }
```

### Problem: Still getting CORS errors

1. **Check deployment settings**: Ensure "Who has access" is set to "Anyone"
2. **Redeploy**: Create a new deployment with the correct settings
3. **Clear cache**: Clear browser cache and try again
4. **Check URL**: Ensure you're using the correct Web App URL (ends with `/exec`)

### Problem: "Authorization required" error

1. Run any function manually first (e.g., `testWriteToSheet`)
2. Grant all requested permissions
3. Redeploy the web app

## Sheet Structure

The script creates a sheet named "Leads" with these columns:

| Column | Description |
|--------|-------------|
| Timestamp | ISO format submission time |
| Full Name | User's full name |
| Phone | Normalized phone number |
| Email | Email address |
| Message | Optional message |

## Email Notifications

### Success Email
- **Subject**: "ליד חדש מדף הנחיתה"
- **Body**: HTML table with lead details in Hebrew

### Error Email
- **Subject**: "שגיאה בטופס ליד"
- **Body**: Error details, payload, and stack trace

## Security Notes

- The script runs with your Google account permissions
- Anyone can submit to the form (required for public forms)
- Data is stored in your private Google Sheet
- Email notifications go only to the configured email

## Quota Limits

Google Apps Script has daily quotas:
- Email: 100 recipients/day (consumer), 1,500/day (Workspace)
- Script runtime: 6 minutes per execution
- URL Fetch: 20,000 calls/day

For most landing pages, these limits are more than sufficient.

## Support

If you encounter issues:
1. Check the Apps Script execution logs: **View > Logs**
2. Check the Apps Script project triggers: **Triggers** (clock icon)
3. Verify permissions are granted correctly
