import { Request, Response, NextFunction } from "express";

export const checkCustomer = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!res.locals.user)
    return res.status(403).send({ message: "You are not authorized" });

  const { role } = res.locals?.user;

  if (role === "customer") {
    return next();
  } else {
    return res.status(403).send({ message: "You are not authorized" });
  }
};

export const checkTester = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!res.locals.user)
    return res.status(403).send({ message: "You are not authorized" });
  const { role } = res.locals?.user;

  if (role === "tester") {
    return next();
  } else {
    return res.status(403).send({ message: "You are not authorized" });
  }
};

export const checkProjectManager = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!res.locals.user)
    return res.status(403).send({ message: "You are not authorized" });
  const { role } = res.locals?.user;

  if (role === "projectManager") {
    return next();
  } else {
    return res.status(403).send({ message: "You are not authorized" });
  }
};

export const checkProjectManagerAndTester = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { role } = res.locals.user;

  if (role === "projectManager" || role === "tester") {
    return next();
  } else {
    return res.status(403).send({ message: "You are not authorized" });
  }
};

export const checkProjectManagerAndCustomer = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!res.locals.user)
    return res.status(403).send({ message: "You are not authorized" });
  const { role } = res.locals?.user;

  if (role === "projectManager" || role === "customer") {
    return next();
  } else {
    return res.status(403).send({ message: "You are not authorized" });
  }
};

export const checkTesterAndCustomer = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!res.locals.user)
    return res.status(403).send({ message: "You are not authorized" });
  const { role } = res.locals?.user;

  if (role === "tester" || role === "customer") {
    return next();
  } else {
    return res.status(403).send({ message: "You are not authorized" });
  }
};

export const checkAllValidUsers = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!res.locals.user)
    return res.status(403).send({ message: "You are not authorized" });
  const { role } = res.locals?.user;

  if (role === "tester" || role === "customer" || role === "projectManager") {
    return next();
  } else {
    return res.status(403).send({ message: "You are not authorized" });
  }
};
