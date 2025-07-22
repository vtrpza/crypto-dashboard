import Image from 'next/image';
import Link from 'next/link';
import type { CoinData } from '@/lib/types/crypto';
import { formatCurrency, formatPercentage, getChangeColor } from '@/lib/utils/format';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface CoinCardProps {
  coin: CoinData;
  variant?: 'list' | 'grid';
  className?: string;
}

export default function CoinCard({ 
  coin, 
  variant = 'list', 
  className = '' 
}: CoinCardProps) {
  const priceChangeColor = getChangeColor(coin.price_change_percentage_24h);
  const isPositive = coin.price_change_percentage_24h > 0;

  if (variant === 'grid') {
    return (
      <Link
        href={`/coin/${coin.id}`}
        className={`block bg-card border rounded-lg p-6 hover:shadow-md transition-all duration-200 hover:border-primary/20 ${className}`}
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="relative w-10 h-10">
              <Image
                src={coin.image}
                alt={`${coin.name} logo`}
                fill
                className="rounded-full"
                sizes="40px"
              />
            </div>
            <div>
              <h3 className="font-semibold text-card-foreground">
                {coin.name}
              </h3>
              <p className="text-sm text-muted-foreground uppercase">
                {coin.symbol}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="font-semibold text-card-foreground">
              {formatCurrency(coin.current_price)}
            </p>
            <div className={`flex items-center justify-end space-x-1 text-sm ${priceChangeColor}`}>
              {isPositive ? (
                <TrendingUp className="w-3 h-3" />
              ) : (
                <TrendingDown className="w-3 h-3" />
              )}
              <span>{formatPercentage(coin.price_change_percentage_24h)}</span>
            </div>
          </div>
        </div>
        
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Market Cap</span>
            <span className="text-card-foreground font-medium">
              {formatCurrency(coin.market_cap)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Volume (24h)</span>
            <span className="text-card-foreground font-medium">
              {formatCurrency(coin.total_volume)}
            </span>
          </div>
        </div>
      </Link>
    );
  }

  // List variant (default)
  return (
    <Link
      href={`/coin/${coin.id}`}
      className={`block bg-card border rounded-lg hover:shadow-md transition-all duration-200 hover:border-primary/20 ${className}`}
    >
      <div className="flex items-center p-4 space-x-4">
        {/* Rank */}
        <div className="w-8 text-center text-muted-foreground font-medium text-sm">
          {coin.market_cap_rank}
        </div>

        {/* Coin Info */}
        <div className="flex items-center space-x-3 min-w-0 flex-1">
          <div className="relative w-8 h-8 flex-shrink-0">
            <Image
              src={coin.image}
              alt={`${coin.name} logo`}
              fill
              className="rounded-full"
              sizes="32px"
            />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="font-semibold text-card-foreground truncate">
              {coin.name}
            </h3>
            <p className="text-sm text-muted-foreground uppercase">
              {coin.symbol}
            </p>
          </div>
        </div>

        {/* Price */}
        <div className="text-right min-w-0 flex-shrink-0">
          <p className="font-semibold text-card-foreground">
            {formatCurrency(coin.current_price)}
          </p>
          <div className={`flex items-center space-x-1 text-sm ${priceChangeColor}`}>
            {isPositive ? (
              <TrendingUp className="w-3 h-3" />
            ) : (
              <TrendingDown className="w-3 h-3" />
            )}
            <span>{formatPercentage(coin.price_change_percentage_24h)}</span>
          </div>
        </div>

        {/* Market Cap - Hidden on mobile */}
        <div className="text-right min-w-0 flex-shrink-0 hidden md:block">
          <p className="font-medium text-card-foreground">
            {formatCurrency(coin.market_cap)}
          </p>
          <p className="text-sm text-muted-foreground">Market Cap</p>
        </div>

        {/* Volume - Hidden on mobile */}
        <div className="text-right min-w-0 flex-shrink-0 hidden lg:block">
          <p className="font-medium text-card-foreground">
            {formatCurrency(coin.total_volume)}
          </p>
          <p className="text-sm text-muted-foreground">Volume (24h)</p>
        </div>
      </div>
    </Link>
  );
}