import mongoose from "mongoose";

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
  img: String, // opt
  otp: String,
  createdAt: {
    type: Date,
    default: new Date(), // current time
  },
  otpExpiredAt: {
    type: Date,
    default: new Date(new Date().getTime() + 5 * 60 * 1000), // 5 minutes
  },
});

export const UserModel = mongoose.model("UserModel", UserSchema);
