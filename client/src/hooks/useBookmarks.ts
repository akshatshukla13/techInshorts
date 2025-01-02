import { useState, useEffect } from 'react';
import { NewsArticle } from '../types/news';

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState<NewsArticle[]>(() => {
    const saved = localStorage.getItem('bookmarks');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  const toggleBookmark = (article: NewsArticle) => {
    setBookmarks(prev => {
      const exists = prev.some(b => b.url === article.url);
      if (exists) {
        return prev.filter(b => b.url !== article.url);
      }
      return [...prev, article];
    });
  };

  return { bookmarks, toggleBookmark };
}