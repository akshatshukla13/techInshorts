import axios from 'axios';
import { config } from '../config.js';

export async function fetchNewsFromApi(page) {
  try {
    const response = await axios.get(`${config.newsApiBaseUrl}/top-headlines`, {
      params: {
        category: 'technology',
        apiKey: config.newsApiKey,
        page,
        pageSize: 10,
      }
    });
    return response.data;
  } catch (error) {
    throw new Error(`News API error: ${error.message}`);
  }
}