const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

async function initDatabase() {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS tasks (
            id SERIAL PRIMARY KEY,
            title TEXT NOT NULL,
            done INTEGER DEFAULT 0
        )
    `);

    const result = await pool.query('SELECT COUNT(*) FROM tasks');

    if (Number(result.rows[0].count) === 0) {
        await pool.query(`
            INSERT INTO tasks (title, done)
            VALUES
                ('Learn Node.js', 0),
                ('Build CRUD API', 0),
                ('Connect PostgreSQL database', 0)
        `);
    }
}

module.exports = {
    pool,
    initDatabase
};