import express from "express";
import {
  createListing,
  deleteUserListing,
  getFilteredListings,
  getOneListing,
  getUserListings,
} from "../controllers/listing.controller";
import { verifyToken } from "../utils/verifyUser";

const router = express.Router();

router.post("/createlisting", verifyToken, createListing);
router.get("/getlistings", getFilteredListings);
router.get("/onelisting/:listingId", getOneListing);
router.get("/getuserlistings/:userId", verifyToken, getUserListings);
router.delete(
  "/deleteuserlistings/:userId/:listingId",
  verifyToken,
  deleteUserListing
);
export default router;
