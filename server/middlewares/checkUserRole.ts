import { Request, Response, NextFunction } from "express";
// import { Collection } from "mongoose";
// const jwt = require('jsonwebtoken');

// exports.verifyToken = (
//   req: Request,
//   res: Response,
//   next: NextFunction) => {
//   const token = req.cookies.jwt;

//   if (!token) {
//     return res.status(401).json({ message: 'Unauthorized' });
//   }

//   jwt.verify(token, 'your_secret_key', (err:any, decodedToken: any) => {
//     if (err) {
//       return res.status(401).json({ message: 'Unauthorized' });
//     }

//     req.userId = decodedToken.userId;
//     next();
//   });
// };

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
    res.status(403).send({ message: "You are not authorized" });
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
    res.status(403).send({ message: "You are not authorized" });
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
    res.status(403).send({ message: "You are not authorized" });
  }
};

export const checkProjectManagerAndTester = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { role } = req.body;
  console.log(role);

  if (role === "projectManager" || role === "tester") {
    return next();
  } else {
    res.status(403).send({ message: "You are not authorized" });
  }
};

export const checkProjectManagerAndCustomer = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { role } = req.body;
  console.log(role);

  if (role === "projectManager" || role === "customer") {
    return next();
  } else {
    res.status(403).send({ message: "You are not authorized" });
  }
};

export const checkTesterAndCustomer = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { role } = req.body;
  console.log(role);

  if (role === "tester" || role === "customer") {
    return next();
  } else {
    res.status(403).send({ message: "You are not authorized" });
  }
};
