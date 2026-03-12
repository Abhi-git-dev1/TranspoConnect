# TranspoConnect Backend Setup Guide

## Overview

This guide covers the complete setup of the TranspoConnect backend API with MongoDB, Express, and Node.js.

## Prerequisites

- Node.js 16+ and npm/pnpm
- MongoDB 4.4+ (local or Atlas)
- Google Maps API Key
- Cloudinary account (for document storage)

## Quick Start

### 1. Backend Installation

```bash
cd /vercel/share/v0-project
npm install
# or
pnpm install
```

### 2. Environment Setup

Copy the example environment file and update with your credentials:

```bash
cp backend/.env.example backend/.env
```

Edit `backend/.env`:

```
MONGODB_URI=mongodb://localhost:27017/transpoconnect
JWT_SECRET=your_secure_jwt_secret_key
PORT=5000
NODE_ENV=development
GOOGLE_MAPS_API_KEY=your_google_maps_api_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
FRONTEND_URL=http://localhost:3000
```

### 3. Start MongoDB

**Option A: Local MongoDB**
```bash
# macOS with Homebrew
brew services start mongodb-community

# Linux
sudo systemctl start mongodb

# Verify
mongosh
```

**Option B: Docker**
```bash
docker run -d -p 27017:27017 --name transpoconnect-mongodb mongo:latest
```

**Option C: MongoDB Atlas (Cloud)**
1. Create account at mongodb.com/cloud/atlas
2. Create a cluster
3. Get connection string
4. Update `MONGODB_URI` in `.env`

### 4. Start the Backend

```bash
# Development
npm run dev:backend

# Production
npm start
```

Server will run on `http://localhost:5000`

### 5. Frontend Environment

Create/Update `.env.local` in the root directory:

```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### 6. Run Both Together

```bash
npm run dev:all
```

This will start:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000
- Backend API: http://localhost:5000/api

## API Documentation

### Health Check

```bash
curl http://localhost:5000/api/health
```

Response:
```json
{
  "success": true,
  "message": "Server is running"
}
```

### Example: Customer Registration & Login

**1. Register Customer**
```bash
curl -X POST http://localhost:5000/api/auth/customer/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Rajesh Kumar",
    "businessName": "Kumar Logistics",
    "phoneNumber": "9876543210",
    "email": "rajesh@example.com",
    "password": "SecurePass123"
  }'
```

Response:
```json
{
  "success": true,
  "message": "Customer account created successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "customer": {
    "id": "507f1f77bcf86cd799439011",
    "name": "Rajesh Kumar",
    "email": "rajesh@example.com",
    "phoneNumber": "9876543210"
  }
}
```

**2. Login Customer**
```bash
curl -X POST http://localhost:5000/api/auth/customer/login \
  -H "Content-Type: application/json" \
  -d '{
    "phoneNumber": "9876543210",
    "password": "SecurePass123"
  }'
```

**3. Create Booking** (Use token from login)
```bash
curl -X POST http://localhost:5000/api/bookings \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Content-Type: application/json" \
  -d '{
    "pickupLocation": {
      "address": "123 Business Park, Connaught Place",
      "city": "Delhi",
      "lat": 28.6315,
      "lng": 77.1948
    },
    "dropLocation": {
      "address": "456 Commerce Street, Naraina",
      "city": "Delhi",
      "lat": 28.5494,
      "lng": 77.2466
    },
    "vehicleType": "auto",
    "notes": "Please call 30 mins before arrival"
  }'
