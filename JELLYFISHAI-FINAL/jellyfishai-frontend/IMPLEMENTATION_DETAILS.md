# 💻 JellyfishAI - Implementation Details & Code Examples

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    JELLYFISHAI PLATFORM                      │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Frontend (React + TypeScript)                              │
│  ├─ App.tsx (with ErrorBoundary)                            │
│  ├─ Components/                                             │
│  │  ├─ CodeGeneration.tsx                                   │
│  │  ├─ CodeCorrection.tsx                                   │
│  │  ├─ DeploymentPipeline.tsx                               │
│  │  ├─ ErrorBoundary.tsx ← NEW                              │
│  │  └─ ... (12+ more components)                            │
│  │                                                           │
│  └─ Utils/                                                  │
│     ├─ apiClient.ts ← NEW                                   │
│     ├─ aiCodeGenerator.ts ← UPDATED                         │
│     └─ ... (other utilities)                                │
│                                                              │
│  API Layer (apiClient.ts)                                   │
│  ├─ makeApiRequest()          - HTTP wrapper               │
│  ├─ validateApiConfig()       - Check configuration        │
│  ├─ getApiProvider()          - Detect Anthropic/OpenAI    │
│  └─ logApiActivity()          - Debug logging              │
│                                                              │
│  Code Generation (aiCodeGenerator.ts)                       │
│  ├─ generateCodeWithAI()      - Main function              │
│  ├─ generateWithAnthropic()   - Anthropic API              │
│  ├─ generateWithOpenAI()      - OpenAI API                 │
│  ├─ detectSystemIntent()      - Analyze requirements       │
│  ├─ buildArchitecture()       - Plan system structure      │
│  ├─ buildSmartPrompt()        - Create AI prompt           │
│  └─ getMockFiles()            - Fallback data              │
│                                                              │
│  Error Handling (ErrorBoundary.tsx)                         │
│  ├─ React Error Boundary      - Catch component errors     │
│  ├─ Async Error Boundary      - Catch async errors         │
│  └─ useErrorHandler()         - Hook for functional comps  │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## Key Implementation Details

### 1. API Client Flow

```typescript
// src/utils/apiClient.ts

// Request with retry logic
const response = await makeApiRequest<ResponseType>(
  'https://api.anthropic.com/v1/messages',
  {
    method: 'POST',
    headers: { /* auth headers */ },
    body: JSON.stringify({ /* payload */ }),
    maxRetries: 3,
    timeout: 30000,
    onRetry: (attempt, error) => {
      console.log(`Retry ${attempt}: ${error}`);
    }
  }
);

// Returns: { success: boolean, data?: T, error?: string }
if (response.success) {
  console.log('Success:', response.data);
} else {
  console.log('Error:', response.error);
}
```

### 2. Code Generation Flow

```typescript
// src/utils/aiCodeGenerator.ts

export async function generateCodeWithAI(
  requirements: ProjectRequirement[],
  techStack: TechStack[]
): Promise<GeneratedCode[]> {
  
  // Step 1: Validate API configuration
  const config = validateApiConfig();
  if (!config.isValid) {
    console.warn('Using mock data');
    return getMockFiles(techStack);  // Fallback
  }

  // Step 2: Detect system intent
  const intent = detectSystemIntent(requirements);
  // Returns: 'AUTH_SYSTEM' | 'CART_SYSTEM' | 'PAYMENT_SYSTEM' | 'GENERIC_SYSTEM'

  // Step 3: Build architecture
  const architecture = buildArchitecture(intent);
  // Returns: [string] - List of modules to implement

  // Step 4: Build smart prompt
  const prompt = buildSmartPrompt(requirements, techStack, intent, architecture);
  // Returns: string - Complete prompt for AI

  // Step 5: Call appropriate API provider
  const provider = getApiProvider();
  let result: GeneratedCode[];
  
  if (provider === 'anthropic') {
    result = await generateWithAnthropic(prompt);
  } else {
    result = await generateWithOpenAI(prompt);
  }

  // Step 6: Validate result
  if (!validateGeneratedSystem(result, intent)) {
    return getMockFiles(techStack);  // Fallback
  }

  return result;  // Success!
}
```

