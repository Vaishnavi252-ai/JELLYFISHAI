# 🔐 JellyfishAI - Environment Setup Guide

## Table of Contents
1. [Quick Start](#quick-start)
2. [API Provider Setup](#api-provider-setup)
3. [Environment Variables](#environment-variables)
4. [Verification & Testing](#verification--testing)
5. [Troubleshooting](#troubleshooting)
6. [Security Best Practices](#security-best-practices)

---

## Quick Start

### Step 1: Create .env File

```bash
# Copy the example file
cp .env.example .env
```

### Step 2: Add Your API Key

Choose ONE of these options:

**Option A: Anthropic Claude (Recommended)**
```env
VITE_ANTHROPIC_API_KEY=sk-ant-v1-xxxxxxxxxxxxxxxxxxxx
```

**Option B: OpenAI**
```env
VITE_OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxxxxxxxxx
```

### Step 3: Start Development Server

```bash
npm install
npm run dev
```

---

## API Provider Setup

### Anthropic Claude (Recommended ⭐)

**Why Anthropic?**
- Better for code generation tasks
- More cost-effective for longer contexts
- Excellent at following instructions
- Better at generating production-ready code

**Setup Steps:**

1. Visit [console.anthropic.com](https://console.anthropic.com)
2. Sign up or log in
3. Go to **API Keys** section
4. Click **Create Key**
5. Copy the key (starts with `sk-ant-v1-`)
6. Add to `.env`:
   ```env
   VITE_ANTHROPIC_API_KEY=sk-ant-v1-xxxxxxxxxxxxxxxxxxxx
   ```

**Available Models:**
- `claude-3-5-sonnet-20241022` (Best for code, cheapest)
- `claude-3-opus-20240229` (Most powerful, slower)
- `claude-3-haiku-20240307` (Fastest, less powerful)

---

### OpenAI

**Why OpenAI?**
- Very popular and well-known
- Good for general tasks
- Large community and resources
- Proven in production systems

**Setup Steps:**

1. Visit [platform.openai.com](https://platform.openai.com)
2. Sign up or log in
3. Go to **API Keys**
4. Click **Create new secret key**
5. Copy the key (starts with `sk-proj-`)
6. Add to `.env`:
   ```env
   VITE_OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxxxxxxxxx
   ```

**Available Models:**
- `gpt-4o-mini` (Fast, cost-effective)
- `gpt-4-turbo` (More powerful)
- `gpt-4o` (Latest, best quality)

---

## Environment Variables

### Required Variables

```env
# Choose ONE API provider:
VITE_ANTHROPIC_API_KEY=your_key_here    # OR
VITE_OPENAI_API_KEY=your_key_here       # OR
```

### Optional Variables

```env
# Development Server
VITE_PORT=5173
VITE_HOST=localhost

# API Configuration
VITE_API_BASE_URL=http://localhost:3000/api
VITE_REQUEST_TIMEOUT=30000

# Feature Flags
VITE_ENABLE_CODE_GENERATION=true
VITE_ENABLE_CODE_CORRECTION=true
VITE_ENABLE_DEPLOYMENT=true

# Debugging
VITE_DEBUG_API=false
VITE_LOG_LEVEL=info
```

### How Environment Variables Work

In Vite + React projects:

```typescript
// ✅ Correct: Use import.meta.env with VITE_ prefix
const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY;

// ❌ Wrong: These won't work
const apiKey = process.env.VITE_ANTHROPIC_API_KEY;  // Won't work in browser
const apiKey = process.env.API_KEY;                 // Missing VITE_ prefix
```

---

## Verification & Testing

### Method 1: Check API Configuration

The app automatically validates your configuration:

```typescript
import { validateApiConfig, getApiProvider } from './utils/apiClient';

// Check if API is configured
const { isValid, message } = validateApiConfig();
console.log(isValid ? '✅ API Ready' : '❌ ' + message);

// Check which provider is active
const provider = getApiProvider();
console.log('Active Provider:', provider); // 'anthropic' | 'openai' | 'none'
```

### Method 2: Manual Test

Create a test file `src/utils/testApi.ts`:

```typescript
import { generateCodeWithAI } from './aiCodeGenerator';
import { ProjectRequirement, TechStack } from '../types';

export async function testApiIntegration() {
  const mockRequirements: ProjectRequirement[] = [
    {
      id: '1',
      title: 'Simple Counter App',
      description: 'A simple counter that increments and decrements',
      priority: 'high',
      category: 'ui',
    },
  ];

  const mockTechStack: TechStack[] = [
    {
      id: 'react',
      name: 'React',
      category: 'frontend',
      version: '18.2.0',
      icon: 'react',
      description: 'JavaScript library for building UIs',
    },
  ];

  try {
    console.log('🧪 Testing API integration...');
    const files = await generateCodeWithAI(mockRequirements, mockTechStack);
    console.log('✅ API test passed! Generated', files.length, 'files');
    return files;
  } catch (error) {
    console.error('❌ API test failed:', error);
  }
}
```

Then in your component:

```typescript
import { useEffect } from 'react';
import { testApiIntegration } from '../utils/testApi';

export function TestComponent() {
  useEffect(() => {
    testApiIntegration();
  }, []);

  return <div>Check browser console for test results</div>;
}
```

### Method 3: Browser DevTools

1. Open browser DevTools (F12)
2. Go to **Console** tab
3. Type and run:
   ```javascript
   // Check if API key is available
   console.log(import.meta.env.VITE_ANTHROPIC_API_KEY ? '✅ Key loaded' : '❌ Key missing');
   ```

---

## Troubleshooting

### Issue 1: API Key Not Found

**Symptom:** "API key is not configured" error

**Solutions:**
1. ✅ Make sure `.env` file exists in project root
2. ✅ Verify spelling: `VITE_ANTHROPIC_API_KEY` (case-sensitive)
3. ✅ Restart dev server after adding `.env`
4. ✅ Check that key value doesn't have quotes:
   ```env
   # ✅ Correct
   VITE_ANTHROPIC_API_KEY=sk-ant-v1-xxxx
   
   # ❌ Wrong
   VITE_ANTHROPIC_API_KEY="sk-ant-v1-xxxx"
   ```

### Issue 2: "Failed to fetch" Error

**Symptom:** Network error when calling API

**Solutions:**
1. ✅ Verify API key is valid
2. ✅ Check internet connection
3. ✅ Ensure no firewall/proxy blocking requests
4. ✅ Verify API endpoint is correct
5. ✅ Check API service status:
   - Anthropic: [status.anthropic.com](https://status.anthropic.com)
   - OpenAI: [status.openai.com](https://status.openai.com)

### Issue 3: Invalid API Key Error

**Symptom:** "Invalid API key" or 401/403 error

**Solutions:**
1. ✅ Delete old/expired keys and create new one
2. ✅ Verify you copied the ENTIRE key
3. ✅ Check key format:
   - Anthropic keys start with `sk-ant-v1-`
   - OpenAI keys start with `sk-proj-` or `sk-`
4. ✅ Ensure no extra spaces or newlines:
   ```env
   # ❌ Wrong (has trailing space)
   VITE_ANTHROPIC_API_KEY=sk-ant-v1-xxxx 
   
   # ✅ Correct
   VITE_ANTHROPIC_API_KEY=sk-ant-v1-xxxx
   ```

### Issue 4: Rate Limiting (429 Error)

**Symptom:** "Too many requests" error

**Solutions:**
1. ✅ Wait a few minutes before retrying
2. ✅ App has automatic retry with exponential backoff
3. ✅ Check API usage dashboard
4. ✅ Upgrade plan if needed

### Issue 5: Timeout Error

**Symptom:** Request takes too long and times out

**Solutions:**
1. ✅ Increase timeout in `.env`:
   ```env
   VITE_REQUEST_TIMEOUT=60000  # 60 seconds instead of 30
   ```
2. ✅ Reduce prompt complexity
3. ✅ Try with fewer requirements
4. ✅ Check internet speed

---

## Security Best Practices

### 🔒 Never Do This

```bash
# ❌ DON'T commit .env file
git add .env
git commit -m "Add env"

# ❌ DON'T log API keys
console.log('API Key:', apiKey);

# ❌ DON'T put sensitive data in client-side code
const SECRET = "super-secret-token"; // Visible to all users!

# ❌ DON'T share API keys in chat/email
"Here's my key for you: sk-ant-v1-xxx"
```

### ✅ Do This Instead

```bash
# ✅ Add .env to .gitignore
echo ".env" >> .gitignore
git add .gitignore
git commit -m "Add .env to gitignore"

# ✅ Use .env.example for documentation
cp .env .env.example
# Remove actual keys from .env.example
git add .env.example

# ✅ Set env vars on deployment platform
# For Netlify: Settings > Build & deploy > Environment
# For Vercel: Settings > Environment Variables
# For GitHub Actions: Settings > Secrets and variables

# ✅ Rotate keys regularly
# Generate new key every 3-6 months

# ✅ Use version control for .env structure
# .env.example shows all possible variables
# .env contains actual values (never committed)
```

### .gitignore

```bash
# Environment variables
.env
.env.local
.env.*.local

# Keep the example for reference
!.env.example
```

---

## Testing Configuration

### Quick Test Script

Create `test-config.ts`:

```typescript
import { validateApiConfig, getApiProvider } from './utils/apiClient';

export function testConfiguration() {
  console.log('🔍 Checking JellyfishAI Configuration...\n');

  // Check API
  const { isValid, message } = validateApiConfig();
  console.log(`API Status: ${isValid ? '✅' : '❌'} ${message}`);

  // Check provider
  const provider = getApiProvider();
  console.log(`Active Provider: ${provider === 'none' ? '❌ None' : `✅ ${provider}`}`);

  // Environment info
  console.log(`\nEnvironment: ${import.meta.env.MODE}`);
  console.log(`Debug Mode: ${import.meta.env.VITE_DEBUG_API === 'true' ? '✅ ON' : '❌ OFF'}`);

  if (!isValid) {
    console.warn('\n⚠️  Fix configuration before proceeding');
    return false;
  }

  console.log('\n✅ Configuration looks good!');
  return true;
}
```

---

## Next Steps

After setting up environment:

1. ✅ Test API integration
2. ✅ Generate sample code
3. ✅ Try code correction feature
4. ✅ Test deployment pipeline
5. ✅ Deploy to production

**Need help?** Check the main [README.md](./README.md) or create an issue on GitHub.
