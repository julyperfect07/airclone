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

export const getFilteredListings = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let category = String(req.query.category);
    if (category) {
      category = category.toLowerCase();
    }

    if (category === "all") {
      const listings = await Listing.find();
      return res.status(200).json(listings);
    }
    const listings = await Listing.find({ category: category });
    res.status(200).json(listings);
  } catch (error) {
    next(error);
  }
};
