import express from "express"
import isAuth from "../middleware/isAuth.js"
import {
  createBooking,
  getMyBookings,
  getHostBookings,
  approveBooking,
  rejectBooking,
  cancelBooking
} from "../controllers/booking.controller.js"

const bookingRouter = express.Router()

bookingRouter.post("/create/:id", isAuth, createBooking) // ✅ :id in route
bookingRouter.get("/mybookings", isAuth, getMyBookings)
bookingRouter.get("/hostbookings", isAuth, getHostBookings)
bookingRouter.patch("/approve/:id", isAuth, approveBooking)
bookingRouter.patch("/reject/:id", isAuth, rejectBooking)
bookingRouter.delete("/cancel/:id", isAuth, cancelBooking) // ✅ DELETE not PUT

export default bookingRouter