```

Response (Success):
```json
{
  "success": true,
  "message": "Booking created successfully",
  "booking": {
    "id": "507f1f77bcf86cd799439012",
    "pickupLocation": {
      "address": "123 Business Park, Connaught Place",
      "city": "Delhi",
      "lat": 28.6315,
      "lng": 77.1948
    },
    "dropLocation": {
      "address": "456 Commerce Street, Naraina",
      "city": "Delhi",
      "lat": 28.5494,
      "lng": 77.2466
    },
    "vehicleType": "auto",
    "fare": 219,
    "status": "searching",
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

**Response (Interstate Booking - Blocked):**
```json
{
  "success": false,
  "message": "We currently operate only for intracity logistics. Interstate transport is not supported.",
  "isInterstate": true
}
```

### Key Features Demonstrated

1. **City Validation**: The system checks if pickup and drop cities are the same
2. **Interstate Protection**: Blocks bookings across different cities
3. **JWT Authentication**: Secure token-based access
4. **Real Notifications**: Instant updates to users
5. **Proper Error Handling**: Detailed error messages

## Database Schema

### Collections Overview

```
transpoconnect/
├── customers (100 docs) - Customer accounts
├── drivers (50 docs) - Driver accounts
├── bookings (500 docs) - Booking records
├── documents (50 docs) - Driver documents
└── notifications (1000 docs) - User notifications
```

### View Data in MongoDB

```bash
# Connect to MongoDB
mongosh

# Use database
use transpoconnect

# View collections
show collections

# Query examples
db.customers.find().limit(5)
db.bookings.find({ status: "searching" })
db.drivers.find({ verificationStatus: "approved" })
```

## Troubleshooting

### Port Already in Use

```bash
# Find process using port 5000
lsof -i :5000

# Kill process
kill -9 <PID>
```

### MongoDB Connection Error

```
Error: connect ECONNREFUSED 127.0.0.1:27017
```

Solution: Ensure MongoDB is running
```bash
# Check MongoDB status
mongosh --version

# Start MongoDB
brew services start mongodb-community
```

### JWT Token Errors

Ensure you're including the token in headers:
```bash
-H "Authorization: Bearer YOUR_TOKEN"
```

### CORS Errors

Update `FRONTEND_URL` in `backend/.env` to match your frontend URL.

## Advanced Configuration

### Rate Limiting

Adjust in `backend/.env`:
```
RATE_LIMIT_WINDOW_MS=900000  # 15 minutes
RATE_LIMIT_MAX_REQUESTS=100  # max 100 requests
```

### JWT Expiration

Edit `backend/middleware/auth.js`:
```javascript
{ expiresIn: '7d' }  // Change to desired duration
```

### Database Indexing

The models have automatic indexing on:
- `phoneNumber` (unique)
- `email` (unique)
- `createdAt` (for sorting)

## Production Deployment

### Environment Setup

```bash
NODE_ENV=production
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/transpoconnect
JWT_SECRET=your_very_secure_random_key
```

### Deployment Options

**Option 1: Heroku**
```bash
# Install Heroku CLI
# heroku login
# heroku create transpoconnect-api
# git push heroku main
```

**Option 2: AWS EC2**
```bash
# Install Node on EC2
# Clone repository
# Install dependencies
# Use PM2 for process management
npm install -g pm2
pm2 start backend/server.js --name "transpoconnect-api"
```

**Option 3: Railway.app**
```bash
# Connect GitHub repo
# Set environment variables
# Deploy automatically
```

**Option 4: Render.com**
```bash
# Connect GitHub
# Create web service
# Add MongoDB Atlas URI
# Deploy
```

## Monitoring & Logs

### Server Logs

```bash
# View logs in development
npm run dev:backend

# Production logs (using PM2)
pm2 logs transpoconnect-api
```

### Monitor Database

```bash
# MongoDB Atlas Dashboard
# https://cloud.mongodb.com

# Local MongoDB stats
mongosh
> db.stats()
> db.collection.stats()
```

## API Testing Tools

- **Postman**: Import API endpoints and test
- **Thunder Client**: VSCode extension for API testing
- **cURL**: Command line API testing (shown in examples)
- **REST Client**: VSCode extension

## Next Steps

1. Set up Google Maps API key for real geocoding
2. Configure Cloudinary for document uploads
3. Implement payment gateway (Stripe/Razorpay)
4. Set up email notifications
5. Create admin dashboard APIs
6. Add real-time socket events
7. Set up automated testing
8. Deploy to production

## Support

For issues or questions:
1. Check backend/README.md for API reference
2. Review MongoDB logs
3. Check Express server console for errors
4. Verify environment variables are set correctly
