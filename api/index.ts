import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

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

const app = express();

app.use(express.json());

app.use(cookieParser());

app.listen(3000, () => {
  console.log(`App is running on port 3000`);
});
