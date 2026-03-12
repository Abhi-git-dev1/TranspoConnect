const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    userType: {
      type: String,
      enum: ['customer', 'driver'],
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: [
        'login',
        'booking_created',
        'driver_assigned',
        'document_verified',
        'document_rejected',
        'ride_completed',
        'payment',
      ],
      required: true,
    },
    relatedId: mongoose.Schema.Types.ObjectId,
    isRead: {
      type: Boolean,
      default: false,
    },
    readAt: Date,
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Notification', notificationSchema);
