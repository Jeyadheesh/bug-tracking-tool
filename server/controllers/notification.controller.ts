import { Request, Response } from "express";
import { NotificationModel } from "../models/NotificationModel";
import { sendMail } from "../utils/nodeMailer";

export const getByReceiverId = async (req: Request, res: Response) => {
  try {
    const { receiverId } = req.params;
    const notifications = await NotificationModel.find({ receiverId }).sort({
      createdAt: -1,
    });
    // console.log(notifications);
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
    // console.log(notification);
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
    // console.log(notification);
    res.status(200).json({ message: "All notifications status updated" });
  } catch (error) {
    res.status(400).send(error.message);
  }
};
