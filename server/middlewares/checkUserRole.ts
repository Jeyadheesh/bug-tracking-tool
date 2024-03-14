import { Request, Response, NextFunction } from "express";

export const customerCheck = (
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

export const testerCheck = (
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

export const projectManagerCheck = (
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
