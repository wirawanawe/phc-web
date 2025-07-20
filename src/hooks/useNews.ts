import { useState, useEffect, useCallback } from "react";
import { fetchAllNews, NewsItem } from "@/utils/newsApi";

interface UseNewsReturn {
  featuredNews: NewsItem[];
  recentNews: NewsItem[];
  loading: boolean;
  error: string | null;
  refreshNews: () => void;
  lastUpdated: Date | null;
}

export const useNews = (): UseNewsReturn => {
  const [featuredNews, setFeaturedNews] = useState<NewsItem[]>([]);
  const [recentNews, setRecentNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchNews = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const { featuredNews: featured, recentNews: recent } =
        await fetchAllNews();

      setFeaturedNews(featured);
      setRecentNews(recent);
      setLastUpdated(new Date());
    } catch (err) {
      setError("Gagal memuat berita terbaru. Silakan coba lagi nanti.");
      console.error("Error fetching news:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  const refreshNews = useCallback(() => {
    fetchNews();
  }, [fetchNews]);

  useEffect(() => {
    fetchNews();

    // Set up automatic refresh every 30 minutes
    const interval = setInterval(() => {
      fetchNews();
    }, 30 * 60 * 1000); // 30 minutes

    return () => clearInterval(interval);
  }, [fetchNews]);

  return {
    featuredNews,
    recentNews,
    loading,
    error,
    refreshNews,
    lastUpdated,
  };
};
