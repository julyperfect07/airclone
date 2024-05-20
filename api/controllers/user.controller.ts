import { Request, Response, NextFunction } from "express";
import User from "../models/user.model";
import Listing from "../models/listing.model";
interface RequestWithUser extends Request {
  user: {
    _id: string;
  };
}
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

export const favorite = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findById(req.user._id);
    const listing = await Listing.findById(req.params.listingId);
    if (!listing) {
      return res.status(404).json({ error: "Item not found" });
    }
    const listingIndex = user.favorites.indexOf(listing._id);

    if (listingIndex === -1) {
      user.favorites.push(listing._id);
    } else {
      user.favorites.splice(listingIndex, 1);
    }
    await user.save();

    // Get the updated list of favorited listings
    const updatedUser = await User.findById(
      req.user._id,
      "favorites"
    );

    res.json({ favoritedListings: updatedUser.favorites });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

export const getFavorites = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findById(req.user._id);
    res.status(200).json(user.favorites);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
