# Google OAuth Setup Guide for AgathaAI

This guide will help you set up Google OAuth authentication for the AgathaAI platform.

---

## 📋 Prerequisites

- Google account
- Access to Google Cloud Console
- AgathaAI project running locally or deployed

---

## 🔧 Step 1: Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click "Select a project" → "New Project"
3. Enter project name: `AgathaAI` (or your preferred name)
4. Click "Create"

---

## 🔑 Step 2: Enable Google+ API

1. In the Google Cloud Console, go to "APIs & Services" → "Library"
2. Search for "Google+ API"
3. Click on it and click "Enable"

---

## 🎫 Step 3: Create OAuth 2.0 Credentials

### Configure OAuth Consent Screen

1. Go to "APIs & Services" → "OAuth consent screen"
2. Select "External" (or "Internal" if using Google Workspace)
3. Click "Create"

**App Information**:
- App name: `AgathaAI`
- User support email: Your email
- App logo: (Optional) Upload your logo

**App Domain**:
- Application home page: `http://localhost:3000` (for development)
- Privacy policy: `http://localhost:3000/privacy`
- Terms of service: `http://localhost:3000/terms`

**Authorized domains**:
- For development: Leave empty or add `localhost`
- For production: Add your domain (e.g., `agathaai.com`)

**Developer contact information**:
- Add your email address

4. Click "Save and Continue"

**Scopes**:
- Click "Add or Remove Scopes"
- Select:
  - `userinfo.email`
  - `userinfo.profile`
  - `openid`
- Click "Update" → "Save and Continue"

**Test users** (for External apps in testing):
- Add your email and any test user emails
- Click "Save and Continue"

5. Click "Back to Dashboard"

### Create OAuth Client ID

1. Go to "APIs & Services" → "Credentials"
2. Click "Create Credentials" → "OAuth client ID"
3. Application type: "Web application"
4. Name: `AgathaAI Web Client`

**Authorized JavaScript origins**:
- Development: `http://localhost:3000`
- Production: `https://yourdomain.com`

**Authorized redirect URIs**:
- Development: `http://localhost:3000/api/auth/callback/google`
- Production: `https://yourdomain.com/api/auth/callback/google`

5. Click "Create"
6. **Copy the Client ID and Client Secret** - you'll need these!

---

## 🔐 Step 4: Configure Environment Variables

Add the credentials to your `.env.local` file:

```env
# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret-min-32-characters

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id-here.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-client-secret-here
```

### Generate NEXTAUTH_SECRET

Run this command to generate a secure secret:

```bash
openssl rand -base64 32
```

Or use this Node.js command:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

---

## 📦 Step 5: Install Dependencies

```bash
npm install
```

This will install `next-auth` which was added to package.json.

---

## 🚀 Step 6: Start the Application

```bash
npm run dev
```

Open http://localhost:3000/signin

---

## ✅ Step 7: Test Google OAuth

1. Go to http://localhost:3000/signin
2. Click "Continue with Google"
3. Select your Google account
4. Grant permissions
5. You should be redirected to the main app (http://localhost:3000)

---

## 🌐 Production Deployment

### Update OAuth Credentials

1. Go back to Google Cloud Console → "Credentials"
2. Edit your OAuth 2.0 Client ID
3. Add production URLs:

**Authorized JavaScript origins**:
```
https://yourdomain.com
```

**Authorized redirect URIs**:
```
https://yourdomain.com/api/auth/callback/google
```

4. Click "Save"

### Update Environment Variables

Update your production `.env` file:

```env
NEXTAUTH_URL=https://yourdomain.com
NEXTAUTH_SECRET=your-production-secret-different-from-dev
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

### Publish OAuth App

1. Go to "OAuth consent screen"
2. Click "Publish App"
3. Submit for verification (if needed)

---

## 🔍 Troubleshooting

### Error: "redirect_uri_mismatch"

**Problem**: The redirect URI doesn't match what's configured in Google Cloud Console.

**Solution**:
1. Check your `NEXTAUTH_URL` in `.env.local`
2. Verify the redirect URI in Google Cloud Console matches exactly:
   - `http://localhost:3000/api/auth/callback/google` (dev)
   - `https://yourdomain.com/api/auth/callback/google` (prod)
3. Make sure there are no trailing slashes

### Error: "Access blocked: This app's request is invalid"

**Problem**: OAuth consent screen not configured properly.

**Solution**:
1. Complete the OAuth consent screen setup
2. Add test users if the app is in testing mode
3. Make sure all required fields are filled

### Error: "idpiframe_initialization_failed"

**Problem**: Cookies are blocked or third-party cookies are disabled.

**Solution**:
1. Enable third-party cookies in browser
2. Try in incognito mode
3. Check browser console for specific errors

### Google Sign-In Button Not Working

**Problem**: Missing or incorrect environment variables.

**Solution**:
1. Verify `.env.local` has all required variables
2. Restart the development server: `npm run dev`
3. Check browser console for errors

### Database Error After Google Sign-In

**Problem**: Database not configured or user table doesn't exist.

**Solution**:
1. Make sure PostgreSQL is running
2. Run migrations: `npm run db:migrate`
3. Check database connection in `.env.local`

---

## 📊 What Happens During Google OAuth?

1. **User clicks "Continue with Google"**
   - Redirects to Google's OAuth consent screen

2. **User grants permissions**
   - Google redirects back to `/api/auth/callback/google`

3. **NextAuth processes the callback**
   - Verifies the OAuth token
   - Calls the `signIn` callback in `auth-config.ts`

4. **User creation/lookup**
   - Checks if user exists in database
   - Creates new user if first time
   - Generates API key for new users

5. **Session creation**
   - Creates JWT token with user data
   - Stores session in browser
   - Redirects to main app

---

## 🔒 Security Best Practices

1. **Never commit credentials**
   - `.env.local` is in `.gitignore`
   - Use different secrets for dev/staging/production

2. **Rotate secrets regularly**
   - Change `NEXTAUTH_SECRET` every 90 days
   - Rotate Google OAuth credentials if compromised

3. **Use HTTPS in production**
   - Google OAuth requires HTTPS for production
   - Use SSL certificates (Let's Encrypt, Cloudflare)

4. **Limit OAuth scopes**
   - Only request necessary permissions
   - Currently using: email, profile, openid

5. **Monitor OAuth usage**
   - Check Google Cloud Console for usage
   - Set up alerts for unusual activity

---

## 📚 Additional Resources

- [NextAuth.js Documentation](https://next-auth.js.org/)
- [Google OAuth 2.0 Documentation](https://developers.google.com/identity/protocols/oauth2)
- [Google Cloud Console](https://console.cloud.google.com/)

---

## ✅ Checklist

- [ ] Created Google Cloud project
- [ ] Enabled Google+ API
- [ ] Configured OAuth consent screen
- [ ] Created OAuth 2.0 credentials
- [ ] Added credentials to `.env.local`
- [ ] Generated `NEXTAUTH_SECRET`
- [ ] Installed dependencies (`npm install`)
- [ ] Started development server (`npm run dev`)
- [ ] Tested Google sign-in
- [ ] Verified user created in database
- [ ] Tested sign-out and sign-in again

---

**Need Help?**
- Check the troubleshooting section above
- Review browser console for errors
- Check server logs for backend errors
- Verify all environment variables are set

**Ready to go!** 🚀

