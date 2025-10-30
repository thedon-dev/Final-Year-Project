import mongoose, { Schema, type Document, type Model } from "mongoose"

export interface INotification extends Document {
  userId: mongoose.Types.ObjectId
  type: "payment_due" | "payment_received" | "booking_request" | "lease_expiring" | "maintenance" | "system"
  title: string
  message: string
  data?: Record<string, any>
  read: boolean
  readAt?: Date
  channels: Array<"in_app" | "email" | "sms">
  sentAt?: Date
  createdAt: Date
}

const NotificationSchema = new Schema<INotification>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: ["payment_due", "payment_received", "booking_request", "lease_expiring", "maintenance", "system"],
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    data: Schema.Types.Mixed,
    read: {
      type: Boolean,
      default: false,
    },
    readAt: Date,
    channels: [
      {
        type: String,
        enum: ["in_app", "email", "sms"],
      },
    ],
    sentAt: Date,
  },
  {
    timestamps: true,
  },
)

// Indexes
NotificationSchema.index({ userId: 1 })
NotificationSchema.index({ read: 1 })
NotificationSchema.index({ createdAt: -1 })

const Notification: Model<INotification> =
  mongoose.models.Notification || mongoose.model<INotification>("Notification", NotificationSchema)

export default Notification
