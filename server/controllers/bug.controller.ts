import { Request, Response } from "express";
import { BugModel } from "../models/BugModel";

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
    const bug = await BugModel.create(req.body);
    console.log(bug);
    res.status(201).json(bug);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const getBugById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const bug = await BugModel.findById(id).populate("testRequestId");
    console.log(bug);
    res.status(200).json(bug);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const getAllBug = async (req: Request, res: Response) => {
  try {
    const bug = await BugModel.find().populate("testRequestId");
    console.log(bug);
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
    console.log(bug);
    res.status(200).json({ message: "Bug status updated" });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const updateBugDetails = async (req: Request, res: Response) => {
  try {
    const { id, name, comments, status, priority, image } = req.body;
    const bug = await BugModel.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );
    console.log(bug);
    res.status(200).json({ message: "Bug details updated" });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const deleteBug = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const bug = await BugModel.findByIdAndDelete(id);
    console.log(bug);
    res.status(200).json({ message: "Bug deleted" });
  } catch (error) {
    res.status(400).send(error.message);
  }
};
