# TranspoConnect Backend API

A comprehensive Node.js + Express + MongoDB backend for an intracity B2B logistics booking platform with real-time features and strict city-based validation.

## Features

- **Authentication**: JWT-based auth for customers and drivers
- **City Validation**: Google Maps Geocoding API to ensure same-city bookings
- **Document Verification**: Driver document upload and admin approval workflow
- **Real-time Notifications**: Socket.io for instant updates
- **Booking Management**: Full CRUD with status tracking
- **Rate Limiting**: Protection against abuse
- **Data Validation**: Input validation and phone number uniqueness checks

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment

Create a `.env` file in the backend directory:

```
MONGODB_URI=mongodb://localhost:27017/transpoconnect
JWT_SECRET=your_super_secret_key_here
PORT=5000
NODE_ENV=development
GOOGLE_MAPS_API_KEY=your_google_maps_api_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
FRONTEND_URL=http://localhost:3000
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### 3. Start MongoDB

```bash
# On macOS with Homebrew
brew services start mongodb-community

# On Linux with apt
sudo systemctl start mongodb

# Using Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

### 4. Run Server

```bash
# Development with nodemon
npm run dev:backend

# Production
node server.js
```

## API Endpoints

### Authentication

**Customer Signup**
```
POST /api/auth/customer/signup
Content-Type: application/json

{
  "name": "John Doe",
  "businessName": "ABC Logistics",
  "phoneNumber": "9876543210",
  "email": "john@example.com",
  "password": "password123"
}
```

**Customer Login**
```
POST /api/auth/customer/login
Content-Type: application/json

{
  "phoneNumber": "9876543210",
  "password": "password123"
}
```

**Driver Signup**
```
POST /api/auth/driver/signup
Content-Type: application/json

{
  "name": "Raj Singh",
  "phoneNumber": "9876543211",
  "email": "raj@example.com",
  "password": "password123",
  "vehicleType": "auto",
  "vehicleNumber": "DL-01-AB-1234",
  "city": "Delhi"
}
```

**Driver Login**
```
POST /api/auth/driver/login
Content-Type: application/json

{
  "phoneNumber": "9876543211",
  "password": "password123"
}
```

### Bookings

**Create Booking** (Requires authentication)
```
POST /api/bookings
Authorization: Bearer {token}
Content-Type: application/json

{
  "pickupLocation": {
    "address": "123 Business Park, Delhi",
    "city": "Delhi",
    "lat": 28.6139,
    "lng": 77.2090
  },
  "dropLocation": {
    "address": "456 Commerce Street, Delhi",
    "city": "Delhi",
    "lat": 28.6200,
    "lng": 77.2150
  },
  "vehicleType": "auto",
  "notes": "Please call before arrival"
}
```

**Get Bookings** (Requires authentication)
```
GET /api/bookings?status=searching
Authorization: Bearer {token}
```

**Cancel Booking**
```
PATCH /api/bookings/{bookingId}/cancel
Authorization: Bearer {token}
```

### Documents

**Upload Documents** (Requires authentication)
```
POST /api/documents/upload
Authorization: Bearer {token}
Content-Type: multipart/form-data

- drivingLicense: [file]
- rc: [file]
- insurance: [file]
- aadhaar: [file]
- profilePhoto: [file]
```

**Get Documents** (Driver)
```
GET /api/documents
Authorization: Bearer {token}
```

**Get Pending Documents** (Admin)
```
GET /api/documents/pending
Authorization: Bearer {token}
```

**Approve Document** (Admin)
```
PATCH /api/documents/{documentId}/approve
Authorization: Bearer {token}
```

**Reject Document** (Admin)
```
PATCH /api/documents/{documentId}/reject
Authorization: Bearer {token}
Content-Type: application/json

{
  "rejectionReason": "License photo is not clear"
}
```

### Notifications

**Get Notifications**
```
GET /api/notifications?isRead=false
Authorization: Bearer {token}
```

