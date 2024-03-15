import mongoose from "mongoose";

const OtpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: new Date(new Date().getTime()), // current time
  },
  expiredAt: {
    type: Date,
    default: new Date(new Date().getTime() + 5 * 60 * 1000), // 5 minutes
  },
});

export const OtpModel = mongoose.model("otp", OtpSchema);
