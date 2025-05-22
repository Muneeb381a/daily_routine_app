import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pkg;

// const requiredVarNames = [
//   "DB_PORT",
//   "DB_HOST",
//   "DB_USER",
//   "DB_DATABASE",
//   "DB_PASSWORD",
// ];

// for (const varName of requiredVarNames) {
//   if (!process.env[varName]) {
//     throw new Error(`Missing required field: ${varName}`);
//   }
// }

const pool = new Pool({
  port: parseInt(process.env.DB_PORT, 10),
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  max: 10,
  idleTimeoutMillis: 3000,
  connectionTimeoutMillis: 2000,
});

export { pool };
