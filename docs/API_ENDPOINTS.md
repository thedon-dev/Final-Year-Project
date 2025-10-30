# API Endpoint Structure

## Base URL
\`\`\`
Development: http://localhost:3000/api
Production: https://yourdomain.com/api
\`\`\`

---

## Authentication Endpoints

### POST /api/auth/register
Register a new user
\`\`\`json
Request:
{
  "email": "user@example.com",
  "password": "securePassword123",
  "role": "tenant | landlord",
  "firstName": "John",
  "lastName": "Doe",
  "phone": "+1234567890"
}

Response (201):
{
  "success": true,
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "role": "tenant"
  },
  "token": "jwt_token"
}
\`\`\`

### POST /api/auth/login
Login user
\`\`\`json
Request:
{
  "email": "user@example.com",
  "password": "securePassword123"
}

Response (200):
{
  "success": true,
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "role": "tenant",
    "profile": {...}
  },
  "token": "jwt_token"
}
\`\`\`

### POST /api/auth/logout
Logout user (invalidate token)

### GET /api/auth/me
Get current user profile (requires auth)

### POST /api/auth/forgot-password
Request password reset

### POST /api/auth/reset-password
Reset password with token

---

## Property Endpoints (Landlord)

### GET /api/properties
Get all properties (with filters)
\`\`\`
Query params:
- landlordId (optional)
- status (optional)
- city (optional)
- page, limit (pagination)
\`\`\`

### POST /api/properties
Create new property (landlord only)
\`\`\`json
Request:
{
  "name": "Sunset Apartments",
  "type": "apartment",
  "description": "Modern apartments...",
  "address": {
    "street": "123 Main St",
    "city": "Nairobi",
    "state": "Nairobi County",
    "country": "Kenya",
    "postalCode": "00100"
  },
  "amenities": ["parking", "gym", "pool"],
  "images": ["url1", "url2"]
}

Response (201):
{
  "success": true,
  "property": {...}
}
\`\`\`

### GET /api/properties/:id
Get single property details

### PUT /api/properties/:id
Update property (landlord only)

### DELETE /api/properties/:id
Delete property (landlord only, soft delete)

---

## Unit Endpoints

### GET /api/properties/:propertyId/units
Get all units for a property

### POST /api/properties/:propertyId/units
Add unit to property
\`\`\`json
Request:
{
  "unitNumber": "A101",
  "type": "2bed",
  "floor": 1,
  "bedrooms": 2,
  "bathrooms": 1,
  "size": 75,
  "rent": {
    "amount": 50000,
    "currency": "KES",
    "period": "monthly"
  },
  "deposit": 100000,
  "features": ["balcony", "parking"],
  "images": ["url1", "url2"]
}
\`\`\`

### GET /api/units/:id
Get single unit details

### PUT /api/units/:id
Update unit

### DELETE /api/units/:id
Delete unit

### GET /api/units/available
Get all available units (public, with filters)
\`\`\`
Query params:
- city, minPrice, maxPrice, type, bedrooms
- page, limit
\`\`\`

---

## Booking Endpoints

### POST /api/bookings
Create booking request (tenant)
\`\`\`json
Request:
{
  "unitId": "unit_id",
  "viewingDate": "2025-02-01T10:00:00Z",
  "moveInDate": "2025-02-15",
  "message": "I'm interested in this unit..."
}
\`\`\`

### GET /api/bookings
Get bookings (filtered by role)
- Tenant: their bookings
- Landlord: bookings for their properties

### GET /api/bookings/:id
Get single booking

### PUT /api/bookings/:id/approve
Approve booking (landlord)

### PUT /api/bookings/:id/reject
Reject booking (landlord)

### PUT /api/bookings/:id/cancel
Cancel booking (tenant)

---

## Lease Endpoints

### POST /api/leases
Create lease (landlord, after booking approval)
\`\`\`json
Request:
{
  "bookingId": "booking_id",
  "unitId": "unit_id",
  "tenantId": "tenant_id",
  "startDate": "2025-02-15",
  "endDate": "2026-02-14",
  "rentAmount": 50000,
  "depositAmount": 100000,
  "paymentDay": 1,
  "terms": "Lease terms and conditions..."
}
\`\`\`

### GET /api/leases
Get leases (filtered by role)

### GET /api/leases/:id
Get single lease

### PUT /api/leases/:id
Update lease

### POST /api/leases/:id/sign
Sign lease (tenant)

### PUT /api/leases/:id/terminate
Terminate lease

### GET /api/leases/:id/documents
Get lease documents

### POST /api/leases/:id/documents
Upload lease document

---

## Payment Endpoints

### GET /api/payments
Get payments (filtered by role)
\`\`\`
Query params:
- tenantId, landlordId, leaseId
- status, startDate, endDate
- page, limit
\`\`\`

### GET /api/payments/:id
Get single payment

### POST /api/payments/:id/pay
Process payment (tenant)
\`\`\`json
Request:
{
  "paymentMethod": "card | bank_transfer | mobile_money",
  "transactionId": "txn_123",
  "receipt": "receipt_url"
}
\`\`\`

### PUT /api/payments/:id/mark-paid
Mark payment as paid manually (landlord)

### POST /api/payments/:id/send-reminder
Send payment reminder (landlord)

### GET /api/payments/stats
Get payment statistics (landlord/admin)

---

## Tenant Endpoints

### GET /api/tenants
Get all tenants (landlord: their tenants, admin: all)

### GET /api/tenants/:id
Get tenant details

### GET /api/tenants/:id/history
Get tenant rental history

---

## Admin Endpoints

### GET /api/admin/dashboard
Get admin dashboard stats

### GET /api/admin/users
Get all users with filters

### PUT /api/admin/users/:id/status
Update user status (suspend/activate)

### GET /api/admin/properties/pending
Get pending property approvals

### PUT /api/admin/properties/:id/approve
Approve property

### PUT /api/admin/properties/:id/reject
Reject property

### GET /api/admin/analytics
Get system analytics
\`\`\`
Query params:
- metric: occupancy | revenue | users | payments
- period: week | month | quarter | year
- startDate, endDate
\`\`\`

---

## Notification Endpoints

### GET /api/notifications
Get user notifications

### PUT /api/notifications/:id/read
Mark notification as read

### PUT /api/notifications/read-all
Mark all as read

### DELETE /api/notifications/:id
Delete notification

---

## Maintenance Endpoints (Premium)

### POST /api/maintenance
Create maintenance request (tenant)

### GET /api/maintenance
Get maintenance requests

### PUT /api/maintenance/:id
Update maintenance request (landlord)

### PUT /api/maintenance/:id/complete
Mark as complete

---

## Upload Endpoints

### POST /api/upload/image
Upload image (property, unit, profile)
\`\`\`
Multipart form data
Returns: { url: "blob_url" }
\`\`\`

### POST /api/upload/document
Upload document (lease, receipt, ID)

---

## Search Endpoints

### GET /api/search/properties
Advanced property search
\`\`\`
Query params:
- q (search term)
- city, minPrice, maxPrice
- type, bedrooms, amenities
- sortBy, order
- page, limit
\`\`\`

### GET /api/search/suggestions
Get search suggestions (autocomplete)

---

## Webhook Endpoints (Premium)

### POST /api/webhooks/stripe
Stripe payment webhook

### POST /api/webhooks/sms
SMS delivery status webhook

---

## Response Format Standards

### Success Response
\`\`\`json
{
  "success": true,
  "data": {...},
  "message": "Operation successful"
}
\`\`\`

### Error Response
\`\`\`json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable error message",
    "details": {...}
  }
}
\`\`\`

### Pagination Response
\`\`\`json
{
  "success": true,
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 100,
    "pages": 5
  }
}
\`\`\`

---

## Authentication

All protected endpoints require JWT token in header:
\`\`\`
Authorization: Bearer <jwt_token>
\`\`\`

## Rate Limiting

- Public endpoints: 100 requests/15 minutes
- Authenticated: 1000 requests/15 minutes
- Admin: Unlimited

## Error Codes

- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 409: Conflict
- 422: Validation Error
- 429: Too Many Requests
- 500: Internal Server Error
