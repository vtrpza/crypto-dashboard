'use client';

import { useQuery } from '@tanstack/react-query';
import { CoinGeckoAPI } from '@/lib/api/coingecko';
import type { CoinData, CoinDetails, SearchResponse, EnhancedSearchResponse, ChartData } from '@/lib/types/crypto';

/**
 * Hook to fetch top coins by market cap
 */
export function useTopCoins(limit = 20) {
  return useQuery<CoinData[], Error>({
    queryKey: ['coins', 'top', limit],
    queryFn: () => CoinGeckoAPI.getTopCoins(limit),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}

/**
 * Hook to search for coins
 */
export function useSearchCoins(query: string) {
  return useQuery<SearchResponse, Error>({
    queryKey: ['coins', 'search', query],
    queryFn: () => CoinGeckoAPI.searchCoins(query),
    enabled: query.length > 2, // Only search if query is longer than 2 characters
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}

/**
 * Enhanced hook that combines search results with market data
 * Follows two-stage pattern: search first, then fetch market data
 */
export function useSearchCoinsWithMarketData(query: string) {
  // Stage 1: Search for coins (basic info only)
  const searchQuery = useQuery<SearchResponse, Error>({
    queryKey: ['coins', 'search', query],
    queryFn: () => CoinGeckoAPI.searchCoins(query),
    enabled: query.length > 2,
    staleTime: 10 * 60 * 1000,
  });

  // Extract coin IDs from search results
  const coinIds = searchQuery.data?.coins.map(coin => coin.id) || [];

  // Stage 2: Fetch market data for searched coins
  const marketDataQuery = useQuery<CoinData[], Error>({
    queryKey: ['coins', 'market-data', coinIds],
    queryFn: () => CoinGeckoAPI.getCoinsByIds(coinIds),
    enabled: coinIds.length > 0 && !searchQuery.isLoading && !searchQuery.error,
    staleTime: 5 * 60 * 1000, // 5 minutes for market data
  });

  // Combine search results with market data
  const combinedData = searchQuery.data && marketDataQuery.data
    ? {
        ...searchQuery.data,
        coins: searchQuery.data.coins.map(searchCoin => {
          // Find corresponding market data
          const marketData = marketDataQuery.data.find(
            marketCoin => marketCoin.id === searchCoin.id
          );
          
          // If market data exists, use it; otherwise provide safe fallbacks
          return marketData || {
            id: searchCoin.id,
            symbol: searchCoin.symbol,
            name: searchCoin.name,
            image: searchCoin.large,
            current_price: 0,
            market_cap: 0,
            market_cap_rank: searchCoin.market_cap_rank || 0,
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
          };
        })
      }
    : searchQuery.data;

  return {
    data: combinedData as EnhancedSearchResponse | undefined,
    isLoading: searchQuery.isLoading,
    isLoadingMarketData: marketDataQuery.isLoading,
    error: searchQuery.error || marketDataQuery.error,
    // Progressive loading states
    hasSearchResults: !!searchQuery.data,
    hasMarketData: !!marketDataQuery.data,
  };
}

/**
 * Hook to fetch coin details with enhanced error handling and data validation
 */
export function useCoinDetails(id: string) {
  return useQuery<CoinDetails, Error>({
    queryKey: ['coin', id],
    queryFn: async () => {
      console.log(`Fetching coin details for ID: ${id}`);
      const data = await CoinGeckoAPI.getCoinDetails(id);
      
      // Additional runtime validation to ensure critical data is present
      if (!data || !data.id) {
        throw new Error('Invalid coin data received from API');
      }
      
      return data;
    },
    select: (data) => {
      // Additional safety layer: ensure all numeric fields have fallback values
      return {
        ...data,
        current_price: isFinite(data.current_price) ? data.current_price : 0,
        market_cap: isFinite(data.market_cap) ? data.market_cap : 0,
        total_volume: isFinite(data.total_volume) ? data.total_volume : 0,
        high_24h: isFinite(data.high_24h) ? data.high_24h : 0,
        low_24h: isFinite(data.low_24h) ? data.low_24h : 0,
        price_change_percentage_24h: isFinite(data.price_change_percentage_24h) ? data.price_change_percentage_24h : 0,
        market_cap_rank: data.market_cap_rank || 0,
      };
    },
    enabled: !!id && id.length > 0 && id !== 'undefined',
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes garbage collection
    retry: (failureCount, error) => {
      console.error(`Coin details fetch failed (attempt ${failureCount + 1}):`, error);
      
      // Don't retry on client-side errors (4xx)
      if (error.message.includes('404') || error.message.includes('400')) {
        return false;
      }
      
      return failureCount < 3; // Allow one more retry
    },
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
}

/**
 * Hook to fetch coin chart data
 */
export function useCoinChart(id: string, days = 7) {
  return useQuery<ChartData[], Error>({
    queryKey: ['coin', id, 'chart', days],
    queryFn: () => {
      console.log(`Fetching chart data for ID: ${id}, days: ${days}`);
      return CoinGeckoAPI.getCoinChart(id, days);
    },
    enabled: !!id && id.length > 0,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: (failureCount, error) => {
      console.error(`Chart data fetch failed (attempt ${failureCount + 1}):`, error);
      return failureCount < 2;
    },
  });
}

/**
 * Hook to fetch trending coins
 */
export function useTrendingCoins() {
  return useQuery({
    queryKey: ['coins', 'trending'],
    queryFn: () => CoinGeckoAPI.getTrendingCoins(),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}