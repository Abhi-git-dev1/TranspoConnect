# TranspoConnect Architecture

## System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    TRANSPOCONNECT SYSTEM                    │
└─────────────────────────────────────────────────────────────┘

┌──────────────────────┐              ┌──────────────────────┐
│   FRONTEND (React)   │              │   BACKEND (Node.js)  │
│   - Pages            │    HTTP/     │   - APIs             │
│   - Components       │◄─────────────►   - Controllers      │
│   - Animations       │     WS       │   - Models           │
│   - Forms            │              │   - Middleware       │
└──────────────────────┘              └──────────────────────┘
         │                                       │
         │                                       │
         └──────────────────┬────────────────────┘
                            │
                    ┌───────▼────────┐
                    │   MONGODB      │
                    │   - Collections│
                    │   - Indexes    │
                    │   - Validation │
                    └────────────────┘
```

## Detailed Architecture

### Frontend (Next.js + React)

```
lib/
├── api-client.ts        ◄─────► Calls Backend API
├── auth-context.tsx     ◄─────► Manages user state
├── animations.ts        ◄─────► Framer Motion
└── socket-context.tsx   ◄─────► Socket.io events

components/
├── auth/                ◄─────► Login/Signup pages
├── customer/            ◄─────► Customer interface
├── driver/              ◄─────► Driver interface
├── admin/               ◄─────► Admin panel
└── animations/          ◄─────► Animated components

app/
├── page.tsx             ◄─────► Landing page
├── customer/            ◄─────► Customer routes
├── driver/              ◄─────► Driver routes
├── admin/               ◄─────► Admin routes
└── auth/                ◄─────► Auth routes
```

### Backend (Node.js + Express)

```
server.js ◄─────► Main Express app + Socket.io

routes/
├── auth.js              ◄─────► Authentication endpoints
├── bookings.js          ◄─────► Booking CRUD
├── documents.js         ◄─────► Document upload & verification
└── notifications.js     ◄─────► Notification management

controllers/
├── authController.js    ◄─────► Auth logic
├── bookingController.js ◄─────► Booking logic + city validation
├── documentController.js◄─────► Document verification
└── notificationController.js ◄─────► Notification logic

middleware/
├── auth.js              ◄─────► JWT verification
└── validation.js        ◄─────► Input validation

models/
├── Customer.js          ◄─────► Customer schema
├── Driver.js            ◄─────► Driver schema
├── Booking.js           ◄─────► Booking schema
├── Document.js          ◄─────► Document schema
└── Notification.js      ◄─────► Notification schema
```

### Database (MongoDB)

```
transpoconnect (Database)
│
├── customers (Collection)
│   ├── name
│   ├── businessName
│   ├── phoneNumber (indexed, unique)
│   ├── email (indexed, unique)
│   ├── passwordHash
│   ├── savedAddresses []
│   └── createdAt (indexed)
│
├── drivers (Collection)
│   ├── name
│   ├── phoneNumber (indexed, unique)
│   ├── email (indexed, unique)
│   ├── passwordHash
│   ├── vehicleType
│   ├── vehicleNumber
│   ├── dutyStatus
│   ├── rating
│   ├── verificationStatus
│   ├── city
│   └── createdAt (indexed)
│
├── bookings (Collection)
│   ├── customerId (indexed, ref: Customer)
│   ├── driverId (ref: Driver)
│   ├── pickupLocation
│   │   ├── address
│   │   ├── city
│   │   ├── lat
│   │   └── lng
│   ├── dropLocation
│   │   ├── address
│   │   ├── city
│   │   ├── lat
│   │   └── lng
│   ├── vehicleType
│   ├── fare
│   ├── status (searching/assigned/arriving/completed/cancelled)
│   ├── isInterstate
│   └── createdAt (indexed)
│
├── documents (Collection)
│   ├── driverId (indexed, ref: Driver)
│   ├── drivingLicenseURL
│   ├── rcURL
│   ├── insuranceURL
│   ├── aadhaarURL
│   ├── profilePhotoURL
│   ├── verificationStatus (pending/approved/rejected)
│   ├── rejectionReason
│   └── createdAt (indexed)
│
└── notifications (Collection)
    ├── userId (indexed, ref: Customer/Driver)
    ├── userType (customer/driver)
    ├── title
    ├── message
    ├── type (login/booking_created/etc)
    ├── isRead
    ├── readAt
    └── createdAt (indexed)
```

## Data Flow Diagrams

### Customer Registration Flow

```
1. Frontend (signup form)
        │
        │ POST /auth/customer/signup
        ▼
