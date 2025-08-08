# Email Setup Guide

## Current Setup
The backend is currently configured to use the console email backend for development. This means emails will be printed to the console instead of actually being sent.

## How to Enable Real Email Sending

### 1. For Gmail
1. Enable 2-factor authentication on your Gmail account
2. Generate an App Password:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a new app password for "Mail"
3. Update `backend/hallihughes_backend/settings.py`:
   ```python
   EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
   EMAIL_HOST = 'smtp.gmail.com'
   EMAIL_PORT = 587
   EMAIL_USE_TLS = True
   EMAIL_HOST_USER = 'your-email@gmail.com'
   EMAIL_HOST_PASSWORD = 'your-app-password'
   DEFAULT_FROM_EMAIL = 'your-email@gmail.com'
   ```

### 2. For Other Email Providers
Update the settings with your provider's SMTP details:
- **Outlook/Hotmail**: `smtp-mail.outlook.com`, port 587
- **Yahoo**: `smtp.mail.yahoo.com`, port 587
- **Custom SMTP**: Use your provider's SMTP server details

## Email Features
- **Send Quote Document**: Sends a formatted email with quote details
- **Send Customer Message**: Sends a custom message to the customer

## Testing
- In development mode, emails are printed to the console
- Check the Django server console to see email content
- For production, emails will be sent to actual email addresses

## Security Notes
- Never commit email passwords to version control
- Use environment variables for sensitive email settings
- Consider using email services like SendGrid or Mailgun for production 