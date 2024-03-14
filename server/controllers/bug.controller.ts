import { Request, Response } from "express";
import { BugModel } from "../models/BugModel";

export const createBug = async (req: Request, res: Response) => {
  try {
    const { id, name, comments, testRequestId, status, priority, image } =
      req.body;
    const bug = await BugModel.create({
      id,
      name,
      comments,
      testRequestId,
      status,
      priority,
      image,
    });
    console.log(bug);
    res.status(201).json(bug);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const getBugById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const bug = await BugModel.findById(id);
    console.log(bug);
    res.status(200).json(bug);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const getAllBug = async (req: Request, res: Response) => {
  try {
    const bug = await BugModel.find();
    console.log(bug);
    res.status(200).json(bug);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const updateBug = async (req: Request, res: Response) => {
  try {
    const { id, status } = req.body;
    const bug = await BugModel.findByIdAndUpdate(
      id,
      { $set: { status: status } },
      { new: true }
    );
    console.log(bug);
    res.status(200).json(bug);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const deleteBug = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const bug = await BugModel.findByIdAndDelete(id);
    console.log(bug);
    res.status(200).json(bug);
  } catch (error) {
    res.status(400).send(error.message);
  }
};
