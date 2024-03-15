import { Request, Response } from "express";
import { UserModel } from "../models/UserModel";
import bcryptjs from "bcryptjs";

export const registerCustomer = async (req: Request, res: Response) => {
  try {
    const { id, name, email, password, role, img } = req.body;

    const existingCustomer = await UserModel.find({
      email: email,
    });

    if (existingCustomer.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashpass = await bcryptjs.hash(password, 10);
    const customer = await UserModel.create({
      id,
      name,
      email,
      password: hashpass,
      role,
      img,
    });

    res.status(201).json(customer);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const updateCustomer = async (req: Request, res: Response) => {
  try {
    const { id, name, email, password, role, img } = req.body;

    const hashpass = await bcryptjs.hash(password, 10);
    const customer = await UserModel.findOneAndUpdate(
      { email: email },
      { $set: { name, password: hashpass, img } },
      { new: true }
    );
    console.log(customer);
    res.send({ message: "User Updated" });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const customer = await UserModel.findOne({ email: email });
    res.send(customer);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const test = async (req: Request, res: Response) => {
  console.log(req.body.name);
  res.send("Test");
};
