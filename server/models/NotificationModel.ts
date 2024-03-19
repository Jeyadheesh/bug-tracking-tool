import mongoose from "mongoose";
import { UserType } from "./UserModel";

export interface NotificationType extends mongoose.Document {
  title: string;
  message: string;
  senderId: mongoose.Types.ObjectId | UserType;
  receiverId: mongoose.Types.ObjectId | UserType;
  isSeen?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const NotificationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserModel",
      required: true,
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserModel",
      required: true,
    },
    isSeen: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const NotificationModel = mongoose.model<NotificationType>(
  "Notification",
  NotificationSchema
);