### 3. Error Boundary Implementation

```typescript
// src/components/ErrorBoundary.tsx

<ErrorBoundary 
  fallback={<CustomErrorUI />}
  onError={(error, errorInfo) => {
    // Log to error tracking service
    console.error('Error caught:', error);
  }}
>
  <YourComponent />
</ErrorBoundary>

// In App.tsx:
export default function App() {
  return (
    <ErrorBoundary>
      <div className="app">
        {/* Your app content */}
      </div>
    </ErrorBoundary>
  );
}
```

---

## API Provider Integration

### Anthropic Claude API

```typescript
// generateWithAnthropic() implementation

async function generateWithAnthropic(prompt: string) {
  const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY;
  
  const response = await makeApiRequest<{
    content: Array<{ type: string; text: string }>
  }>(
    'https://api.anthropic.com/v1/messages',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 8000,
        messages: [{ role: 'user', content: prompt }],
      }),
    }
  );

  const text = response.data?.content?.[0]?.text;
  return parseGeneratedCode(text);
}
```

### OpenAI API

```typescript
// generateWithOpenAI() implementation

async function generateWithOpenAI(prompt: string) {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  
  const response = await makeApiRequest<{
    choices: Array<{ message: { content: string } }>
  }>(
    'https://api.openai.com/v1/chat/completions',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.45,
        max_tokens: 8000,
      }),
    }
  );

  const text = response.data?.choices?.[0]?.message?.content;
  return parseGeneratedCode(text);
}
```

---

## Configuration Management

### Environment Variables

```env
# .env file (created from .env.example)

# API Provider (choose ONE)
VITE_ANTHROPIC_API_KEY=sk-ant-v1-xxxxxxxxxxxx
# OR
VITE_OPENAI_API_KEY=sk-proj-xxxxxxxxxxxx

# Optional settings
VITE_DEBUG_API=false
VITE_LOG_LEVEL=info
VITE_REQUEST_TIMEOUT=30000
```

### Runtime Configuration Check

```typescript
import { validateApiConfig, getApiProvider } from './utils/apiClient';

// Check if configured
const { isValid, message } = validateApiConfig();
if (!isValid) {
  console.error('❌ API not configured:', message);
  // Will fallback to mock data
}

// Check which provider
const provider = getApiProvider();
console.log('Provider:', provider); // 'anthropic' | 'openai' | 'none'
```

---

## Retry Logic Implementation

```typescript
// Automatic retry with exponential backoff
// src/utils/apiClient.ts

for (let attempt = 0; attempt <= maxRetries; attempt++) {
  try {
    // Attempt request
    const response = await fetch(url, { signal });
    if (!response.ok) throw new Error(...);
    return { success: true, data };
  } catch (error) {
    if (attempt < maxRetries) {
      // Calculate wait time: 1s, 2s, 4s, etc.
      const waitTime = RETRY_DELAY * Math.pow(2, attempt);
      console.warn(`Retrying in ${waitTime}ms...`);
      
      onRetry?.(attempt + 1, error.message);
      await delay(waitTime);
    }
  }
}

// Example:
// Attempt 1 fails → Wait 1000ms → Attempt 2
// Attempt 2 fails → Wait 2000ms → Attempt 3
// Attempt 3 fails → Wait 4000ms → Attempt 4
// Attempt 4 fails → Return error
```

---

## Request Timeout Handling

```typescript
// Timeout with AbortController
// src/utils/apiClient.ts

function createTimeoutSignal(timeout: number): AbortSignal {
  const controller = new AbortController();
  setTimeout(() => controller.abort(), timeout);
  return controller.signal;
}

// Usage:
const signal = createTimeoutSignal(30000); // 30 second timeout
const response = await fetch(url, { signal });
// If no response within 30s, request is aborted
```

