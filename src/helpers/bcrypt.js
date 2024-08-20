const bcrypt = require('bcrypt');

exports.hash = async (password) => bcrypt.hash(password, 10);
