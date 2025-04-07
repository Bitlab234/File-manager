import { Pool } from 'pg';

export const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'fileManager',
  password: 'postgres',
  port: 5437,
});