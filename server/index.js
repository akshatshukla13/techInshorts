import express from 'express';
import { corsMiddleware } from './middleware/cors.js';
import newsRoutes from './routes/news.js';
import { config } from './config.js';

const app = express();

app.use(corsMiddleware);
app.use('/api/news', newsRoutes);

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});