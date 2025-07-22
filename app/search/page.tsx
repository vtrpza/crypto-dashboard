'use client';

import { useState } from 'react';
import { useSearchCoinsWithMarketData } from '@/hooks/useCoins';
import Header from '@/components/ui/header';
import SearchBar from '@/components/ui/search-bar';
import CoinList from '@/components/features/coin-list';
import ErrorBoundary from '@/components/ui/error-boundary';
import { Search } from 'lucide-react';

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  
  const { 
    data: searchResults,
    isLoading,
    isLoadingMarketData,
    error,
    hasSearchResults,
    hasMarketData
  } = useSearchCoinsWithMarketData(searchQuery);

  // Enhanced search results now include real market data
  const displayCoins = searchResults?.coins || [];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main id="main-content" className="container mx-auto px-4 py-6 sm:py-8 lg:py-12">
        <div className="mb-6 sm:mb-8 lg:mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 sm:mb-4">
            Search Cryptocurrencies
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8 max-w-2xl">
            Find specific cryptocurrencies by name or symbol
          </p>
          
          <SearchBar
            onSearch={setSearchQuery}
            isLoading={isLoading || isLoadingMarketData}
            placeholder="Search for Bitcoin, Ethereum, etc..."
            className="w-full max-w-md sm:max-w-lg"
          />
          
          {/* Progressive loading indicator */}
          {!!searchQuery && hasSearchResults && isLoadingMarketData && (
            <div className="mt-2 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 border-2 border-muted border-t-primary rounded-full animate-spin"></div>
                <span>Loading price data...</span>
              </div>
            </div>
          )}
        </div>

        <ErrorBoundary>
          {!searchQuery ? (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="bg-muted/30 rounded-full p-6 mb-4">
                <Search className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Start searching
              </h3>
              <p className="text-muted-foreground text-center max-w-md">
                Enter the name or symbol of a cryptocurrency to find detailed information
              </p>
            </div>
          ) : (
            <div>
              {searchQuery && searchResults && (
                <p className="text-muted-foreground mb-4">
                  Found {searchResults.coins.length} results for &quot;{searchQuery}&quot;
                </p>
              )}
              <CoinList
                coins={displayCoins}
                isLoading={isLoading}
                error={error?.message || null}
              />
            </div>
          )}
        </ErrorBoundary>
      </main>
    </div>
  );
}