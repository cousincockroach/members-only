const pool = require("./pool");

async function createUser(username, email, hashedPassword) {
  await pool.query(
    "INSERT INTO users (username, email, password) VALUES ($1, $2, $3)",
    [username, email, hashedPassword]
  );
}


async function getAllMessages() {
  const { rows } = await pool.query(`
    SELECT messages.id, messages.text, messages.added, users.username 
    FROM messages 
    JOIN users ON messages.user_id = users.id 
    ORDER BY messages.added DESC
  `);
  return rows;
}


async function createMessage(text, userId) {
  await pool.query(
    "INSERT INTO messages (text, user_id) VALUES ($1, $2)",
    [text, userId]
  );
}

module.exports = {
  createUser,
  getAllMessages,
  createMessage,
};