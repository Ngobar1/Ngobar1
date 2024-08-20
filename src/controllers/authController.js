const authService = require('../services/authService');
const { sendResponse } = require('../helpers/response');
const { sign } = require('../utils/jwt');
const logger = require('../utils/logger');

exports.register = async (req, res) => {
  try {
    const dataUsername = await authService.getUserByUsername(req.body);

    if (dataUsername.length > 0) {
      logger.error(
        'Register failed. Username already exists',
      );
      return sendResponse(res, 400, 'Username already exists');
    }

    logger.info('Register success');
    await authService.createUser(req.body);

    return sendResponse(res, 201, 'Register success');
  } catch (error) {
    logger.error('Register failed', error.message);
    return sendResponse(res, 500, error.message);
  }
};

exports.login = async (req, res) => {
  try {
    const user = await authService.login(req.body);

    if (!user) {
      logger.error('Login failed. Username or password is incorrect');
      return sendResponse(res, 400, 'Username or password is incorrect');
    }

    const token = sign(user);
    return sendResponse(
      res,
      200,
      'Login success',
      {
        id: user.id,
        username: user.username,
      },
      { token, type: 'Bearer' },
    );
  } catch (error) {
    logger.error('Login failed', error.message);
    return sendResponse(res, 500, error.message);
  }
};
