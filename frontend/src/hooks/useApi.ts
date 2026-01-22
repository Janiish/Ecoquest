/**
 * Custom hook for API calls with TypeScript support
 * Provides GET and POST methods with loading, error, and data states
 */

import { useState, useCallback } from 'react';

interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

export const useApi = <T,>() => {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  /**
   * GET request
   */
  const get = useCallback(async (url: string): Promise<T | null> => {
    setState({ data: null, loading: true, error: null });
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = (await response.json()) as T;
      setState({ data: result, loading: false, error: null });
      return result;
    } catch (error) {
      const err = error instanceof Error ? error : new Error('Unknown error');
      setState({ data: null, loading: false, error: err });
      return null;
    }
  }, []);

  /**
   * POST request
   */
  const post = useCallback(
    async (url: string, body: unknown): Promise<T | null> => {
      setState({ data: null, loading: true, error: null });
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = (await response.json()) as T;
        setState({ data: result, loading: false, error: null });
        return result;
      } catch (error) {
        const err = error instanceof Error ? error : new Error('Unknown error');
        setState({ data: null, loading: false, error: err });
        return null;
      }
    },
    [],
  );

  return { ...state, get, post };
};
