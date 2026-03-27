import express from 'express';
import { fetchNews } from '../services/newsService.js';

const router = express.Router();

router.get('/news', async (req, res) => {
  try {
    const result = await fetchNews();
    res.json(result);
  } catch (error) {
    res.status(500).json({
      error: 'Failed to fetch news',
      message: error.message
    });
  }
});

export default router;
