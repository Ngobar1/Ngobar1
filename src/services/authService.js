const bcyrpt = require('bcrypt');
const userModel = require('../models/userModels');

exports.getUserByUsername = async (username) => userModel.getUserByUsername(username);

exports.createUser = async (data) => userModel.createUser(data);

exports.login = async (data) => {
  const user = await userModel.getUserByUsername(data.username);

  if (!user) {
    return false;
  }

  if (!(await bcyrpt.compare(data.password, user[0].password))) {
    return false;
  }

  const me = user[0];
  return {
    id: me.id,
    username: me.username,
  };
};
