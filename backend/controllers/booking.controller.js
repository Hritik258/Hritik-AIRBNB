import Booking from "../model/booking.model.js"
import Listing from "../model/listing.model.js"
import User from "../model/user.model.js"

const hasDateConflict = async ({ listingId, checkIn, checkOut, excludeBookingId = null, statuses = ["confirmed"] }) => {
  const query = {
    listing: listingId,
    status: { $in: statuses },
    checkIn: { $lt: new Date(checkOut) },
    checkOut: { $gt: new Date(checkIn) }
  }

  if (excludeBookingId) {
    query._id = { $ne: excludeBookingId }
  }

  return Booking.findOne(query)
}

export const createBooking = async (req, res) => {
  try {
    const { id } = req.params
    const { checkIn, checkOut, totalRent } = req.body

    if (!checkIn || !checkOut || !totalRent) {
      return res.status(400).json({ message: "checkIn, checkOut and totalRent are required" })
    }

    const listing = await Listing.findById(id)
    if (!listing) {
      return res.status(404).json({ message: "Listing not found" })
    }

    if (listing.host.toString() === req.userId) {
      return res.status(400).json({ message: "You cannot book your own listing" })
    }

    if (new Date(checkIn) >= new Date(checkOut)) {
      return res.status(400).json({ message: "Invalid checkIn/checkOut date" })
    }

    const existingBooking = await Booking.findOne({
      listing: listing._id,
      guest: req.userId,
      status: { $in: ["pending", "confirmed"] },
      checkIn: { $lt: new Date(checkOut) },
      checkOut: { $gt: new Date(checkIn) }
    })

    if (existingBooking) {
      return res.status(400).json({ message: "You already have an active booking for these dates" })
    }

    const conflictingConfirmedBooking = await hasDateConflict({
      listingId: listing._id,
      checkIn,
      checkOut,
      statuses: ["confirmed"]
    })

    if (conflictingConfirmedBooking) {
      return res.status(400).json({ message: "This place is already booked for the selected dates" })
    }

    const booking = await Booking.create({
      checkIn,
      checkOut,
      totalRent,
      host: listing.host,
      guest: req.userId,
      listing: listing._id
    })

    const user = await User.findByIdAndUpdate(
      req.userId,
      { $push: { booking: booking._id } },
      { new: true }
    )

    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    return res.status(201).json({
      message: "Booking request sent successfully",
      data: booking
    })

  } catch (error) {
    console.error("createBooking error:", error.message)
    return res.status(500).json({ message: "createBooking error", error: error.message })
  }
}

export const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ guest: req.userId })
      .populate("listing")
      .populate("host", "name email")
      .sort({ createdAt: -1 })

    res.status(200).json(bookings)
  } catch (error) {
    console.error("getMyBookings error:", error.message)
    res.status(500).json({ message: "getMyBookings error", error: error.message })
  }
}

export const getHostBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ host: req.userId })
      .populate("listing")
      .populate("guest", "name email")
      .sort({ createdAt: -1 })

    res.status(200).json(bookings)
  } catch (error) {
    console.error("getHostBookings error:", error.message)
    res.status(500).json({ message: "getHostBookings error", error: error.message })
  }
}

export const approveBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate("listing")

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" })
    }

    if (booking.host.toString() !== req.userId) {
      return res.status(403).json({ message: "Not authorized" })
    }

    if (booking.status !== "pending") {
      return res.status(400).json({ message: "Only pending bookings can be approved" })
    }

    const listing = await Listing.findById(booking.listing._id)
    if (!listing) {
      return res.status(404).json({ message: "Listing not found" })
    }

    const conflictingConfirmedBooking = await hasDateConflict({
      listingId: booking.listing._id,
      checkIn: booking.checkIn,
      checkOut: booking.checkOut,
      excludeBookingId: booking._id,
      statuses: ["confirmed"]
    })

    if (conflictingConfirmedBooking) {
      return res.status(400).json({ message: "This place is already booked for these dates" })
    }

    booking.status = "confirmed"
    await booking.save()

    await Booking.updateMany(
      {
        _id: { $ne: booking._id },
        listing: listing._id,
        status: "pending",
        checkIn: { $lt: booking.checkOut },
        checkOut: { $gt: booking.checkIn }
      },
      { $set: { status: "cancelled" } }
    )

    res.status(200).json({ message: "Booking approved successfully" })
  } catch (error) {
    console.error("approveBooking error:", error.message)
    res.status(500).json({ message: "approveBooking error", error: error.message })
  }
}

export const rejectBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" })
    }

    if (booking.host.toString() !== req.userId) {
      return res.status(403).json({ message: "Not authorized" })
    }

    if (booking.status !== "pending") {
      return res.status(400).json({ message: "Only pending bookings can be rejected" })
    }

    booking.status = "cancelled"
    await booking.save()

    res.status(200).json({ message: "Booking rejected successfully" })
  } catch (error) {
    console.error("rejectBooking error:", error.message)
    res.status(500).json({ message: "rejectBooking error", error: error.message })
  }
}

export const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" })
    }

    if (booking.guest.toString() !== req.userId) {
      return res.status(403).json({ message: "Not authorized" })
    }

    if (booking.status === "cancelled") {
      return res.status(400).json({ message: "Booking is already cancelled" })
    }

    booking.status = "cancelled"
    await booking.save()

    res.status(200).json({ message: "Booking cancelled successfully" })

  } catch (error) {
    console.error("cancelBooking error:", error.message)
    res.status(500).json({ message: "cancelBooking error", error: error.message })
  }
}
