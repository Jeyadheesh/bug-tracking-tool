import { Request, Response } from "express";
import { UserModel } from "../models/UserModel";
import bcryptjs from "bcryptjs";
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

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

export const loginCustomer = async (req:Request, res:Response) => {
  const { username, password } = req.body;

  try {
    const user = await UserModel.findOne({ username });

    if (!user) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    const token = jwt.sign({ userId: user._id }, 'qwertyuiopasdfghjklzxcvbnmqwertyuiop', { expiresIn: '1h' });

    res.cookie('jwt', token, { httpOnly: true });
    res.json({ message: 'Logged in successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const updateCustomer = async (req: Request, res: Response) => {
  try {
    const { id, name, email, password, role, img } = req.body;

    const hashpass = await bcryptjs.hash(password, 10);
    const customer = await UserModel.findOneAndUpdate(
      { email: email },
      { $set: { name, password: hashpass, role, img } },
      { new: true }
    );
    console.log(customer);
    res.send({ message: "User Updated" });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const getCustomer = async (req: Request, res: Response) => {
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
