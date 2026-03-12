const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Customer',
      required: true,
    },
    driverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Driver',
    },
    pickupLocation: {
      address: String,
      city: String,
      lat: Number,
      lng: Number,
    },
    dropLocation: {
      address: String,
      city: String,
      lat: Number,
      lng: Number,
    },
    vehicleType: {
      type: String,
      enum: ['bike', 'auto', 'van', 'truck'],
      required: true,
    },
    fare: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ['searching', 'assigned', 'arriving', 'completed', 'cancelled'],
      default: 'searching',
    },
    scheduledPickupTime: Date,
    actualPickupTime: Date,
    completedTime: Date,
    notes: String,
    isInterstate: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Booking', bookingSchema);