**Mark Notification as Read**
```
PATCH /api/notifications/{notificationId}/read
Authorization: Bearer {token}
```

**Mark All as Read**
```
PATCH /api/notifications/mark-all-read
Authorization: Bearer {token}
```

**Delete Notification**
```
DELETE /api/notifications/{notificationId}
Authorization: Bearer {token}
```

## Database Collections

### Customer
```javascript
{
  _id: ObjectId,
  name: String,
  businessName: String,
  phoneNumber: String (unique),
  email: String (unique),
  passwordHash: String,
  savedAddresses: Array,
  monthlySpend: Number,
  verified: Boolean,
  lastLoginAt: Date,
  lastLoginDevice: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Driver
```javascript
{
  _id: ObjectId,
  name: String,
  phoneNumber: String (unique),
  email: String (unique),
  passwordHash: String,
  vehicleType: String,
  vehicleNumber: String,
  dutyStatus: String,
  rating: Number,
  totalTrips: Number,
  verificationStatus: String,
  city: String,
  lastLoginAt: Date,
  lastLoginDevice: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Booking
```javascript
{
  _id: ObjectId,
  customerId: ObjectId (ref: Customer),
  driverId: ObjectId (ref: Driver),
  pickupLocation: {
    address: String,
    city: String,
    lat: Number,
    lng: Number
  },
  dropLocation: {
    address: String,
    city: String,
    lat: Number,
    lng: Number
  },
  vehicleType: String,
  fare: Number,
  status: String,
  isInterstate: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

## Key Implementation Details

### Interstate Booking Restriction
The system validates pickup and drop locations using Google Maps Geocoding API. If cities don't match, the booking is blocked with an appropriate error message.

### Security Features
- Password hashing with bcryptjs
- JWT token-based authentication
- Rate limiting on login endpoints
- Input validation on all endpoints
- Phone number uniqueness enforcement

### Real-time Features
Socket.io events for:
- Driver status changes
- New booking notifications
- Location tracking
- Document verification updates

## Error Codes

- **400**: Bad Request / Validation Error
- **401**: Unauthorized / Invalid Credentials
- **403**: Forbidden / Insufficient Permissions
- **404**: Not Found
- **500**: Internal Server Error

## Testing with cURL

```bash
# Customer Login
curl -X POST http://localhost:5000/api/auth/customer/login \
  -H "Content-Type: application/json" \
  -d '{
    "phoneNumber": "9876543210",
    "password": "password123"
  }'

# Create Booking
curl -X POST http://localhost:5000/api/bookings \
  -H "Authorization: Bearer {token}" \
  -H "Content-Type: application/json" \
  -d '{
    "pickupLocation": {
      "address": "123 Business Park",
      "city": "Delhi",
      "lat": 28.6139,
      "lng": 77.2090
    },
    "dropLocation": {
      "address": "456 Commerce Street",
      "city": "Delhi",
      "lat": 28.6200,
      "lng": 77.2150
    },
    "vehicleType": "auto"
  }'
```

## Architecture

```
backend/
├── config/
│   └── database.js         # MongoDB connection
├── controllers/
│   ├── authController.js   # Auth logic
│   ├── bookingController.js # Booking logic
│   ├── documentController.js # Document logic
│   └── notificationController.js # Notification logic
├── middleware/
│   ├── auth.js            # JWT middleware
│   └── validation.js      # Input validation
├── models/
│   ├── Customer.js
│   ├── Driver.js
│   ├── Booking.js
│   ├── Document.js
│   └── Notification.js
├── routes/
│   ├── auth.js
│   ├── bookings.js
│   ├── notifications.js
│   └── documents.js
├── server.js              # Main server file
├── .env.example           # Environment template
└── README.md
```

## Future Enhancements

- Real Cloudinary integration for document storage
- SMS/Email notifications
- Advanced driver matching algorithm
- Payment gateway integration
- Analytics dashboard
- Admin portal
- Mobile app APIs
