import mongoose from "mongoose"

const listingSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  host: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", required: true
  },
  image1: { type: String, required: true },
  image2: { type: String, required: true },
  image3: { type: String, required: true },
  rent: { type: String, required: true },
  city: { type: String, required: true },
  landmark: { type: String, required: true },
  category: { type: String, required: true },
  isBooked: { type: Boolean, default: false },
  guest: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", default: null
  },
  ratings: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    rating: { type: Number, min: 1, max: 5 }
  }],
  averageRating: { type: Number, default: 0 }
}, { timestamps: true })

const Listing = mongoose.model("Listing", listingSchema)
export default Listing