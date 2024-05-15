import { Request, Response, NextFunction } from "express";
import Listing from "../models/listing.model";
import Reservation from "../models/reservation.modal";
import { errorHandler } from "../utils/error";

interface RequestWithUser extends Request {
  user: {
    _id: string;
  };
}

export const reserve = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  try {
    const { listingId, startDate, endDate, guests, user } = req.body;

    const userId = req.user._id;
    console.log(user);
    console.log(userId);
    if (userId !== user) {
      return res.status(403).json({ message: "Forbidden" });
    }

    const listing = await Listing.findById(listingId);
    if (!listing) {
      return res.status(400).json({ message: "Listing not found" });
    }
    const newReservation = new Reservation({
      listingId: listingId,
      startDate,
      endDate,
      guests,
      user: userId,
    });

    const savedReservation = await newReservation.save();
    res.status(201).json(savedReservation);
  } catch (error) {
    next(error);
  }
};
