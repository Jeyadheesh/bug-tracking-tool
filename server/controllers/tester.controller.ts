import { Request, Response } from "express";
import { UserModel } from "../models/UserModel";
import { TestRequestModel } from "../models/TestRequestModel";

export const getFreeTesters = async (req: Request, res: Response) => {
  // res.send("Tester");
  try {
    const uniqueTestersId = await TestRequestModel.find({
      status: { $ne: "testing completed" },
    }).distinct("testerId");

    const freeTesters = await UserModel.find({
      _id: { $nin: uniqueTestersId },
      role: "tester",
    });
    res.send(freeTesters);
  } catch (error) {
    res.send(error.message);
  }
};

export const getAllTester = async (req: Request, res: Response) => {
  try {
    const testers = await UserModel.find({});
    res.status(200).json(testers);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getTester = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const tester = await UserModel.findOne({ email: email });
    if (!tester) {
      return res.status(404).json({ message: "Tester not found" });
    }
    res.status(200).json(tester);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getTesterById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const testerId = await UserModel.findById(id);
    console.log(testerId);
    res.status(200).json(testerId);
  } catch (error) {
    res.status(400).send(error.message);
  }
};
