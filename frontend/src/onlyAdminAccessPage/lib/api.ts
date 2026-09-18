export const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/admin';

interface ApiErrorResponse {
  message?: string;
}

function isApiErrorResponse(value: unknown): value is ApiErrorResponse {
  return typeof value === 'object' && value !== null && 'message' in value;
}

const REQUEST_TIMEOUT_MS = 15000;

export async function apiRequest<T = unknown>(
  endpoint: string,
  options: RequestInit = {},
  token?: string | null
): Promise<T> {
  const isFormData = options.body instanceof FormData;

  const headers: HeadersInit = {
    ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers || {}),
  };

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  let res: Response;
  try {
    res = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers,
      signal: controller.signal,
    });
  } catch (err) {
    if (err instanceof Error && err.name === 'AbortError') {
      throw new Error('Request timed out. Please try again.');
    }
    throw new Error('Network error. Please check your connection.');
  } finally {
    clearTimeout(timeoutId);
  }

  let data: unknown = {};
  try {
    data = await res.json();
  } catch {
  }

  if (res.status === 401) {
    throw new Error('SESSION_EXPIRED');
  }

  if (!res.ok) {
    const message =
      isApiErrorResponse(data) && typeof data.message === 'string'
        ? data.message
        : `Request failed (${res.status})`;
    throw new Error(message);
  }

  return data as T;
}

export async function uploadImage(file: File, token: string | null): Promise<string> {
  const formData = new FormData();
  formData.append('image', file);

  const data = await apiRequest<{ url: string }>(
    '/upload/image',
    { method: 'POST', body: formData },
    token
  );

  return data.url;
}

export async function uploadImages(files: File[], token: string | null): Promise<string[]> {
  const formData = new FormData();
  files.forEach((file) => formData.append('images', file));

  const data = await apiRequest<{ urls: string[] }>(
    '/upload/images',
    { method: 'POST', body: formData },
    token
  );

  return data.urls;
}

export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  if (typeof error === 'string') return error;
  return 'Something went wrong. Please try again.';
}