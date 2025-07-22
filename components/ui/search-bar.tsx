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
    debounce((searchQuery: string) => {
      onSearch(searchQuery);
    }, 300),
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
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder={placeholder}
          disabled={isLoading}
          className="w-full pl-10 pr-10 py-2 border border-input bg-background text-foreground rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Search cryptocurrencies"
        />
        {query && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Clear search"
          >
            <X className="h-4 w-4" />
          </button>
        )}
        {isLoading && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <div className="w-4 h-4 border-2 border-muted border-t-primary rounded-full animate-spin"></div>
          </div>
        )}
      </div>
    </div>
  );
}