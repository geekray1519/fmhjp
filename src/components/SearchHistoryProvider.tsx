"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";

interface SearchHistoryContextValue {
  history: string[];
  addSearch: (query: string) => void;
  removeSearch: (query: string) => void;
  clearHistory: () => void;
}

const SearchHistoryContext = createContext<SearchHistoryContextValue>({
  history: [],
  addSearch: () => {},
  removeSearch: () => {},
  clearHistory: () => {},
});

export function useSearchHistory() {
  return useContext(SearchHistoryContext);
}

const STORAGE_KEY = "fmhjp-search-history";
const MAX_HISTORY = 10;

function loadHistory(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return parsed.filter((s): s is string => typeof s === "string");
    return [];
  } catch {
    return [];
  }
}

function saveHistory(history: string[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  } catch {
    // Storage full or unavailable
  }
}

export function SearchHistoryProvider({ children }: { children: ReactNode }) {
  const [history, setHistory] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHistory(loadHistory());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) {
      saveHistory(history);
    }
  }, [history, hydrated]);

  const addSearch = useCallback((query: string) => {
    const q = query.trim();
    if (!q) return;
    setHistory((prev) => {
      const filtered = prev.filter((s) => s !== q);
      return [q, ...filtered].slice(0, MAX_HISTORY);
    });
  }, []);

  const removeSearch = useCallback((query: string) => {
    setHistory((prev) => prev.filter((s) => s !== query));
  }, []);

  const clearHistory = useCallback(() => {
    setHistory([]);
  }, []);

  return (
    <SearchHistoryContext.Provider
      value={{ history, addSearch, removeSearch, clearHistory }}
    >
      {children}
    </SearchHistoryContext.Provider>
  );
}
