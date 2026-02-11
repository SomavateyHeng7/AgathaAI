# Complete Function List - AgathaAI Platform

This document lists ALL functions included in the AgathaAI codebase, organized by module.

---

## 📦 Database Module (`src/lib/database.ts`)

### Core Functions

1. **`getPool()`**
   - Creates and returns singleton PostgreSQL connection pool
   - Handles error events
   - Returns: `Pool`

2. **`query(text: string, params?: any[])`** ⭐
   - Executes parameterized SQL queries
   - Logs query performance in development
   - Returns: `Promise<QueryResult>`
   - Used by: All database operations

3. **`getClient()`**
   - Gets a database client from the pool
   - Returns: `Promise<PoolClient>`

4. **`testConnection()`**
   - Tests database connectivity
   - Returns: `Promise<boolean>`

---

## 🔐 Authentication Module (`src/lib/auth-server.ts`)

### Authentication Functions

5. **`authenticateToken(request: NextRequest)`** ⭐
   - Validates JWT token from Authorization header
   - Checks user status in database
   - Returns: `Promise<AuthUser | null>`
   - Used by: Protected API routes

6. **`authenticateApiKey(request: NextRequest)`** ⭐
   - Validates API key from X-API-Key header
   - Uses bcrypt to compare hashed keys
   - Updates last_used_at timestamp
   - Returns: `Promise<AuthUser | null>`
   - Used by: Inference API routes

---

## ⏱️ Rate Limiting Module (`src/lib/rateLimit.ts`)

### Rate Limit Functions

7. **`checkRateLimit(userId: string, tier: string)`** ⭐
   - Checks per-minute rate limits
   - Checks concurrent request limits
   - Creates/updates rate limit buckets
   - Returns: `Promise<RateLimitResult>`
   - Used by: All inference endpoints

---

## 🤖 LLM Integration Module (`src/lib/llm.ts`)

### Main Processing Functions

8. **`processInference(requestId, userId, model, prompt, parameters)`** ⭐
   - Main async inference processor
   - Routes to appropriate LLM provider
   - Updates database with results
   - Handles errors and status updates
   - Returns: `Promise<void>`
   - Used by: Inference API routes

9. **`chat(model, messages, params)`** ⭐
   - Synchronous chat completion
   - Supports multi-turn conversations
   - Returns: `Promise<ChatResult>`
   - Used by: Chat API routes

### Provider-Specific Functions

10. **`callOpenAI(model, prompt, params)`**
    - Calls OpenAI API for single prompt
    - Returns: `Promise<{ response, tokensPrompt, tokensCompletion }>`

11. **`callGemini(model, prompt, params)`**
    - Calls Google Gemini API for single prompt
    - Maps model names to actual IDs
    - Returns: `Promise<{ response, tokensPrompt, tokensCompletion }>`

12. **`callOpenAIChat(model, messages, params)`**
    - Calls OpenAI API for chat completion
    - Supports multi-turn conversations
    - Returns: `Promise<{ response, tokensPrompt, tokensCompletion }>`

13. **`callGeminiChat(model, messages, params)`**
    - Calls Gemini API for chat completion
    - Converts message format
    - Returns: `Promise<{ response, tokensPrompt, tokensCompletion }>`

### Statistics Functions

14. **`updateUsageStatistics(userId, tokens, processingTime, model)`**
    - Updates daily usage statistics
    - Aggregates request counts and tokens
    - Calculates average response time
    - Returns: `Promise<void>`

---

## 🌐 API Client Module (`src/lib/api-client.ts`)

### APIClient Class Methods

15. **`getAuthHeaders()`**
    - Gets authentication headers with API key
    - Returns: `HeadersInit`

16. **`submitInference(request: InferenceRequest)`**
    - Submits inference request to API
    - Returns: `Promise<InferenceResponse>`

17. **`getInferenceResult(requestId: string)`**
    - Gets inference result by ID
    - Returns: `Promise<InferenceResponse>`

18. **`pollForResult(requestId: string, maxAttempts = 30)`**
    - Polls for inference completion
    - Waits 2 seconds between attempts
    - Returns: `Promise<string>`

---

## 🎨 Utilities Module (`src/lib/utils.ts`)

19. **`cn(...inputs: ClassValue[])`**
    - Merges Tailwind CSS classes
    - Uses clsx and tailwind-merge
    - Returns: `string`
    - Used by: All UI components

---

## 🏪 State Management - Auth Store (`src/store/auth.ts`)

