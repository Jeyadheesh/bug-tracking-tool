import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const getUserRole = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // console.log(req.cookies);

    if (req.cookies.bugTracker) {
      // console.log(process.env.JWT_SECRET_KEY);

      const user = jwt.verify(
        req.cookies.bugTracker,
        process.env.JWT_SECRET_KEY as string
      ) as jwt.JwtPayload;

      // console.log("user : ", user);
      res.locals.user = user;
      // console.log("message");
    } else {
      res.locals.user = null;
      // console.log("locals null");
    }

    next();
  } catch (err) {
    console.log(err.message);

    return res.status(500).json({ msg: err.message });
  }
};
