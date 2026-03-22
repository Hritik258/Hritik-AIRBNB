import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { listingDataContext } from '../Context/listingContext'
import { userDataContext } from '../Context/UserContext'
import { bookingDataContext } from '../Context/BookingContext'
import { FaArrowLeft, FaStar, FaMapMarkerAlt, FaHome } from 'react-icons/fa'
import { MdPool, MdWifi, MdLocalParking, MdKitchen, MdAir } from 'react-icons/md'

const ListingDetail = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const { handleViewCard, currentListing } = useContext(listingDataContext)
  const { userData } = useContext(userDataContext)
  const { createBooking, bookingLoading } = useContext(bookingDataContext)

  const [loading, setLoading] = useState(true)
  const [booked, setBooked] = useState(false)

  const today = new Date().toISOString().split('T')[0]
  const [checkIn, setCheckIn] = useState("")
  const [checkOut, setCheckOut] = useState("")

  const calculateDays = () => {
    if (!checkIn || !checkOut) return 0
    const diff = Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24))
    return diff > 0 ? diff : 0
  }

  const days = calculateDays()
  const totalRent = currentListing ? currentListing.rent * days : 0

  useEffect(() => {
    const fetchListing = async () => {
      await handleViewCard(id)
      setLoading(false)
    }
    fetchListing()
  }, [id])

  const handleReserve = async () => {
    if (!checkIn || !checkOut) {
      alert("Please select check-in and check-out dates")
      return
    }
    if (new Date(checkOut) <= new Date(checkIn)) {
      alert("Check-out must be after check-in")
      return
    }
    try {
      await createBooking(currentListing._id, checkIn, checkOut, totalRent)
      setBooked(true)
    } catch (error) {
      alert(error.response?.data?.message || "Booking failed. Please try again.")
    }
  }

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh', display: 'flex',
        alignItems: 'center', justifyContent: 'center',
        fontFamily: "'DM Sans', sans-serif"
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '48px', height: '48px',
            border: '4px solid #f0f0f0',
            borderTop: '4px solid #FF385C',
            borderRadius: '50%',
            animation: 'spin 0.8s linear infinite',
            margin: '0 auto 16px'
          }} />
          <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
          <p style={{ color: '#9ca3af', fontSize: '14px' }}>Loading listing...</p>
        </div>
      </div>
    )
  }

  if (!currentListing) {
    return (
      <div style={{
        minHeight: '100vh', display: 'flex',
        alignItems: 'center', justifyContent: 'center',
        fontFamily: "'DM Sans', sans-serif"
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>😕</div>
          <p style={{ fontSize: '18px', fontWeight: '700', color: '#1a1a2e' }}>Listing not found</p>
          <button onClick={() => navigate('/')} style={{
            marginTop: '16px',
            background: 'linear-gradient(135deg, #FF385C, #ff6b35)',
            color: 'white', border: 'none', borderRadius: '50px',
            padding: '12px 24px', fontSize: '14px', fontWeight: '600',
            cursor: 'pointer'
          }}>
            Back to Home
          </button>
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: '#fafafa', fontFamily: "'DM Sans', sans-serif" }}>

      {/* Header */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 100,
        background: 'rgba(255,255,255,0.95)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid #f0f0f0',
        padding: '0 32px', height: '68px',
        display: 'flex', alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0 2px 20px rgba(0,0,0,0.04)'
      }}>
        <button
          onClick={() => navigate('/')}
          style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            background: 'none', border: 'none', cursor: 'pointer',
            padding: '8px 12px', borderRadius: '50px', transition: 'all 0.2s'
          }}
          onMouseEnter={e => e.currentTarget.style.background = '#fff0f0'}
          onMouseLeave={e => e.currentTarget.style.background = 'none'}
        >
          <FaArrowLeft size={14} color="#FF385C" />
          <span style={{ color: '#FF385C', fontSize: '14px', fontWeight: '600' }}>Back</span>
        </button>
        <h1 style={{ fontSize: '18px', fontWeight: '700', color: '#1a1a2e' }}>Listing Details</h1>
        <div style={{
          background: '#fff0f0', color: '#FF385C',
          padding: '6px 14px', borderRadius: '50px',
          fontSize: '13px', fontWeight: '600', border: '1px solid #ffcdd2'
        }}>
          {currentListing.category}
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: '1100px', margin: '40px auto', padding: '0 24px 80px' }}>

        {/* Image Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gridTemplateRows: '280px 280px',
          gap: '8px', borderRadius: '24px',
          overflow: 'hidden', marginBottom: '40px'
        }}>
          <div style={{ gridRow: '1 / 3', overflow: 'hidden' }}>
            <img src={currentListing.image1} alt="main"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.4s ease' }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.03)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            />
          </div>
          <div style={{ overflow: 'hidden' }}>
            <img src={currentListing.image2} alt="img2"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.4s ease' }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.03)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            />
          </div>
          <div style={{ overflow: 'hidden' }}>
            <img src={currentListing.image3} alt="img3"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.4s ease' }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.03)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            />
          </div>
        </div>

        {/* Main Content Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '40px', alignItems: 'start' }}>

          {/* Left */}
          <div>
            <div style={{
              background: '#fff', borderRadius: '20px', padding: '28px',
              marginBottom: '20px', boxShadow: '0 2px 16px rgba(0,0,0,0.05)',
              border: '1px solid #f0f0f0'
            }}>
              <h2 style={{ fontSize: '26px', fontWeight: '800', color: '#1a1a2e', marginBottom: '12px' }}>
                {currentListing.title}
              </h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '16px' }}>
                <FaMapMarkerAlt size={14} color="#FF385C" />
                <span style={{ fontSize: '14px', color: '#6b7280', fontWeight: '500' }}>
                  {currentListing.landmark}, {currentListing.city}
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                {[1,2,3,4,5].map(i => <FaStar key={i} size={14} color="#FFB800" />)}
                <span style={{ fontSize: '13px', color: '#6b7280', marginLeft: '4px' }}>4.8 · New listing</span>
              </div>
            </div>

            <div style={{
              background: '#fff', borderRadius: '20px', padding: '28px',
              marginBottom: '20px', boxShadow: '0 2px 16px rgba(0,0,0,0.05)',
              border: '1px solid #f0f0f0'
            }}>
              <h3 style={{ fontSize: '17px', fontWeight: '700', color: '#1a1a2e', marginBottom: '12px' }}>
                About this place
              </h3>
              <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: '1.8' }}>
                {currentListing.description}
              </p>
            </div>

            <div style={{
              background: '#fff', borderRadius: '20px', padding: '28px',
              boxShadow: '0 2px 16px rgba(0,0,0,0.05)', border: '1px solid #f0f0f0'
            }}>
              <h3 style={{ fontSize: '17px', fontWeight: '700', color: '#1a1a2e', marginBottom: '20px' }}>
                What this place offers
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                {[
                  { icon: <MdWifi size={20} />, label: 'Free WiFi' },
                  { icon: <MdPool size={20} />, label: 'Swimming Pool' },
                  { icon: <MdLocalParking size={20} />, label: 'Free Parking' },
                  { icon: <MdKitchen size={20} />, label: 'Kitchen' },
                  { icon: <MdAir size={20} />, label: 'Air Conditioning' },
                  { icon: <FaHome size={20} />, label: 'Entire Place' },
                ].map((item, i) => (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'center', gap: '12px',
                    padding: '12px 16px', background: '#fafafa',
                    borderRadius: '12px', border: '1px solid #f0f0f0'
                  }}>
                    <span style={{ color: '#FF385C' }}>{item.icon}</span>
                    <span style={{ fontSize: '13px', fontWeight: '500', color: '#374151' }}>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right - Booking Card */}
          <div style={{ position: 'sticky', top: '88px' }}>
            <div style={{
              background: '#fff', borderRadius: '24px', padding: '28px',
              boxShadow: '0 8px 40px rgba(0,0,0,0.10)', border: '1px solid #f0f0f0'
            }}>

              <div style={{ marginBottom: '20px' }}>
                <span style={{ fontSize: '30px', fontWeight: '800', color: '#1a1a2e' }}>
                  ₹{currentListing.rent}
                </span>
                <span style={{ fontSize: '14px', color: '#9ca3af' }}> /day</span>
              </div>

              {currentListing.isBooked && (
                <div style={{
                  background: '#fff5f5', border: '1.5px solid #ffcdd2',
                  borderRadius: '12px', padding: '12px 16px',
                  marginBottom: '16px', textAlign: 'center'
                }}>
                  <p style={{ fontSize: '13px', fontWeight: '600', color: '#e53e3e' }}>
                    ⚠️ This listing is currently booked
                  </p>
                </div>
              )}

              {/* Check In */}
              <div style={{ marginBottom: '12px' }}>
                <label style={{
                  display: 'block', fontSize: '12px', fontWeight: '700',
                  color: '#374151', marginBottom: '6px', letterSpacing: '0.5px'
                }}>
                  CHECK-IN
                </label>
                <input
                  type="date" value={checkIn} min={today}
                  onChange={e => { setCheckIn(e.target.value); setCheckOut("") }}
                  style={{
                    width: '100%', padding: '12px 14px',
                    border: '1.5px solid #e8e8e8', borderRadius: '12px',
                    fontSize: '14px', color: '#1a1a2e', outline: 'none',
                    fontFamily: 'inherit', boxSizing: 'border-box',
                    cursor: 'pointer', background: '#fafafa'
                  }}
                  onFocus={e => e.target.style.borderColor = '#FF385C'}
                  onBlur={e => e.target.style.borderColor = '#e8e8e8'}
                />
              </div>

              {/* Check Out */}
              <div style={{ marginBottom: '16px' }}>
                <label style={{
                  display: 'block', fontSize: '12px', fontWeight: '700',
                  color: '#374151', marginBottom: '6px', letterSpacing: '0.5px'
                }}>
                  CHECK-OUT
                </label>
                <input
                  type="date" value={checkOut} min={checkIn || today}
                  onChange={e => setCheckOut(e.target.value)}
                  style={{
                    width: '100%', padding: '12px 14px',
                    border: '1.5px solid #e8e8e8', borderRadius: '12px',
                    fontSize: '14px', color: '#1a1a2e', outline: 'none',
                    fontFamily: 'inherit', boxSizing: 'border-box',
                    cursor: 'pointer', background: '#fafafa'
                  }}
                  onFocus={e => e.target.style.borderColor = '#FF385C'}
                  onBlur={e => e.target.style.borderColor = '#e8e8e8'}
                />
              </div>

              {/* Warning */}
              {(!checkIn || !checkOut) && !currentListing.isBooked && (
                <div style={{
                  background: '#fffbeb', border: '1.5px solid #fcd34d',
                  borderRadius: '12px', padding: '10px 14px',
                  marginBottom: '16px', textAlign: 'center'
                }}>
                  <p style={{ fontSize: '12px', fontWeight: '600', color: '#d97706' }}>
                    📅 Select check-in and check-out dates
                  </p>
                </div>
              )}

              {/* Price Breakdown */}
              {checkIn && checkOut && days > 0 && (
                <div style={{
                  background: '#fafafa', borderRadius: '12px',
                  padding: '16px', marginBottom: '16px'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ fontSize: '13px', color: '#6b7280' }}>
                      ₹{currentListing.rent} × {days} day{days > 1 ? 's' : ''}
                    </span>
                    <span style={{ fontSize: '13px', color: '#1a1a2e', fontWeight: '600' }}>₹{totalRent}</span>
                  </div>
                  <div style={{
                    display: 'flex', justifyContent: 'space-between',
                    paddingTop: '10px', borderTop: '1px solid #e8e8e8'
                  }}>
                    <span style={{ fontSize: '14px', fontWeight: '700', color: '#1a1a2e' }}>Total</span>
                    <span style={{ fontSize: '14px', fontWeight: '800', color: '#FF385C' }}>₹{totalRent}</span>
                  </div>
                </div>
              )}

              {/* Book Button */}
              {userData ? (
                booked ? (
                  <div style={{
                    background: '#f0fff4', border: '1.5px solid #86efac',
                    borderRadius: '14px', padding: '16px', textAlign: 'center'
                  }}>
                    <p style={{ fontSize: '16px', fontWeight: '700', color: '#16a34a' }}>
                      ✅ Booking Confirmed!
                    </p>
                    <p style={{ fontSize: '13px', color: '#6b7280', marginTop: '6px' }}>
                      {checkIn} → {checkOut} · {days} day{days > 1 ? 's' : ''}
                    </p>
                    <button
                      onClick={() => navigate('/check-booking')}
                      style={{
                        marginTop: '12px', background: 'none',
                        border: '1.5px solid #16a34a', color: '#16a34a',
                        borderRadius: '50px', padding: '8px 20px',
                        fontSize: '13px', fontWeight: '600', cursor: 'pointer'
                      }}
                    >
                      View My Bookings
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={handleReserve}
                    disabled={bookingLoading || currentListing.isBooked || !checkIn || !checkOut}
                    style={{
                      width: '100%',
                      background: bookingLoading || currentListing.isBooked || !checkIn || !checkOut
                        ? '#e8e8e8'
                        : 'linear-gradient(135deg, #FF385C, #ff6b35)',
                      color: bookingLoading || currentListing.isBooked || !checkIn || !checkOut
                        ? '#9ca3af' : 'white',
                      border: 'none', borderRadius: '14px',
                      padding: '16px', fontSize: '15px', fontWeight: '700',
                      cursor: bookingLoading || currentListing.isBooked || !checkIn || !checkOut
                        ? 'not-allowed' : 'pointer',
                      boxShadow: bookingLoading || currentListing.isBooked || !checkIn || !checkOut
                        ? 'none' : '0 8px 24px rgba(255,56,92,0.35)',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={e => {
                      if (!bookingLoading && !currentListing.isBooked && checkIn && checkOut)
                        e.currentTarget.style.transform = 'translateY(-2px)'
                    }}
                    onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                  >
                    {bookingLoading
                      ? '⏳ Reserving...'
                      : currentListing.isBooked
                        ? 'Not Available'
                        : !checkIn || !checkOut
                          ? 'Select Dates First'
                          : 'Reserve Now 🏠'
                    }
                  </button>
                )
              ) : (
                <button
                  onClick={() => navigate('/login')}
                  style={{
                    width: '100%',
                    background: 'linear-gradient(135deg, #FF385C, #ff6b35)',
                    color: 'white', border: 'none', borderRadius: '14px',
                    padding: '16px', fontSize: '15px', fontWeight: '700',
                    cursor: 'pointer',
                    boxShadow: '0 8px 24px rgba(255,56,92,0.35)',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  Login to Reserve 🔑
                </button>
              )}

              <p style={{
                textAlign: 'center', fontSize: '12px',
                color: '#9ca3af', marginTop: '12px'
              }}>
                You won't be charged yet
              </p>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ListingDetail