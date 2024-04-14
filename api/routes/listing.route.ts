import express from "express";
import { createListing } from "../controllers/listing.controller";
import { verifyToken } from "../utils/verifyUser";

const router = express.Router();

router.post("/createlisting", verifyToken, createListing);
