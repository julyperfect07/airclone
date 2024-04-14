import jwt, { Secret } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { errorHandler } from "./error";

interface AuthenticatedRequest extends Request {
  user?: any; // You can replace 'any' with the actual type of your user object
}

export const verifyToken = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.access_token;
  if (!token) {
    return next(errorHandler(401, "Unauthorized"));
  }
  jwt.verify(
    token,
    process.env.JWT_SECRET as Secret,
    (error, user) => {
      if (error) {
        return next(errorHandler(403, "Forbidden"));
      }
      req.user = user;
      next();
    }
  );
};
