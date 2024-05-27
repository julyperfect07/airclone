import express from "express";
import {
  deleteReservation,
  getReservations,
  reserve,
} from "../controllers/reservation.controller";
import { verifyToken } from "../utils/verifyUser";

const router = express.Router();

router.post("/reserve", verifyToken, reserve);
router.get("/getReservations/:userId", verifyToken, getReservations);
router.delete(
  "/deleteReservation/:userId/:reservationId",
  verifyToken,
  deleteReservation
);

export default router;
