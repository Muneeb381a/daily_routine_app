import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pkg;

const requiredVarNames = [
  "DB_PORT",
  "DB_HOST",
  "DB_USER",
  "DB_DATABASE",
  "DB_PASSWORD",
];

for (const varName of requiredVarNames) {
  if (!process.env[varName]) {
    throw new Error(`Missing required field: ${varName}`);
  }
}

const pool = new Pool({
 connectionString: process.env.DATABASE_URL,
 ssl: {rejectUnauthorized: false}
});

export { pool };
