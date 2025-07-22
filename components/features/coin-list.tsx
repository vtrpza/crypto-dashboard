'use client';

import { useState } from 'react';
import type { CoinData } from '@/lib/types/crypto';
import CoinCard from './coin-card';
import LoadingSkeleton from '@/components/ui/loading-skeleton';
import { Grid, List } from 'lucide-react';

interface CoinListProps {
  coins: CoinData[];
  isLoading?: boolean;
  error?: string | null;
  className?: string;
}

export default function CoinList({ 
  coins, 
  isLoading = false, 
  error = null, 
  className = '' 
}: CoinListProps) {
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');

  if (error) {
    return (
      <div className={`bg-destructive/10 border border-destructive/20 rounded-lg p-6 text-center ${className}`}>
        <p className="text-destructive font-medium">Failed to load cryptocurrencies</p>
        <p className="text-sm text-muted-foreground mt-1">{error}</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className={className}>
        <LoadingSkeleton variant={viewMode === 'grid' ? 'card' : 'list'} count={10} />
      </div>
    );
  }

  if (!coins || coins.length === 0) {
    return (
      <div className={`bg-muted/30 border border-muted rounded-lg p-8 text-center ${className}`}>
        <p className="text-muted-foreground">No cryptocurrencies found</p>
      </div>
    );
  }

  return (
    <div className={className}>
      {/* View Mode Toggle - Mobile First Responsive */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6 sm:mb-8">
        <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-foreground">
          Top Cryptocurrencies
        </h2>
        <div className="flex border rounded-md bg-muted p-1 self-start sm:self-auto">
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 sm:p-3 rounded transition-colors ${
              viewMode === 'list'
                ? 'bg-background shadow-sm text-foreground'
                : 'text-muted-foreground hover:text-foreground'
            }`}
            aria-label="List view"
          >
            <List className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 sm:p-3 rounded transition-colors ${
              viewMode === 'grid'
                ? 'bg-background shadow-sm text-foreground'
                : 'text-muted-foreground hover:text-foreground'
            }`}
            aria-label="Grid view"
          >
            <Grid className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>

      {/* Coin List/Grid - Mobile First Responsive */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
          {coins.map((coin) => (
            <CoinCard
              key={coin.id}
              coin={coin}
              variant="grid"
            />
          ))}
        </div>
      ) : (
        <div className="space-y-2 sm:space-y-3">
          {coins.map((coin) => (
            <CoinCard
              key={coin.id}
              coin={coin}
              variant="list"
            />
          ))}
        </div>
      )}
    </div>
  );
}