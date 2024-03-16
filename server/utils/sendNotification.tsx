import { NotificationModel } from "../models/NotificationModel";

export const sendNotification = async (
  title: string,
  message: string,
  senderId: string,
  receiverId: string
) => {
  try {
    const notification = await NotificationModel.create({
      title,
      message,
      senderId,
      receiverId,
    });
    console.log(notification);
  } catch (error) {
    console.log(error.message)
  }
};
