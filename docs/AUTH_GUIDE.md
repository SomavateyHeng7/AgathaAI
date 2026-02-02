# Authentication Guide - GenAI Platform

Complete guide for the authentication system including signup, signin, and protected routes.

## 🔐 Overview

The platform includes a full authentication flow with:
- **Sign Up**: Create new accounts with tier selection
- **Sign In**: Login with email/password or OAuth
- **Forgot Password**: Password reset flow
- **Protected Routes**: Automatic redirect for unauthenticated users
- **Session Management**: Token-based authentication
- **Logout**: Secure session termination

## 📁 File Structure

```
src/
├── app/
│   ├── signin/page.tsx          # Sign in page
│   ├── signup/page.tsx          # Sign up page
│   ├── forgot-password/page.tsx # Password reset
│   ├── landing/page.tsx         # Public landing page
│   └── page.tsx                 # Protected main app
├── components/
│   └── ProtectedRoute.tsx       # Route protection wrapper
└── lib/
    └── auth.ts                  # Authentication utilities
```

## 🎨 Pages

### 1. Sign In (`/signin`)

**Features:**
- Email/password login
- Remember me checkbox
- Forgot password link
- Social login (Google, GitHub)
- Link to sign up page
- Split-screen design with branding

**Form Fields:**
- Email (required)
- Password (required)
- Remember me (optional)

**Validation:**
- Email format check
- Password minimum length
- Error messages for invalid credentials

**Mock Authentication:**
```typescript
// Stores in localStorage:
- authToken: 'mock_token_' + timestamp
- userEmail: email
```

### 2. Sign Up (`/signup`)

**Features:**
- Full name input
- Email/password registration
- Password confirmation
- Tier selection (Free/Pro/Enterprise)
- Terms acceptance checkbox
- Split-screen with pricing info

**Form Fields:**
- Full name (required)
- Email (required)
- Password (required, min 8 chars)
- Confirm password (required)
- Subscription tier (required)
- Accept terms (required)

**Validation:**
- All fields required
- Password match check
- Password strength (min 8 characters)
- Terms acceptance required

**Tier Selection:**
```typescript
type Tier = 'free' | 'pro' | 'enterprise';

Limits:
- Free: 10 req/min, 2 concurrent
- Pro: 100 req/min, 10 concurrent
- Enterprise: 1000 req/min, 50 concurrent
```

### 3. Forgot Password (`/forgot-password`)

**Features:**
- Email input for reset
- Success confirmation
- Back to sign in link
- Centered single-column layout

**Flow:**
1. User enters email
2. System sends reset link (simulated)
3. Success message displayed
4. Option to try again

### 4. Landing Page (`/landing`)

**Features:**
- Hero section with CTA
- Feature highlights
- Pricing comparison
- Footer
- Header with sign in/sign up buttons

**Sections:**
- Hero: Main value proposition
- Features: 3-column grid
- Pricing: 3 tiers with details
- Footer: Copyright info

## 🔒 Protected Routes

### ProtectedRoute Component

Wraps authenticated pages to ensure user is logged in:

```typescript
<ProtectedRoute>
  <YourProtectedContent />
</ProtectedRoute>
```

**Behavior:**
- Checks `localStorage` for auth token
- Redirects to `/signin` if not authenticated
- Shows loading spinner during check
- Renders children if authenticated

**Loading State:**
- Centered logo with bouncing dots
- Smooth transition to content

## 🛠️ Authentication Utilities

### `src/lib/auth.ts`

**Functions:**

#### `isAuthenticated()`
```typescript
function isAuthenticated(): boolean
```
Returns true if user has valid auth token.

#### `getAuthToken()`
```typescript
function getAuthToken(): string | null
```
Returns current auth token or null.

#### `getCurrentUser()`
```typescript
function getCurrentUser(): Partial<User> | null
```
Returns user data from localStorage:
- email
- tier
- apiKey

#### `logout()`
```typescript
function logout(): void
```
Clears all auth data and redirects to `/signin`.

#### `login()`
```typescript
async function login(
  email: string,
  password: string
): Promise<{ success: boolean; error?: string }>
```
Authenticates user (replace with real API).

#### `register()`
```typescript
async function register(
  name: string,
  email: string,
  password: string,
  tier: 'free' | 'pro' | 'enterprise'
): Promise<{ success: boolean; error?: string }>
```
Creates new user account (replace with real API).

## 🎯 Usage Examples

### Protecting a Page

```typescript
// src/app/dashboard/page.tsx
import ProtectedRoute from '@/components/ProtectedRoute';

export default function Dashboard() {
  return (
    <ProtectedRoute>
      <div>Your protected content</div>
    </ProtectedRoute>
  );
}
```

### Checking Auth Status

```typescript
import { isAuthenticated, getCurrentUser } from '@/lib/auth';

function MyComponent() {
  const isLoggedIn = isAuthenticated();
  const user = getCurrentUser();
  
  if (!isLoggedIn) {
    return <div>Please log in</div>;
  }
  
  return <div>Welcome {user?.email}</div>;
}
```

### Logging Out

```typescript
import { logout } from '@/lib/auth';

function LogoutButton() {
  return (
    <button onClick={logout}>
      Sign out
    </button>
  );
}
```

## 🔄 Authentication Flow

