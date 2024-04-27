import { Request, Response, NextFunction } from "express";
import Listing from "../models/listing.model";

export const createListing = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newListing = await Listing.create(req.body);
    return res.status(201).json(newListing);
  } catch (error) {
    next(error);
  }
};

export const getListings = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const listings = await Listing.find();
    res.status(200).json(listings);
  } catch (error) {
    next(error);
  }
};
