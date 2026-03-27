import { useState, useEffect } from 'react';
import { fetchRenewableNews } from '../services/newsApi';

const CACHE_KEY = 'thuthan_news_cache';
const CACHE_DURATION_MS = 24 * 60 * 60 * 1000;

export const useNews = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refreshNews = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetchRenewableNews();
      setArticles(response.articles || []);
      setError(response.error || null);
    } catch (err) {
      setError(err.message || 'Failed to fetch news');
      setArticles([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshNews();
  }, []);

  return { articles, loading, error, refreshNews };
};
