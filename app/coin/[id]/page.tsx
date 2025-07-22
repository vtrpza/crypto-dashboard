'use client';

import { use } from 'react';
import { useCoinDetails, useCoinChart } from '@/hooks/useCoins';
import Header from '@/components/ui/header';
import PriceChart from '@/components/charts/price-chart';
import LoadingSkeleton from '@/components/ui/loading-skeleton';
import ErrorBoundary from '@/components/ui/error-boundary';
import { formatCurrency, formatPercentage, getChangeColor } from '@/lib/utils/format';
import { formatCurrencySafe, formatPercentageSafe } from '@/lib/utils/crypto-transform';
import { ArrowLeft, TrendingUp, TrendingDown, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface CoinPageProps {
  params: Promise<{ id: string }>;
}

// Separate component to handle the actual coin display logic
function CoinContent({ id }: { id: string }) {
  const { 
    data: coinDetails, 
    isLoading: isLoadingDetails, 
    error: detailsError 
  } = useCoinDetails(id);
  
  const { 
    data: chartData, 
    isLoading: isLoadingChart, 
    error: chartError 
  } = useCoinChart(id, 7);

  // Simplified debug logging - only log state changes
  if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
    console.log(`[${id}] Loading: ${isLoadingDetails}, HasData: ${!!coinDetails}`);
  }

  if (isLoadingDetails) {
    return (
      <>
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="mb-6">
            <div className="h-6 bg-muted rounded w-20 mb-4 animate-pulse"></div>
            <div className="h-10 bg-muted rounded w-64 mb-2 animate-pulse"></div>
            <div className="h-4 bg-muted rounded w-32 animate-pulse"></div>
          </div>
          <LoadingSkeleton variant="card" count={2} />
          <LoadingSkeleton variant="chart" className="mt-6" />
        </main>
      </>
    );
  }

  if (detailsError || !coinDetails) {
    return (
      <>
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-6 text-center">
            <p className="text-destructive font-medium">Failed to load coin details</p>
            <p className="text-sm text-muted-foreground mt-1">
              {detailsError?.message || 'Coin not found'}
            </p>
            <Link href="/" className="inline-flex items-center mt-4 py-2 px-1 text-primary hover:text-primary/80 active:text-primary/80 transition-colors">
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3" />
              <span className="text-sm sm:text-base font-medium underline">Back to Dashboard</span>
            </Link>
          </div>
        </main>
      </>
    );
  }

  const priceChangeColor = getChangeColor(coinDetails.price_change_percentage_24h);
  const isPositive = coinDetails.price_change_percentage_24h > 0;

  return (
    <>
      <Header />
      <main id="main-content" className="container mx-auto px-4 py-8">
        {/* Back Button - Mobile First Touch-Friendly */}
        <div className="mb-6 sm:mb-8">
          <Link 
            href="/" 
            className="inline-flex items-center py-2 px-1 text-muted-foreground hover:text-foreground active:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3" />
            <span className="text-sm sm:text-base font-medium">Back to Dashboard</span>
          </Link>
        </div>

        <ErrorBoundary>
          {/* Coin Header */}
          <div className="bg-card border rounded-lg p-6 mb-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center space-x-4">
                <div className="relative w-16 h-16">
                  {coinDetails.image ? (
                    <Image
                      src={coinDetails.image}
                      alt={`${coinDetails.name} logo`}
                      fill
                      className="rounded-full"
                      sizes="(max-width: 640px) 56px, (max-width: 768px) 64px, 80px"
                      priority
                    />
                  ) : (
                    <div className="w-full h-full bg-muted rounded-full flex items-center justify-center text-lg font-medium">
                      {coinDetails.symbol?.charAt(0) || '?'}
                    </div>
                  )}
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-card-foreground">
                    {coinDetails.name}
                  </h1>
                  <p className="text-muted-foreground uppercase text-lg">
                    {coinDetails.symbol} • #{coinDetails.market_cap_rank}
                  </p>
                </div>
              </div>
              
              <div className="text-right">
                <p className="text-3xl font-bold text-card-foreground">
                  {formatCurrencySafe(coinDetails.current_price)}
                </p>
                <div className={`flex items-center justify-end space-x-2 text-lg ${priceChangeColor}`}>
                  {isPositive ? (
                    <TrendingUp className="w-5 h-5" />
                  ) : (
                    <TrendingDown className="w-5 h-5" />
                  )}
                  <span>{formatPercentageSafe(coinDetails.price_change_percentage_24h)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-card border rounded-lg p-4">
              <p className="text-muted-foreground text-sm">Market Cap</p>
              <p className="text-xl font-semibold text-card-foreground">
                {formatCurrencySafe(coinDetails.market_cap)}
              </p>
            </div>
            <div className="bg-card border rounded-lg p-4">
              <p className="text-muted-foreground text-sm">24h Volume</p>
              <p className="text-xl font-semibold text-card-foreground">
                {formatCurrencySafe(coinDetails.total_volume)}
              </p>
            </div>
            <div className="bg-card border rounded-lg p-4">
              <p className="text-muted-foreground text-sm">24h High</p>
              <p className="text-xl font-semibold text-card-foreground">
                {formatCurrencySafe(coinDetails.high_24h)}
              </p>
            </div>
            <div className="bg-card border rounded-lg p-4">
              <p className="text-muted-foreground text-sm">24h Low</p>
              <p className="text-xl font-semibold text-card-foreground">
                {formatCurrencySafe(coinDetails.low_24h)}
              </p>
            </div>
          </div>

          {/* Price Chart */}
          <div className="bg-card border rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold text-card-foreground mb-4">
              Price Chart (7 Days)
            </h2>
            {isLoadingChart ? (
              <LoadingSkeleton variant="chart" />
            ) : chartError ? (
              <div className="flex items-center justify-center h-64 bg-muted/30 rounded-lg">
                <p className="text-muted-foreground">Failed to load chart data</p>
              </div>
            ) : (
              <PriceChart data={chartData || []} height={300} />
            )}
          </div>

          {/* Description */}
          {coinDetails.description?.en && (
            <div className="bg-card border rounded-lg p-6">
              <h2 className="text-xl font-semibold text-card-foreground mb-4">
                About {coinDetails.name}
              </h2>
              <div 
                className="text-muted-foreground prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ 
                  __html: coinDetails.description.en.slice(0, 500) + '...' 
                }}
              />
              {coinDetails.links?.homepage?.[0] && (
                <a
                  href={coinDetails.links.homepage[0]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center mt-4 text-primary hover:underline"
                >
                  Visit Website
                  <ExternalLink className="w-4 h-4 ml-1" />
                </a>
              )}
            </div>
          )}
        </ErrorBoundary>
      </main>
    </>
  );
}

export default function CoinPage({ params }: CoinPageProps) {
  // Call use() at top level - React will handle suspense automatically
  const { id } = use(params);

  return (
    <div className="min-h-screen bg-background">
      <CoinContent id={id} />
    </div>
  );
}