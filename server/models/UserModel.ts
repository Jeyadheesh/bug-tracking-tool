import mongoose, { now } from "mongoose";

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
      return new Date(Date.now() + 5 * 60 * 1000); // 5 minutes from createdAt
    },
  },
});

export const UserModel = mongoose.model("UserModel", UserSchema);
