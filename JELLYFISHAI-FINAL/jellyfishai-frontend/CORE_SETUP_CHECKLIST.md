# 🚀 JellyfishAI - Core Setup Checklist

## Phase 1: ✅ CRITICAL SETUP (Do These First)

### 1.1 Environment Configuration
- [x] Created `.env.example` with all configuration options
- [x] Created `ENVIRONMENT_SETUP.md` with detailed guide
- [ ] **TODO: Create your `.env` file**
  ```bash
  cp .env.example .env
  ```
- [ ] **TODO: Add API Key to `.env`**
  ```env
  VITE_ANTHROPIC_API_KEY=sk-ant-v1-xxxxxxxxxxxx
  # OR
  VITE_OPENAI_API_KEY=sk-proj-xxxxxxxxxxxx
  ```

### 1.2 API Client Setup
- [x] Created `src/utils/apiClient.ts` with:
  - ✅ Retry logic with exponential backoff
  - ✅ Request timeout handling
  - ✅ Error handling and logging
  - ✅ API validation functions
  - ✅ Provider detection (Anthropic vs OpenAI)

### 1.3 Code Generation Improvements
- [x] Updated `src/utils/aiCodeGenerator.ts` with:
  - ✅ Support for both Anthropic and OpenAI APIs
  - ✅ Proper error handling
  - ✅ Fallback to mock data
  - ✅ Better validation
  - ✅ Improved logging and debugging
  - ✅ Enhanced prompt building

### 1.4 Error Handling
- [x] Created `src/components/ErrorBoundary.tsx` with:
  - ✅ React Error Boundary
  - ✅ User-friendly error UI
  - ✅ Development error details
  - ✅ Recovery options
- [x] Updated `src/App.tsx` to use ErrorBoundary

---

## Phase 2: 🔧 IMMEDIATE NEXT STEPS

### 2.1 Verify Configuration
- [ ] Create `.env` file from `.env.example`
- [ ] Add your API key (Anthropic or OpenAI)
- [ ] Verify `.env` is in `.gitignore`
- [ ] Restart development server: `npm run dev`

### 2.2 Test API Integration
- [ ] Open browser console (F12)
- [ ] Check for error messages
- [ ] Try generating simple code in the app
- [ ] Verify API calls in Network tab

### 2.3 Verify Installation
```bash
# Install dependencies if not done
npm install

# Start dev server
npm run dev

# Visit http://localhost:5173
# Check browser console for any errors
```

---

## Files Created/Modified

### ✅ New Files Created

1. **`src/utils/apiClient.ts`** (145 lines)
   - API request wrapper with retry logic
   - Timeout handling
   - Error logging and validation
   - Provider detection

2. **`.env.example`** (100+ lines)
   - Complete configuration template
   - All available options documented
   - Environment variables explained

3. **`ENVIRONMENT_SETUP.md`** (400+ lines)
   - Complete setup guide
   - API provider setup instructions
   - Troubleshooting guide
   - Security best practices
   - Testing methods

4. **`src/components/ErrorBoundary.tsx`** (200+ lines)
   - React Error Boundary component
   - User-friendly error UI
   - Development error details
   - Error recovery

### ✅ Files Modified

1. **`src/utils/aiCodeGenerator.ts`**
   - Replaced with improved version
   - Added Anthropic API support
   - Better error handling
   - Enhanced fallback logic

2. **`src/App.tsx`**
   - Added ErrorBoundary import
   - Wrapped app content with ErrorBoundary
   - Better error handling throughout

---

## Configuration Quick Reference

### For Anthropic Users

```env
VITE_ANTHROPIC_API_KEY=sk-ant-v1-YOUR_KEY_HERE
VITE_DEBUG_API=false
VITE_LOG_LEVEL=info
```

**Get API Key:**
1. Visit https://console.anthropic.com
2. Sign up/login
3. Go to API Keys
4. Create new key
5. Copy and paste into `.env`

### For OpenAI Users

```env
VITE_OPENAI_API_KEY=sk-proj-YOUR_KEY_HERE
VITE_DEBUG_API=false
VITE_LOG_LEVEL=info
```

**Get API Key:**
1. Visit https://platform.openai.com
2. Sign up/login
3. Go to API Keys
4. Create new secret key
5. Copy and paste into `.env`

---

## How to Use the New Features

### 1. Automatic API Provider Detection

```typescript
import { getApiProvider, validateApiConfig } from './utils/apiClient';

// Check which provider is active
const provider = getApiProvider();
console.log(provider); // 'anthropic' | 'openai' | 'none'

// Validate configuration
const { isValid, message } = validateApiConfig();
if (isValid) {
  console.log('✅ API is configured');
} else {
  console.log('❌ Configure API:', message);
}
```

### 2. Automatic Retry Logic

The API client automatically retries failed requests:

```typescript
import { makeApiRequest } from './utils/apiClient';

const response = await makeApiRequest('/api/endpoint', {
  method: 'POST',
  maxRetries: 3,        // Retry up to 3 times
  timeout: 30000,       // 30 second timeout
  onRetry: (attempt, error) => {
    console.log(`Retry attempt ${attempt}: ${error}`);
  }
});

if (response.success) {
  console.log('Success:', response.data);
} else {
  console.log('Error:', response.error);
}
```

### 3. Error Boundary for Component Errors

```typescript
import { ErrorBoundary } from './components/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary 
      onError={(error, errorInfo) => {
        // Log to error tracking service
        console.error('Component error:', error);
      }}
    >
      <YourComponent />
    </ErrorBoundary>
  );
}
```

### 4. API Activity Logging

```typescript
import { logApiActivity } from './utils/apiClient';

// Log API requests
logApiActivity('POST', 'https://api.example.com', 'request', {
  params: { foo: 'bar' }
});

// Log API responses
logApiActivity('POST', 'https://api.example.com', 'success', {
  statusCode: 200,
  duration: 234
});

// Log API errors
logApiActivity('POST', 'https://api.example.com', 'error', {
  error: 'Network timeout',
  retries: 3
});
```

---

## Testing API Integration

### Quick Test (Copy & Paste in Browser Console)

```javascript
// Test if API key is loaded
console.log('API Key loaded:', import.meta.env.VITE_ANTHROPIC_API_KEY ? 'Yes' : 'No');

// Test code generation
import('./src/utils/aiCodeGenerator.js').then(({ generateCodeWithAI }) => {
  generateCodeWithAI([{
    id: '1',
    title: 'Test App',
    description: 'Simple test',
    priority: 'high',
    category: 'ui'
  }], [{
    id: 'react',
    name: 'React',
    category: 'frontend',
    version: '18.2.0',
    icon: 'react',
    description: 'Test'
  }]).then(files => {
    console.log('✅ Generation success:', files.length, 'files');
  }).catch(err => {
    console.error('❌ Generation failed:', err);
  });
});
```

---

## Troubleshooting Checklist

### If API calls fail:

- [ ] Check if `.env` file exists in project root
- [ ] Verify API key is not empty
- [ ] Check API key format (starts with correct prefix)
- [ ] Restart dev server after adding `.env`
- [ ] Check browser Network tab for actual error
- [ ] Verify internet connection
- [ ] Check API service status

### If app crashes:

- [ ] Check browser console for error messages
- [ ] Click "Try Again" button on error page
- [ ] Check ErrorBoundary component is rendering
- [ ] Verify all imports are correct
- [ ] Clear browser cache and reload

### If code generation returns mock data:

- [ ] API key might be invalid
- [ ] API service might be down
- [ ] Request might be timing out
- [ ] Check browser Network tab
- [ ] Look at API response status

---

## Security Checklist

- [ ] `.env` file is in `.gitignore`
- [ ] Never commit actual `.env` file
- [ ] Use `.env.example` for documentation only
- [ ] Never log API keys to console
- [ ] Never share API keys in emails/chat
- [ ] Rotate API keys every 3-6 months
- [ ] Use environment variables only for non-sensitive config

---

## What's Next?

After completing this phase:

1. ✅ **Core API Setup** - DONE (you are here)
2. 🔨 **Component Fixes** - Fix UI components and features
3. 🎨 **UI/UX Improvements** - Add loading states, animations
4. 📦 **Build & Deploy** - Prepare for production
5. ✅ **Final Testing** - Test all features

---

## File Locations & Descriptions

```
project/
├── .env                          ← Your configuration (DO NOT COMMIT)
├── .env.example                  ← Template (COMMIT THIS)
├── ENVIRONMENT_SETUP.md          ← Setup guide (THIS FILE)
├── src/
│   ├── utils/
│   │   ├── apiClient.ts         ← API request wrapper (NEW)
│   │   └── aiCodeGenerator.ts   ← AI code generation (UPDATED)
│   ├── components/
│   │   └── ErrorBoundary.tsx    ← Error handling (NEW)
│   └── App.tsx                  ← Main app (UPDATED)
└── package.json
```

---

## Quick Commands

```bash
# Start development
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linting
npm run lint
```

---

## Support & Resources

- 📖 [Anthropic API Docs](https://docs.anthropic.com)
- 📖 [OpenAI API Docs](https://platform.openai.com/docs)
- 🐛 [Common Issues Guide](./ENVIRONMENT_SETUP.md#troubleshooting)
- 💬 [GitHub Issues](https://github.com/your-repo/issues)

---

## Success Metrics

✅ You know API setup is complete when:

1. `.env` file exists with API key
2. No "API key not configured" errors
3. App generates code without falling back to mock data
4. Network tab shows successful API calls
5. Generated code has more than 5 files
6. No red errors in browser console

---

**Last Updated:** March 19, 2026
**Version:** 1.0.0
**Status:** ✅ Ready for Testing
