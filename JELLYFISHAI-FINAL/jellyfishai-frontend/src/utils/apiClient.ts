/**
 * API Client for JellyfishAI
 * Handles communication with Anthropic Claude API with retry logic and error handling
 */

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // ms
const REQUEST_TIMEOUT = 30000; // 30 seconds

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  retryCount?: number;
}

export interface ApiRequestOptions {
  maxRetries?: number;
  timeout?: number;
  onRetry?: (attempt: number, error: string) => void;
}

/**
 * Delay function for exponential backoff
 */
function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Create abort signal with timeout
 */
function createTimeoutSignal(timeout: number): AbortSignal {
  const controller = new AbortController();
  setTimeout(() => controller.abort(), timeout);
  return controller.signal;
}

/**
 * Make API request with retry logic
 */
export async function makeApiRequest<T>(
  url: string,
  options: RequestInit & ApiRequestOptions = {}
): Promise<ApiResponse<T>> {
  const {
    maxRetries = MAX_RETRIES,
    timeout = REQUEST_TIMEOUT,
    onRetry,
    ...fetchOptions
  } = options;

  let lastError: Error | null = null;
  let retryCount = 0;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const signal = createTimeoutSignal(timeout);
      const response = await fetch(url, {
        ...fetchOptions,
        signal,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage =
          errorData.error?.message ||
          `API Error: ${response.status} ${response.statusText}`;

        throw new Error(errorMessage);
      }

      const data = await response.json();
      return { success: true, data, retryCount };
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));

      if (attempt < maxRetries) {
        const waitTime = RETRY_DELAY * Math.pow(2, attempt); // exponential backoff
        
        if (onRetry) {
          onRetry(attempt + 1, lastError.message);
        }

        console.warn(
          `API request failed (attempt ${attempt + 1}/${maxRetries + 1}), retrying in ${waitTime}ms:`,
          lastError.message
        );

        await delay(waitTime);
        retryCount++;
      }
    }
  }

  console.error('API request failed after all retries:', lastError?.message);
  return {
    success: false,
    error: lastError?.message || 'Unknown API error',
    retryCount,
  };
}

/**
 * Validate API configuration
 */
export function validateApiConfig(): { isValid: boolean; message: string } {
  const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY ||
                 import.meta.env.VITE_OPENAI_API_KEY;

  if (!apiKey) {
    return {
      isValid: false,
      message: 'API key not configured. Please set VITE_ANTHROPIC_API_KEY or VITE_OPENAI_API_KEY in .env',
    };
  }

  if (apiKey.length < 20) {
    return {
      isValid: false,
      message: 'API key appears to be invalid (too short)',
    };
  }

  return {
    isValid: true,
    message: 'API configuration is valid',
  };
}

/**
 * Get active API provider
 */
export function getApiProvider(): 'anthropic' | 'openai' | 'none' {
  const anthropicKey = import.meta.env.VITE_ANTHROPIC_API_KEY;
  const openaiKey = import.meta.env.VITE_OPENAI_API_KEY;

  if (anthropicKey) return 'anthropic';
  if (openaiKey) return 'openai';
  return 'none';
}

/**
 * Log API request/response for debugging
 */
export function logApiActivity(
  method: string,
  url: string,
  status: 'request' | 'success' | 'error',
  details?: Record<string, any>
): void {
  const timestamp = new Date().toISOString();
  const prefix = `[${timestamp}] [${method}] ${url}`;

  const logData = {
    ...details,
    timestamp,
  };

  switch (status) {
    case 'request':
      console.log(`${prefix} - Request sent`, logData);
      break;
    case 'success':
      console.log(`${prefix} - Success`, logData);
      break;
    case 'error':
      console.error(`${prefix} - Error`, logData);
      break;
  }
}
