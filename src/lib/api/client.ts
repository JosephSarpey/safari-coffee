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

  if (typeof window !== 'undefined') {
      const token = localStorage.getItem('access_token');
      if (token) {
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
    
    // Improve generic "faled to fetch" message
    if (error.message === 'Failed to fetch') {
       throw new Error('Internal server error occurred. Please check your connection or try again later.'); 
    }
    
    throw new Error(error.message || 'Internal server error occurred');
  }
}
