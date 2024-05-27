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

    if (userId !== user) {
      return res.status(403).json({ message: "Forbidden" });
    }

    const listing = await Listing.findById(listingId);
    if (!listing) {
      return res.status(400).json({ message: "Listing not found" });
    }
    // Check if the user already has an active reservation for this listing
    const existingReservation = await Reservation.findOne({
      user: userId,
      listingId: listingId,
      endDate: { $gte: new Date() },
    });

    if (existingReservation) {
      return res.status(400).json({
        message: "You already have a reservation for this listing.",
      });
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

export const getReservations = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req.params;
  try {
    if (req.user._id !== userId) {
      return res.status(403).json({ message: "Forbidden" });
    }
    const reservations = await Reservation.find({ user: userId })
      .populate("listingId")
      .exec();
    res.status(200).json(reservations);
  } catch (error) {
    next(error);
  }
};

export const deleteReservation = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.user._id !== req.params.userId) {
      return res.status(403).json({ message: "Forbidden" });
    }

    const reservation = await Reservation.findOneAndDelete({
      _id: req.params.reservationId,
      user: req.user._id,
    });

    console.log(reservation);
    if (!reservation) {
      return res
        .status(404)
        .json({ message: "Reservation not found" });
    }

    res.status(200).json("Reservation deleted successfully");
  } catch (error) {
    next(error);
  }
};
