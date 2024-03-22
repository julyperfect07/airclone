import { Request, Response, NextFunction } from "express";
export const logout = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res
      .clearCookie("access_token")
      .status(200)
      .json("You have been logged out successfully");
  } catch (error) {
    next(error);
  }
};
