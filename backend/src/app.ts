import express, { Request, Response, NextFunction } from 'express';
import calculateRouter from './routes/calculate';
import historyRouter from './routes/history';

const app = express();

app.use(express.json());

app.get('/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', service: 'backend', version: '1.0.0' });
});

app.use('/api/calculate', calculateRouter);
app.use('/api/history', historyRouter);

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error('Unhandled error:', err.message);
  res.status(500).json({ error: 'Internal server error' });
});

export default app;