import express, { Request, Response } from 'express';

const app = express();
app.use(express.json());

// Base health-check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'healthy', message: 'Core system operational.' });
});

export default app;