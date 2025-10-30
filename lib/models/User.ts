import mongoose from "mongoose";
import { IUser } from "../types/user";

const userSchema = new mongoose.Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    role: {
      type: String,
      enum: ["tenant", "landlord", "admin"],
      required: true,
    },
    profile: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      phone: { type: String, required: true },
      avatar: String,
      idDocument: String,
      dateOfBirth: Date,
      nationality: String,
    },
    verification: {
      emailVerified: { type: Boolean, default: false },
      phoneVerified: { type: Boolean, default: false },
      idVerified: { type: Boolean, default: false },
      verifiedAt: Date,
    },
    status: {
      type: String,
      enum: ["active", "suspended", "inactive"],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return this.password === candidatePassword;
};

userSchema.index({ role: 1 });
userSchema.index({ status: 1 });

const User = mongoose.models.User || mongoose.model<IUser>("User", userSchema);
export default User;
