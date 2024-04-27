import express from "express";
import {
  createListing,
  getListings,
} from "../controllers/listing.controller";
import { verifyToken } from "../utils/verifyUser";

const router = express.Router();

router.post("/createlisting", verifyToken, createListing);
router.get("/getlistings", getListings);

export default router;
