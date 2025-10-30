# Real Estate Management System

A comprehensive property management platform built with Next.js, MongoDB, and TypeScript.

## Features

### For Landlords
- Register and manage multiple properties
- Add and track units/houses
- Monitor occupancy status
- Track rent payments
- View tenant details
- Receive payment reminders

### For Tenants
- Browse available properties
- Search and filter listings
- Book/rent properties
- View payment history
- Make online payments
- Receive notifications

### For Admins
- Oversee all system activities
- Manage users
- Approve property listings
- Monitor analytics
- Track revenue and occupancy

## Tech Stack

- **Frontend**: Next.js 15 (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS v4, shadcn/ui
- **Backend**: Next.js API Routes, Server Actions
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT with jose
- **State Management**: React Context + SWR

## Getting Started

### Prerequisites

- Node.js 18+ installed
- MongoDB database (local or Atlas)

### Installation

1. Clone the repository
2. Install dependencies:

\`\`\`bash
npm install
\`\`\`

3. Create a \`.env.local\` file in the root directory:

\`\`\`env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
NEXT_PUBLIC_APP_URL=http://localhost:3000
\`\`\`

4. Run the development server:

\`\`\`bash
npm run dev
\`\`\`

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

\`\`\`
├── app/
│   ├── (auth)/          # Authentication pages
│   ├── landlord/        # Landlord dashboard & features
│   ├── tenant/          # Tenant portal & features
│   ├── admin/           # Admin dashboard
│   └── api/             # API routes
├── components/
│   ├── auth/            # Authentication components
│   ├── landlord/        # Landlord-specific components
│   ├── tenant/          # Tenant-specific components
│   ├── admin/           # Admin components
│   ├── layout/          # Layout components
│   └── ui/              # Reusable UI components
├── lib/
│   ├── models/          # Mongoose models
│   ├── auth.ts          # Authentication utilities
│   ├── mongodb.ts       # Database connection
│   └── utils.ts         # Helper functions
└── docs/                # Documentation
\`\`\`

## Database Schema

The system uses 8 main collections:

1. **Users** - User accounts (landlords, tenants, admins)
2. **Properties** - Property listings
3. **Units** - Individual rental units
4. **Leases** - Lease agreements
5. **Payments** - Payment records
6. **Bookings** - Booking requests
7. **Notifications** - User notifications
8. **MaintenanceRequests** - Maintenance tickets

See `docs/DATABASE_SCHEMA.md` for detailed schema information.

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user

### Properties
- `GET /api/properties` - List properties
- `POST /api/properties` - Create property
- `GET /api/properties/:id` - Get property details
- `PUT /api/properties/:id` - Update property

### Payments
- `GET /api/payments` - List payments
- `POST /api/payments/:id/pay` - Process payment

### Admin
- `PUT /api/admin/properties/:id/approve` - Approve property
- `PUT /api/admin/properties/:id/reject` - Reject property

See `docs/API_ENDPOINTS.md` for complete API documentation.

## Development Roadmap

### Phase 1 (MVP) - Completed
- ✅ Authentication & user management
- ✅ Property & unit management
- ✅ Tenant portal & browsing
- ✅ Payment tracking
- ✅ Admin dashboard

### Phase 2 (Premium) - Planned
- Payment gateway integration (Stripe)
- SMS/Email notifications
- Document management
- Maintenance request system
- Advanced analytics

### Phase 3 (Future) - Planned
- Blockchain integration (SUI)
- AI-powered recommendations
- Mobile apps (iOS/Android)
- Multi-language support

See `docs/FEATURES_PRIORITY.md` for detailed feature roadmap.

## Contributing

This is a private project. For questions or issues, please contact the development team.

## License

Proprietary - All rights reserved
\`\`\`



<AssistantMessageContentPart partEncoded="eyJ0eXBlIjoidGFzay13YWl0aW5nLXYxIiwiY3JlYXRlZEF0IjoxNzYwNDg0OTU5ODE3LCJmaW5pc2hlZEF0IjoxNzYwNDg0OTU5ODE3LCJpZCI6IlNWaGF0MURuT3d5UUg4NmkiLCJsYXN0UGFydFNlbnRBdCI6MTc2MDQ4NDk1OTgxNywicGFydHMiOlt7InR5cGUiOiJ0b29sLWNhbGxzIn1dfQ==" />



<AssistantMessageContentPart partEncoded="eyJ0eXBlIjoidGFzay1tYW5hZ2UtdG9kb3MtdjEiLCJpZCI6ImthYnc3NmlRUHR6czNudDYiLCJ0YXNrTmFtZUFjdGl2ZSI6IkNvbXBsZXRpbmcgcHJvamVjdCIsInRvb2xDYWxsSWQiOiJ0b29sdV8wMTRRdnJiYVBlWG81c1ZmQXVIb3dzdUoiLCJ0YXNrTmFtZUNvbXBsZXRlIjoiUHJvamVjdCBjb21wbGV0ZWQiLCJjcmVhdGVkQXQiOjE3NjA0ODQ5NjAzOTAsImZpbmlzaGVkQXQiOm51bGwsInBhcnRzIjpbXSwibGFzdFBhcnRTZW50QXQiOm51bGx9" />
