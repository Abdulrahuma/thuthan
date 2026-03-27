import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

export const fetchRenewableNews = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/news`, {
      timeout: 120000
    });
    
    return {
      articles: response.data?.articles || [],
      totalArticles: response.data?.totalArticles || 0,
      isMock: response.data?.isMock || false,
      error: response.data?.error || null
    };
  } catch (error) {
    return {
      articles: [],
      totalArticles: 0,
      isMock: false,
      error: error.response?.data?.error || error.message || "Failed to connect to the server. Please try again later."
    };
  }
};
