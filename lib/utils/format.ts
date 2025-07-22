/**
 * Format a number as currency (USD)
 */
export function formatCurrency(value: number): string {
  if (value === 0) return '$0.00';
  
  const isNegative = value < 0;
  const absValue = Math.abs(value);
  
  let result = '';
  
  if (absValue >= 1e9) {
    result = `$${(absValue / 1e9).toFixed(2)}B`;
  } else if (absValue >= 1e6) {
    result = `$${(absValue / 1e6).toFixed(2)}M`;
  } else if (absValue >= 1e3) {
    result = `$${(absValue / 1e3).toFixed(2)}K`;
  } else if (absValue >= 1) {
    result = `$${absValue.toFixed(2)}`;
  } else {
    // For small values, show more decimal places
    result = `$${absValue.toFixed(6)}`;
  }
  
  return isNegative ? `-${result}` : result;
}

/**
 * Format a number as a percentage
 */
export function formatPercentage(value: number): string {
  if (value === 0) return '0.00%';
  
  return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`;
}

/**
 * Format a large number with abbreviations
 */
export function formatNumber(value: number): string {
  if (value === 0) return '0';
  
  if (Math.abs(value) >= 1e12) {
    return `${(value / 1e12).toFixed(2)}T`;
  }
  
  if (Math.abs(value) >= 1e9) {
    return `${(value / 1e9).toFixed(2)}B`;
  }
  
  if (Math.abs(value) >= 1e6) {
    return `${(value / 1e6).toFixed(2)}M`;
  }
  
  if (Math.abs(value) >= 1e3) {
    return `${(value / 1e3).toFixed(2)}K`;
  }
  
  return value.toFixed(2);
}

/**
 * Format a date from timestamp
 */
export function formatDate(timestamp: number): string {
  const date = new Date(timestamp);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

/**
 * Format a date from timestamp for charts (short format)
 */
export function formatChartDate(timestamp: number): string {
  const date = new Date(timestamp);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
}

/**
 * Get color for percentage change
 */
export function getChangeColor(value: number): string {
  if (value > 0) return 'text-success';
  if (value < 0) return 'text-destructive';
  return 'text-muted-foreground';
}

/**
 * Truncate text with ellipsis
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

/**
 * Debounce function
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}