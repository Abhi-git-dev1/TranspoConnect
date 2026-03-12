const Booking = require('../models/Booking');
const Notification = require('../models/Notification');
const Driver = require('../models/Driver');
const {
  validateBookingData,
  validateCityMatch,
} = require('../middleware/validation');
const axios = require('axios');

// Validate cities using Google Maps API
const validateCitiesFromCoordinates = async (lat, lng) => {
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.GOOGLE_MAPS_API_KEY}`
    );

    if (response.data.results && response.data.results.length > 0) {
      const addressComponents = response.data.results[0].address_components;
      const cityComponent = addressComponents.find((comp) =>
        comp.types.includes('administrative_area_level_2')
      );
      const stateComponent = addressComponents.find((comp) =>
        comp.types.includes('administrative_area_level_1')
      );

      return {
        city: cityComponent?.long_name || '',
        state: stateComponent?.long_name || '',
      };
    }
  } catch (error) {
    console.error('Geocoding error:', error);
  }
  return null;
};

// Create booking
exports.createBooking = async (req, res) => {
  try {
    const { pickupLocation, dropLocation, vehicleType, notes } = req.body;
    const customerId = req.user.userId;

    // Validate booking data
    const validationErrors = validateBookingData({ pickupLocation, dropLocation, vehicleType });
    if (validationErrors.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: validationErrors,
      });
    }

    // Validate cities match
    let pickupCity = pickupLocation.city;
    let dropCity = dropLocation.city;

    // If coordinates provided, get city from Google Maps
    if (!pickupCity && pickupLocation.lat && pickupLocation.lng) {
      const pickupGeoData = await validateCitiesFromCoordinates(
        pickupLocation.lat,
        pickupLocation.lng
      );
      pickupCity = pickupGeoData?.city;
    }

    if (!dropCity && dropLocation.lat && dropLocation.lng) {
      const dropGeoData = await validateCitiesFromCoordinates(
        dropLocation.lat,
        dropLocation.lng
      );
      dropCity = dropGeoData?.city;
    }

    // Check if cities match
    if (!validateCityMatch(pickupCity, dropCity)) {
      // Log interstate attempt
      await Booking.create({
        customerId,
        pickupLocation,
        dropLocation,
        vehicleType,
        fare: 0,
        status: 'cancelled',
        isInterstate: true,
        notes: 'Interstate attempt blocked',
      });

      return res.status(400).json({
        success: false,
        message: 'We currently operate only for intracity logistics. Interstate transport is not supported.',
        isInterstate: true,
      });
    }

    // Calculate fare (mock)
    const baseRates = {
      bike: 99,
      auto: 199,
      van: 299,
      truck: 499,
    };
    const surge = 1.1;
    const fare = Math.round(baseRates[vehicleType] * surge);

    // Create booking
    const booking = new Booking({
      customerId,
      pickupLocation: {
        ...pickupLocation,
        city: pickupCity,
      },
      dropLocation: {
        ...dropLocation,
        city: dropCity,
      },
      vehicleType,
      fare,
      notes,
    });

    await booking.save();

    // Create notification for customer
    await Notification.create({
      userId: customerId,
      userType: 'customer',
      title: 'Booking Created',
      message: `Your booking has been created. We're searching for available drivers.`,
      type: 'booking_created',
      relatedId: booking._id,
    });

    res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      booking: {
        id: booking._id,
        pickupLocation: booking.pickupLocation,
        dropLocation: booking.dropLocation,
        vehicleType: booking.vehicleType,
        fare: booking.fare,
        status: booking.status,
        createdAt: booking.createdAt,
      },
    });
  } catch (error) {
    console.error('Booking creation error:', error);
    res.status(500).json({ success: false, message: 'Booking creation failed' });
  }
};

// Get bookings
exports.getBookings = async (req, res) => {
  try {
    const customerId = req.user.userId;
    const { status } = req.query;

    let query = { customerId };
    if (status) {
      query.status = status;
    }

    const bookings = await Booking.find(query)
      .populate('driverId', 'name rating vehicleNumber')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      bookings,
    });
  } catch (error) {
    console.error('Get bookings error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch bookings' });
  }
};

// Get single booking
exports.getBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const customerId = req.user.userId;

    const booking = await Booking.findById(bookingId)
      .populate('customerId', 'name phoneNumber')
      .populate('driverId', 'name rating vehicleNumber phoneNumber');

    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    if (booking.customerId._id.toString() !== customerId) {
      return res.status(403).json({ success: false, message: 'Unauthorized' });
    }

    res.json({
      success: true,
      booking,
    });
  } catch (error) {
    console.error('Get booking error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch booking' });
  }
};

// Cancel booking
exports.cancelBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const customerId = req.user.userId;

    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    if (booking.customerId.toString() !== customerId) {
      return res.status(403).json({ success: false, message: 'Unauthorized' });
    }

    if (booking.status === 'completed' || booking.status === 'cancelled') {
      return res.status(400).json({ success: false, message: 'Cannot cancel this booking' });
    }

    booking.status = 'cancelled';
    await booking.save();

    res.json({
      success: true,
      message: 'Booking cancelled successfully',
      booking,
    });
  } catch (error) {
    console.error('Cancel booking error:', error);
    res.status(500).json({ success: false, message: 'Failed to cancel booking' });
  }
};

// Mock: Assign driver to booking
exports.assignDriver = async (req, res) => {
  try {
    const { bookingId } = req.params;

    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    // Find nearest available driver (mock)
    const driver = await Driver.findOne({
      verificationStatus: 'approved',
      dutyStatus: 'online',
      city: booking.pickupLocation.city,
    });

    if (!driver) {
      return res.status(400).json({ success: false, message: 'No drivers available' });
    }

    booking.driverId = driver._id;
    booking.status = 'assigned';
    await booking.save();

    // Notify driver
    await Notification.create({
      userId: driver._id,
      userType: 'driver',
      title: 'New Ride Request',
      message: 'You have been assigned a new ride',
      type: 'driver_assigned',
      relatedId: booking._id,
    });

    // Notify customer
    await Notification.create({
      userId: booking.customerId,
      userType: 'customer',
      title: 'Driver Assigned',
      message: `${driver.name} has been assigned to your ride`,
      type: 'driver_assigned',
      relatedId: booking._id,
    });

    res.json({
      success: true,
      message: 'Driver assigned successfully',
      booking: {
        id: booking._id,
        status: booking.status,
        driverId: driver._id,
        driverName: driver.name,
        driverPhone: driver.phoneNumber,
      },
    });
  } catch (error) {
    console.error('Assign driver error:', error);
    res.status(500).json({ success: false, message: 'Failed to assign driver' });
  }
};
