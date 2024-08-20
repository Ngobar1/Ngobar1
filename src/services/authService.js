const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');

exports.getUserByUsername = async (username) => userModel.getUserByEmail(username);

exports.createUser = async (data) => userModel.createUser(data);

exports.login = async (data) => {
  const user = await userModel.getUserByEmail(data.username);

  if (!user) {
    return false;
  }

  if (!(await bcrypt.compare(data.password, user[0].password))) {
    return false;
  }

  const me = user[0];
  return {
    id: me.id,
    username: me.username,
  };
};
