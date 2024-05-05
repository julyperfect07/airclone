import express from "express";
import {
  createListing,
  getFilteredListings,
  getOneListing,
} from "../controllers/listing.controller";
import { verifyToken } from "../utils/verifyUser";

const router = express.Router();

router.post("/createlisting", verifyToken, createListing);
router.get("/getlistings", getFilteredListings);
router.get("/onelisting/:listingId", getOneListing);

export default router;