### Zustand Store Actions

20. **`setUser(user: User | null)`**
    - Sets current user in state
    - Persists to localStorage

21. **`setToken(token: string | null)`**
    - Sets JWT token in state
    - Persists to localStorage

22. **`logout()`**
    - Clears user and token
    - Removes from localStorage

---

## 💬 State Management - Chat Store (`src/store/chat.ts`)

### Zustand Store Actions

23. **`setMessages(messages: Message[])`**
    - Sets all messages
    - Persists to localStorage

24. **`addMessage(message: Message)`**
    - Adds single message to array
    - Persists to localStorage

25. **`clearMessages()`**
    - Clears all messages
    - Persists to localStorage

26. **`setHistory(history: any[])`**
    - Sets chat history
    - Persists to localStorage

### Helper Functions

27. **`reviveMessages(messages: any[])`**
    - Converts timestamp strings to Date objects
    - Returns: `Message[]`

---

## 🔑 NextAuth Configuration (`src/lib/auth-config.ts`)

### Callback Functions

28. **`signIn({ user, account })`** ⭐
    - Handles Google OAuth sign-in
    - Creates new users if needed
    - Generates API keys for new users
    - Returns: `Promise<boolean>`

29. **`jwt({ token, user, account })`**
    - Adds user data to JWT token
    - Fetches tier and API key from database
    - Returns: `Promise<JWT>`

30. **`session({ session, token })`**
    - Adds user data to session object
    - Returns: `Promise<Session>`

---

## 🛣️ API Routes

### Authentication Routes

#### `/api/auth/register` (`src/app/api/auth/register/route.ts`)

31. **`POST(request: NextRequest)`**
    - Registers new user
    - Hashes password with bcrypt
    - Creates API key
    - Returns JWT token

#### `/api/auth/login` (`src/app/api/auth/login/route.ts`)

32. **`POST(request: NextRequest)`**
    - Authenticates user credentials
    - Verifies password with bcrypt
    - Returns JWT token

#### `/api/auth/me` (`src/app/api/auth/me/route.ts`)

33. **`GET(request: NextRequest)`**
    - Gets current user info
    - Requires JWT token
    - Returns user data

---

### Chat Routes

#### `/api/chat` (`src/app/api/chat/route.ts`)

34. **`POST(request: NextRequest)`** ⭐
    - Sends chat message
    - Calls LLM provider
    - Saves to database
    - Returns response

#### `/api/chat/conversations` (`src/app/api/chat/conversations/route.ts`)

35. **`GET(request: NextRequest)`**
    - Gets user's conversations
    - Returns conversation list

#### `/api/chat/conversations/[id]` (`src/app/api/chat/conversations/[id]/route.ts`)

36. **`GET(request: NextRequest, { params })`**
    - Gets conversation details
    - Returns messages

37. **`DELETE(request: NextRequest, { params })`**
    - Deletes conversation
    - Returns success status

---

### Inference Routes

#### `/api/inference` (`src/app/api/inference/route.ts`)

38. **`POST(request: NextRequest)`** ⭐
    - Submits inference request
    - Checks rate limits
    - Creates database record
    - Starts async processing
    - Returns request ID

#### `/api/inference/[id]` (`src/app/api/inference/[id]/route.ts`)

39. **`GET(request: NextRequest, { params })`**
    - Gets inference status
    - Returns request details

40. **`DELETE(request: NextRequest, { params })`**
    - Cancels inference request
    - Returns success status

#### `/api/inference/[id]/result` (`src/app/api/inference/[id]/result/route.ts`)

41. **`GET(request: NextRequest, { params })`**
    - Gets inference result
    - Returns 202 if still processing
    - Returns 200 with result if completed

---

### History Routes

#### `/api/history` (`src/app/api/history/route.ts`)

42. **`GET(request: NextRequest)`**
    - Gets user's request history
    - Supports pagination
    - Returns history list

#### `/api/history/[id]` (`src/app/api/history/[id]/route.ts`)

43. **`GET(request: NextRequest, { params })`**
    - Gets single history item
    - Returns item details

44. **`DELETE(request: NextRequest, { params })`**
    - Deletes history item
    - Returns success status

---

### Rate Limit Routes

#### `/api/rate-limit` (`src/app/api/rate-limit/route.ts`)

45. **`GET(request: NextRequest)`**
    - Gets current rate limit status
    - Returns limits and usage

---

### Stripe Payment Routes

