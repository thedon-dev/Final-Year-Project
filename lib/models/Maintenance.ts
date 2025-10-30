import mongoose, { Schema, type Document, type Model } from "mongoose";

export interface IMaintenanceRequest extends Document {
  propertyId: mongoose.Types.ObjectId;
  unitId?: mongoose.Types.ObjectId;
  tenantId: mongoose.Types.ObjectId;
  landlordId: mongoose.Types.ObjectId;
  title: string;
  description: string;
  category:
    | "plumbing"
    | "electrical"
    | "hvac"
    | "appliance"
    | "structural"
    | "other";
  priority: "low" | "medium" | "high" | "urgent";
  status: "pending" | "in_progress" | "completed" | "cancelled";
  images?: string[];
  assignedTo?: mongoose.Types.ObjectId;
  completedAt?: Date;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const MaintenanceRequestSchema = new Schema<IMaintenanceRequest>(
  {
    propertyId: {
      type: Schema.Types.ObjectId,
      ref: "Property",
      required: true,
    },
    unitId: {
      type: Schema.Types.ObjectId,
      ref: "Unit",
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
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: [
        "plumbing",
        "electrical",
        "hvac",
        "appliance",
        "structural",
        "other",
      ],
      required: true,
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high", "urgent"],
      default: "medium",
    },
    status: {
      type: String,
      enum: ["pending", "in_progress", "completed", "cancelled"],
      default: "pending",
    },
    images: [String],
    assignedTo: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    completedAt: Date,
    notes: String,
  },
  {
    timestamps: true,
  }
);

// Indexes
MaintenanceRequestSchema.index({ propertyId: 1 });
MaintenanceRequestSchema.index({ tenantId: 1 });
MaintenanceRequestSchema.index({ landlordId: 1 });
MaintenanceRequestSchema.index({ status: 1 });

const MaintenanceRequest: Model<IMaintenanceRequest> =
  mongoose.models.MaintenanceRequest ||
  mongoose.model<IMaintenanceRequest>(
    "MaintenanceRequest",
    MaintenanceRequestSchema
  );

export default MaintenanceRequest;
