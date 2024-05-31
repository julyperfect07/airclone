import { Request, Response, NextFunction } from "express";
import Listing from "../models/listing.model";
import { errorHandler } from "../utils/error";

interface RequestWithUser extends Request {
  user: {
    _id: string;
  };
}

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

export const getOneListing = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { listingId } = req.params;
  try {
    const listing = await Listing.findById(listingId);
    res.status(200).json(listing);
  } catch (error) {
    next(error);
  }
};

export const getUserListings = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params;
    if (req.user._id !== userId) {
      return errorHandler(404, "You can't perform this action");
    }
    const listings = await Listing.find({ userRef: userId });

    res.status(200).json(listings);
  } catch (error) {
    next(error);
  }
};

export const deleteUserListing = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId, listingId } = req.params;

    if (req.user._id !== userId) {
      return errorHandler(404, "You can't perform this action");
    }

    await Listing.findByIdAndDelete(listingId);
    res.status(201).json("Listing deleted successfully");
  } catch (error) {
    next(error);
  }
};
