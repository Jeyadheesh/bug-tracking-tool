import useToast from "@/store/useToast";
import axios from "axios";
import React from "react";

type Props = {};

const useNotification = () => {
  const { toast, setToast } = useToast();
  const sendNotification = async (
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
        },
        {
          withCredentials: true,
        }
      );
      console.log(notificationData);
      setToast({ msg: "notification created", variant: "success" });
    } catch (error) {
      console.log(error.message);
      setToast({ msg: error.message, variant: "error" });
    }
  };
  return { sendNotification };
};

export default useNotification;
