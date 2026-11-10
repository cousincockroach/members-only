const { Client } = require("pg");
require("dotenv").config();

const SQL = `
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(100) UNIQUE NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS messages (
  id SERIAL PRIMARY KEY,
  text TEXT NOT NULL,
  user_id INT REFERENCES users(id) ON DELETE CASCADE,
  added TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`;

async function main() {
  console.log("Setting up Mini Message Board database...");
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }, 
  });

  try {
    await client.connect();
    await client.query(SQL);
    console.log("Database tables successfully created!");
  } catch (err) {
    console.error("Setup failed:", err);
  } finally {
    await client.end();
  }
}

main();