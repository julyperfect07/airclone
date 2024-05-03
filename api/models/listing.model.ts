import mongoose from "mongoose";

const listingSchema = new mongoose.Schema({
  title: String,
  description: String,
  category: String,
  location: String,
  guests: Number,
  rooms: Number,
  bathrooms: Number,
  price: Number,
  images: {
    type: [String],
    required: true,
    default: [],
  },
});

const Listing = mongoose.model("Listing", listingSchema);

export default Listing;
