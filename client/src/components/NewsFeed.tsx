import { useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Loader2 } from 'lucide-react';
import { useNewsArticles } from '../hooks/useNewsArticles';
import { NewsCard } from './NewsCard';
import { useBookmarks } from '../hooks/useBookmarks';

export function NewsFeed() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError } = useNewsArticles();
  const { bookmarks, toggleBookmark } = useBookmarks();
  const { ref, inView } = useInView();
  const prevInView = useRef(inView);

  // Load more articles when reaching the end
  if (inView && !prevInView.current && hasNextPage && !isFetchingNextPage) {
    fetchNextPage();
  }
  prevInView.current = inView;

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="h-screen flex items-center justify-center p-4 text-center">
        <div className="space-y-4">
          <p className="text-red-500">Failed to load news articles</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-500 text-black rounded-full hover:bg-blue-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const articles = data?.pages.flatMap(page => page.articles) ?? [];

  return (
    <div className="h-screen overflow-y-auto snap-y snap-mandatory">
      <AnimatePresence>
        {articles.map((article, index) => (
          <div key={article.url} className="snap-start h-screen">
            <NewsCard
              article={article}
              onBookmark={toggleBookmark}
              isBookmarked={bookmarks.some(b => b.url === article.url)}
            />
            {index === articles.length - 3 && <div ref={ref} />}
          </div>
        ))}
      </AnimatePresence>

      {isFetchingNextPage && (
        <div className="h-screen flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
        </div>
      )}
    </div>
  );
}