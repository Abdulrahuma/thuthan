import axios from 'axios';
import { addCategoryToArticles } from '../utils/filter.js';

const API_URL = 'https://gnews.io/api/v4/search';
const MAX_RESULTS = 200;
const REQUEST_DELAY = 1000;

const INDIA_SEARCH_TERMS = [
  'renewable energy',
  'solar energy',
  'wind energy'
];

const INTERNATIONAL_SEARCH_TERM = 'renewable energy';

const getTime24HoursAgo = () => {
  return new Date(Date.now() - 24 * 60 * 60 * 1000);
};

const isWithin24Hours = (article) => {
  try {
    const publishDate = new Date(article.publishedAt);
    return publishDate > getTime24HoursAgo();
  } catch {
    return false;
  }
};

const filterBy24Hours = (articles) => {
  return articles.filter(isWithin24Hours);
};

const removeDuplicates = (articles) => {
  const seenUrls = new Set();
  return articles.filter(article => {
    const url = article.url || article.title;
    if (seenUrls.has(url)) return false;
    seenUrls.add(url);
    return true;
  });
};

const sortByNewest = (articles) => {
  return articles.sort((a, b) => {
    return new Date(b.publishedAt) - new Date(a.publishedAt);
  });
};

const fetchFromAPI = async (apiKey, searchTerm, country) => {
  const params = {
    q: searchTerm,
    lang: 'en',
    max: 50,
    apikey: apiKey
  };

  if (country) {
    params.country = country;
  }

  try {
    const response = await axios.get(API_URL, {
      params,
      timeout: 30000
    });

    if (response.data?.articles) {
      return response.data.articles.map(article => ({
        title: article.title || '',
        description: article.description || '',
        url: article.url || '#',
        image: article.image || null,
        publishedAt: article.publishedAt || new Date().toISOString(),
        source: { name: article.source?.name || 'Unknown' },
        country: country || 'world'
      }));
    }
    return [];
  } catch {
    return [];
  }
};

const fetchNews = async () => {
  const apiKey = process.env.GNEWS_API_KEY;
  
  if (!apiKey || apiKey === 'your_api_key_here' || apiKey === 'demo') {
    return {
      error: "API key not configured. Please set GNEWS_API_KEY in your .env file to fetch live news.",
      articles: [],
      totalArticles: 0,
      isMock: false
    };
  }

  try {
    const allArticles = [];

    for (const term of INDIA_SEARCH_TERMS) {
      const articles = await fetchFromAPI(apiKey, term, 'in');
      if (articles.length > 0) {
        allArticles.push(...articles);
      }
      await new Promise(resolve => setTimeout(resolve, REQUEST_DELAY));
    }

    const worldArticles = await fetchFromAPI(apiKey, INTERNATIONAL_SEARCH_TERM, null);
    if (worldArticles.length > 0) {
      allArticles.push(...worldArticles);
    }

    if (allArticles.length === 0) {
      return {
        error: "No renewable energy news found for the last 24 hours. Please try again later.",
        articles: [],
        totalArticles: 0,
        isMock: false
      };
    }

    const filtered = filterBy24Hours(allArticles);
    const unique = removeDuplicates(filtered);
    const sorted = sortByNewest(unique);
    const categorized = addCategoryToArticles(sorted);
    const final = categorized.slice(0, MAX_RESULTS);

    if (final.length === 0) {
      return {
        error: "No renewable energy news found for the last 24 hours. Please try again later.",
        articles: [],
        totalArticles: 0,
        isMock: false
      };
    }

    return {
      articles: final,
      totalArticles: final.length,
      isMock: false
    };

  } catch (err) {
    return {
      error: "Failed to fetch news from API. Please check your internet connection and try again.",
      articles: [],
      totalArticles: 0,
      isMock: false
    };
  }
};

export { fetchNews };
