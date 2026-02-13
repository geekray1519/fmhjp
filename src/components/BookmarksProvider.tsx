"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";

interface BookmarkEntry {
  name: string;
  url: string;
  description: string;
  starred?: boolean;
  addedAt: number;
}

interface BookmarksContextValue {
  bookmarks: BookmarkEntry[];
  isBookmarked: (url: string) => boolean;
  toggleBookmark: (entry: Omit<BookmarkEntry, "addedAt">) => void;
  clearBookmarks: () => void;
  bookmarkCount: number;
}

const BookmarksContext = createContext<BookmarksContextValue>({
  bookmarks: [],
  isBookmarked: () => false,
  toggleBookmark: () => {},
  clearBookmarks: () => {},
  bookmarkCount: 0,
});

export function useBookmarks() {
  return useContext(BookmarksContext);
}

const STORAGE_KEY = "fmhjp-bookmarks";

function loadBookmarks(): BookmarkEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return parsed;
    return [];
  } catch {
    return [];
  }
}

function saveBookmarks(bookmarks: BookmarkEntry[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks));
  } catch {
    // Storage full or unavailable — silently ignore
  }
}

export function BookmarksProvider({ children }: { children: ReactNode }) {
  const [bookmarks, setBookmarks] = useState<BookmarkEntry[]>([]);
  const [hydrated, setHydrated] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    setBookmarks(loadBookmarks());
    setHydrated(true);
  }, []);

  // Persist to localStorage on change
  useEffect(() => {
    if (hydrated) {
      saveBookmarks(bookmarks);
    }
  }, [bookmarks, hydrated]);

  const isBookmarked = useCallback(
    (url: string) => bookmarks.some((b) => b.url === url),
    [bookmarks]
  );

  const toggleBookmark = useCallback(
    (entry: Omit<BookmarkEntry, "addedAt">) => {
      setBookmarks((prev) => {
        const exists = prev.find((b) => b.url === entry.url);
        if (exists) {
          return prev.filter((b) => b.url !== entry.url);
        }
        return [{ ...entry, addedAt: Date.now() }, ...prev];
      });
    },
    []
  );

  const clearBookmarks = useCallback(() => {
    setBookmarks([]);
  }, []);

  return (
    <BookmarksContext.Provider
      value={{
        bookmarks,
        isBookmarked,
        toggleBookmark,
        clearBookmarks,
        bookmarkCount: bookmarks.length,
      }}
    >
      {children}
    </BookmarksContext.Provider>
  );
}
