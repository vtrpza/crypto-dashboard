'use client';

import Image from 'next/image';
import { useTopCoinsWithRateLimit } from '@/hooks/useCoins';
import RateLimitMessage from '@/components/ui/rate-limit-message';
import LoadingSkeleton from '@/components/ui/loading-skeleton';

interface CoinListWithRateLimitProps {
  limit?: number;
}

/**
 * Example component demonstrating rate limit handling integration
 * This shows how to use the RateLimitMessage component with the enhanced useCoins hook
 */
export default function CoinListWithRateLimit({ limit = 10 }: CoinListWithRateLimitProps) {
  const { data: coins, isLoading, error, rateLimit } = useTopCoinsWithRateLimit(limit);

  // Show rate limit message if we're rate limited
  if (rateLimit.isRateLimited) {
    return (
      <RateLimitMessage
        onRetry={rateLimit.retry}
        countdownSeconds={rateLimit.retryAfter || 60}
        showExplanation={true}
        language="pt"
      />
    );
  }

  // Show loading state
  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: limit }).map((_, index) => (
          <LoadingSkeleton key={index} className="h-16 w-full rounded-lg" />
        ))}
      </div>
    );
  }

  // Show general error (non-rate-limit errors)
  if (error && !error.isRateLimit) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="text-center">
          <p className="text-destructive mb-2">Error loading coins</p>
          <p className="text-muted-foreground text-sm">{error.message}</p>
          <button
            onClick={rateLimit.retry}
            className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Show coins data
  return (
    <div className="space-y-4">
      {coins?.map((coin) => (
        <div
          key={coin.id}
          className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <Image
              src={coin.image}
              alt={coin.name}
              width={32}
              height={32}
              className="w-8 h-8 rounded-full"
            />
            <div>
              <h3 className="font-medium">{coin.name}</h3>
              <p className="text-sm text-muted-foreground">
                {coin.symbol.toUpperCase()}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="font-medium">
              ${coin.current_price.toLocaleString()}
            </p>
            <p
              className={`text-sm ${
                coin.price_change_percentage_24h >= 0
                  ? 'text-green-600'
                  : 'text-red-600'
              }`}
            >
              {coin.price_change_percentage_24h > 0 ? '+' : ''}
              {coin.price_change_percentage_24h.toFixed(2)}%
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * Usage example in a parent component:
 * 
 * ```tsx
 * import CoinListWithRateLimit from '@/components/features/coin-list-with-rate-limit';
 * 
 * export default function Dashboard() {
 *   return (
 *     <div className="container mx-auto p-6">
 *       <h1 className="text-2xl font-bold mb-6">Top Cryptocurrencies</h1>
 *       <CoinListWithRateLimit limit={20} />
 *     </div>
 *   );
 * }
 * ```
 */