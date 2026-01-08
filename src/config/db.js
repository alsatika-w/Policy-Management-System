import pkg from 'pg';
const {Pool} = pkg;

/**
 * Pool = connection pool
 * Reused by all modules
 */

console.log('DB_User value:', process.env.DB_USER);
console.log('DB_Password value:', process.env.DB_PASSWORD);
console.log('DB_Password Value:', typeof process.env.DB_PASSWORD);
console.log('DB_Host value:', process.env.DB_HOST)

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

export default pool;
