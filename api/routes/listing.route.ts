import express from "express";
import {
  createListing,
  getFilteredListings,
} from "../controllers/listing.controller";
import { verifyToken } from "../utils/verifyUser";

const router = express.Router();

router.post("/createlisting", verifyToken, createListing);
router.get("/getlistings", getFilteredListings);

export default router;
