import { useRef, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Loader2 } from 'lucide-react';
import { useNewsArticles } from '../hooks/useNewsArticles';
import { NewsCard } from './NewsCard';
import { useBookmarks } from '../hooks/useBookmarks';

export function NewsFeed() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = useNewsArticles();

  const { bookmarks, toggleBookmark } = useBookmarks();
  const { ref, inView } = useInView({ threshold: 0.5 });
  const prevInView = useRef(inView);

  useEffect(() => {
    if (inView && !prevInView.current && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
    prevInView.current = inView;
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  // Display loading state
  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  // Display error state
  if (isError) {
    return (
      <div className="h-screen flex flex-col items-center justify-center p-4 text-center">
        <p className="text-red-500 text-lg font-bold">Failed to Load News Articles</p>
        <p className="text-gray-400 text-sm">{error?.message || 'An unexpected error occurred.'}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  // Flatten articles from paginated data
  const articles = data?.pages.flatMap((page) => page.articles) ?? [];

  return (
    <div className="h-screen overflow-y-auto snap-y snap-mandatory">
      <AnimatePresence>
        {articles.map((article, index) => (
          <div key={article.url} className="snap-start h-screen">
            <NewsCard
              article={article}
              onBookmark={toggleBookmark}
              isBookmarked={bookmarks.some((b) => b.url === article.url)}
            />
            {/* Intersection observer trigger for loading more */}
            {index === articles.length - 3 && <div ref={ref} />}
          </div>
        ))}
      </AnimatePresence>

      {/* Show loading spinner when fetching more articles */}
      {isFetchingNextPage && (
        <div className="h-screen flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
        </div>
      )}
    </div>
  );
}
