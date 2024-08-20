const bycript = require('bcrypt');

exports.hash = async (password) => bycript.hash(password, 10);
