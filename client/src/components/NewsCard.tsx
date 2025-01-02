import { motion } from 'framer-motion';
import { Bookmark, Share2, ExternalLink } from 'lucide-react';
import { NewsArticle } from '../types/news';
import { formatDate } from '../utils/dateFormatter';

interface NewsCardProps {
  article: NewsArticle;
  onBookmark: (article: NewsArticle) => void;
  isBookmarked: boolean;
}

export function NewsCard({ article, onBookmark, isBookmarked }: NewsCardProps) {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          text: article.description,
          url: article.url,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      console.log('Sharing not supported on this device.');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      className="relative min-h-screen w-full overflow-hidden bg-black dark:bg-gray-900"
    >
      <div className="h-[60vh] relative">
        <img
          src={
            article.urlToImage ||
            'https://via.placeholder.com/1000x500.png?text=No+Image+Available'
          }
          alt={article.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50" />
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 to-transparent">
        <div className="space-y-4">
          <div className="flex items-center justify-between text-white/80 text-sm">
            <span>{article.source.name}</span>
            <span>{formatDate(article.publishedAt)}</span>
          </div>

          <h2 className="text-2xl font-bold text-white leading-tight">
            {article.title}
          </h2>

          <p className="text-white/90 line-clamp-3">
            {article.description || 'No description available.'}
          </p>

          <div className="flex items-center justify-between pt-4">
            <div className="flex gap-4">
              <button
                onClick={() => onBookmark(article)}
                aria-label="Bookmark"
                className="text-white hover:text-yellow-400 transition-colors"
              >
                <Bookmark
                  className={`w-6 h-6 ${isBookmarked ? 'fill-yellow-400' : ''}`}
                />
              </button>
              <button
                onClick={handleShare}
                aria-label="Share"
                className="text-white hover:text-blue-400 transition-colors"
              >
                <Share2 className="w-6 h-6" />
              </button>
            </div>

            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              Read More
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
