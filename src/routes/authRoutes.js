const express = require('express');
const authController = require('../controllers/authController');

const {
  registerValidationRules,
  loginValidationRules,
  validate,
} = require('../validators/authValidator');

const { checkMethod } = require('../middlewares/authMiddleware');

const router = express.Router();

router.use(
  '/register',
  checkMethod(['POST']),
  registerValidationRules(),
  validate,
  authController.register,
);

router.use(
  '/login',
  checkMethod(['POST']),
  loginValidationRules(),
  validate,
  authController.login,
);

router.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).send('Unauthorized');
  } else {
    next(err);
  }
});

module.exports = router;
