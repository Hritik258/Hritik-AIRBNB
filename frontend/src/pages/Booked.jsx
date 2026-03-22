import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { bookingDataContext } from '../Context/BookingContext'
import { FaCalendarAlt, FaMapMarkerAlt, FaCheckCircle } from 'react-icons/fa'

const Booked = () => {
  const navigate = useNavigate()
  const { myBookings } = useContext(bookingDataContext)

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-IN', {
      day: 'numeric', month: 'short', year: 'numeric'
    })
  }

  // Get latest booking
  const latestBooking = myBookings?.[0]

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #fff5f5 0%, #ffffff 50%, #fff0f0 100%)',
      fontFamily: "'DM Sans', sans-serif",
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px'
    }}>
      <div style={{
        maxWidth: '520px',
        width: '100%',
      }}>

        {/* Success Animation */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{
            width: '80px', height: '80px',
            background: 'linear-gradient(135deg, #FF385C, #ff6b35)',
            borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 20px',
            boxShadow: '0 8px 32px rgba(255,56,92,0.35)',
            animation: 'pop 0.4s ease'
          }}>
            <FaCheckCircle size={36} color="white" />
          </div>
          <style>{`
            @keyframes pop {
              0% { transform: scale(0) }
              70% { transform: scale(1.1) }
              100% { transform: scale(1) }
            }
          `}</style>

          <h1 style={{
            fontSize: '28px', fontWeight: '800',
            color: '#1a1a2e', marginBottom: '8px',
            letterSpacing: '-0.5px'
          }}>
            Booking Confirmed! 🎉
          </h1>
          <p style={{ fontSize: '15px', color: '#9ca3af', fontWeight: '400' }}>
            Your stay has been successfully reserved
          </p>
        </div>

        {/* Booking Details Card */}
        {latestBooking && (
          <div style={{
            background: '#fff',
            borderRadius: '24px',
            overflow: 'hidden',
            boxShadow: '0 8px 40px rgba(0,0,0,0.08)',
            border: '1px solid #f0f0f0',
            marginBottom: '24px'
          }}>
            {/* Listing Image */}
            <div style={{ height: '200px', overflow: 'hidden', position: 'relative' }}>
              <img
                src={latestBooking.listing?.image1}
                alt={latestBooking.listing?.title}
                style={{
                  width: '100%', height: '100%',
                  objectFit: 'cover', display: 'block'
                }}
              />
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                height: '80px',
                background: 'linear-gradient(to top, rgba(0,0,0,0.5), transparent)'
              }} />
              {/* Category Badge */}
              <div style={{
                position: 'absolute', top: '12px', left: '12px',
                background: 'rgba(255,255,255,0.95)',
                backdropFilter: 'blur(8px)',
                padding: '5px 12px', borderRadius: '50px',
                fontSize: '11px', fontWeight: '700', color: '#FF385C',
              }}>
                {latestBooking.listing?.category}
              </div>
            </div>

            {/* Details */}
            <div style={{ padding: '24px' }}>

              {/* Title */}
              <h2 style={{
                fontSize: '18px', fontWeight: '700',
                color: '#1a1a2e', marginBottom: '8px'
              }}>
                {latestBooking.listing?.title}
              </h2>

              {/* Location */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: '5px',
                marginBottom: '20px'
              }}>
                <FaMapMarkerAlt size={12} color="#FF385C" />
                <span style={{ fontSize: '13px', color: '#9ca3af', fontWeight: '500' }}>
                  {latestBooking.listing?.landmark}, {latestBooking.listing?.city}
                </span>
              </div>

              {/* Divider */}
              <div style={{ height: '1px', background: '#f5f5f5', marginBottom: '20px' }} />

              {/* Check In / Check Out */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' }}>
                <div style={{
                  background: '#fafafa', borderRadius: '14px',
                  padding: '14px', border: '1px solid #f0f0f0'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '6px' }}>
                    <FaCalendarAlt size={11} color="#FF385C" />
                    <span style={{ fontSize: '10px', fontWeight: '700', color: '#9ca3af', letterSpacing: '0.5px' }}>
                      CHECK-IN
                    </span>
                  </div>
                  <p style={{ fontSize: '14px', fontWeight: '700', color: '#1a1a2e' }}>
                    {formatDate(latestBooking.checkIn)}
                  </p>
                </div>

                <div style={{
                  background: '#fafafa', borderRadius: '14px',
                  padding: '14px', border: '1px solid #f0f0f0'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '6px' }}>
                    <FaCalendarAlt size={11} color="#FF385C" />
                    <span style={{ fontSize: '10px', fontWeight: '700', color: '#9ca3af', letterSpacing: '0.5px' }}>
                      CHECK-OUT
                    </span>
                  </div>
                  <p style={{ fontSize: '14px', fontWeight: '700', color: '#1a1a2e' }}>
                    {formatDate(latestBooking.checkOut)}
                  </p>
                </div>
              </div>

              {/* Total */}
              <div style={{
                background: '#fff0f0', borderRadius: '14px',
                padding: '16px',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                border: '1px solid #ffcdd2'
              }}>
                <span style={{ fontSize: '14px', fontWeight: '600', color: '#374151' }}>
                  Total Paid
                </span>
                <span style={{ fontSize: '20px', fontWeight: '800', color: '#FF385C' }}>
                  ₹{latestBooking.totalRent}
                </span>
              </div>

            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <button
            onClick={() => navigate('/check-booking')}
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
            View My Bookings 📋
          </button>

          <button
            onClick={() => navigate('/')}
            style={{
              width: '100%',
              background: 'none',
              color: '#374151', border: '1.5px solid #e8e8e8',
              borderRadius: '14px', padding: '16px',
              fontSize: '15px', fontWeight: '600',
              cursor: 'pointer', transition: 'all 0.2s'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = '#FF385C'
              e.currentTarget.style.color = '#FF385C'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = '#e8e8e8'
              e.currentTarget.style.color = '#374151'
            }}
          >
            Explore More Listings 🏠
          </button>
        </div>

      </div>
    </div>
  )
}

export default Booked