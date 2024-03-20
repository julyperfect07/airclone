import { Request, Response, NextFunction } from "express";
import User from "../models/user.model";
import { errorHandler } from "../utils/error";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, email, password } = req.body;
    if (
      !username ||
      !email ||
      !password ||
      username === "" ||
      email === "" ||
      password === ""
    ) {
      next(errorHandler(400, "All fields are required"));
    }
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = await User.create({
      email,
      username,
      password: hashedPassword,
    });
    res.json("Sign up successful");
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const JWT_SECRET = process.env.JWT_SECRET || "default_secret";
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return errorHandler(400, "There no account with this email");
    }
    const validPassword = bcryptjs.compareSync(
      password,
      validUser.password
    );
    if (!validPassword) {
      return errorHandler(400, "Email or password not valid");
    }
    const token = jwt.sign({ id: validUser._id }, JWT_SECRET);
    const { password: pass, ...rest } = validUser.toObject();
    res
      .status(200)
      .cookie("access_token", token, { httpOnly: true })
      .json(rest);
  } catch (error) {
    next(error);
  }
};
