import { useInfiniteQuery } from '@tanstack/react-query';
import { NewsResponse } from '../types/news';

const fetchNewsArticles = async ({ pageParam = 1 }): Promise<NewsResponse> => {
  const response = await fetch(`http://localhost:3000/api/news/top-headlines?page=${pageParam}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export function useNewsArticles() {
  return useInfiniteQuery({
    queryKey: ['news'],
    queryFn: fetchNewsArticles,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length + 1;
      return nextPage * 10 >= lastPage.totalResults ? undefined : nextPage;
    },
    initialPageParam: 1,
  });
}