import uploadOnCloudinary from "../config/cloudinary.js"
import Listing from "../model/listing.model.js"
import User from "../model/user.model.js"

export const addlisting = async (req, res) => {
  try {
    const host = req.userId
    const { title, description, rent, city, landmark, category } = req.body

    const image1 = await uploadOnCloudinary(req.files.image1[0].path)
    const image2 = await uploadOnCloudinary(req.files.image2[0].path)
    const image3 = await uploadOnCloudinary(req.files.image3[0].path)

    if (!image1 || !image2 || !image3) {
      return res.status(500).json({ message: "Image upload failed" })
    }

    const newListing = new Listing({
      title, description, rent, city, landmark, category,
      image1: image1.secure_url,
      image2: image2.secure_url,
      image3: image3.secure_url,
      host,
    })

    await newListing.save()

    const user = await User.findByIdAndUpdate(
      host,
      { $push: { listing: newListing._id } },
      { new: true }
    )

    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    res.status(201).json({
      message: "Listing added successfully",
      data: newListing,
    })

  } catch (error) {
    console.error("addListing error:", error.message)
    res.status(500).json({ message: "addListing error", error: error.message })
  }
}

export const getListing = async (req, res) => {
  try {
    const listings = await Listing.find().sort({ createdAt: -1 })
    res.status(200).json(listings)
  } catch (error) {
    res.status(500).json({ message: `getListing error ${error}` })
  }
}

export const findListingById = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id)
    if (!listing) {
      return res.status(404).json({ message: "Listing not found" })
    }
    res.status(200).json(listing)
  } catch (error) {
    res.status(500).json({ message: "findListingById error", error: error.message })
  }
}

export const deleteListing = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id)

    if (!listing) {
      return res.status(404).json({ message: "Listing not found" })
    }

    if (listing.host.toString() !== req.userId) {
      return res.status(403).json({ message: "Not authorized" })
    }

    await Listing.findByIdAndDelete(req.params.id)

    await User.findByIdAndUpdate(req.userId, {
      $pull: { listing: req.params.id }
    })

    res.status(200).json({ message: "Listing deleted successfully" })

  } catch (error) {
    res.status(500).json({ message: "deleteListing error", error: error.message })
  }
}

export const updateListing = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id)

    if (!listing) {
      return res.status(404).json({ message: "Listing not found" })
    }

    if (listing.host.toString() !== req.userId) {
      return res.status(403).json({ message: "Not authorized" })
    }

    const { title, description, rent, city, landmark, category } = req.body

    const updated = await Listing.findByIdAndUpdate(
      req.params.id,
      { title, description, rent, city, landmark, category },
      { new: true }
    )

    res.status(200).json({ message: "Listing updated successfully", data: updated })

  } catch (error) {
    res.status(500).json({ message: "updateListing error", error: error.message })
  }
}

export const addRating = async (req, res) => {
  try {
    const { rating } = req.body
    const listing = await Listing.findById(req.params.id)

    if (!listing) {
      return res.status(404).json({ message: "Listing not found" })
    }

    if (listing.host.toString() === req.userId) {
      return res.status(400).json({ message: "You cannot rate your own listing" })
    }

    const existingRating = listing.ratings.find(
      r => r.user.toString() === req.userId
    )

    if (existingRating) {
      existingRating.rating = rating
    } else {
      listing.ratings.push({ user: req.userId, rating })
    }

    const total = listing.ratings.reduce((sum, r) => sum + r.rating, 0)
    listing.averageRating = parseFloat((total / listing.ratings.length).toFixed(1))

    await listing.save()

    res.status(200).json({
      message: "Rating added successfully",
      averageRating: listing.averageRating
    })

  } catch (error) {
    res.status(500).json({ message: "addRating error", error: error.message })
  }
}
