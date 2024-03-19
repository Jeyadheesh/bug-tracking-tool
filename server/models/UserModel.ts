import mongoose, { now } from "mongoose";

export interface UserType extends mongoose.Document {
  name?: string;
  email: string;
  password?: string;
  role?: string;
  isVerified?: boolean;
  img?: string;
  otp?: string;
  createdAt?: Date;
  otpExpiredAt?: Date;
}

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  role: {
    type: String,
    default: "customer",
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  img: {
    type: String,
    default: "https://cdn-icons-png.flaticon.com/256/9368/9368192.png",
  }, // opt
  otp: String,
  createdAt: {
    type: Date,
    default: Date.now, // current time when the document is created
  },
  otpExpiredAt: {
    type: Date,
    default: function () {
      return new Date(Date.now() + 50 * 60 * 1000); // 50 minutes from createdAt
    },
  },
});

export const UserModel = mongoose.model<UserType>("UserModel", UserSchema);
