import express from 'express';
import { fetchNewsFromApi } from '../services/newsService.js';

const router = express.Router();

router.get('/top-headlines', async (req, res) => {
  try {
    const { page = 1 } = req.query;
    const news = await fetchNewsFromApi(page);
    res.json(news);
  } catch (error) {
    res.status(500).json({ 
      error: 'Failed to fetch news',
      message: error.message 
    });
  }
});

export default router;