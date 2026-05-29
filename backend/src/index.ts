import app from './app';
import { testDbConnection } from './config/db';

const PORT = process.env.PORT || 5434;

const bootstrap = async () => {
  // 1. Force database connection verification first
  await testDbConnection();

  // 2. Start the express server only if the database is ready
  app.listen(PORT, () => {
    console.log(`🚀 Dedicated backend listening smoothly on http://localhost:${PORT}`);
  });
};

bootstrap();