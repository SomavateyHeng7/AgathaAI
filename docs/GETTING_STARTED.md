# Getting Started - GenAI Platform

Quick start guide to run your LLM-as-a-Service platform with authentication.

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

### 3. Access the Application
Open [http://localhost:3000](http://localhost:3000)

## 📍 Available Routes

### Public Routes (No Authentication Required)
- `/landing` - Marketing landing page
- `/signin` - Sign in page
- `/signup` - Sign up page
- `/forgot-password` - Password reset page

### Protected Routes (Authentication Required)
- `/` - Main chat interface (redirects to `/signin` if not authenticated)

## 🔑 Authentication Flow

### First Time User

1. **Visit the app**: http://localhost:3000
2. **Redirected to**: http://localhost:3000/signin
3. **Click**: "Sign up for free"
4. **Fill the form**:
   - Full name: John Doe
   - Email: john@example.com
   - Password: password123
   - Confirm password: password123
   - Select tier: Pro
   - Accept terms: ✓
5. **Click**: "Create account"
6. **Redirected to**: Main app with chat interface

### Returning User

1. **Visit**: http://localhost:3000/signin
2. **Enter credentials**:
   - Email: your@email.com
   - Password: your_password
3. **Click**: "Sign in"
4. **Access**: Main chat interface

## 🎯 Key Features

### Authentication
✅ Email/password signup
✅ Email/password signin
✅ Password reset flow
✅ Protected routes
✅ Session management
✅ Logout functionality

### Chat Interface
✅ ChatGPT-style dark UI
✅ Multiple AI models (GPT-4, Claude, Llama)
✅ Real-time message streaming
✅ Chat history
✅ Collapsible sidebar
✅ User profile display

### Subscription Tiers
✅ Free: 10 req/min, 2 concurrent
✅ Pro: 100 req/min, 10 concurrent
✅ Enterprise: 1000 req/min, 50 concurrent

## 📁 Project Structure

```
src/
├── app/
│   ├── page.tsx                 # Main chat (protected)
│   ├── signin/page.tsx          # Sign in
│   ├── signup/page.tsx          # Sign up
│   ├── forgot-password/page.tsx # Password reset
│   ├── landing/page.tsx         # Landing page
│   ├── layout.tsx               # Root layout
│   └── globals.css              # Global styles
├── components/
│   ├── ChatInterface.tsx        # Chat UI
│   ├── Sidebar.tsx              # Navigation sidebar
│   ├── ProtectedRoute.tsx       # Auth wrapper
│   ├── Header.tsx               # (legacy)
│   ├── InferencePanel.tsx       # (legacy)
│   └── ...                      # Other components
├── lib/
│   ├── auth.ts                  # Auth utilities
│   ├── api.ts                   # API client
│   └── mockData.ts              # Mock data
└── types/
    └── index.ts                 # TypeScript types
```

## 🧪 Testing the App

### Test Sign Up
```bash
# 1. Open browser to http://localhost:3000/signup
# 2. Fill form with any data
# 3. Select a tier (Free/Pro/Enterprise)
# 4. Accept terms
# 5. Click "Create account"
# 6. Should redirect to main app
```

### Test Sign In
```bash
# 1. Open browser to http://localhost:3000/signin
# 2. Enter any email and password
# 3. Click "Sign in"
# 4. Should redirect to main app
```

### Test Protected Route
```bash
# 1. Open DevTools > Application > Local Storage
# 2. Clear all items
# 3. Navigate to http://localhost:3000
# 4. Should redirect to /signin
# 5. Sign in
# 6. Should access main app
```

### Test Chat
```bash
# 1. Sign in to the app
# 2. Type a message: "Explain quantum computing"
# 3. Press Enter or click send
# 4. Watch AI response appear
# 5. Check sidebar for chat history
```

### Test Logout
```bash
# 1. Sign in to the app
# 2. Click logout icon in sidebar (bottom)
# 3. Should redirect to /signin
# 4. Try accessing / again
# 5. Should redirect to /signin
```

## 🎨 UI Components

### Sign In/Sign Up Pages
- Split-screen design
- Left: Form
- Right: Branding/Pricing
- Gradient backgrounds
- Social login buttons (Google, GitHub)

### Main Chat Interface
- Dark theme (gray-950)
- Collapsible sidebar (64px/256px)
- Centered chat (max-width 768px)
- Model selector dropdown
- Real-time message display
- Loading animations

### Landing Page
- Hero section
- Feature highlights
- Pricing comparison
- Call-to-action buttons

## 🔧 Configuration

### Mock Authentication
Currently uses localStorage for demo purposes:
```typescript
// Stored keys:
- authToken: 'mock_token_' + timestamp
- userEmail: user's email
- userName: user's name
- userTier: 'free' | 'pro' | 'enterprise'
```

### Replace with Real API
Edit `src/lib/auth.ts`:
```typescript
// Update these functions:
- login()
- register()
- getCurrentUser()
```

Point to your backend API:
```typescript
const API_URL = 'https://your-api.com';
```

## 📚 Documentation

- **Authentication**: See `AUTH_GUIDE.md`
- **UI Features**: See `UI_FEATURES.md`
- **Architecture**: See `ARCHITECTURE.md`
- **API Integration**: See `UI_README.md`

## 🐛 Troubleshooting

### Can't Access Main App
**Problem**: Redirects to /signin
**Solution**: Sign up or sign in first

### Logout Not Working
**Problem**: Still accessing protected routes
**Solution**: Clear browser cache and localStorage

### Build Errors
**Problem**: TypeScript errors
**Solution**: 
```bash
rm -rf .next node_modules
npm install
npm run build
```

### Port Already in Use
**Problem**: Port 3000 is busy
**Solution**:
```bash
# Kill process
lsof -ti:3000 | xargs kill -9

# Or use different port
PORT=3001 npm run dev
```

## 🚀 Production Deployment

### Build for Production
```bash
npm run build
npm start
```

### Deploy to Vercel
```bash
vercel deploy
```

### Environment Variables
Set these in production:
```env
NEXT_PUBLIC_API_URL=https://your-api.com/api/v1
```

## 📝 Next Steps

1. ✅ Run the app locally
2. ✅ Test authentication flow
3. ✅ Explore chat interface
4. ⬜ Connect to real backend API
5. ⬜ Configure OAuth providers
6. ⬜ Add email verification
7. ⬜ Deploy to production

## 💡 Tips

- **Development**: Use mock data for quick testing
- **Styling**: Modify Tailwind classes in components
- **Models**: Add more in ChatInterface.tsx
- **Tiers**: Adjust limits in mockData.ts
- **Theme**: Change colors in globals.css

## 🎉 You're Ready!

Your LLM-as-a-Service platform is ready to use. Start by signing up and exploring the chat interface!

```bash
npm run dev
# Open http://localhost:3000
# Click "Sign up for free"
# Start chatting with AI!
```

---

**Need Help?** Check the documentation files or open an issue.
