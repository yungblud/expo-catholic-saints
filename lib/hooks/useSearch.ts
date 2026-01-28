import { useState, useCallback, useMemo } from 'react';
import { searchSaints, SearchMode } from '@/lib/search/searchSaints';
import { SearchResult } from '@/lib/types/saints';

export interface UseSearchOptions {
  mode?: SearchMode;
  limit?: number;
  debounceMs?: number;
}

export interface UseSearchResult {
  results: SearchResult[];
  isSearching: boolean;
  query: string;
  mode: SearchMode;
  search: (query: string) => void;
  setMode: (mode: SearchMode) => void;
  clear: () => void;
}

/**
 * Custom hook for saint search functionality
 */
export function useSearch(options: UseSearchOptions = {}): UseSearchResult {
  const { mode: initialMode = 'name', limit = 50 } = options;

  const [query, setQuery] = useState('');
  const [mode, setMode] = useState<SearchMode>(initialMode);
  const [isSearching, setIsSearching] = useState(false);

  // Memoize search results
  const results = useMemo(() => {
    if (!query.trim()) {
      return [];
    }
    return searchSaints(query, mode, limit);
  }, [query, mode, limit]);

  const search = useCallback((newQuery: string) => {
    setIsSearching(true);
    setQuery(newQuery);
    // Search is synchronous, so we can immediately set isSearching to false
    setIsSearching(false);
  }, []);

  const clear = useCallback(() => {
    setQuery('');
  }, []);

  const handleModeChange = useCallback((newMode: SearchMode) => {
    setMode(newMode);
  }, []);

  return {
    results,
    isSearching,
    query,
    mode,
    search,
    setMode: handleModeChange,
    clear,
  };
}
