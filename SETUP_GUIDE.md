# Real Estate Management Platform - Setup Guide

## Features Implemented

### 1. **QR Code System**

- Every property gets a unique QR code when created
- QR codes link to a public property page (`/property/[slug]`)
- Tenants can scan QR codes to view property details
- QR codes displayed in landlord's property list

### 2. **Authentication & Authorization**

- Complete login/signup system for tenants, landlords, and admins
- JWT-based authentication with secure cookies
- Role-based access control throughout the application

### 3. **Property Management**

- Landlords can create, update, and delete properties
- Each property includes:
  - Basic information (name, type, description)
  - Location details
  - Amenities
  - Images
  - Payment account details
  - Generated QR code
- Admin approval system for properties

### 4. **Services Architecture**

All API calls are organized into service modules:

- `lib/services/api-client.ts` - Base API client with error handling
- `lib/services/auth.service.ts` - Authentication operations
- `lib/services/property.service.ts` - Property CRUD operations
- `lib/services/maintenance.service.ts` - Maintenance request management
- `lib/services/payment.service.ts` - Payment tracking

### 5. **Maintenance Requests**

- Tenants can create maintenance requests for their properties
- Categories: plumbing, electrical, HVAC, appliances, structural, other
- Priority levels: low, medium, high, urgent
- Landlords can update request status and assign vendors

### 6. **Payment Management**

- Track payments for rent, deposits, maintenance, utilities
- Link payments to properties and tenants
- Support for multiple payment methods

## Setup Instructions

### 1. Environment Variables

Create a `.env.local` file in the root directory:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run Development Server

```bash
npm run dev
```

### 4. Access the Application

- Home: http://localhost:3000
- Login: http://localhost:3000/login
- Register: http://localhost:3000/register
- Landlord Dashboard: http://localhost:3000/landlord/dashboard
- Tenant Browse: http://localhost:3000/tenant/browse

## API Endpoints

### Authentication

- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user

### Properties

- `GET /api/properties` - List properties
- `POST /api/properties` - Create property (landlord)
- `GET /api/properties/[id]` - Get property details
- `PATCH /api/properties/[id]` - Update property
- `DELETE /api/properties/[id]` - Delete property
- `PATCH /api/properties/[id]/payment-account` - Update payment account

### Maintenance

- `GET /api/maintenance` - List maintenance requests
- `POST /api/maintenance` - Create maintenance request
- `GET /api/maintenance/[id]` - Get request details
- `PATCH /api/maintenance/[id]` - Update request
- `DELETE /api/maintenance/[id]` - Delete request

## Database Models

### User

- Email, password (hashed), role
- Profile information
- Verification status

### Property

- Landlord reference
- Name, type, description
- Address and location
- Images, amenities
- QR code
- Payment account details

### MaintenanceRequest

- Property, tenant, landlord references
- Title, description, category
- Priority, status
- Images, notes

### Payment

- Lease reference
- Tenant, landlord, property references
- Amount, currency, type
- Status, payment method

## Usage Flow

### For Landlords:

1. Register/Login as landlord
2. Create properties through dashboard
3. Properties automatically get QR codes
4. Set payment account details for each property
5. View and manage maintenance requests from tenants

### For Tenants:

1. Register/Login as tenant
2. Browse available properties
3. Scan QR codes from properties to view details
4. Request property visits
5. Create maintenance requests
6. Make rent payments

### Via QR Code:

1. Tenant scans QR code on property
2. Redirected to property details page
3. Can register/login if not authenticated
4. Complete property viewing and application process

## Next Steps

Consider implementing:

- Unit management within properties
- Lease agreement system
- Document storage and management
- Email notifications
- Advanced payment processing
- Analytics and reporting
- Mobile app