2. Backend Route Handler
        │
        ├─► Validation (phone, email, password)
        │
        ├─► Check Uniqueness
        │   └─► Query: db.customers.findOne({phoneNumber})
        │
        ├─► Hash Password (bcrypt)
        │
        ├─► Create Customer
        │   └─► Query: db.customers.insertOne({...})
        │
        ├─► Generate JWT Token
        │
        ├─► Create Notification
        │   └─► Query: db.notifications.insertOne({...})
        │
        └─► Return token + customer data
                │
                ▼
3. Frontend (store token in localStorage)
```

### Intracity Booking Flow (THE KEY FEATURE)

```
1. Frontend (booking form)
        │
        │ POST /api/bookings
        │ + Authorization Header (JWT)
        ▼
2. Backend Auth Middleware
        │
        ├─► Extract & Verify JWT
        │
        └─► Extract userId (attach to req.user)
                │
                ▼
3. Booking Controller
        │
        ├─► Validate Input (address, vehicle type)
        │
        ├─► Validate Cities Match ⭐
        │   │
        │   ├─► Get pickupCity from:
        │   │   ├─ User input OR
        │   │   └─ Google Maps API (if coords provided)
        │   │
        │   ├─► Get dropCity from:
        │   │   ├─ User input OR
        │   │   └─ Google Maps API (if coords provided)
        │   │
        │   └─► Compare Cities
        │       │
        │       ├─ IF MATCH ─────────────────┐
        │       │                             │
        │       └─ IF DIFFERENT ──┐           │
        │           │              │          │
        │           │ Log as interstate attempt
        │           │ Create cancelled booking with isInterstate: true
        │           │ Return 400 error ◄─────┤
        │           │ Message: "We operate only for intracity..."
        │           │
        │           └──► Frontend shows error & disables button
        │
        ├─► Calculate Fare (if cities match)
        │
        ├─► Create Booking
        │   └─► db.bookings.insertOne({
        │       customerId, pickupLocation (+ city),
        │       dropLocation (+ city), vehicleType, fare,
        │       status: "searching", isInterstate: false
        │   })
        │
        ├─► Create Notification
        │
        ├─► Emit Socket Event "new_booking"
        │
        └─► Return booking details
                │
                ▼
4. Frontend (show success modal with booking details)
```

### Document Upload & Verification Flow

```
1. Driver (uploads 5 documents)
        │
        │ POST /api/documents/upload
        │ + multipart/form-data
        │ + Authorization Header
        ▼
2. Multer Middleware
        │
        ├─► Validate file types (JPEG, PNG, PDF)
        │
        ├─► Validate file sizes (max 5MB)
        │
        └─► Store in memory (ready for cloud storage)
                │
                ▼
3. Document Controller
        │
        ├─► Generate file URLs (mock - ready for Cloudinary)
        │
        ├─► Create/Update Document Record
        │   └─► db.documents.insertOne({
        │       driverId, drivingLicenseURL, rcURL, ...
        │       verificationStatus: "pending"
        │   })
        │
        ├─► Create Notification to driver
        │
        └─► Return document URLs
                │
                ▼
4. Admin Portal
        │
        ├─► GET /api/documents/pending
        │   └─► Shows all pending documents for review
        │
        └─► Either:
            │
            ├─► PATCH /api/documents/:id/approve
            │   ├─► Update: verificationStatus = "approved"
            │   ├─► Update Driver: verificationStatus = "approved"
            │   └─► Notify driver: "Approved! You can now accept rides"
            │
            └─► PATCH /api/documents/:id/reject
                ├─► Update: verificationStatus = "rejected"
                ├─► Add rejectionReason
                └─► Notify driver: "Rejected: {reason}. Please resubmit"
                    │
                    ▼
            5. Driver sees notification and resubmits documents
```

### Authentication & Token Management

```
┌─────────────────────────────────────────────────┐
│         JWT Token Lifecycle                      │
└─────────────────────────────────────────────────┘

1. Login/Signup
        │
        ├─► Generate JWT
        │   ├─ Secret: process.env.JWT_SECRET
        │   ├─ Payload: { userId, userType }
        │   └─ Expiry: 7 days
        │
        └─► Return to Frontend
                │
                ▼
2. Frontend Storage
        │
        ├─► localStorage.setItem('auth_token', token)
        │
        └─► Included in every API request
                │
                ├─ Header: "Authorization: Bearer {token}"
                │
                ▼
3. Backend Verification
        │
        ├─► Middleware extracts token
        │
        ├─► Verify signature with JWT_SECRET
        │
        ├─► Extract userId & userType
        │
        └─► Attach to req.user for use in controllers
```

## Request/Response Cycle

### Example: Create Booking Request

```
REQUEST:
────────
POST /api/bookings HTTP/1.1
Authorization: Bearer eyJhbGciOiJIUzI1NiI...
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
  "vehicleType": "auto"
}

