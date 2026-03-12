# TranspoConnect API Examples

Complete collection of API examples with request/response payloads for testing the backend.

## Table of Contents

1. [Authentication](#authentication)
2. [Bookings](#bookings)
3. [Documents](#documents)
4. [Notifications](#notifications)

---

## Authentication

### Customer Signup

**Endpoint**: `POST /api/auth/customer/signup`

**Request**:
```bash
curl -X POST http://localhost:5000/api/auth/customer/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Rajesh Kumar",
    "businessName": "Kumar Logistics Pvt Ltd",
    "phoneNumber": "9876543210",
    "email": "rajesh@kumarlogs.com",
    "password": "SecurePassword123"
  }'
```

**Success Response (201)**:
```json
{
  "success": true,
  "message": "Customer account created successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1MDdmMWY3N2JjZjg2Y2Q3OTk0MzkwMTEiLCJ1c2VyVHlwZSI6ImN1c3RvbWVyIiwiaWF0IjoxNzA1MzI2NDAwLCJleHAiOjE3MDU5MzEyMDB9.abc123xyz",
  "customer": {
    "id": "507f1f77bcf86cd799439011",
    "name": "Rajesh Kumar",
    "email": "rajesh@kumarlogs.com",
    "phoneNumber": "9876543210"
  }
}
```

**Error Response (400)**:
```json
{
  "success": false,
  "message": "User already exists"
}
```

---

### Customer Login

**Endpoint**: `POST /api/auth/customer/login`

**Request**:
```bash
curl -X POST http://localhost:5000/api/auth/customer/login \
  -H "Content-Type: application/json" \
  -d '{
    "phoneNumber": "9876543210",
    "password": "SecurePassword123"
  }'
```

**Success Response (200)**:
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "customer": {
    "id": "507f1f77bcf86cd799439011",
    "name": "Rajesh Kumar",
    "email": "rajesh@kumarlogs.com",
    "phoneNumber": "9876543210",
    "businessName": "Kumar Logistics Pvt Ltd"
  }
}
```

**Error Response (401)**:
```json
{
  "success": false,
  "message": "Invalid credentials"
}
```

---

### Driver Signup

**Endpoint**: `POST /api/auth/driver/signup`

**Request**:
```bash
curl -X POST http://localhost:5000/api/auth/driver/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Amit Singh",
    "phoneNumber": "9876543211",
    "email": "amit.driver@example.com",
    "password": "DriverPass123",
    "vehicleType": "auto",
    "vehicleNumber": "DL-01-AB-1234",
    "city": "Delhi"
  }'
```

**Success Response (201)**:
```json
{
  "success": true,
  "message": "Driver account created successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "driver": {
    "id": "507f1f77bcf86cd799439012",
    "name": "Amit Singh",
    "email": "amit.driver@example.com",
    "phoneNumber": "9876543211",
    "vehicleType": "auto"
  }
}
```

---

### Driver Login

**Endpoint**: `POST /api/auth/driver/login`

**Request**:
```bash
curl -X POST http://localhost:5000/api/auth/driver/login \
  -H "Content-Type: application/json" \
  -d '{
    "phoneNumber": "9876543211",
    "password": "DriverPass123"
  }'
```

**Success Response (200)**:
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "driver": {
    "id": "507f1f77bcf86cd799439012",
    "name": "Amit Singh",
    "email": "amit.driver@example.com",
    "phoneNumber": "9876543211",
    "vehicleType": "auto",
    "dutyStatus": "offline"
  }
}
```

---

## Bookings

### Create Booking (Intracity - Success)

**Endpoint**: `POST /api/bookings`

**Headers Required**: `Authorization: Bearer {token}`

**Request** (Both locations in same city):
```bash
curl -X POST http://localhost:5000/api/bookings \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Content-Type: application/json" \
  -d '{
    "pickupLocation": {
      "address": "123 Business Park, Connaught Place, Delhi",
      "city": "Delhi",
      "lat": 28.6315,
      "lng": 77.1948
    },
    "dropLocation": {
      "address": "456 Commerce Street, Naraina, Delhi",
      "city": "Delhi",
      "lat": 28.5494,
      "lng": 77.2466
    },
    "vehicleType": "auto",
    "notes": "Please call 30 mins before arrival"
  }'
```

**Success Response (201)**:
```json
{
  "success": true,
  "message": "Booking created successfully",
  "booking": {
    "id": "507f1f77bcf86cd799439013",
    "pickupLocation": {
      "address": "123 Business Park, Connaught Place, Delhi",
      "city": "Delhi",
      "lat": 28.6315,
      "lng": 77.1948
    },
    "dropLocation": {
      "address": "456 Commerce Street, Naraina, Delhi",
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

---

### Create Booking (Interstate - Blocked)

**Endpoint**: `POST /api/bookings`

**Request** (Different cities):
```bash
curl -X POST http://localhost:5000/api/bookings \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Content-Type: application/json" \
  -d '{
    "pickupLocation": {
      "address": "Delhi Airport, Delhi",
      "city": "Delhi",
      "lat": 28.5661,
      "lng": 77.1052
    },
    "dropLocation": {
      "address": "Noida City Center, Noida",
      "city": "Noida",
      "lat": 28.5900,
      "lng": 77.3566
    },
    "vehicleType": "auto"
  }'
