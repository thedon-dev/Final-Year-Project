# Database Schema Design

## Collections Overview

### 1. Users Collection
\`\`\`javascript
{
  _id: ObjectId,
  email: String (unique, indexed),
  password: String (hashed),
  role: Enum ['tenant', 'landlord', 'admin'],
  profile: {
    firstName: String,
    lastName: String,
    phone: String,
    avatar: String (URL),
    idDocument: String (URL),
    dateOfBirth: Date,
    nationality: String
  },
  verification: {
    emailVerified: Boolean,
    phoneVerified: Boolean,
    idVerified: Boolean,
    verifiedAt: Date
  },
  status: Enum ['active', 'suspended', 'inactive'],
  createdAt: Date,
  updatedAt: Date
}
\`\`\`

**Indexes**: 
- `email` (unique)
- `role`
- `status`

---

### 2. Properties Collection
\`\`\`javascript
{
  _id: ObjectId,
  landlordId: ObjectId (ref: Users, indexed),
  name: String,
  type: Enum ['apartment', 'house', 'compound', 'commercial'],
  description: String,
  address: {
    street: String,
    city: String,
    state: String,
    country: String,
    postalCode: String,
    coordinates: {
      lat: Number,
      lng: Number
    }
  },
  images: [String], // URLs
  amenities: [String],
  totalUnits: Number,
  status: Enum ['draft', 'pending', 'approved', 'rejected'],
  approvedBy: ObjectId (ref: Users),
  approvedAt: Date,
  createdAt: Date,
  updatedAt: Date
}
\`\`\`

**Indexes**:
- `landlordId`
- `status`
- `address.city`

---

### 3. Units Collection
\`\`\`javascript
{
  _id: ObjectId,
  propertyId: ObjectId (ref: Properties, indexed),
  landlordId: ObjectId (ref: Users, indexed),
  unitNumber: String,
  type: Enum ['studio', '1bed', '2bed', '3bed', '4bed+', 'commercial'],
  floor: Number,
  size: Number, // square meters
  bedrooms: Number,
  bathrooms: Number,
  rent: {
    amount: Number,
    currency: String,
    period: Enum ['monthly', 'quarterly', 'yearly']
  },
  deposit: Number,
  features: [String],
  images: [String],
  status: Enum ['available', 'occupied', 'maintenance', 'reserved'],
  currentTenantId: ObjectId (ref: Users),
  availableFrom: Date,
  createdAt: Date,
  updatedAt: Date
}
\`\`\`

**Indexes**:
- `propertyId`
- `landlordId`
- `status`
- `rent.amount`

---

### 4. Leases Collection
\`\`\`javascript
{
  _id: ObjectId,
  unitId: ObjectId (ref: Units, indexed),
  propertyId: ObjectId (ref: Properties),
  landlordId: ObjectId (ref: Users, indexed),
  tenantId: ObjectId (ref: Users, indexed),
  startDate: Date,
  endDate: Date,
  rentAmount: Number,
  depositAmount: Number,
  paymentDay: Number, // day of month (1-31)
  status: Enum ['pending', 'active', 'expired', 'terminated'],
  documents: [{
    name: String,
    url: String,
    uploadedAt: Date
  }],
  terms: String,
  signedAt: Date,
  createdAt: Date,
  updatedAt: Date
}
\`\`\`

**Indexes**:
- `unitId`
- `tenantId`
- `landlordId`
- `status`
- `endDate`

---

### 5. Payments Collection
\`\`\`javascript
{
  _id: ObjectId,
  leaseId: ObjectId (ref: Leases, indexed),
  tenantId: ObjectId (ref: Users, indexed),
  landlordId: ObjectId (ref: Users, indexed),
  unitId: ObjectId (ref: Units),
  amount: Number,
  currency: String,
  type: Enum ['rent', 'deposit', 'maintenance', 'utility'],
  dueDate: Date,
  paidDate: Date,
  status: Enum ['pending', 'paid', 'overdue', 'partial', 'cancelled'],
  paymentMethod: Enum ['cash', 'bank_transfer', 'card', 'mobile_money'],
  transactionId: String,
  receipt: String (URL),
  notes: String,
  createdAt: Date,
  updatedAt: Date
}
\`\`\`

**Indexes**:
- `leaseId`
- `tenantId`
- `landlordId`
- `status`
- `dueDate`

---

### 6. Bookings Collection
\`\`\`javascript
{
  _id: ObjectId,
  unitId: ObjectId (ref: Units, indexed),
  tenantId: ObjectId (ref: Users, indexed),
  landlordId: ObjectId (ref: Users),
  viewingDate: Date,
  moveInDate: Date,
  status: Enum ['pending', 'confirmed', 'cancelled', 'converted'],
  message: String,
  response: String,
  respondedAt: Date,
  createdAt: Date,
  updatedAt: Date
}
\`\`\`

**Indexes**:
- `unitId`
- `tenantId`
- `status`

---

### 7. Notifications Collection
\`\`\`javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: Users, indexed),
  type: Enum ['payment_due', 'payment_received', 'booking_request', 'lease_expiring', 'maintenance', 'system'],
  title: String,
  message: String,
  data: Object, // Additional context
  read: Boolean,
  readAt: Date,
  channels: [Enum ['in_app', 'email', 'sms']],
  sentAt: Date,
  createdAt: Date
}
\`\`\`

**Indexes**:
- `userId`
- `read`
- `createdAt`

---

### 8. MaintenanceRequests Collection
\`\`\`javascript
{
  _id: ObjectId,
  unitId: ObjectId (ref: Units, indexed),
  tenantId: ObjectId (ref: Users, indexed),
  landlordId: ObjectId (ref: Users, indexed),
  category: Enum ['plumbing', 'electrical', 'appliance', 'structural', 'other'],
  priority: Enum ['low', 'medium', 'high', 'urgent'],
  description: String,
  images: [String],
  status: Enum ['submitted', 'acknowledged', 'in_progress', 'completed', 'cancelled'],
  assignedTo: String,
  cost: Number,
  completedAt: Date,
  createdAt: Date,
  updatedAt: Date
}
\`\`\`

**Indexes**:
- `unitId`
- `tenantId`
- `landlordId`
- `status`

---

## Relationships Diagram

\`\`\`
Users (Landlord) ──┬─→ Properties ──→ Units ──┬─→ Leases ──→ Payments
                   │                           │
                   └─→ Bookings ←──────────────┘
                   
Users (Tenant) ────┬─→ Bookings
                   ├─→ Leases
                   ├─→ Payments
                   └─→ MaintenanceRequests

Users (All) ───────→ Notifications
\`\`\`

## Data Integrity Rules

1. **Cascade Deletes**: When a property is deleted, all associated units, leases, and payments are archived (soft delete)
2. **Status Transitions**: Units can only be marked as occupied when an active lease exists
3. **Payment Generation**: Automatic payment records created when lease is activated
4. **Booking Conflicts**: Prevent double-booking of units
5. **Lease Validation**: End date must be after start date, tenant cannot have multiple active leases for same unit
