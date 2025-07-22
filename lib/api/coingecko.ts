import axios from 'axios';
import type {
  CoinData,
  CoinDetails,
  SearchResponse,
  PriceHistory,
  ChartData,
  ApiError,
} from '@/lib/types/crypto';

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
    const apiError: ApiError = {
      message: error.response?.data?.message || error.message || 'An unknown error occurred',
      status: error.response?.status,
    };
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
   * Get detailed information about a specific coin
   */
  static async getCoinDetails(id: string): Promise<CoinDetails> {
    try {
      const response = await api.get(`/coins/${id}`, {
        params: {
          localization: false,
          tickers: false,
          market_data: true,
          community_data: false,
          developer_data: false,
          sparkline: false,
        },
      });
      return response.data;
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
  getCoinDetails,
  getCoinChart,
  getTrendingCoins,
} = CoinGeckoAPI;