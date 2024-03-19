import { ObjectId, Types } from "mongoose";
import { NotificationModel } from "../models/NotificationModel";
import { sendMail } from "./nodeMailer";

export const sendNotificationAndMail = async (
  title: string,
  message: string,
  senderId: Types.ObjectId | string,
  receiverId: Types.ObjectId | string,
  receiverName: string,
  receiverEmail: string
) => {
  try {
    const notification = await NotificationModel.create({
      title,
      message,
      senderId,
      receiverId,
    });
    console.log("Notification Created");
    sendMail(receiverName, receiverEmail, message, title);
  } catch (error) {
    console.log(error.message);
  }
};
