import { TestRequestModel, TestRequestType } from "../models/TestRequestModel";
import { UserModel, UserType } from "../models/UserModel";
import { Request, Response } from "express";
import { sendNotificationAndMail } from "../utils/sendNotificationAndMail";
import mongoose, { ObjectId, Types } from "mongoose";

export const createTestRequest = async (req: Request, res: Response) => {
  try {
    const {
      name,
      url,
      testerId,
      status,
      comments,
      clientId,
      credentials,
      summary,
      clientName,
    } = req.body;
    // Get Project Manager
    const project = await UserModel.findOne({ role: "projectManager" });
    const testRequest = await TestRequestModel.create({
      name,
      url,
      testerId,
      status,
      comments,
      clientId,
      credentials,
      summary,
      projectManagerId: project?._id,
    });
    // console.log(testRequest);
    sendNotificationAndMail(
      `New Test Request: ${name}`,
      `New Test Request Created by ${clientName}`,
      clientId,
      project?._id!,
      project?.name!,
      project?.email!
    );
    res.status(201).json({ message: "Test Request created" });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const getTestRequestById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const testRequest = await TestRequestModel.findById(id)
      .populate("projectManagerId")
      .populate("testerId")
      .populate("clientId");
    // console.log(testRequest);
    res.status(200).json(testRequest);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const getAllTestRequest = async (req: Request, res: Response) => {
  try {
    const testRequest = await TestRequestModel.find()
      .populate("clientId")
      .populate("testerId")
      .populate("projectManagerId");
    // console.log(testRequest);
    res.status(200).json(testRequest);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const updateTestRequestStatus = async (req: Request, res: Response) => {
  try {
    const { id, status } = req.body;
    const testRequest = await TestRequestModel.findByIdAndUpdate(
      id,
      { $set: { status: status } },
      { new: true }
    );
    // console.log(testRequest);
    res.status(200).json({ message: "Test Request status updated" });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const updateTestRequestDetails = async (req: Request, res: Response) => {
  try {
    const { comments, currentStatus, apiFor, ...rest } = req.body;
    // console.log(rest, comments);

    const testRequest = await TestRequestModel.findByIdAndUpdate(
      rest.id,
      {
        $set: rest,
        $push: { comments: comments },
      },
      { new: true }
    )
      .populate<{ testerId: UserType }>("testerId")
      .populate<{ clientId: UserType }>("clientId");
    console.log(testRequest);
    if (apiFor === "assignTester") {
      sendNotificationAndMail(
        `Assigned: ${testRequest?.name}`,
        `You have been assigned to ${testRequest?.name}`,
        testRequest?.projectManagerId! as Types.ObjectId,
        testRequest?.testerId?._id!,
        testRequest?.testerId?.name!,
        testRequest?.testerId?.email!
      );
    } else if (apiFor === "updateStatus") {
      sendNotificationAndMail(
        `Test Request: ${testRequest?.name}`,
        `${currentStatus} → ${rest.status}`,
        testRequest?.projectManagerId! as Types.ObjectId,
        testRequest?.testerId?._id!,
        testRequest?.testerId?.name!,
        testRequest?.testerId?.email!
      );
      sendNotificationAndMail(
        `Test Request: ${testRequest?.name}`,
        `${currentStatus} → ${rest.status}`,
        testRequest?.projectManagerId! as Types.ObjectId, // need to change
        testRequest?.clientId?._id!,
        testRequest?.clientId?.name!,
        testRequest?.clientId?.email!
      );
    }
    // console.log(testRequest);
    res.status(200).json({ message: "Test Request details updated" });
  } catch (error) {
    res.status(400).send(error.message);
  }
};
