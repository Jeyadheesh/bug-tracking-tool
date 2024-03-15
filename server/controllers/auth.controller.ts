import { CookieOptions, Request, Response } from "express";
import { UserModel } from "../models/UserModel";
import bcryptjs from "bcryptjs";
import { OtpModel } from "../models/OtpModel";
import { SendOtpMail } from "../utils/nodeMailer";
const jwt = require("jsonwebtoken");

export const registerCustomer = async (req: Request, res: Response) => {
  try {
    const { name, email, password, img } = req.body;
    // console.log(id, name, email, password, role, img);

    const existingCustomer = await UserModel.findOne({
      email: email,
      isVerified: true,
    });

    if (!existingCustomer) {
      return res.status(400).send({ message: "Verify the Email First" });
    }
    console.log(existingCustomer);

    if (existingCustomer?.password) {
      return res.status(400).json({ message: "User already exists" });
    }

    // if (existingCustomer.length > 0) {
    //   return res.status(400).json({ message: "User already exists" });
    // }

    const hashpass = await bcryptjs.hash(password, 10);
    const customer = await UserModel.updateOne(
      {
        email: email,
      },
      {
        $set: {
          name,
          password: hashpass,
          img,
        },
      }
    );
    res.status(201).json(customer);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const loginCustomer = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  // console.log(email, password);

  try {
    const user = await UserModel.findOne({ email });
    // console.log(user);

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    if (user.isVerified === false) {
      return res.status(400).json({ message: "Please verify your email" });
    }

    const isPasswordValid = bcryptjs.compare(password, user.password as string);
    // console.log(isPasswordValid);

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    console.log(process.env.JWT_SECRET_KEY);

    const token = jwt.sign({ email }, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRE_TIME,
    });

    const cookieOptions: CookieOptions = {
      expires: new Date(
        Date.now() +
          Number(process.env.COOKIE_EXPIRE_TIME) * 1000 * 60 * 60 * 24
      ),
      httpOnly: true,
      sameSite: process.env.MODE == "PRODUCTION" ? "none" : "strict",
      path: "/",
      secure: true,
    };

    res.cookie("bugTracker", token, cookieOptions);
    res.json({ message: "Logged in successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
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

export const sendOtp = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    let otp = Math.floor(1000 + Math.random() * 9000).toString();
    // console.log(otp);
    const existingCustomer = await UserModel.findOne({
      email: email,
    });

    console.log(existingCustomer);

    if (existingCustomer) {
      let otp = Math.floor(1000 + Math.random() * 9000).toString();
      // console.log("updated Otp");
      const updateOtp = await UserModel.findOneAndUpdate(
        { email },
        {
          $set: {
            otp: otp,
            createdAt: new Date(new Date().getTime()),
          },
        }
      );
      // return res.status(400).json({ message: "New OTP Sent" });
      const status = SendOtpMail(email, otp);
      return res.send({ message: "OTP Updated and " + status });
    }

    const customer = await UserModel.create({
      email: email,
      otp: otp,
    });
    console.log(customer);

    const status = await SendOtpMail(email, otp);
    res.send({ message: status });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const verifyOtp = async (req: Request, res: Response) => {
  try {
    const { email, otp } = req.body;
    const existingCustomer = await UserModel.findOne({
      email: email,
      isVerified: true,
    });
    // console.log();
    if (existingCustomer) {
      return res.send({ message: "Email Already Verified" });
    }

    const customer = await UserModel.findOne({ email });

    if (!customer) {
      return res.send({ message: "OTP Expired or Invalid Email" });
    }

    if (customer.otpExpiredAt < new Date()) {
      await UserModel.deleteOne({ email });
      return res.send({ message: "OTP Expired" });
    }

    if (customer.otp !== otp) {
      return res.send({ message: "Invalid OTP" });
    }

    await UserModel.updateOne({ email }, { $set: { isVerified: true } });
    return res.send({ message: "Email Verified" });
  } catch (error) {
    res.status(400).send(error.message);
  }
};
