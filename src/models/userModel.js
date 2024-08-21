const pool = require('../config/database');
const hash = require('../helpers/bcrypt');

exports.createUser = async (data) => {
  const hashedPassword = await hash(data.password);

  const result = await pool.query(
    'INSERT INTO public.users (username, password, created_at, updated_at, deleted_at) VALUES ($1, $2, NOW(), NULL, NULL) RETURNNING *;',

    [data.username, hashedPassword],
  );

  return result.rows[0];
};

exports.getUserByUsername = async (username) => {
  const result = await pool.query(
    'SELECT * FROM public.users WHERE username = $1 AND deleted_at IS NULL;',

    [username],
  );

  return result.rows[0];
};