BACKEND PROCESSING:
──────────────────
1. Route: /api/bookings
2. Method: POST
3. Middleware:
   ├─ authMiddleware (verify JWT)
   └─ Extract userId from token
4. Controller: bookingController.createBooking()
5. Validation:
   ├─ validateBookingData()
   └─ validateCityMatch("Delhi", "Delhi") ✓
6. Database:
   ├─ db.bookings.insertOne({...})
   └─ db.notifications.insertOne({...})
7. Socket Event:
   └─ io.emit('new_booking', bookingData)

RESPONSE:
────────
HTTP/1.1 201 Created
Content-Type: application/json

{
  "success": true,
  "message": "Booking created successfully",
  "booking": {
    "id": "507f1f77bcf86cd799439013",
    "fare": 219,
    "status": "searching",
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

## Error Handling Flow

```
Request
    │
    ▼
Validation Error?
    │
    ├─ YES → 400 Bad Request
    │   └─ Response: { success: false, errors: [...] }
    │
    └─ NO ▼
        │
        Auth Error?
        │
        ├─ YES → 401 Unauthorized
        │   └─ Response: { success: false, message: "Invalid token" }
        │
        └─ NO ▼
            │
            Authorization Error?
            │
            ├─ YES → 403 Forbidden
            │   └─ Response: { success: false, message: "No permission" }
            │
            └─ NO ▼
                │
                Resource Not Found?
                │
                ├─ YES → 404 Not Found
                │   └─ Response: { success: false, message: "Not found" }
                │
                └─ NO ▼
                    │
                    Business Logic Error?
                    │
                    ├─ YES → 400 Bad Request
                    │   └─ Response: { success: false, message: "..." }
                    │
                    └─ NO ▼
                        │
                        SUCCESS ✓
                        └─ 200/201 OK
                            Response: { success: true, data: {...} }
```

## Technology Stack

```
Frontend:
├─ Next.js 16         (React Framework)
├─ React 19.2         (UI Library)
├─ Tailwind CSS 4     (Styling)
├─ Framer Motion      (Animations)
├─ Socket.io Client   (Real-time)
└─ TypeScript         (Type Safety)

Backend:
├─ Node.js            (Runtime)
├─ Express 4.18       (Web Framework)
├─ MongoDB 4.4+       (Database)
├─ Mongoose           (ODM - removed in favor of raw MongoDB)
├─ JWT                (Authentication)
├─ bcryptjs           (Password Hashing)
├─ Multer             (File Upload)
├─ Socket.io          (Real-time)
├─ Axios              (HTTP Client)
└─ CORS               (Cross-origin)

Cloud Services (Optional):
├─ Google Maps API    (Geocoding)
├─ Cloudinary         (File Storage)
├─ Stripe             (Payments)
└─ SendGrid           (Email)
```

## Deployment Architecture

```
Production:
───────────

         ┌─────────────────────────┐
         │   Frontend Hosting      │
         │   (Vercel / AWS)        │
         │   - React app           │
         │   - Static files        │
         └──────────────┬──────────┘
                        │
                        │ HTTP/HTTPS
                        │
         ┌──────────────▼──────────┐
         │   Load Balancer         │
         └──────────────┬──────────┘
                        │
        ┌───────────────┼───────────────┐
        │               │               │
    ┌───▼───┐      ┌───▼───┐      ┌───▼───┐
    │Backend│      │Backend│      │Backend│
    │ (EC2) │      │ (EC2) │      │ (EC2) │
    └───┬───┘      └───┬───┘      └───┬───┘
        │               │               │
        └───────────────┼───────────────┘
                        │
                   ┌────▼─────┐
                   │ MongoDB   │
                   │ (Atlas)   │
                   └───────────┘
                        │
                   ┌────▼──────────┐
                   │ Cloud Storage │
                   │ (Cloudinary)  │
                   └───────────────┘
```

## Security Architecture

```
Frontend:
─────────
├─ HTTPS only
├─ Token stored in localStorage (HttpOnly cookie recommended for prod)
├─ CORS whitelisting
└─ Input validation before submission

Backend:
────────
├─ JWT signature verification
├─ Rate limiting (5 attempts/15 min on login)
├─ Input validation on all endpoints
├─ Password hashing with bcryptjs (salt rounds: 10)
├─ MongoDB query injection prevention
├─ CORS headers configured
└─ Error messages don't leak sensitive info

Database:
─────────
├─ Unique indexes on phoneNumber, email
├─ Password stored as hash only
├─ No sensitive data in logs
└─ MongoDB user authentication
```

This architecture supports:
- ✅ Intracity booking validation
- ✅ Real-time notifications
- ✅ Scalable design
- ✅ Proper separation of concerns
- ✅ Security best practices
- ✅ Production readiness
