'use client';

import { useEffect, useState, useCallback } from 'react';
import { Clock, RefreshCw } from 'lucide-react';

interface RateLimitMessageProps {
  /** Callback function to retry the failed request */
  onRetry?: () => void;
  /** Custom countdown time in seconds (default: 60) */
  countdownSeconds?: number;
  /** Show detailed explanation about rate limiting */
  showExplanation?: boolean;
  /** Custom error message */
  message?: string;
  /** Language preference */
  language?: 'pt' | 'en';
}

interface RateLimitTexts {
  title: string;
  subtitle: string;
  explanation: string;
  retryButton: string;
  countdownText: string;
  manualRetry: string;
}

const texts: Record<'pt' | 'en', RateLimitTexts> = {
  pt: {
    title: 'Muitas solicitações',
    subtitle: 'Por favor, aguarde um momento antes de tentar novamente.',
    explanation: 'Para garantir um serviço estável para todos os usuários, limitamos o número de solicitações por minuto. Isso é normal e temporário.',
    retryButton: 'Tentar novamente',
    countdownText: 'Tentativa automática em',
    manualRetry: 'Tentar agora',
  },
  en: {
    title: 'Too many requests',
    subtitle: 'Please wait a moment before trying again.',
    explanation: 'To ensure stable service for all users, we limit the number of requests per minute. This is normal and temporary.',
    retryButton: 'Try again',
    countdownText: 'Auto retry in',
    manualRetry: 'Try now',
  },
};

export default function RateLimitMessage({
  onRetry,
  countdownSeconds = 60,
  showExplanation = true,
  message,
  language = 'pt',
}: RateLimitMessageProps) {
  const [countdown, setCountdown] = useState(countdownSeconds);
  const [isRetrying, setIsRetrying] = useState(false);

  const t = texts[language];

  const handleRetry = useCallback(async () => {
    if (isRetrying || !onRetry) return;
    
    setIsRetrying(true);
    try {
      await onRetry();
    } catch (error) {
      console.error('Retry failed:', error);
      // Reset countdown if retry fails
      setCountdown(countdownSeconds);
    } finally {
      setIsRetrying(false);
    }
  }, [isRetrying, onRetry, countdownSeconds]);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0 && onRetry) {
      // Auto-retry when countdown reaches 0
      handleRetry();
    }
  }, [countdown, onRetry, handleRetry]);

  const formatTime = (seconds: number): string => {
    if (seconds < 60) {
      return `${seconds}s`;
    }
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs.toString().padStart(2, '0')}s`;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[300px] p-6">
      <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-6 max-w-md w-full text-center">
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="bg-amber-100 dark:bg-amber-900/30 p-3 rounded-full">
            <Clock className="h-6 w-6 text-amber-600 dark:text-amber-400" />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-lg font-semibold text-amber-800 dark:text-amber-200 mb-2">
          {t.title}
        </h2>

        {/* Subtitle/Message */}
        <p className="text-amber-700 dark:text-amber-300 mb-4 text-sm">
          {message || t.subtitle}
        </p>

        {/* Countdown */}
        {countdown > 0 && (
          <div className="bg-amber-100 dark:bg-amber-900/40 rounded-md p-3 mb-4">
            <p className="text-sm text-amber-600 dark:text-amber-400">
              {t.countdownText}
            </p>
            <p className="font-mono text-lg font-semibold text-amber-800 dark:text-amber-200">
              {formatTime(countdown)}
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-2">
          {onRetry && (
            <button
              onClick={handleRetry}
              disabled={isRetrying}
              className="w-full bg-amber-600 hover:bg-amber-700 disabled:bg-amber-400 text-white px-4 py-2 rounded-md transition-colors flex items-center justify-center gap-2"
            >
              {isRetrying ? (
                <RefreshCw className="h-4 w-4 animate-spin" />
              ) : (
                <RefreshCw className="h-4 w-4" />
              )}
              {countdown > 0 ? t.manualRetry : t.retryButton}
            </button>
          )}
        </div>

        {/* Explanation */}
        {showExplanation && (
          <details className="mt-4 text-left">
            <summary className="text-xs text-amber-600 dark:text-amber-400 cursor-pointer hover:text-amber-700 dark:hover:text-amber-300">
              Por que isso acontece?
            </summary>
            <p className="text-xs text-amber-700 dark:text-amber-300 mt-2 leading-relaxed">
              {t.explanation}
            </p>
          </details>
        )}
      </div>
    </div>
  );
}