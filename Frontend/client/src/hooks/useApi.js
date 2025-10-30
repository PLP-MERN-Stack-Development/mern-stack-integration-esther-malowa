import { useCallback } from 'react';

const defaultOptions = { baseUrl: '' };

export default function useApi(options = {}) {
  const { baseUrl } = { ...defaultOptions, ...options };

  const request = useCallback(async (method, url, body = null) => {
    const headers = { 'Content-Type': 'application/json' };
    const res = await fetch(baseUrl + url, {
      method,
      headers,
      body: body ? JSON.stringify(body) : null,
    });

    const contentType = res.headers.get('content-type') || '';
    let data = null;
    if (contentType.includes('application/json')) data = await res.json();

    if (!res.ok) {
      const message = data?.error || data?.message || res.statusText || 'API error';
      const err = new Error(message);
      err.status = res.status;
      err.data = data;
      throw err;
    }

    return { status: res.status, data };
  }, [baseUrl]);

  const get = useCallback((url) => request('GET', url), [request]);
  const post = useCallback((url, body) => request('POST', url, body), [request]);
  const put = useCallback((url, body) => request('PUT', url, body), [request]);
  const del = useCallback((url) => request('DELETE', url), [request]);

  return { get, post, put, del };
}
