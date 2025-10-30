import mongoose, { Schema, type Document, type Model } from "mongoose"

export interface IUnit extends Document {
  propertyId: mongoose.Types.ObjectId
  landlordId: mongoose.Types.ObjectId
  unitNumber: string
  type: "studio" | "1bed" | "2bed" | "3bed" | "4bed+" | "commercial"
  floor: number
  size: number
  bedrooms: number
  bathrooms: number
  rent: {
    amount: number
    currency: string
    period: "monthly" | "quarterly" | "yearly"
  }
  deposit: number
  features: string[]
  images: string[]
  status: "available" | "occupied" | "maintenance" | "reserved"
  currentTenantId?: mongoose.Types.ObjectId
  availableFrom?: Date
  createdAt: Date
  updatedAt: Date
}

const UnitSchema = new Schema<IUnit>(
  {
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
    unitNumber: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["studio", "1bed", "2bed", "3bed", "4bed+", "commercial"],
      required: true,
    },
    floor: Number,
    size: Number,
    bedrooms: Number,
    bathrooms: Number,
    rent: {
      amount: { type: Number, required: true },
      currency: { type: String, default: "KES" },
      period: {
        type: String,
        enum: ["monthly", "quarterly", "yearly"],
        default: "monthly",
      },
    },
    deposit: { type: Number, required: true },
    features: [String],
    images: [String],
    status: {
      type: String,
      enum: ["available", "occupied", "maintenance", "reserved"],
      default: "available",
    },
    currentTenantId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    availableFrom: Date,
  },
  {
    timestamps: true,
  },
)

// Indexes
UnitSchema.index({ propertyId: 1 })
UnitSchema.index({ landlordId: 1 })
UnitSchema.index({ status: 1 })
UnitSchema.index({ "rent.amount": 1 })

const Unit: Model<IUnit> = mongoose.models.Unit || mongoose.model<IUnit>("Unit", UnitSchema)

export default Unit
