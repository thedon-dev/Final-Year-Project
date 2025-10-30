import { Document, Types } from "mongoose";

export interface IProfile {
  firstName: string;
  lastName: string;
  phone: string;
  avatar?: string;
  idDocument?: string;
  dateOfBirth?: Date;
  nationality?: string;
}

export interface IVerification {
  emailVerified: boolean;
  phoneVerified: boolean;
  idVerified: boolean;
  verifiedAt?: Date;
}

export interface IUser extends Document {
  _id: Types.ObjectId;
  email: string;
  password: string;
  role: "tenant" | "landlord" | "admin";
  profile: IProfile;
  verification: IVerification;
  status: "active" | "suspended" | "inactive";
  comparePassword(candidatePassword: string): Promise<boolean>;
  createdAt: Date;
  updatedAt: Date;
}
