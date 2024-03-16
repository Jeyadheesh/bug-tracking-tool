import axios from "axios";

export const sendNotification = async (
  title: string,
  message: string,
  senderId: string,
  receiverId: string
) => {
  try {
    const { data: notificationData } = await axios.post(
      "http://localhost:9000/api/notification/create",
      {
        title,
        message,
        senderId,
        receiverId,
      }
    );
    console.log(notificationData);
    return "notification created";
  } catch (error) {
    console.log(error.message);
    return error.message;
  }
};
