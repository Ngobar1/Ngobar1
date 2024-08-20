const pool = require('../config/database');
const hash = require('../helpers/bycript');

exports.createUser = async (data) => {
  const hashedpassword = await hash(data.password);
  const result = await pool.query(
    'INSERT INTO public.users (email, password, created_at, updated_at) VALUES ($1, $2, NOW(), NULL, NULL) RETURNING *;',
    [data.username, hashedpassword],
  );

  return result.rows[0];
};

exports.getUserByEmail = async (username) => {
  const result = await pool.query(
    'SELECT * FROM public.users WHERE email = $1 AND deleted_at IS NULL;',
    [username],
  );

  return result.rows[0];
};
