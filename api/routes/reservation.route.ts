import express from "express";
import {
  getReservations,
  reserve,
} from "../controllers/reservation.controller";
import { verifyToken } from "../utils/verifyUser";

const router = express.Router();

router.post("/reserve", verifyToken, reserve);
router.get("/getReservations/:userId", verifyToken, getReservations);

export default router;
