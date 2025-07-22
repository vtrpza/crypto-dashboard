'use client';

import { Search, X } from 'lucide-react';
import { useState, useCallback } from 'react';
import { debounce } from '@/lib/utils/format';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  isLoading?: boolean;
  className?: string;
}

export default function SearchBar({
  onSearch,
  placeholder = 'Search cryptocurrencies...',
  isLoading = false,
  className = '',
}: SearchBarProps) {
  const [query, setQuery] = useState('');

  // Debounced search function
  const debouncedSearch = useCallback(
    (searchQuery: string) => {
      const debouncedFn = debounce(() => {
        onSearch(searchQuery);
      }, 300);
      debouncedFn();
    },
    [onSearch]
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    debouncedSearch(value);
  };

  const clearSearch = () => {
    setQuery('');
    onSearch('');
  };

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        {/* Search Icon - Mobile First Responsive */}
        <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
        
        {/* Input Field - Mobile First Touch-Friendly */}
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder={placeholder}
          disabled={isLoading}
          className="w-full pl-10 sm:pl-12 pr-12 sm:pr-14 py-3 sm:py-4 text-base border border-input bg-background text-foreground rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Search cryptocurrencies"
        />
        
        {/* Clear Button - Mobile First Touch Target */}
        {query && (
          <button
            onClick={clearSearch}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 text-muted-foreground hover:text-foreground active:text-foreground transition-colors"
            aria-label="Clear search"
          >
            <X className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
        )}
        
        {/* Loading Spinner - Mobile First Responsive */}
        {isLoading && (
          <div className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2">
            <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-muted border-t-primary rounded-full animate-spin"></div>
          </div>
        )}
      </div>
    </div>
  );
}