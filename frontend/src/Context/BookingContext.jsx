import React, { createContext, useState, useContext, useEffect } from 'react'
import axios from 'axios'
import { AuthDataContext } from './AuthContext'
import { userDataContext } from './UserContext'
import { listingDataContext } from './ListingContext'

export const bookingDataContext = createContext()

const BookingContext = ({ children }) => {
  const { serverUrl } = useContext(AuthDataContext)
  const { userData } = useContext(userDataContext)
  const { getListing, handleViewCard, currentListing } = useContext(listingDataContext)

  const [myBookings, setMyBookings] = useState([])
  const [hostBookings, setHostBookings] = useState([])
  const [bookingLoading, setBookingLoading] = useState(false)

  const getMyBookings = async () => {
    try {
      const result = await axios.get(
        `${serverUrl}/api/booking/mybookings`,
        { withCredentials: true }
      )
      setMyBookings(result.data)
      return result.data
    } catch (error) {
      console.error("getMyBookings error:", error.message)
      setMyBookings([])
      return []
    }
  }

  const getHostBookings = async () => {
    try {
      const result = await axios.get(
        `${serverUrl}/api/booking/hostbookings`,
        { withCredentials: true }
      )
      setHostBookings(result.data)
      return result.data
    } catch (error) {
      console.error("getHostBookings error:", error.message)
      setHostBookings([])
      return []
    }
  }

  const refreshBookingData = async (listingId) => {
    await Promise.all([
      getMyBookings(),
      getHostBookings(),
      getListing(),
    ])

    if (listingId && currentListing?._id === listingId) {
      await handleViewCard(listingId)
    }
  }

  useEffect(() => {
    if (!userData?._id) {
      setMyBookings([])
      setHostBookings([])
      return
    }

    refreshBookingData()
  }, [userData?._id])

  const createBooking = async (listingId, checkIn, checkOut, totalRent) => {
    setBookingLoading(true)
    try {
      const result = await axios.post(
        `${serverUrl}/api/booking/create/${listingId}`,
        { checkIn, checkOut, totalRent },
        { withCredentials: true }
      )
      await refreshBookingData(listingId)
      return result.data
    } catch (error) {
      console.error("createBooking error:", error.response?.data || error.message)
      throw error
    } finally {
      setBookingLoading(false)
    }
  }

  const cancelBooking = async (bookingId) => {
    try {
      const booking = myBookings.find((item) => item._id === bookingId)
        || hostBookings.find((item) => item._id === bookingId)

      const result = await axios.delete(
        `${serverUrl}/api/booking/cancel/${bookingId}`,
        { withCredentials: true }
      )

      await refreshBookingData(booking?.listing?._id)
      return result.data
    } catch (error) {
      console.error("cancelBooking error:", error.response?.data || error.message)
      throw error
    }
  }

  const approveBooking = async (bookingId) => {
    try {
      const booking = hostBookings.find((item) => item._id === bookingId)

      const result = await axios.patch(
        `${serverUrl}/api/booking/approve/${bookingId}`,
        {},
        { withCredentials: true }
      )

      await refreshBookingData(booking?.listing?._id)
      return result.data
    } catch (error) {
      console.error("approveBooking error:", error.response?.data || error.message)
      throw error
    }
  }

  const rejectBooking = async (bookingId) => {
    try {
      const booking = hostBookings.find((item) => item._id === bookingId)

      const result = await axios.patch(
        `${serverUrl}/api/booking/reject/${bookingId}`,
        {},
        { withCredentials: true }
      )

      await refreshBookingData(booking?.listing?._id)
      return result.data
    } catch (error) {
      console.error("rejectBooking error:", error.response?.data || error.message)
      throw error
    }
  }

  const value = {
    myBookings,
    hostBookings,
    bookingLoading,
    getMyBookings,
    getHostBookings,
    createBooking,
    cancelBooking,
    approveBooking,
    rejectBooking,
  }

  return (
    <bookingDataContext.Provider value={value}>
      {children}
    </bookingDataContext.Provider>
  )
}

export default BookingContext
