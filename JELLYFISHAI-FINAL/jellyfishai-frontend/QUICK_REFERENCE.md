# 📋 JellyfishAI Quick Reference Card

## 🚀 Quick Start (Copy & Paste)

```bash
# Step 1: Copy .env.example to .env
cp .env.example .env

# Step 2: Add your API key to .env
# VITE_ANTHROPIC_API_KEY=sk-ant-v1-YOUR_KEY

# Step 3: Start dev server
npm run dev

# Step 4: Visit http://localhost:5173
```

---

## 🔑 API Key Setup

### Anthropic Claude (Recommended ⭐)
| Step | Action |
|------|--------|
| 1 | Go to https://console.anthropic.com |
| 2 | Sign up/Login |
| 3 | Click "API Keys" |
| 4 | Click "Create Key" |
| 5 | Copy key (starts with `sk-ant-v1-`) |
| 6 | Add to `.env`: `VITE_ANTHROPIC_API_KEY=xxx` |
| 7 | Restart dev server |

### OpenAI
| Step | Action |
|------|--------|
| 1 | Go to https://platform.openai.com |
| 2 | Sign up/Login |
| 3 | Click "API Keys" |
| 4 | Click "Create new secret key" |
| 5 | Copy key |
| 6 | Add to `.env`: `VITE_OPENAI_API_KEY=xxx` |
| 7 | Restart dev server |

---

## ⚙️ Environment Variables

### Required
```env
# Choose ONE:
VITE_ANTHROPIC_API_KEY=sk-ant-v1-xxxxxxxxxxxx
# OR
VITE_OPENAI_API_KEY=sk-proj-xxxxxxxxxxxx
```

### Optional
```env
VITE_DEBUG_API=false              # Enable API logs
VITE_LOG_LEVEL=info               # Log level
VITE_REQUEST_TIMEOUT=30000        # Timeout in ms
```

---

## 🐛 Troubleshooting

### Problem: "API key not configured"
```
✅ Solution:
1. Create .env file: cp .env.example .env
2. Add API key to .env
3. Restart: npm run dev
```

### Problem: "Failed to fetch"
```
✅ Solution:
1. Check internet connection
2. Check API key is valid
3. Check API service status
4. App will auto-retry (up to 3 times)
```

### Problem: "Invalid API key"
```
✅ Solution:
1. Get fresh key from provider dashboard
2. Make sure you copied entire key
3. Check key format:
   - Anthropic: sk-ant-v1-xxx
   - OpenAI: sk-proj-xxx or sk-xxx
```

### Problem: App crashes
```
✅ Solution:
1. Check browser console (F12)
2. Click "Try Again" button
3. Check error message
4. Review ENVIRONMENT_SETUP.md
```

---

## 📁 Key Files

| File | Purpose | Status |
|------|---------|--------|
| `.env` | Your configuration | CREATE THIS |
| `.env.example` | Template | Reference |
| `src/utils/apiClient.ts` | API wrapper | USE THIS |
| `src/utils/aiCodeGenerator.ts` | AI generation | USE THIS |
| `src/components/ErrorBoundary.tsx` | Error handling | USE THIS |
| `ENVIRONMENT_SETUP.md` | Setup guide | READ THIS |

---

## 🔍 Test Configuration

### In Browser Console
```javascript
// Check API key loaded
import.meta.env.VITE_ANTHROPIC_API_KEY ? '✅ Loaded' : '❌ Missing'

// Check provider
navigator.fetch('https://api.anthropic.com') ? '✅ Can access' : '❌ Blocked'
```

### Generate Test Code
1. Open http://localhost:5173
2. Click "Get Started"
3. Enter any requirement
4. Select tech stack
5. Click "Generate Code"
6. Should see generated files

---

## ⏱️ Timing

| Operation | Expected Time |
|-----------|---------------|
| API initialization | < 100ms |
| Code generation | 2-5 seconds |
| Retry wait (1st) | 1 second |
| Retry wait (2nd) | 2 seconds |
| Retry wait (3rd) | 4 seconds |
| Request timeout | 30 seconds |

---

## 🛡️ Security Checklist

- [ ] `.env` file NOT committed (check .gitignore)
- [ ] API key kept secret (never share in chat/email)
- [ ] `.env.example` has NO real secrets
- [ ] No API keys in console.log()
- [ ] No API keys in error messages

---

## 📚 Documentation

