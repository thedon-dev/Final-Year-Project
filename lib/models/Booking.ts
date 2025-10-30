import mongoose, { Schema, type Document, type Model } from "mongoose"

export interface IBooking extends Document {
  unitId: mongoose.Types.ObjectId
  tenantId: mongoose.Types.ObjectId
  landlordId: mongoose.Types.ObjectId
  viewingDate?: Date
  moveInDate: Date
  status: "pending" | "confirmed" | "cancelled" | "converted"
  message?: string
  response?: string
  respondedAt?: Date
  createdAt: Date
  updatedAt: Date
}

const BookingSchema = new Schema<IBooking>(
  {
    unitId: {
      type: Schema.Types.ObjectId,
      ref: "Unit",
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
    viewingDate: Date,
    moveInDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled", "converted"],
      default: "pending",
    },
    message: String,
    response: String,
    respondedAt: Date,
  },
  {
    timestamps: true,
  },
)

// Indexes
BookingSchema.index({ unitId: 1 })
BookingSchema.index({ tenantId: 1 })
BookingSchema.index({ status: 1 })

const Booking: Model<IBooking> = mongoose.models.Booking || mongoose.model<IBooking>("Booking", BookingSchema)

export default Booking
