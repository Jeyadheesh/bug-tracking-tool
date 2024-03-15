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
  createdAt: {
    type: Date,
    default: new Date(new Date().getTime()),
  },
  expiredAt: {
    type: Date,
    default: new Date(new Date().getTime() + 5 * 60 * 1000),
  },
});

export const OtpModel = mongoose.model("otp", OtpSchema);
