'use client';

import { useState, useEffect, useCallback } from 'react';
import type { ApiError } from '@/lib/types/crypto';

interface RateLimitState {
  isRateLimited: boolean;
  retryAfter: number | null; // seconds
  canRetry: boolean;
  error: ApiError | null;
}

interface UseRateLimitReturn extends RateLimitState {
  setRateLimit: (error: ApiError) => void;
  clearRateLimit: () => void;
  retry: () => void;
  formatTimeRemaining: () => string;
}

/**
 * Custom hook for managing rate limit state and countdown logic
 */
export function useRateLimit(): UseRateLimitReturn {
  const [state, setState] = useState<RateLimitState>({
    isRateLimited: false,
    retryAfter: null,
    canRetry: true,
    error: null,
  });

  const [countdown, setCountdown] = useState<number>(0);

  // Countdown effect
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0 && state.isRateLimited) {
      // When countdown reaches 0, allow retry
      setState(prev => ({
        ...prev,
        canRetry: true,
        retryAfter: 0,
      }));
    }
  }, [countdown, state.isRateLimited]);

  const setRateLimit = useCallback((error: ApiError) => {
    if (error.isRateLimit && error.retryAfter) {
      setState({
        isRateLimited: true,
        retryAfter: error.retryAfter,
        canRetry: false,
        error,
      });
      setCountdown(error.retryAfter);
    }
  }, []);

  const clearRateLimit = useCallback(() => {
    setState({
      isRateLimited: false,
      retryAfter: null,
      canRetry: true,
      error: null,
    });
    setCountdown(0);
  }, []);

  const retry = useCallback(() => {
    if (state.canRetry) {
      clearRateLimit();
    }
  }, [state.canRetry, clearRateLimit]);

  const formatTimeRemaining = useCallback((): string => {
    if (countdown <= 0) return '0s';
    
    if (countdown < 60) {
      return `${countdown}s`;
    }
    
    const mins = Math.floor(countdown / 60);
    const secs = countdown % 60;
    return `${mins}m ${secs.toString().padStart(2, '0')}s`;
  }, [countdown]);

  return {
    isRateLimited: state.isRateLimited,
    retryAfter: countdown > 0 ? countdown : state.retryAfter,
    canRetry: state.canRetry,
    error: state.error,
    setRateLimit,
    clearRateLimit,
    retry,
    formatTimeRemaining,
  };
}

/**
 * Higher-order hook that wraps React Query hooks with rate limit handling
 */
export function withRateLimit<TData, TError extends Error>(
  useQueryHook: () => {
    data: TData | undefined;
    error: TError | null;
    isLoading: boolean;
    refetch: () => void;
  }
) {
  return function useQueryWithRateLimit() {
    const queryResult = useQueryHook();
    const rateLimit = useRateLimit();

    // Check if the error is a rate limit error
    useEffect(() => {
      if (queryResult.error) {
        const apiError = queryResult.error as unknown as ApiError;
        if (apiError.isRateLimit) {
          rateLimit.setRateLimit(apiError);
        } else {
          rateLimit.clearRateLimit();
        }
      }
    }, [queryResult.error, rateLimit]);

    const handleRetry = useCallback(() => {
      rateLimit.retry();
      queryResult.refetch();
    }, [rateLimit, queryResult]);

    return {
      ...queryResult,
      rateLimit: {
        ...rateLimit,
        retry: handleRetry,
      },
    };
  };
}