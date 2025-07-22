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
  market_data?: {
    current_price: { [key: string]: number };
    market_cap: { [key: string]: number };
    total_volume: { [key: string]: number };
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

export interface PriceHistory {
  prices: [number, number][];
  market_caps: [number, number][];
  total_volumes: [number, number][];
}

export interface ApiError {
  message: string;
  status?: number;
}

export interface LoadingState {
  isLoading: boolean;
  error: string | null;
}