### Must Read
1. `ENVIRONMENT_SETUP.md` - Complete setup guide
2. `CORE_SETUP_CHECKLIST.md` - Implementation checklist
3. `.env.example` - Configuration template

### Reference
1. `IMPLEMENTATION_DETAILS.md` - Code examples
2. `README.md` - Project overview

---

## 🎯 Success Indicators

- ✅ `.env` exists with API key
- ✅ No "API key not configured" error
- ✅ App generates code (not mock data)
- ✅ Network tab shows API calls
- ✅ Generated code has 5+ files
- ✅ Error messages are helpful

---

## 💡 Pro Tips

### Tip 1: Check API Status
- Anthropic: https://status.anthropic.com
- OpenAI: https://status.openai.com

### Tip 2: Debug API Calls
```javascript
// In console:
localStorage.setItem('debug', 'api');
// Reload page and check console
```

### Tip 3: Use Incognito Mode
Test in private/incognito window to avoid cache issues

### Tip 4: Monitor Network Tab
Open DevTools → Network → Look for API calls

### Tip 5: Check Logs
Look for `[timestamp] POST API:` logs in console

---

## 🔗 Resources

### Anthropic
- Website: https://anthropic.com
- Console: https://console.anthropic.com
- Docs: https://docs.anthropic.com
- Status: https://status.anthropic.com

### OpenAI
- Website: https://openai.com
- Platform: https://platform.openai.com
- Docs: https://platform.openai.com/docs
- Status: https://status.openai.com

### Local Development
- Vite: https://vitejs.dev
- React: https://react.dev
- TypeScript: https://www.typescriptlang.org

---

## 🚀 Next Commands

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

## 📞 Support

### If stuck on setup:
1. Read `ENVIRONMENT_SETUP.md`
2. Check troubleshooting section
3. Verify `.env` has API key
4. Check browser console
5. Restart dev server

### If API calls failing:
1. Verify internet connection
2. Check API key validity
3. Check API provider status
4. Review Network tab
5. Try different API provider

### If app crashes:
1. Check browser console
2. Click "Try Again" button
3. Clear cache and reload
4. Check error message
5. Review CORE_SETUP_CHECKLIST.md

---

## 📊 Configuration Template

```env
# Your .env file should look like:

# API Configuration (choose ONE)
VITE_ANTHROPIC_API_KEY=sk-ant-v1-xxxxxxxxxxxx

# OR for OpenAI:
# VITE_OPENAI_API_KEY=sk-proj-xxxxxxxxxxxx

# Optional settings
VITE_DEBUG_API=false
VITE_LOG_LEVEL=info
VITE_REQUEST_TIMEOUT=30000

# That's it! 🎉
```

---

## ✅ Checklist Before Going to Next Phase

- [ ] `.env` created from `.env.example`
- [ ] API key added to `.env`
- [ ] Dev server started: `npm run dev`
- [ ] App loads at http://localhost:5173
- [ ] No API key configuration errors
- [ ] Can generate code
- [ ] No crashes in browser
- [ ] ErrorBoundary component active
- [ ] All documentation files read
- [ ] Ready for Component Fixes phase

---

## 🎉 Quick Win Checklist

```
✅ Created .env file
✅ Added API key
✅ Restarted dev server
✅ Opened http://localhost:5173
✅ No configuration errors
✅ Generated sample code
✅ Tested error handling
✅ Ready for next phase!

Total Time: ~10 minutes
```

---

## 🚨 Red Flags

If you see these, something's wrong:

| ❌ Red Flag | ✅ Fix |
|-----------|--------|
| "API key not configured" | Add key to `.env` |
| "Failed to fetch" | Check internet, API status |
| "Invalid API key" | Get fresh key from dashboard |
| App crashes silently | Check browser console |
| Network shows 401/403 | API key is invalid |
| Network shows 500/502 | API provider is down |

---

## 📈 Performance Tips

```typescript
// ✅ Good - Parallel requests
Promise.all([req1, req2, req3])

// ❌ Bad - Sequential requests
await req1; await req2; await req3;

// ✅ Good - Batch operations
POST /generate { reqs: [req1, req2] }

// ❌ Bad - Individual requests
POST /generate req1
POST /generate req2
```

---

**Last Updated:** March 19, 2026
**Version:** 1.0
**Status:** ✅ READY

Keep this handy for quick reference! 📌
