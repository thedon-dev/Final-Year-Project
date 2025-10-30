import mongoose, { Schema, type Document, type Model } from "mongoose"

export interface IPayment extends Document {
  leaseId: mongoose.Types.ObjectId
  tenantId: mongoose.Types.ObjectId
  landlordId: mongoose.Types.ObjectId
  unitId: mongoose.Types.ObjectId
  amount: number
  currency: string
  type: "rent" | "deposit" | "maintenance" | "utility"
  dueDate: Date
  paidDate?: Date
  status: "pending" | "paid" | "overdue" | "partial" | "cancelled"
  paymentMethod?: "cash" | "bank_transfer" | "card" | "mobile_money"
  transactionId?: string
  receipt?: string
  notes?: string
  createdAt: Date
  updatedAt: Date
}

const PaymentSchema = new Schema<IPayment>(
  {
    leaseId: {
      type: Schema.Types.ObjectId,
      ref: "Lease",
      required: true,
    },
    tenantId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    landlordId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    unitId: {
      type: Schema.Types.ObjectId,
      ref: "Unit",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      default: "KES",
    },
    type: {
      type: String,
      enum: ["rent", "deposit", "maintenance", "utility"],
      default: "rent",
    },
    dueDate: {
      type: Date,
      required: true,
    },
    paidDate: Date,
    status: {
      type: String,
      enum: ["pending", "paid", "overdue", "partial", "cancelled"],
      default: "pending",
    },
    paymentMethod: {
      type: String,
      enum: ["cash", "bank_transfer", "card", "mobile_money"],
    },
    transactionId: String,
    receipt: String,
    notes: String,
  },
  {
    timestamps: true,
  },
)

// Indexes
PaymentSchema.index({ leaseId: 1 })
PaymentSchema.index({ tenantId: 1 })
PaymentSchema.index({ landlordId: 1 })
PaymentSchema.index({ status: 1 })
PaymentSchema.index({ dueDate: 1 })

const Payment: Model<IPayment> = mongoose.models.Payment || mongoose.model<IPayment>("Payment", PaymentSchema)

export default Payment
