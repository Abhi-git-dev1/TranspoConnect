require('dotenv').config();
const express = require('express');
const cors = require('cors');
const http = require('http');
const socketIO = require('socket.io');
const connectDB = require('./config/database');

// Route imports
const authRoutes = require('./routes/auth');
const bookingRoutes = require('./routes/bookings');
const notificationRoutes = require('./routes/notifications');
const documentRoutes = require('./routes/documents');

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
connectDB();

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'Server is running' });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/documents', documentRoutes);

// Socket.IO Events
io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  // Join user room for notifications
  socket.on('join_user', (userId) => {
    socket.join(`user_${userId}`);
    console.log(`User ${userId} joined their room`);
  });

  // Driver status update
  socket.on('driver_status_change', (data) => {
    io.emit('driver_status_updated', {
      driverId: data.driverId,
      status: data.status,
    });
  });

  // Booking created
  socket.on('booking_created', (bookingData) => {
    io.emit('new_booking', bookingData);
  });

  // Location update (for tracking)
  socket.on('location_update', (locationData) => {
    io.to(`booking_${locationData.bookingId}`).emit('driver_location', {
      lat: locationData.lat,
      lng: locationData.lng,
      timestamp: new Date(),
    });
  });

  // Disconnect
  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    success: false,
    message: err.message || 'Internal server error',
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

module.exports = { app, io };
