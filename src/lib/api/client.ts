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
  const url = `${API_BASE_URL}${endpoint}`;
  
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

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw new ApiError(data.message || 'Something went wrong', response.status, data);
    }

    return data as T;
  } catch (error: any) {
    if (error instanceof ApiError) {
        throw error;
    }
    throw new Error(error.message || 'Network Error');
  }
}
