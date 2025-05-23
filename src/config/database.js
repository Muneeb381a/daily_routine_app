import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
  max: 5,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// handle pool errors

pool.on("error", (err, client) => {
  console.error("Database Pool Error", err.stack);
});

pool
  .connect()
  .then(async (client) => {
    console.log("Connected to neon database Succefully");
    return client
      .query("SELECT NOW()")
      .then(() => client.release)
      .catch((err) => {
        console.error("Database query Failed", err.stack);
        client.release();
      });
  })
  .catch((err) =>
    console.error(
      "Error While establishing connection with Live database",
      err.stack
    )
  );

export { pool };
