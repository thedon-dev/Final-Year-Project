import mongoose, { Schema, type Document, type Model } from "mongoose"

export interface ILease extends Document {
  unitId: mongoose.Types.ObjectId
  propertyId: mongoose.Types.ObjectId
  landlordId: mongoose.Types.ObjectId
  tenantId: mongoose.Types.ObjectId
  startDate: Date
  endDate: Date
  rentAmount: number
  depositAmount: number
  paymentDay: number
  status: "pending" | "active" | "expired" | "terminated"
  documents: Array<{
    name: string
    url: string
    uploadedAt: Date
  }>
  terms: string
  signedAt?: Date
  createdAt: Date
  updatedAt: Date
}

const LeaseSchema = new Schema<ILease>(
  {
    unitId: {
      type: Schema.Types.ObjectId,
      ref: "Unit",
      required: true,
    },
    propertyId: {
      type: Schema.Types.ObjectId,
      ref: "Property",
      required: true,
    },
    landlordId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    tenantId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    rentAmount: {
      type: Number,
      required: true,
    },
    depositAmount: {
      type: Number,
      required: true,
    },
    paymentDay: {
      type: Number,
      min: 1,
      max: 31,
      default: 1,
    },
    status: {
      type: String,
      enum: ["pending", "active", "expired", "terminated"],
      default: "pending",
    },
    documents: [
      {
        name: String,
        url: String,
        uploadedAt: { type: Date, default: Date.now },
      },
    ],
    terms: String,
    signedAt: Date,
  },
  {
    timestamps: true,
  },
)

// Indexes
LeaseSchema.index({ unitId: 1 })
LeaseSchema.index({ tenantId: 1 })
LeaseSchema.index({ landlordId: 1 })
LeaseSchema.index({ status: 1 })
LeaseSchema.index({ endDate: 1 })

const Lease: Model<ILease> = mongoose.models.Lease || mongoose.model<ILease>("Lease", LeaseSchema)

export default Lease
