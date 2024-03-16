import { TestRequestModel } from "../models/TestRequestModel";
import { UserModel } from "../models/UserModel";
import { Request, Response } from "express";

export const createTestRequest = async (req: Request, res: Response) => {
  try {
    const { name, url, testerId, status, comments, clientId, credentials } =
      req.body;
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
      projectManagerId: project?._id,
    });
    console.log(testRequest);
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
    console.log(testRequest);
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
    console.log(testRequest);
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
    console.log(testRequest);
    res.status(200).json({ message: "Test Request status updated" });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const updateTestRequestDetails = async (req: Request, res: Response) => {
  try {
    const { id, name, url, comments, credentials, status } = req.body;
    const testRequest = await TestRequestModel.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );
    console.log(testRequest);
    res.status(200).json({ message: "Test Request details updated" });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const deleteTestRequest = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const resData = await TestRequestModel.findByIdAndDelete(id);
    console.log(resData);
    res.status(200).json({ message: "Test Request deleted" });
  } catch (error) {
    res.status(400).send(error.message);
  }
};
