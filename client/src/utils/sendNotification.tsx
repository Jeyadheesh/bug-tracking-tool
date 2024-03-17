import axios from "axios";

export const sendNotification = async (
  title: string,
  message: string,
  senderId: string,
  receiverId: string,
  name: string,
  email: string
) => {
  try {
    const { data: notificationData } = await axios.post(
      "http://localhost:9000/api/notification/create",
      {
        title,
        message,
        senderId,
        receiverId,
        name,
        email,
      }
    );
    console.log(notificationData);
    return "notification created";
  } catch (error) {
    console.log(error.message);
    return error.message;
  }
};

// projeceManagerId = "65f44854aa6f72212e3dce24";
