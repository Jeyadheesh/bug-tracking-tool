import { Request, Response } from "express";
import { NotificationModel } from "../models/NotificationModel";

export const createNotification = async (req: Request, res: Response) => {
  try {
    const { title, message, senderId, receiverId } = req.body;
    const notification = await NotificationModel.create({
      title,
      message,
      senderId,
      receiverId,
    });
    console.log(notification);
    res.status(201).json(notification);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const getByReceiverId = async (req: Request, res: Response) => {
  try {
    const { receiverId } = req.params;
    const notifications = await NotificationModel.find({ receiverId });
    console.log(notifications);
    res.status(200).json(notifications);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const updateIsSeen = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    const notification = await NotificationModel.findByIdAndUpdate(
      id,
      { $set: { isSeen: true } },
      { new: true }
    );
    console.log(notification);
    res.status(200).json({ message: "Notification status updated" });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const updateIsSeenAll = async (req: Request, res: Response) => {
  try {
    const { receiverId } = req.body;
    const notification = await NotificationModel.updateMany(
      { receiverId },
      { $set: { isSeen: true } }
    );
    console.log(notification);
    res.status(200).json({ message: "All notifications status updated" });
  } catch (error) {
    res.status(400).send(error.message);
  }
};
