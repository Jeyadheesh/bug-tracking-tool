import { Request, Response, NextFunction } from "express";

export const checkCustomer = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { role } = req.body;
  console.log(role);

  if (role === "customer") {
    return next();
  } else {
    res.status(401).send({ message: "You are not authorized" });
  }
};

export const checkTester = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { role } = req.body;
  console.log(role);

  if (role === "tester") {
    return next();
  } else {
    res.status(401).send({ message: "You are not authorized" });
  }
};

export const checkProjectManager = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { role } = req.body;
  console.log(role);

  if (role === "projectManager") {
    return next();
  } else {
    res.status(401).send({ message: "You are not authorized" });
  }
};
