import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

if (!process.env.DATABASE_URL) {
  throw new Error('❌ Missing DATABASE_URL inside .env configuration file.');
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

export const testDbConnection = async (): Promise<void> => {
  try {
    const client = await pool.connect();
    const res = await client.query('SELECT NOW()');
    console.log(`📡 Database connection successfully pooled! Server time: ${res.rows[0].now}`);
    client.release();
  } catch (error) {
    console.error('❌ Critical Database Connection Error:', error);
    process.exit(1); 
  }
};

export default pool;