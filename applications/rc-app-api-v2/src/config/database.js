import pg from "pg"
import dotenv from "dotenv"

dotenv.config()

const { Pool } = pg

export const pool = new Pool({
  host: process.env.DB_HOST || 'db',
  port: process.env.DB_PORT || '5433',
  user: process.env.DB_USER || 'rctv',
  password: process.env.DB_PASSWORD || 'rctv@01',
  database: process.env.DB_NAME || 'media_db',
})

// Test connection
pool.on("connect", () => {
  console.log("✅ Connected to PostgreSQL database")
})

pool.on("error", (err) => {
  console.error("❌ Unexpected error on idle client", err)
  process.exit(-1)
})
