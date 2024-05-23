import express from "express";
import {
  favorite,
  getFavorites,
  logout,
} from "../controllers/user.controller";
import { verifyToken } from "../utils/verifyUser";

const router = express.Router();

router.post("/logout", logout);
router.post("/favorite/:listingId", verifyToken, favorite);
router.get("/favorites", verifyToken, getFavorites);

export default router;
