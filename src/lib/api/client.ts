import { useAuthStore } from '@/store/auth-store';

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000';

type FetchOptions = RequestInit & {
  headers?: Record<string, string>;
};

export class ApiError extends Error {
  public data: any;
  public status: number;

  constructor(message: string, status: number, data: any) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

export async function fetchClient<T = any>(endpoint: string, options: FetchOptions = {}): Promise<T> {
  const url = `${API_BASE_URL}/api${endpoint}`;
  
  const defaultHeaders = {
    'Content-Type': 'application/json',
  };

  const config = {
    ...options,
    credentials: 'include' as RequestCredentials,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  // Proactively refresh token if not in memory (silent session restoration)
  if (typeof window !== 'undefined' && !endpoint.includes('auth/')) {
      const token = useAuthStore.getState().accessToken;
      if (!token) {
          try {
              const newToken = await refreshAuthToken();
              if (newToken) {
                  (config.headers as any)['Authorization'] = `Bearer ${newToken}`;
              }
          } catch (e) {
              // No valid session, proceed without token
          }
      } else {
          (config.headers as any)['Authorization'] = `Bearer ${token}`;
      }
  }

  try {
    const response = await fetch(url, config);
    
    let data;
    try {
      data = await response.json();
    } catch (e) {
      if (!response.ok) {
        throw new ApiError(response.statusText || 'Internal Server Error', response.status, null);
      }
      
      data = null;
    }

    if (!response.ok) {
      let message = data?.message || response.statusText || 'Something went wrong';

      if (response.status === 429) {
          message = 'Too many requests. Please try again later.';
          const retryAfter = response.headers.get('Retry-After');
          if (retryAfter) {
              if (typeof data !== 'object' || data === null) {
                  data = {};
              }
              data.retryAfter = retryAfter;
          }
      }
      
      // Debug log to trace error data
      console.log('[API Debug] Non-ok response data:', JSON.stringify(data));
      
      throw new ApiError(message, response.status, data);
    }

    return data as T;
  } catch (error: any) {
    if (error instanceof ApiError) {
        console.error(`[API] Error ${error.status} on ${endpoint}:`, error.message, error.data);
        throw error;
    }
    
    console.error(`[API] Network or unknown error on ${endpoint}:`, error);
    
    if (error.message === 'Failed to fetch') {
       throw new Error('Internal server error occurred. Please check your connection or try again later.'); 
    }
    
    throw new Error(error.message || 'Internal server error occurred');
  }
}

let refreshPromise: Promise<string> | null = null;

async function refreshAuthToken(): Promise<string> {
    if (refreshPromise) return refreshPromise;

    refreshPromise = (async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/auth/refresh`, {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' }
            });

            if (!response.ok) {
                throw new Error('Refresh failed');
            }

            const data = await response.json();
            useAuthStore.getState().login(data.user, data.access_token);
            return data.access_token;
        } catch (error) {
            useAuthStore.getState().logout();
            throw error;
        } finally {
            refreshPromise = null;
        }
    })();

    return refreshPromise;
}