### Sign Up Flow
```
1. User visits /signup
2. Fills form with name, email, password, tier
3. Accepts terms and conditions
4. Submits form
5. System creates account (mock)
6. Stores auth token in localStorage
7. Redirects to main app (/)
```

### Sign In Flow
```
1. User visits /signin
2. Enters email and password
3. Optionally checks "Remember me"
4. Submits form
5. System validates credentials (mock)
6. Stores auth token in localStorage
7. Redirects to main app (/)
```

### Password Reset Flow
```
1. User clicks "Forgot password" on /signin
2. Redirects to /forgot-password
3. Enters email address
4. Submits form
5. System sends reset email (mock)
6. Success message displayed
7. User checks email for reset link
```

### Protected Route Flow
```
1. User navigates to protected page
2. ProtectedRoute checks localStorage
3. If no token: redirect to /signin
4. If token exists: render page
5. User can access protected content
```

## 🎨 Design System

### Color Scheme

**Sign In/Sign Up Pages:**
- Background: White (light) / Gray-950 (dark)
- Primary: Blue-600 to Purple-600 gradient
- Text: Gray-900 (light) / White (dark)
- Borders: Gray-300 (light) / Gray-700 (dark)

**Right Panel (Branding):**
- Background: Blue-600 to Pink-600 gradient
- Text: White
- Accents: White/20 with backdrop blur

### Typography
- Headings: Bold, 2xl-4xl
- Body: Regular, sm-base
- Labels: Medium, sm
- Buttons: Semibold, sm-base

### Components
- Input fields: Rounded-lg, border, focus ring
- Buttons: Rounded-lg, gradient or border
- Cards: Rounded-2xl, border, backdrop blur
- Checkboxes: Rounded, blue accent

## 🔧 Integration with Backend

### Replace Mock Authentication

Update `src/lib/auth.ts`:

```typescript
export async function login(email: string, password: string) {
  const response = await fetch('YOUR_API_URL/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error('Invalid credentials');
  }

  const data = await response.json();
  
  localStorage.setItem(AUTH_TOKEN_KEY, data.token);
  localStorage.setItem(USER_EMAIL_KEY, data.user.email);
  localStorage.setItem(USER_TIER_KEY, data.user.tier);
  
  return { success: true };
}
```

### API Endpoints Required

```
POST   /api/auth/register
Body:  { name, email, password, tier }
Response: { token, user: { id, email, name, tier } }

POST   /api/auth/login
Body:  { email, password }
Response: { token, user: { id, email, tier } }

POST   /api/auth/forgot-password
Body:  { email }
Response: { success: true }

POST   /api/auth/reset-password
Body:  { token, newPassword }
Response: { success: true }

GET    /api/auth/me
Headers: Authorization: Bearer {token}
Response: { user: { id, email, name, tier } }

POST   /api/auth/logout
Headers: Authorization: Bearer {token}
Response: { success: true }
```

## 🔐 Security Best Practices

### Current Implementation
✅ Client-side validation
✅ Password confirmation
✅ Terms acceptance required
✅ Secure token storage (localStorage)
✅ Protected route wrapper

### Production Recommendations
🔒 Use httpOnly cookies instead of localStorage
🔒 Implement CSRF protection
🔒 Add rate limiting on auth endpoints
🔒 Use bcrypt for password hashing (backend)
🔒 Implement JWT with refresh tokens
🔒 Add 2FA support
🔒 Log authentication attempts
🔒 Implement account lockout after failed attempts
🔒 Use HTTPS only
🔒 Validate email addresses (send verification)

## 🧪 Testing

### Manual Testing

**Sign Up:**
1. Visit http://localhost:3000/signup
2. Fill all fields
3. Select a tier
4. Accept terms
5. Click "Create account"
6. Should redirect to main app

**Sign In:**
1. Visit http://localhost:3000/signin
2. Enter any email/password
3. Click "Sign in"
4. Should redirect to main app

**Protected Route:**
1. Clear localStorage
2. Visit http://localhost:3000
3. Should redirect to /signin
4. Sign in
5. Should access main app

**Logout:**
1. Sign in to main app
2. Click logout button in sidebar
3. Should redirect to /signin
4. Try accessing / again
5. Should redirect to /signin

## 📱 Responsive Design

### Mobile (< 768px)
- Single column layout
- Hidden right panel (branding)
- Full-width forms
- Stacked buttons

### Tablet (768px - 1024px)
- Two-column layout
- Visible right panel
- Responsive grid

### Desktop (> 1024px)
- Full two-column layout
- 50/50 split
- Optimal spacing

## 🚀 Deployment Checklist

- [ ] Replace mock auth with real API
- [ ] Set up environment variables
- [ ] Configure OAuth providers (Google, GitHub)
- [ ] Implement email verification
- [ ] Add password strength requirements
- [ ] Set up session management
- [ ] Configure CORS properly
- [ ] Add rate limiting
- [ ] Implement logging
- [ ] Set up monitoring
- [ ] Test all flows end-to-end
- [ ] Security audit

## 🔗 Related Documentation

- **UI Features**: See `UI_FEATURES.md`
- **Architecture**: See `ARCHITECTURE.md`
- **Quick Start**: See `QUICKSTART.md`
- **API Integration**: See `UI_README.md`

---

**Version**: 1.0.0
**Last Updated**: January 19, 2026
