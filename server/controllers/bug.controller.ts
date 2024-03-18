import { Request, Response } from "express";
import { BugModel } from "../models/BugModel";
import { sendNotificationAndMail } from "../utils/sendNotification";

export const createBug = async (req: Request, res: Response) => {
  try {
    const {
      name,
      comments,
      testRequestId,
      status,
      priority,
      images,
      summary,
      feature,
      stepsToReproduce,
    } = req.body;
    const bug = await (
      await BugModel.create(req.body)
    ).populate<{ testRequestId: any }>({
      path: "testRequestId",
      populate: { path: "clientId testerId" },
    });
    console.log(bug);

    sendNotificationAndMail(
      `New Bug: ${bug.name}`,
      `Raised By ${bug.testRequestId?.testerId?.name}`,
      bug.testRequestId?.testerId?._id,
      bug.testRequestId?.clientId?._id,
      bug.testRequestId?.clientId?.name,
      bug.testRequestId?.clientId?.email
    );
    res.status(201).json(bug);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const getBugById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const bug = await BugModel.findById(id).populate({
      path: "testRequestId",
      populate: { path: "clientId testerId" },
    });
    // console.log(bug);
    res.status(200).json(bug);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const getAllBug = async (req: Request, res: Response) => {
  try {
    const bug = await BugModel.find().populate("testRequestId");
    // console.log(bug);
    res.status(200).json(bug);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const getAllBugOfTestRequest = async (req: Request, res: Response) => {
  try {
    const bug = await BugModel.find({ testRequestId: req.params.id })
      .populate("testRequestId")
      .sort({ createdAt: -1 });
    // console.log(bug);
    res.status(200).json(bug);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const updateBugStatus = async (req: Request, res: Response) => {
  try {
    const { id, status } = req.body;
    const bug = await BugModel.findByIdAndUpdate(
      id,
      { $set: { status: status } },
      { new: true }
    );
    // console.log(bug);
    res.status(200).json({ message: "Bug status updated" });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const updateBugDetails = async (req: Request, res: Response) => {
  try {
    const { comments, role, apiFor, currentStatus, ...rest } = req.body;
    // console.log(rest);

    const bug = await BugModel.findByIdAndUpdate(
      rest.id,
      {
        $set: rest,
        $push: { comments: comments },
      },
      { new: true }
    ).populate<{ testRequestId: any }>({
      path: "testRequestId",
      populate: { path: "clientId testerId" },
    });

    if (apiFor === "updateStatus") {
      if (role === "tester") {
        sendNotificationAndMail(
          `Bug: ${bug?.name}`,
          `${currentStatus} → ${rest.status}`,
          bug?.testRequestId?.testerId?._id,
          bug?.testRequestId?.clientId?._id,
          bug?.testRequestId?.clientId?.name,
          bug?.testRequestId?.clientId?.email
        );
      } else if (role === "customer") {
        sendNotificationAndMail(
          `Bug: ${bug?.name}`,
          `${currentStatus} → ${rest.status}`,
          bug?.testRequestId?.clientId?._id,
          bug?.testRequestId?.testerId?._id,
          bug?.testRequestId?.testerId?.name,
          bug?.testRequestId?.testerId?.email
        );
      }
    }
    // console.log(bug);
    res.status(200).json({ message: "Bug details updated" });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const deleteBug = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const bug = await BugModel.findByIdAndDelete(id);
    // console.log(bug);
    res.status(200).json({ message: "Bug deleted" });
  } catch (error) {
    res.status(400).send(error.message);
  }
};