#### `/api/stripe/create-checkout` (`src/app/api/stripe/create-checkout/route.ts`)

46. **`POST(request: NextRequest)`** ⭐
    - Creates Stripe checkout session
    - Validates user authentication
    - Maps plan to price ID
    - Returns checkout URL

#### `/api/stripe/create-portal` (`src/app/api/stripe/create-portal/route.ts`)

47. **`POST(request: NextRequest)`** ⭐
    - Creates Stripe customer portal session
    - Validates customer ID exists
    - Returns portal URL

#### `/api/stripe/webhook` (`src/app/api/stripe/webhook/route.ts`)

48. **`POST(request: NextRequest)`** ⭐
    - Main webhook handler
    - Validates webhook signature
    - Routes to event handlers
    - Returns success status

49. **`handleCheckoutCompleted(session)`**
    - Activates subscription after payment
    - Updates user tier
    - Creates subscription record

50. **`handleSubscriptionUpdated(subscription)`**
    - Updates subscription period
    - Updates status

51. **`handleSubscriptionDeleted(subscription)`**
    - Downgrades to free tier
    - Marks as cancelled

52. **`handleInvoicePaymentSucceeded(invoice)`**
    - Records successful payment
    - Creates invoice record

53. **`handleInvoicePaymentFailed(invoice)`**
    - Marks subscription as past_due
    - Logs failure

---

## 🎨 React Components

### Main Pages

#### Chat Page (`src/app/page.tsx`)

54. **`Home()` Component**
    - Main chat interface
    - Handles message sending
    - Manages conversation state

#### Subscribe Page (`src/app/subscribe/page.tsx`)

55. **`SubscribePage()` Component** ⭐
    - Displays pricing tiers
    - Handles upgrade flow

56. **`handleSubscribe(planId: string)`**
    - Creates checkout session
    - Redirects to Stripe

57. **`handleManageSubscription()`**
    - Opens customer portal
    - Redirects to Stripe

58. **`useEffect()` - Auth Check**
    - Redirects unauthenticated users
    - Loads current tier

#### Success Page (`src/app/subscribe/success/page.tsx`)

59. **`SubscribeSuccessPage()` Component**
    - Shows success message
    - Auto-redirects after 5 seconds

60. **`useEffect()` - Countdown Timer**
    - Manages countdown
    - Redirects to chat

#### Sign In Page (`src/app/signin/page.tsx`)

61. **`SignInPage()` Component**
    - Sign in form
    - Google OAuth button

62. **`handleSubmit(e: FormEvent)`**
    - Handles form submission
    - Calls NextAuth signIn

#### Landing Page (`src/app/landing/page.tsx`)

63. **`LandingPage()` Component**
    - Marketing landing page
    - Feature showcase

#### Features Page (`src/app/features/page.tsx`)

64. **`FeaturesPage()` Component**
    - Detailed feature list
    - Use cases

#### Pricing Page (`src/app/pricing/page.tsx`)

65. **`PricingPage()` Component**
    - Pricing comparison table
    - CTA buttons

---

### UI Components

#### ChatInterface (`src/components/ChatInterface.tsx`)

66. **`ChatInterface()` Component** ⭐
    - Main chat UI
    - Message display
    - Input handling

67. **`handleSendMessage()`**
    - Sends message to API
    - Updates UI with response

68. **`handleModelChange(model: string)`**
    - Switches LLM model
    - Updates state

#### Sidebar (`src/components/Sidebar.tsx`)

69. **`Sidebar()` Component**
    - Navigation sidebar
    - Conversation history

70. **`handleNewChat()`**
    - Starts new conversation
    - Clears messages

71. **`handleSelectConversation(id: string)`**
    - Loads conversation
    - Displays messages

#### Header (`src/components/Header.tsx`)

72. **`Header()` Component**
    - Top navigation bar
    - User menu

73. **`handleSignOut()`**
    - Signs out user
    - Clears session

#### ThemeToggle (`src/components/ThemeToggle.tsx`)

74. **`ThemeToggle()` Component**
    - Dark/light mode toggle
    - System preference detection

75. **`handleToggle()`**
    - Switches theme
    - Saves preference

#### ProtectedRoute (`src/components/ProtectedRoute.tsx`)

76. **`ProtectedRoute({ children })` Component**
    - Checks authentication
    - Redirects if not authenticated

77. **`useEffect()` - Auth Check**
    - Validates session
    - Redirects to sign in

