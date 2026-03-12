const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const { authMiddleware } = require('../middleware/auth');

// All booking routes require authentication
router.use(authMiddleware);

// Customer booking routes
router.post('/', bookingController.createBooking);
router.get('/', bookingController.getBookings);
router.get('/:bookingId', bookingController.getBooking);
router.patch('/:bookingId/cancel', bookingController.cancelBooking);

// Admin route
router.post('/:bookingId/assign-driver', bookingController.assignDriver);

module.exports = router;
