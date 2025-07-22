'use client';

import { useState } from 'react';
import { useTopCoins, useSearchCoinsWithMarketData } from '@/hooks/useCoins';
import Header from '@/components/ui/header';
import SearchBar from '@/components/ui/search-bar';
import CoinList from '@/components/features/coin-list';
import ErrorBoundary from '@/components/ui/error-boundary';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Fetch top coins when not searching
  const { 
    data: topCoins, 
    isLoading: isLoadingTop, 
    error: topError 
  } = useTopCoins(20);
  
  // Enhanced search with market data
  const { 
    data: searchResults,
    isLoading: isLoadingSearch,
    isLoadingMarketData,
    error: searchError,
    hasSearchResults,
    hasMarketData
  } = useSearchCoinsWithMarketData(searchQuery);

  const isLoading = searchQuery ? isLoadingSearch : isLoadingTop;
  const error = searchQuery ? searchError : topError;
  const displayCoins = searchQuery ? searchResults?.coins : topCoins;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main id="main-content" className="container mx-auto px-4 py-6 sm:py-8 lg:py-12">
        <div className="mb-6 sm:mb-8 lg:mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 sm:mb-4">
            Cryptocurrency Dashboard
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8 max-w-2xl">
            Track the top cryptocurrencies by market cap and search for specific coins
          </p>
          
          <SearchBar
            onSearch={setSearchQuery}
            isLoading={isLoading || (!!searchQuery && isLoadingMarketData)}
            className="w-full max-w-md sm:max-w-lg"
          />
        </div>

        <ErrorBoundary>
          <CoinList
            coins={displayCoins || []}
            isLoading={isLoading}
            error={error?.message || null}
          />
        </ErrorBoundary>
      </main>
    </div>
  );
}