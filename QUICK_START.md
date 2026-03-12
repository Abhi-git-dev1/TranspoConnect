# TranspoConnect Quick Start Guide

Get up and running in 5 minutes.

## 1️⃣ Install Dependencies

```bash
npm install
```

## 2️⃣ Start MongoDB

Choose one:

**Docker** (easiest):
```bash
docker run -d -p 27017:27017 --name transpoconnect-mongodb mongo:latest
```

**Homebrew** (macOS):
```bash
brew services start mongodb-community
```

**Linux**:
```bash
sudo systemctl start mongodb
```

## 3️⃣ Setup Environment

```bash
# Copy example file
cp backend/.env.example backend/.env

# Update these in backend/.env:
MONGODB_URI=mongodb://localhost:27017/transpoconnect
JWT_SECRET=your_secret_key_here
GOOGLE_MAPS_API_KEY=your_key_here
FRONTEND_URL=http://localhost:3000
```

## 4️⃣ Run Everything

```bash
# Terminal 1: Run both frontend + backend
npm run dev:all

# OR run separately:
# Terminal 1: Frontend only
npm run dev

# Terminal 2: Backend only
npm run dev:backend
```

## 5️⃣ Test It!

**Open in browser**:
- Frontend: http://localhost:3000
- Backend health: http://localhost:5000/api/health

**Test with curl**:

```bash
# Create customer account
curl -X POST http://localhost:5000/api/auth/customer/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "businessName": "John Logistics",
    "phoneNumber": "9876543210",
    "email": "john@example.com",
    "password": "password123"
  }'

# Login
curl -X POST http://localhost:5000/api/auth/customer/login \
  -H "Content-Type: application/json" \
  -d '{
    "phoneNumber": "9876543210",
    "password": "password123"
  }'

# Copy the token from response, then create booking
curl -X POST http://localhost:5000/api/bookings \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
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

## 📚 Documentation

- **Full API Reference**: `backend/README.md`
- **API Examples**: `backend/API_EXAMPLES.md`
- **Setup Guide**: `BACKEND_SETUP.md`
- **Implementation Details**: `IMPLEMENTATION_SUMMARY.md`

## 🎯 Key Features

✅ **Interstate Prevention**: Try different cities - booking will be blocked
✅ **Authentication**: Phone + password or email + password
✅ **Real Bookings**: Full CRUD with database persistence
✅ **Notifications**: Automatic updates for all actions
✅ **Document Upload**: Driver verification workflow
✅ **Real-time**: Socket.io ready for live updates

## 🐛 Troubleshooting

**MongoDB error?**
```bash
# Check if running
mongosh

# Start if not running
brew services start mongodb-community
```

**Port 5000 already in use?**
```bash
# Find process
lsof -i :5000

# Kill it
kill -9 <PID>
```

**Token expired?**
- Get new token by logging in again
- Tokens last 7 days

**CORS error?**
- Make sure `FRONTEND_URL=http://localhost:3000` in backend/.env

## 📋 Environment Variables Reference

```
MONGODB_URI          - MongoDB connection string
JWT_SECRET           - Secret key for JWT signing
PORT                 - Backend port (default: 5000)
NODE_ENV             - development/production
GOOGLE_MAPS_API_KEY  - For city validation
CLOUDINARY_*         - For document storage
FRONTEND_URL         - Frontend URL (for CORS)
```

## 🔌 API Endpoints Quick Ref

| Method | Endpoint | Auth | Purpose |
|--------|----------|------|---------|
| POST | `/auth/customer/signup` | ❌ | Create customer |
| POST | `/auth/customer/login` | ❌ | Customer login |
| POST | `/auth/driver/signup` | ❌ | Create driver |
| POST | `/auth/driver/login` | ❌ | Driver login |
| POST | `/bookings` | ✅ | Create booking |
| GET | `/bookings` | ✅ | Get bookings |
| GET | `/bookings/:id` | ✅ | Get single booking |
| PATCH | `/bookings/:id/cancel` | ✅ | Cancel booking |
| POST | `/documents/upload` | ✅ | Upload docs |
| GET | `/documents` | ✅ | Get documents |
| GET | `/notifications` | ✅ | Get notifications |

Auth required = ✅ (add `Authorization: Bearer TOKEN` header)

## 🚀 Production Deployment

See `BACKEND_SETUP.md` for detailed deployment instructions to:
- Heroku
- AWS EC2
- Railway.app
- Render.com

## 💡 Development Tips

**View database**:
```bash
mongosh
> use transpoconnect
> db.bookings.find()
> db.customers.find()
```

**Check logs**:
```bash
npm run dev:backend
# Logs appear in terminal
```

**Reset everything**:
```bash
# Stop services
docker stop transpoconnect-mongodb

# Start fresh
docker rm transpoconnect-mongodb
docker run -d -p 27017:27017 --name transpoconnect-mongodb mongo:latest
```

## ✨ What's Next?

1. Integrate Google Maps API key
2. Configure Cloudinary for document storage
3. Add payment gateway (Stripe/Razorpay)
4. Set up email notifications
5. Deploy to production
6. Monitor with logging service
7. Add admin dashboard
8. Implement analytics

## 📞 Need Help?

- Check logs: `npm run dev:backend`
- Read full docs: `backend/README.md`
- See examples: `backend/API_EXAMPLES.md`
- Review setup: `BACKEND_SETUP.md`

---

**You're all set! Start the server and test it out.** 🎉
