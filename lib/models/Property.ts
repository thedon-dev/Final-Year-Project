import mongoose, { Schema, type Document, type Model } from "mongoose";

export type PropertyType = "apartment" | "house" | "compound" | "commercial";

export interface IProperty extends Document {
  _id: mongoose.Types.ObjectId;
  landlordId: mongoose.Types.ObjectId;
  name: string;
  type: PropertyType;
  description: string;
  address: {
    street: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  images: string[];
  amenities: string[];
  totalUnits: number;
  status: "draft" | "pending" | "approved" | "rejected";
  approvedBy?: mongoose.Types.ObjectId;
  approvedAt?: Date;
  qrCode: string;
  paymentAccount?: {
    accountNumber: string;
    accountName: string;
    bankName: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const PropertySchema = new Schema<IProperty>(
  {
    landlordId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      enum: ["apartment", "house", "compound", "commercial"],
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    address: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      country: { type: String, required: true },
      postalCode: String,
      coordinates: {
        lat: Number,
        lng: Number,
      },
    },
    images: [String],
    amenities: [String],
    totalUnits: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["draft", "pending", "approved", "rejected"],
      default: "draft",
    },
    approvedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    approvedAt: Date,
    qrCode: String,
    paymentAccount: {
      accountNumber: String,
      accountName: String,
      bankName: String,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
PropertySchema.index({ landlordId: 1 });
PropertySchema.index({ status: 1 });
PropertySchema.index({ "address.city": 1 });

const Property: Model<IProperty> =
  mongoose.models.Property ||
  mongoose.model<IProperty>("Property", PropertySchema);

export default Property;
