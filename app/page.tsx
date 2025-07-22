'use client';

import { useState } from 'react';
import { useTopCoins, useSearchCoins } from '@/hooks/useCoins';
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
  
  // Search coins when there's a query
  const { 
    data: searchResults, 
    isLoading: isLoadingSearch, 
    error: searchError 
  } = useSearchCoins(searchQuery);

  const isLoading = searchQuery ? isLoadingSearch : isLoadingTop;
  const error = searchQuery ? searchError : topError;
  const coins = searchQuery ? searchResults?.coins : topCoins;

  // Convert search results to coin format if needed
  const displayCoins = searchQuery && searchResults 
    ? searchResults.coins.map(coin => ({
        ...coin,
        current_price: 0,
        market_cap: 0,
        market_cap_rank: coin.market_cap_rank || 0,
        fully_diluted_valuation: null,
        total_volume: 0,
        high_24h: 0,
        low_24h: 0,
        price_change_24h: 0,
        price_change_percentage_24h: 0,
        market_cap_change_24h: 0,
        market_cap_change_percentage_24h: 0,
        circulating_supply: 0,
        total_supply: null,
        max_supply: null,
        ath: 0,
        ath_change_percentage: 0,
        ath_date: '',
        atl: 0,
        atl_change_percentage: 0,
        atl_date: '',
        roi: null,
        last_updated: '',
        image: coin.large,
      }))
    : topCoins;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Cryptocurrency Dashboard
          </h1>
          <p className="text-muted-foreground mb-6">
            Track the top cryptocurrencies by market cap and search for specific coins
          </p>
          
          <SearchBar
            onSearch={setSearchQuery}
            isLoading={isLoading}
            className="max-w-md"
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