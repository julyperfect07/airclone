import express from "express";
import { reserve } from "../controllers/reservation.controller";
import { verifyToken } from "../utils/verifyUser";

const router = express.Router();

router.post("/reserve", verifyToken, reserve);

export default router;
