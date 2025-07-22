import axios from 'axios';
import type {
  CoinData,
  CoinDetails,
  CoinDetailsApiResponse,
  SearchResponse,
  PriceHistory,
  ChartData,
  ApiError,
} from '@/lib/types/crypto';
import { transformCoinDetails } from '@/lib/utils/crypto-transform';

const BASE_URL = 'https://api.coingecko.com/api/v3';

// Create axios instance with default config
const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
});

// Request interceptor for API calls
api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for API calls
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const status = error.response?.status;
    const isRateLimit = status === 429;
    
    // Extract retry-after header (can be in seconds or as a date)
    let retryAfter: number | undefined;
    if (isRateLimit) {
      const retryAfterHeader = error.response?.headers['retry-after'];
      if (retryAfterHeader) {
        // If it's a number, it's seconds. If it's a date string, calculate difference
        const retryValue = parseInt(retryAfterHeader);
        retryAfter = isNaN(retryValue) ? 60 : retryValue; // Default to 60 seconds if parsing fails
      } else {
        retryAfter = 60; // Default retry after 60 seconds for rate limits
      }
    }

    const apiError: ApiError = {
      message: isRateLimit 
        ? 'Too many requests. Please wait before trying again.'
        : error.response?.data?.message || error.message || 'An unknown error occurred',
      status,
      isRateLimit,
      retryAfter,
    };
    
    // Log rate limit errors for monitoring
    if (isRateLimit) {
      console.warn(`Rate limit hit. Retry after: ${retryAfter} seconds`);
    }
    
    return Promise.reject(apiError);
  }
);

export class CoinGeckoAPI {
  /**
   * Get top cryptocurrencies by market cap
   */
  static async getTopCoins(limit = 20): Promise<CoinData[]> {
    try {
      const response = await api.get('/coins/markets', {
        params: {
          vs_currency: 'usd',
          order: 'market_cap_desc',
          per_page: limit,
          page: 1,
          sparkline: false,
          price_change_percentage: '24h',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching top coins:', error);
      throw error;
    }
  }

  /**
   * Search for cryptocurrencies
   */
  static async searchCoins(query: string): Promise<SearchResponse> {
    try {
      const response = await api.get('/search', {
        params: { query },
      });
      return response.data;
    } catch (error) {
      console.error('Error searching coins:', error);
      throw error;
    }
  }

  /**
   * Get market data for specific coins by IDs
   */
  static async getCoinsByIds(coinIds: string[]): Promise<CoinData[]> {
    if (coinIds.length === 0) return [];
    
    try {
      const response = await api.get('/coins/markets', {
        params: {
          vs_currency: 'usd',
          ids: coinIds.join(','),
          order: 'market_cap_desc',
          per_page: 100,
          page: 1,
          sparkline: false,
          price_change_percentage: '24h',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching coins by IDs:', error);
      throw error;
    }
  }

  /**
   * Get detailed information about a specific coin
   */
  static async getCoinDetails(id: string): Promise<CoinDetails> {
    try {
      const response = await api.get<CoinDetailsApiResponse>(`/coins/${id}`, {
        params: {
          localization: false,
          tickers: false,
          market_data: true,
          community_data: false,
          developer_data: false,
          sparkline: false,
        },
      });
      
      // Transform the nested API response to flat component-friendly structure
      return transformCoinDetails(response.data);
    } catch (error) {
      console.error('Error fetching coin details:', error);
      throw error;
    }
  }

  /**
   * Get price history for a specific coin
   */
  static async getCoinChart(id: string, days = 7): Promise<ChartData[]> {
    try {
      const response = await api.get<PriceHistory>(`/coins/${id}/market_chart`, {
        params: {
          vs_currency: 'usd',
          days,
          interval: days <= 1 ? 'hourly' : 'daily',
        },
      });

      // Transform the data to our ChartData format
      return response.data.prices.map(([timestamp, price]) => ({
        timestamp,
        price,
      }));
    } catch (error) {
      console.error('Error fetching coin chart data:', error);
      throw error;
    }
  }

  /**
   * Get trending coins
   */
  static async getTrendingCoins(): Promise<any> {
    try {
      const response = await api.get('/search/trending');
      return response.data;
    } catch (error) {
      console.error('Error fetching trending coins:', error);
      throw error;
    }
  }
}

// Export individual functions for easier imports
export const {
  getTopCoins,
  searchCoins,
  getCoinsByIds,
  getCoinDetails,
  getCoinChart,
  getTrendingCoins,
} = CoinGeckoAPI;