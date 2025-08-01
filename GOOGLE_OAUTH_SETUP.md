# Google OAuth Setup Guide

This guide will help you set up Google OAuth for the Efoy Hospital Appointment Manager.

## Prerequisites

1. A Google account
2. Access to Google Cloud Console

## Step 1: Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable billing (required for OAuth)

## Step 2: Enable Google+ API

1. In your Google Cloud project, go to "APIs & Services" > "Library"
2. Search for "Google+ API" or "Google Identity"
3. Enable the API

## Step 3: Create OAuth 2.0 Credentials

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "OAuth 2.0 Client IDs"
3. Choose "Web application" as the application type
4. Set the following:
   - **Name**: Efoy Hospital App
   - **Authorized JavaScript origins**: 
     - `http://localhost:3000` (for development)
     - `https://your-domain.com` (for production)
   - **Authorized redirect URIs**:
     - `http://localhost:8000/api/v1/auth/google/callback` (for development)
     - `https://your-backend-domain.com/api/v1/auth/google/callback` (for production)

## Step 4: Configure Environment Variables

1. Copy the Client ID and Client Secret from the credentials page
2. Update your `.env` file:

```env
GOOGLE_CLIENT_ID=your-client-id-here
GOOGLE_CLIENT_SECRET=your-client-secret-here
GOOGLE_CLIENT_CALLBACK_URL=http://localhost:8000/api/v1/auth/google/callback
```

## Step 5: Install Dependencies

Make sure you have the required Python packages:

```bash
pip install authlib requests
```

## Step 6: Test the Setup

1. Start your backend server
2. Start your frontend application
3. Try clicking "Continue with Google" on the signin/signup pages
4. You should be redirected to Google's OAuth consent screen

## Troubleshooting

### Common Issues:

1. **"Google OAuth not configured" error**
   - Check that `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` are set in your `.env` file

2. **"Invalid redirect URI" error**
   - Make sure the redirect URI in Google Cloud Console matches exactly
   - Check that the callback URL in your `.env` file is correct

3. **CORS errors**
   - Ensure your frontend URL is added to the authorized origins in Google Cloud Console

4. **"Authentication failed" error**
   - Check the server logs for detailed error messages
   - Verify that all environment variables are correctly set

### Production Deployment:

For production deployment, make sure to:

1. Update the authorized origins and redirect URIs in Google Cloud Console
2. Use HTTPS URLs for production
3. Set the correct `CLIENT_URL` in your environment variables
4. Update the callback URL to match your production backend URL

## Security Notes

- Never commit your `.env` file to version control
- Keep your Google Client Secret secure
- Use environment variables for all sensitive configuration
- Regularly rotate your OAuth credentials

## API Endpoints

The following endpoints are now available:

- `GET /api/v1/auth/google` - Initiate Google OAuth flow
- `GET /api/v1/auth/google/callback` - Handle OAuth callback
- `GET /api/v1/auth/error` - Handle OAuth errors

## User Flow

1. User clicks "Continue with Google"
2. Frontend redirects to `/api/v1/auth/google`
3. Backend redirects to Google OAuth consent screen
4. User authorizes the application
5. Google redirects to `/api/v1/auth/google/callback`
6. Backend creates/finds user and generates JWT token
7. Backend redirects to frontend with token
8. Frontend stores token and redirects to dashboard 