#### Providers (`src/components/Providers.tsx`)

78. **`Providers({ children })` Component**
    - Wraps app with providers
    - NextAuth SessionProvider
    - Theme provider

#### HistoryPanel (`src/components/HistoryPanel.tsx`)

79. **`HistoryPanel()` Component**
    - Displays request history
    - Pagination controls

80. **`handleLoadMore()`**
    - Loads more history items
    - Updates state

81. **`handleDelete(id: string)`**
    - Deletes history item
    - Refreshes list

#### InferencePanel (`src/components/InferencePanel.tsx`)

82. **`InferencePanel()` Component**
    - Inference request form
    - Result display

83. **`handleSubmit()`**
    - Submits inference request
    - Polls for result

#### RateLimitCard (`src/components/RateLimitCard.tsx`)

84. **`RateLimitCard()` Component**
    - Displays rate limit status
    - Usage statistics

85. **`useEffect()` - Fetch Limits**
    - Fetches current limits
    - Updates every 10 seconds

#### StatsCard (`src/components/StatsCard.tsx`)

86. **`StatsCard({ title, value, icon })` Component**
    - Displays single statistic
    - Reusable card component

#### ApiKeyManager (`src/components/ApiKeyManager.tsx`)

87. **`ApiKeyManager()` Component**
    - Manages API keys
    - Create/revoke keys

88. **`handleCreateKey()`**
    - Creates new API key
    - Displays key once

89. **`handleRevokeKey(id: string)`**
    - Revokes API key
    - Confirms action

#### Dialog (`src/components/Dialog.tsx`)

90. **`Dialog({ open, onClose, children })` Component**
    - Modal dialog component
    - Reusable overlay

---

## 📊 Summary Statistics

### Total Functions by Category

| Category | Count | Description |
|----------|-------|-------------|
| **Database** | 4 | Connection pooling, queries |
| **Authentication** | 5 | JWT, API keys, NextAuth callbacks |
| **Rate Limiting** | 1 | Tier-based limits |
| **LLM Integration** | 7 | OpenAI, Gemini, processing |
| **API Client** | 4 | Frontend API calls |
| **State Management** | 5 | Zustand stores |
| **API Routes** | 17 | REST endpoints |
| **Stripe Integration** | 8 | Payments, webhooks |
| **React Components** | 39 | UI components, pages |
| **Utilities** | 1 | CSS class merging |

### **GRAND TOTAL: 91 Functions** 🎉

---

## 🔥 Most Critical Functions

These functions are the backbone of the platform:

1. **`query()`** - All database operations
2. **`authenticateToken()`** - API security
3. **`authenticateApiKey()`** - API key validation
4. **`checkRateLimit()`** - Usage enforcement
5. **`processInference()`** - LLM processing
6. **`chat()`** - Chat completions
7. **`POST /api/chat`** - Chat endpoint
8. **`POST /api/inference`** - Inference endpoint
9. **`POST /api/stripe/webhook`** - Payment processing
10. **`ChatInterface()`** - Main UI component

---

## 🎯 Function Call Flow Examples

### Chat Message Flow
```
User types message
→ ChatInterface.handleSendMessage()
→ POST /api/chat
→ authenticateToken()
→ checkRateLimit()
→ chat()
→ callGeminiChat() or callOpenAIChat()
→ query() to save
→ Response to user
```

### Subscription Upgrade Flow
```
User clicks "Upgrade"
→ SubscribePage.handleSubscribe()
→ POST /api/stripe/create-checkout
→ Stripe Checkout
→ Payment completed
→ POST /api/stripe/webhook
→ handleCheckoutCompleted()
→ query() to update tier
→ Redirect to success page
```

### Inference Request Flow
```
User submits inference
→ InferencePanel.handleSubmit()
→ POST /api/inference
→ authenticateApiKey()
→ checkRateLimit()
→ query() to create request
→ processInference() (async)
→ callOpenAI() or callGemini()
→ updateUsageStatistics()
→ query() to save result
→ pollForResult() gets response
```

---

## 📝 Notes

- All database functions use parameterized queries to prevent SQL injection
- All API routes validate authentication before processing
- All LLM calls include error handling and retry logic
- All state management uses Zustand with localStorage persistence
- All components follow React best practices with hooks
- All Stripe operations validate webhook signatures

---

**Last Updated:** February 5, 2026
**Total Lines of Code:** ~15,000+
**Total Files:** 50+
**Total Functions:** 91
