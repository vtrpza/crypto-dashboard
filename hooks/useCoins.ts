'use client';

import { useQuery } from '@tanstack/react-query';
import { CoinGeckoAPI } from '@/lib/api/coingecko';
import type { CoinData, CoinDetails, SearchResponse, ChartData } from '@/lib/types/crypto';

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
 * Hook to fetch coin details
 */
export function useCoinDetails(id: string) {
  return useQuery<CoinDetails, Error>({
    queryKey: ['coin', id],
    queryFn: () => CoinGeckoAPI.getCoinDetails(id),
    enabled: !!id,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}

/**
 * Hook to fetch coin chart data
 */
export function useCoinChart(id: string, days = 7) {
  return useQuery<ChartData[], Error>({
    queryKey: ['coin', id, 'chart', days],
    queryFn: () => CoinGeckoAPI.getCoinChart(id, days),
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
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