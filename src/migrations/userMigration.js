const pool = require('../config/database');

exports.createUsersTable = async () => {
  await pool.query(`
        CREATE TABLE IF NOT EXISTS public.users (
            id SERIAL PRIMARY KEY,
            username VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT NOW(),
            updated_at TIMESTAMP NULL,
            deleted_at TIMESTAMP NULL
        )
        `);
};

exports.dropUsersTable = async () => {
  await pool.query('DROP TABLE IF EXISTS public.users');
};
