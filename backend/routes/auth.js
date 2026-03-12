const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const rateLimit = require('express-rate-limit');

// Rate limiting for login
const loginLimiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 5,
  message: 'Too many login attempts, please try again later',
});

// Customer routes
router.post('/customer/signup', loginLimiter, authController.customerSignup);
router.post('/customer/login', loginLimiter, authController.customerLogin);

// Driver routes
router.post('/driver/signup', loginLimiter, authController.driverSignup);
router.post('/driver/login', loginLimiter, authController.driverLogin);

module.exports = router;