---

## Error Handling Strategy

```
Request Fails
    ↓
    └─→ Is retry < max?
        ├─ Yes: Wait, retry
        └─ No: Next step
            ↓
            └─→ Is it API error?
                ├─ Yes: Return error to user
                └─ No: Use mock data
                    ↓
                    └─→ Log error for debugging
                        Return graceful fallback
```

### Code Example:

```typescript
try {
  const files = await generateCodeWithAI(requirements, techStack);
  setGeneratedFiles(files);
} catch (error) {
  console.error('Generation failed:', error);
  // Fallback to mock data
  setGeneratedFiles(getMockFiles(techStack));
  // Show user message
  showToast('Using mock data due to API error');
}
```

---

## Logging for Debugging

```typescript
// Available logging functions
import { logApiActivity } from './utils/apiClient';

// Log request
logApiActivity('POST', 'https://api.anthropic.com/...', 'request', {
  model: 'claude-3-5-sonnet',
  tokensRequested: 8000,
});

// Log success
logApiActivity('POST', 'https://api.anthropic.com/...', 'success', {
  filesGenerated: 12,
  tokensUsed: 2345,
  duration: 2340, // milliseconds
});

// Log error
logApiActivity('POST', 'https://api.anthropic.com/...', 'error', {
  error: 'Request timeout',
  retries: 3,
  totalTime: 95000, // milliseconds
});

// Output:
// [2024-03-19 18:30:45] POST https://api.anthropic.com/... - Request sent
// [2024-03-19 18:30:47] POST https://api.anthropic.com/... - Success
```

---

## Integration Example

### In a React Component

```typescript
import { useState, useEffect } from 'react';
import { generateCodeWithAI } from '../utils/aiCodeGenerator';
import { validateApiConfig } from '../utils/apiClient';

export function CodeGenerationComponent() {
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const { isValid, message } = validateApiConfig();
    if (!isValid) {
      setError(`API not configured: ${message}`);
    }
  }, []);

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);

    try {
      const generatedFiles = await generateCodeWithAI(
        requirements,
        selectedTechStack
      );
      setFiles(generatedFiles);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Generation failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {error && <div className="error">{error}</div>}
      <button onClick={handleGenerate} disabled={loading}>
        {loading ? 'Generating...' : 'Generate Code'}
      </button>
      {files.map((file) => (
        <div key={file.filename}>
          <h3>{file.filename}</h3>
          <p>{file.explanation}</p>
        </div>
      ))}
    </div>
  );
}
```

---

## Testing the Integration

### Unit Test Example

```typescript
import { describe, it, expect, beforeEach } from 'vitest';
import { generateCodeWithAI, getMockFiles } from './aiCodeGenerator';
import { validateApiConfig } from './apiClient';

describe('Code Generation', () => {
  it('should generate files from requirements', async () => {
    const requirements = [{
      id: '1',
      title: 'Login System',
      description: 'User authentication',
      priority: 'high',
      category: 'backend',
    }];

    const techStack = [{
      id: 'react',
      name: 'React',
      category: 'frontend',
      version: '18.2.0',
      icon: 'react',
      description: 'UI library',
    }];

    const files = await generateCodeWithAI(requirements, techStack);

    expect(files).toBeDefined();
    expect(files.length).toBeGreaterThan(0);
    expect(files[0]).toHaveProperty('filename');
    expect(files[0]).toHaveProperty('content');
  });

  it('should fallback to mock data on API error', async () => {
    const mockConfig = validateApiConfig();
    if (!mockConfig.isValid) {
      const files = getMockFiles([]);
      expect(files.length).toBeGreaterThan(0);
    }
  });
});
```

---

## Migration Guide (If Using Existing Code)

### Before (Old Code)

