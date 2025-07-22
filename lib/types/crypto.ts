export interface CoinData {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  fully_diluted_valuation: number | null;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  circulating_supply: number;
  total_supply: number | null;
  max_supply: number | null;
  ath: number;
  ath_change_percentage: number;
  ath_date: string;
  atl: number;
  atl_change_percentage: number;
  atl_date: string;
  roi: {
    times: number;
    currency: string;
    percentage: number;
  } | null;
  last_updated: string;
}

// Raw API response from CoinGecko /coins/{id} endpoint
export interface CoinDetailsApiResponse {
  id: string;
  symbol: string;
  name: string;
  image?: {
    thumb: string;
    small: string;
    large: string;
  };
  description?: {
    en: string;
  };
  links?: {
    homepage: string[];
    blockchain_site: string[];
    official_forum_url: string[];
    chat_url: string[];
    announcement_url: string[];
    twitter_screen_name: string;
    facebook_username: string;
    bitcointalk_thread_identifier: number | null;
    telegram_channel_identifier: string;
    subreddit_url: string;
    repos_url: {
      github: string[];
      bitbucket: string[];
    };
  };
  market_data?: {
    current_price: { [key: string]: number };
    market_cap: { [key: string]: number };
    market_cap_rank?: number;
    total_volume: { [key: string]: number };
    high_24h: { [key: string]: number };
    low_24h: { [key: string]: number };
    price_change_24h?: number;
    price_change_percentage_24h?: number;
    market_cap_change_24h?: number;
    market_cap_change_percentage_24h?: number;
    circulating_supply?: number;
    total_supply?: number | null;
    max_supply?: number | null;
    ath?: { [key: string]: number };
    ath_change_percentage?: { [key: string]: number };
    ath_date?: { [key: string]: string };
    atl?: { [key: string]: number };
    atl_change_percentage?: { [key: string]: number };
    atl_date?: { [key: string]: string };
    last_updated?: string;
  };
  last_updated?: string;
}

// Transformed/normalized interface for components (extends CoinData for consistency)
export interface CoinDetails extends CoinData {
  description?: {
    en: string;
  };
  links?: {
    homepage: string[];
    blockchain_site: string[];
    official_forum_url: string[];
    chat_url: string[];
    announcement_url: string[];
    twitter_screen_name: string;
    facebook_username: string;
    bitcointalk_thread_identifier: number | null;
    telegram_channel_identifier: string;
    subreddit_url: string;
    repos_url: {
      github: string[];
      bitbucket: string[];
    };
  };
}

export interface ChartData {
  timestamp: number;
  price: number;
}

export interface SearchResult {
  id: string;
  name: string;
  symbol: string;
  market_cap_rank: number | null;
  thumb: string;
  large: string;
}

export interface SearchResponse {
  coins: SearchResult[];
}

export interface EnhancedSearchResponse {
  coins: CoinData[];
}

export interface PriceHistory {
  prices: [number, number][];
  market_caps: [number, number][];
  total_volumes: [number, number][];
}

export interface ApiError {
  message: string;
  status?: number;
  isRateLimit?: boolean;
  retryAfter?: number; // seconds to wait before retrying
}

export interface LoadingState {
  isLoading: boolean;
  error: string | null;
}