```

**Error Response (400)**:
```json
{
  "success": false,
  "message": "We currently operate only for intracity logistics. Interstate transport is not supported.",
  "isInterstate": true
}
```

---

### Get Bookings

**Endpoint**: `GET /api/bookings?status=searching`

**Request**:
```bash
curl -X GET http://localhost:5000/api/bookings \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

**Success Response (200)**:
```json
{
  "success": true,
  "bookings": [
    {
      "_id": "507f1f77bcf86cd799439013",
      "customerId": "507f1f77bcf86cd799439011",
      "driverId": null,
      "pickupLocation": {
        "address": "123 Business Park",
        "city": "Delhi",
        "lat": 28.6315,
        "lng": 77.1948
      },
      "dropLocation": {
        "address": "456 Commerce Street",
        "city": "Delhi",
        "lat": 28.5494,
        "lng": 77.2466
      },
      "vehicleType": "auto",
      "fare": 219,
      "status": "searching",
      "createdAt": "2024-01-15T10:30:00Z",
      "updatedAt": "2024-01-15T10:30:00Z"
    }
  ]
}
```

---

### Get Single Booking

**Endpoint**: `GET /api/bookings/{bookingId}`

**Request**:
```bash
curl -X GET http://localhost:5000/api/bookings/507f1f77bcf86cd799439013 \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

**Success Response (200)**:
```json
{
  "success": true,
  "booking": {
    "_id": "507f1f77bcf86cd799439013",
    "customerId": {
      "_id": "507f1f77bcf86cd799439011",
      "name": "Rajesh Kumar",
      "phoneNumber": "9876543210"
    },
    "driverId": {
      "_id": "507f1f77bcf86cd799439012",
      "name": "Amit Singh",
      "rating": 4.8,
      "vehicleNumber": "DL-01-AB-1234",
      "phoneNumber": "9876543211"
    },
    "pickupLocation": {
      "address": "123 Business Park",
      "city": "Delhi",
      "lat": 28.6315,
      "lng": 77.1948
    },
    "dropLocation": {
      "address": "456 Commerce Street",
      "city": "Delhi",
      "lat": 28.5494,
      "lng": 77.2466
    },
    "vehicleType": "auto",
    "fare": 219,
    "status": "assigned",
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

---

### Cancel Booking

**Endpoint**: `PATCH /api/bookings/{bookingId}/cancel`

**Request**:
```bash
curl -X PATCH http://localhost:5000/api/bookings/507f1f77bcf86cd799439013/cancel \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

**Success Response (200)**:
```json
{
  "success": true,
  "message": "Booking cancelled successfully",
  "booking": {
    "_id": "507f1f77bcf86cd799439013",
    "status": "cancelled"
  }
}
```

---

## Documents

### Upload Documents (Driver)

**Endpoint**: `POST /api/documents/upload`

**Headers Required**: `Authorization: Bearer {token}`

**Request**:
```bash
curl -X POST http://localhost:5000/api/documents/upload \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -F "drivingLicense=@/path/to/license.jpg" \
  -F "rc=@/path/to/rc.jpg" \
  -F "insurance=@/path/to/insurance.pdf" \
  -F "aadhaar=@/path/to/aadhaar.jpg" \
  -F "profilePhoto=@/path/to/photo.jpg"
```

**Success Response (200)**:
```json
{
  "success": true,
  "message": "Documents uploaded successfully",
  "document": {
    "id": "507f1f77bcf86cd799439014",
    "verificationStatus": "pending",
    "drivingLicenseURL": "https://api.transpoconnect.com/uploads/.../license",
    "rcURL": "https://api.transpoconnect.com/uploads/.../rc",
    "insuranceURL": "https://api.transpoconnect.com/uploads/.../insurance",
    "aadhaarURL": "https://api.transpoconnect.com/uploads/.../aadhaar",
    "profilePhotoURL": "https://api.transpoconnect.com/uploads/.../photo"
  }
}
```

---

### Get Driver Documents

**Endpoint**: `GET /api/documents`

**Request**:
```bash
curl -X GET http://localhost:5000/api/documents \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

**Success Response (200)**:
```json
{
  "success": true,
  "document": {
    "id": "507f1f77bcf86cd799439014",
    "verificationStatus": "approved",
    "rejectionReason": null,
    "drivingLicenseURL": "https://api.transpoconnect.com/uploads/.../license",
    "rcURL": "https://api.transpoconnect.com/uploads/.../rc",
    "insuranceURL": "https://api.transpoconnect.com/uploads/.../insurance",
    "aadhaarURL": "https://api.transpoconnect.com/uploads/.../aadhaar",
    "profilePhotoURL": "https://api.transpoconnect.com/uploads/.../photo",
    "createdAt": "2024-01-15T10:30:00Z",
    "verifiedAt": "2024-01-15T11:30:00Z"
  }
}
```

---

### Get Pending Documents (Admin)

**Endpoint**: `GET /api/documents/pending`

**Request**:
```bash
curl -X GET http://localhost:5000/api/documents/pending \
  -H "Authorization: Bearer {admin-token}"
```

**Success Response (200)**:
```json
{
  "success": true,
  "documents": [
    {
      "_id": "507f1f77bcf86cd799439015",
      "driverId": {
        "_id": "507f1f77bcf86cd799439012",
        "name": "Amit Singh",
        "phoneNumber": "9876543211",
        "email": "amit.driver@example.com",
        "vehicleType": "auto",
        "city": "Delhi"
      },
      "verificationStatus": "pending",
      "drivingLicenseURL": "...",
      "rcURL": "...",
      "createdAt": "2024-01-15T10:30:00Z"
    }
  ],
  "count": 1
}
```

---

### Approve Document (Admin)

**Endpoint**: `PATCH /api/documents/{documentId}/approve`

**Request**:
```bash
curl -X PATCH http://localhost:5000/api/documents/507f1f77bcf86cd799439014/approve \
  -H "Authorization: Bearer {admin-token}"
```

**Success Response (200)**:
```json
{
  "success": true,
  "message": "Document approved successfully",
  "document": {
    "_id": "507f1f77bcf86cd799439014",
    "verificationStatus": "approved",
    "verifiedAt": "2024-01-15T11:30:00Z"
  }
}
```

---

### Reject Document (Admin)

**Endpoint**: `PATCH /api/documents/{documentId}/reject`

**Request**:
```bash
curl -X PATCH http://localhost:5000/api/documents/507f1f77bcf86cd799439014/reject \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {admin-token}" \
  -d '{
    "rejectionReason": "Driving license photo is not clear. Please provide a clearer image."
  }'
```

**Success Response (200)**:
```json
{
  "success": true,
  "message": "Document rejected successfully",
  "document": {
    "_id": "507f1f77bcf86cd799439014",
    "verificationStatus": "rejected",
    "rejectionReason": "Driving license photo is not clear. Please provide a clearer image."
  }
}
```

---

## Notifications

### Get Notifications

**Endpoint**: `GET /api/notifications?isRead=false`

**Request**:
```bash
curl -X GET http://localhost:5000/api/notifications \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

**Success Response (200)**:
```json
{
  "success": true,
  "notifications": [
    {
      "_id": "507f1f77bcf86cd799439016",
      "userId": "507f1f77bcf86cd799439011",
      "userType": "customer",
      "title": "Driver Assigned",
      "message": "Amit Singh has been assigned to your ride",
      "type": "driver_assigned",
      "isRead": false,
      "createdAt": "2024-01-15T10:35:00Z"
    },
    {
      "_id": "507f1f77bcf86cd799439017",
      "userId": "507f1f77bcf86cd799439011",
      "userType": "customer",
      "title": "Booking Created",
      "message": "Your booking has been created. We're searching for available drivers.",
      "type": "booking_created",
      "isRead": true,
      "createdAt": "2024-01-15T10:30:00Z"
    }
  ],
  "unreadCount": 1
}
```

---

### Mark Notification as Read

**Endpoint**: `PATCH /api/notifications/{notificationId}/read`

**Request**:
```bash
curl -X PATCH http://localhost:5000/api/notifications/507f1f77bcf86cd799439016/read \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

**Success Response (200)**:
```json
{
  "success": true,
  "message": "Notification marked as read",
  "notification": {
    "_id": "507f1f77bcf86cd799439016",
    "isRead": true,
    "readAt": "2024-01-15T10:40:00Z"
  }
}
```

---

### Mark All as Read

**Endpoint**: `PATCH /api/notifications/mark-all-read`

**Request**:
```bash
curl -X PATCH http://localhost:5000/api/notifications/mark-all-read \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

**Success Response (200)**:
```json
{
  "success": true,
  "message": "All notifications marked as read"
}
```

---

### Delete Notification

**Endpoint**: `DELETE /api/notifications/{notificationId}`

**Request**:
```bash
curl -X DELETE http://localhost:5000/api/notifications/507f1f77bcf86cd799439016 \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

**Success Response (200)**:
```json
{
  "success": true,
  "message": "Notification deleted"
}
```

---

## Status Codes Reference

- **200**: OK - Request successful
- **201**: Created - Resource created successfully
- **400**: Bad Request - Validation error or interstate booking
- **401**: Unauthorized - Invalid credentials or missing token
- **403**: Forbidden - Insufficient permissions
- **404**: Not Found - Resource not found
- **500**: Internal Server Error - Server error

## Notes

- Replace `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` with actual JWT tokens
- All timestamps are in ISO 8601 format
- Phone numbers must be 10 digits
- Cities are case-insensitive for comparison
- Fare calculation includes 10% surge pricing by default
