import mongoose from "mongoose";

const ReservationSchema = new mongoose.Schema({
  listingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Listing",
    required: true,
  },
  category: String,
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  guests: { type: Number, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Reservation = mongoose.model("Reservation", ReservationSchema);
export default Reservation;
