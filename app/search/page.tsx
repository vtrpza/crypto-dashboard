'use client';

import { useState } from 'react';
import { useSearchCoins } from '@/hooks/useCoins';
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
    error 
  } = useSearchCoins(searchQuery);

  // Convert search results to coin format
  const displayCoins = searchResults 
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
    : [];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Search Cryptocurrencies
          </h1>
          <p className="text-muted-foreground mb-6">
            Find specific cryptocurrencies by name or symbol
          </p>
          
          <SearchBar
            onSearch={setSearchQuery}
            isLoading={isLoading}
            placeholder="Search for Bitcoin, Ethereum, etc..."
            className="max-w-lg"
          />
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
                  Found {searchResults.coins.length} results for "{searchQuery}"
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