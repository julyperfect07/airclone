import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/user.route";
import authRoutes from "./routes/auth.route";
import listingRoutes from "./routes/listing.route";
import reservationRoutes from "./routes/reservation.route";
import { Request, Response, NextFunction } from "express";
import path from "path";

dotenv.config();

if (!process.env.MONGO) {
  console.error(
    "MongoDB connection string is not defined in the environment variables."
  );
  process.exit(1);
}

mongoose
  .connect(process.env.MONGO)
  .then(() => console.log("Mongodb is connected"))
  .catch((err) => console.log(err));

const __dirname = path.resolve();

const app = express();

app.use(express.json());

app.use(cookieParser());

app.listen(3000, () => {
  console.log(`App is running on port 3000 `);
});

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/listing", listingRoutes);
app.use("/api/reservation", reservationRoutes);

app.use(express.static(path.join(__dirname, "/client/dist")));

app.get("*", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

app.use(
  (err: any, req: Request, res: Response, next: NextFunction) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal server error";
    res.status(statusCode).json({
      success: false,
      statusCode,
      message,
    });
  }
);