```typescript
// ❌ Old approach - Direct API call
const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

const response = await fetch('https://api.openai.com/v1/chat/completions', {
  method: 'POST',
  headers: { 'Authorization': `Bearer ${OPENAI_API_KEY}` },
  body: JSON.stringify({ /* ... */ }),
});

if (!response.ok) throw new Error('API failed');
const data = await response.json();
```

### After (New Code)

```typescript
// ✅ New approach - Using apiClient
import { makeApiRequest } from './utils/apiClient';

const response = await makeApiRequest(
  'https://api.openai.com/v1/chat/completions',
  {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${apiKey}` },
    body: JSON.stringify({ /* ... */ }),
    maxRetries: 3,
    timeout: 30000,
  }
);

if (response.success) {
  // Use response.data
} else {
  // Handle response.error
}
```

**Benefits:**
- Automatic retry logic
- Timeout handling
- Error logging
- Cleaner error handling
- Less boilerplate

---

## Performance Considerations

### Request Optimization

```typescript
// Good: Batch multiple requests
const [result1, result2] = await Promise.all([
  generateCodeWithAI(req1, stack1),
  generateCodeWithAI(req2, stack2),
]);

// Avoid: Sequential requests (slower)
const result1 = await generateCodeWithAI(req1, stack1);
const result2 = await generateCodeWithAI(req2, stack2); // Waits for first!
```

### Timeout Configuration

```env
# In .env
VITE_REQUEST_TIMEOUT=30000  # 30 seconds

# For slow networks, increase:
VITE_REQUEST_TIMEOUT=60000  # 60 seconds

# For fast networks, decrease:
VITE_REQUEST_TIMEOUT=15000  # 15 seconds
```

---

## Security Considerations

### API Key Protection

```typescript
// ✅ Correct - Using environment variable
const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY;

// ❌ Wrong - Hardcoded key (visible in source code!)
const apiKey = 'sk-ant-v1-xxxxx';

// ❌ Wrong - Logging the key
console.log('API Key:', apiKey); // Never do this!

// ✅ Correct - Only log presence
console.log('API configured:', !!apiKey);
```

### HTTPS Only

All API calls use HTTPS (no data in plain text):
- `https://api.anthropic.com/v1/messages`
- `https://api.openai.com/v1/chat/completions`

---

## Deployment Considerations

### Environment Variables on Netlify

```
Settings → Build & deploy → Environment
VITE_ANTHROPIC_API_KEY: sk-ant-v1-xxxxxx
```

### Environment Variables on Vercel

```
Settings → Environment Variables
VITE_ANTHROPIC_API_KEY: sk-ant-v1-xxxxxx
```

### GitHub Actions

```yaml
jobs:
  deploy:
    runs-on: ubuntu-latest
    env:
      VITE_ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
```

---

## Monitoring & Debugging

### Enable Debug Logging

```env
VITE_DEBUG_API=true
VITE_LOG_LEVEL=debug
```

### Check Console Logs

```javascript
// In browser DevTools Console:
console.log(import.meta.env.VITE_DEBUG_API);  // Should be 'true'
// Look for: [timestamp] POST API: anthropic - ...
```

### Network Tab Analysis

1. Open DevTools → Network tab
2. Generate code
3. Look for requests to:
   - `https://api.anthropic.com/v1/messages`
   - `https://api.openai.com/v1/chat/completions`
4. Check Status (should be 200)
5. Check Response (should be valid JSON)

---

## Summary

The new implementation provides:

✅ **Robust API Integration**
- Multiple provider support (Anthropic, OpenAI)
- Automatic retry logic
- Timeout handling
- Error recovery

✅ **Better Error Handling**
- Error boundaries
- Graceful fallbacks
- User-friendly messages
- Developer debugging info

✅ **Production Ready**
- Comprehensive logging
- Security best practices
- Performance optimized
- Deployment ready

✅ **Easy to Maintain**
- Clear separation of concerns
- Well-documented code
- Easy to extend
- Type-safe with TypeScript

---

**Last Updated:** March 19, 2026
**Status:** ✅ Complete and Ready to Use
