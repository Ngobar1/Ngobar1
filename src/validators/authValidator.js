const { check, validationResult } = require('express-validator');

const registerValidationRules = () => [
  check('username')
    .isString()
    .trim()
    .not()
    .isEmpty()
    .escape()
    .withMessage('Username is required')
    .matches(/^[a-zA-Z0-9]+$/)
    .withMessage('Username must be alphanumeric')
    .isLength({ min: 3, max: 30 })
    .withMessage('Username must be between 3 to 30 characters'),

  check('password')
    .isString()
    .isLength({ min: 8, max: 64 })
    .escape()
    .withMessage('Password must be between 8 to 64 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W).*$/)
    .withMessage(
      'Password must contain at least one uppercase letter, one lowercase letter and one number',
    ),
];

const loginValidationRules = () => [
  check('username')
    .isString()
    .withMessage('The username must be a string')
    .not()
    .isEmpty()
    .withMessage('Username is required'),

  check('password')
    .isString()
    .withMessage('The password must be a string')
    .not()
    .isEmpty()
    .withMessage('Password is required'),
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(500).json({ status: 500, errors: errors.array() });
  }
  return next();
};

module.exports = {
  registerValidationRules,
  loginValidationRules,
  validate,
};
