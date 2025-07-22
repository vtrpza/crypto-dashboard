import type { CoinDetailsApiResponse, CoinDetails } from '@/lib/types/crypto';

/**
 * Transforms CoinGecko API response to component-friendly format
 * Safely extracts USD values from nested currency objects
 */
export function transformCoinDetails(apiResponse: CoinDetailsApiResponse): CoinDetails {
  const { market_data, image, ...baseData } = apiResponse;
  
  // Helper function to safely extract USD value from currency object
  const getUsdValue = (currencyObj?: { [key: string]: number }): number => {
    return currencyObj?.usd ?? 0;
  };

  // Helper function to safely get number value with fallback
  const safeNumber = (value?: number | null): number => {
    return (typeof value === 'number' && !isNaN(value)) ? value : 0;
  };

  // Transform the nested market_data structure to flat structure
  const transformed: CoinDetails = {
    // Base coin info
    id: baseData.id,
    symbol: baseData.symbol,
    name: baseData.name,
    image: image?.large || image?.small || image?.thumb || '',
    
    // Market data - extract USD values from nested structure
    current_price: getUsdValue(market_data?.current_price),
    market_cap: getUsdValue(market_data?.market_cap),
    market_cap_rank: market_data?.market_cap_rank ?? 0,
    fully_diluted_valuation: null, // Not typically available in detail endpoint
    total_volume: getUsdValue(market_data?.total_volume),
    high_24h: getUsdValue(market_data?.high_24h),
    low_24h: getUsdValue(market_data?.low_24h),
    
    // Price changes
    price_change_24h: safeNumber(market_data?.price_change_24h),
    price_change_percentage_24h: safeNumber(market_data?.price_change_percentage_24h),
    market_cap_change_24h: safeNumber(market_data?.market_cap_change_24h),
    market_cap_change_percentage_24h: safeNumber(market_data?.market_cap_change_percentage_24h),
    
    // Supply data
    circulating_supply: safeNumber(market_data?.circulating_supply),
    total_supply: market_data?.total_supply ?? null,
    max_supply: market_data?.max_supply ?? null,
    
    // All-time high/low
    ath: getUsdValue(market_data?.ath),
    ath_change_percentage: getUsdValue(market_data?.ath_change_percentage),
    ath_date: market_data?.ath_date?.usd || '',
    atl: getUsdValue(market_data?.atl),
    atl_change_percentage: getUsdValue(market_data?.atl_change_percentage),
    atl_date: market_data?.atl_date?.usd || '',
    
    // ROI - not typically available in details endpoint
    roi: null,
    
    // Timestamps
    last_updated: market_data?.last_updated || baseData.last_updated || '',
    
    // Additional detail fields
    description: apiResponse.description,
    links: apiResponse.links,
  };

  return transformed;
}

/**
 * Enhanced null-safe currency formatter with better defaults
 */
export function formatCurrencySafe(value: number | null | undefined): string {
  // Handle null, undefined, NaN, and Infinity cases
  if (value == null || !isFinite(value)) {
    return '$0.00';
  }
  
  const absValue = Math.abs(value);
  const isNegative = value < 0;
  
  let result: string;
  
  if (absValue >= 1e12) {
    result = `$${(absValue / 1e12).toFixed(2)}T`;
  } else if (absValue >= 1e9) {
    result = `$${(absValue / 1e9).toFixed(2)}B`;
  } else if (absValue >= 1e6) {
    result = `$${(absValue / 1e6).toFixed(2)}M`;
  } else if (absValue >= 1e3) {
    result = `$${(absValue / 1e3).toFixed(2)}K`;
  } else if (absValue >= 1) {
    result = `$${absValue.toFixed(2)}`;
  } else if (absValue > 0) {
    // For small values, show appropriate decimal places
    result = `$${absValue.toFixed(6)}`;
  } else {
    result = '$0.00';
  }
  
  return isNegative ? `-${result}` : result;
}

/**
 * Enhanced percentage formatter with better null handling
 */
export function formatPercentageSafe(value: number | null | undefined): string {
  if (value == null || !isFinite(value)) {
    return '0.00%';
  }
  
  return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`;
}