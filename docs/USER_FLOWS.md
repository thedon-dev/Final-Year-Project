# User Flow Diagrams

## 1. Landlord Registration & Property Setup Flow

\`\`\`
START
  │
  ├─→ Visit Landing Page
  │
  ├─→ Click "Register as Landlord"
  │
  ├─→ Fill Registration Form
  │     ├─ Email
  │     ├─ Password
  │     ├─ Full Name
  │     └─ Phone Number
  │
  ├─→ Email Verification (optional for MVP)
  │
  ├─→ Complete Profile
  │     ├─ Upload ID Document
  │     ├─ Add Bank Details
  │     └─ Business Information
  │
  ├─→ Dashboard (First Time)
  │
  ├─→ Add First Property
  │     ├─ Property Details
  │     ├─ Upload Images
  │     ├─ Add Address
  │     └─ List Amenities
  │
  ├─→ Add Units to Property
  │     ├─ Unit Number
  │     ├─ Type (1bed, 2bed, etc.)
  │     ├─ Rent Amount
  │     ├─ Deposit
  │     └─ Upload Unit Images
  │
  ├─→ Submit for Admin Approval
  │
  ├─→ Wait for Approval
  │
  └─→ Property Goes Live
        │
        └─→ Start Receiving Bookings
\`\`\`

---

## 2. Tenant Property Search & Booking Flow

\`\`\`
START
  │
  ├─→ Visit Landing Page / Browse Properties
  │
  ├─→ Search & Filter
  │     ├─ Location
  │     ├─ Price Range
  │     ├─ Property Type
  │     ├─ Bedrooms
  │     └─ Amenities
  │
  ├─→ View Property Listings (Grid/List)
  │
  ├─→ Click Property Card
  │
  ├─→ View Property Details
  │     ├─ Image Gallery
  │     ├─ Description
  │     ├─ Available Units
  │     ├─ Amenities
  │     └─ Location Map
  │
  ├─→ Select Unit
  │
  ├─→ Decision Point: Registered?
  │     │
  │     ├─ NO → Register/Login
  │     │         │
  │     │         └─→ Quick Registration
  │     │               ├─ Email
  │     │               ├─ Password
  │     │               └─ Basic Info
  │     │
  │     └─ YES → Continue
  │
  ├─→ Request Viewing / Book Unit
  │     ├─ Select Move-in Date
  │     ├─ Add Message to Landlord
  │     └─ Submit Booking Request
  │
  ├─→ Landlord Reviews Booking
  │
  ├─→ Decision Point: Approved?
  │     │
  │     ├─ NO → Notification Sent
  │     │         └─→ Search Again
  │     │
  │     └─ YES → Lease Creation
  │               │
  │               ├─→ Review Lease Terms
  │               ├─→ Upload Required Documents
  │               │     ├─ ID Copy
  │               │     └─ Proof of Income
  │               │
  │               ├─→ Pay Deposit
  │               │
  │               ├─→ Sign Lease (Digital)
  │               │
  │               └─→ Lease Activated
  │                     │
  │                     └─→ Access Tenant Dashboard
\`\`\`

---

## 3. Payment Flow (Tenant)

\`\`\`
START (Tenant Dashboard)
  │
  ├─→ View Payment Due Notification
  │
  ├─→ Navigate to Payments Section
  │
  ├─→ View Payment History & Upcoming
  │
  ├─→ Select Payment to Pay
  │
  ├─→ Choose Payment Method
  │     ├─ Card Payment (Stripe)
  │     ├─ Bank Transfer
  │     ├─ Mobile Money
  │     └─ Cash (Mark as Paid)
  │
  ├─→ Process Payment
  │
  ├─→ Upload Receipt (if manual payment)
  │
  ├─→ Payment Confirmation
  │
  ├─→ Landlord Receives Notification
  │
  └─→ Payment Status Updated
        │
        └─→ Receipt Available for Download
\`\`\`

---

## 4. Landlord Payment Tracking Flow

\`\`\`
START (Landlord Dashboard)
  │
  ├─→ View Dashboard Overview
  │     ├─ Total Properties
  │     ├─ Occupied Units
  │     ├─ Pending Payments
  │     └─ Monthly Revenue
  │
  ├─→ Navigate to Payments Section
  │
  ├─→ View Payment Status
  │     ├─ Paid (Green)
  │     ├─ Pending (Yellow)
  │     ├─ Overdue (Red)
  │     └─ Upcoming (Blue)
  │
  ├─→ Filter by Property/Unit/Tenant
  │
  ├─→ Actions Available:
  │     ├─ Send Payment Reminder
  │     ├─ Mark as Paid (Manual)
  │     ├─ View Receipt
  │     ├─ Download Report
  │     └─ Contact Tenant
  │
  ├─→ Automated Reminders
  │     ├─ 7 days before due
  │     ├─ On due date
  │     └─ 3 days after due
  │
  └─→ Generate Financial Reports
        ├─ Monthly Summary
        ├─ Annual Report
        └─ Tax Documents
\`\`\`

---

## 5. Admin Approval & Monitoring Flow

\`\`\`
START (Admin Dashboard)
  │
  ├─→ View System Overview
  │     ├─ Total Users
  │     ├─ Active Properties
  │     ├─ Pending Approvals
  │     └─ Revenue Analytics
  │
  ├─→ Review Pending Properties
  │
  ├─→ Click Property for Review
  │
  ├─→ Verify Property Details
  │     ├─ Check Images
  │     ├─ Verify Address
  │     ├─ Review Landlord Profile
  │     └─ Check Compliance
  │
  ├─→ Decision Point: Approve?
  │     │
  │     ├─ YES → Approve Property
  │     │         │
  │     │         ├─→ Property Goes Live
  │     │         └─→ Landlord Notified
  │     │
  │     └─ NO → Reject with Reason
  │               │
  │               └─→ Landlord Notified
  │                     │
  │                     └─→ Can Resubmit
  │
  ├─→ Monitor User Activity
  │     ├─ Suspicious Behavior
  │     ├─ Dispute Resolution
  │     └─ User Support
  │
  ├─→ Manage System Settings
  │     ├─ Commission Rates
  │     ├─ Feature Flags
  │     └─ Email Templates
  │
  └─→ Generate Analytics Reports
        ├─ Occupancy Trends
        ├─ Revenue Analysis
        ├─ User Growth
        └─ Payment Success Rates
\`\`\`

---

## 6. Maintenance Request Flow

\`\`\`
START (Tenant Dashboard)
  │
  ├─→ Navigate to Maintenance Section
  │
  ├─→ Create New Request
  │     ├─ Select Category
  │     ├─ Set Priority
  │     ├─ Describe Issue
  │     └─ Upload Photos
  │
  ├─→ Submit Request
  │
  ├─→ Landlord Receives Notification
  │
  ├─→ Landlord Reviews Request
  │
  ├─→ Landlord Acknowledges
  │     ├─ Assign to Technician
  │     ├─ Set Timeline
  │     └─ Add Notes
  │
  ├─→ Tenant Receives Update
  │
  ├─→ Work in Progress
  │
  ├─→ Landlord Marks as Complete
  │     ├─ Add Cost
  │     └─ Upload Completion Photos
  │
  ├─→ Tenant Confirms Completion
  │
  └─→ Request Closed
