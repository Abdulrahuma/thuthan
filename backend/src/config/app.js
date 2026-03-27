import express from 'express';
import cors from 'cors';
import newsRouter from '../routes/news.js';

const createApp = () => {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.get('/', (req, res) => {
    res.json({ name: 'Thuthan API', version: '2.0.0' });
  });

  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  app.use('/api', newsRouter);

  app.use((err, req, res, next) => {
    res.status(500).json({ error: 'Internal Server Error' });
  });

  return app;
};

export default createApp;
