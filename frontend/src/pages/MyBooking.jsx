import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { bookingDataContext } from '../Context/BookingContext'
import { FaArrowLeft, FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa'

const MyBooking = () => {
  const navigate = useNavigate()
  const { myBookings, cancelBooking } = useContext(bookingDataContext)

  const formatDate = (date) =>
    new Date(date).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })

  const getStatusColor = (status) => {
    if (status === 'confirmed') return { bg: '#f0fff4', color: '#16a34a', border: '#86efac' }
    if (status === 'cancelled') return { bg: '#fff5f5', color: '#e53e3e', border: '#ffcdd2' }
    return { bg: '#fffbeb', color: '#d97706', border: '#fcd34d' }
  }

  const getStatusLabel = (status) => {
    if (status === 'confirmed') return 'Confirmed'
    if (status === 'cancelled') return 'Cancelled'
    return 'Pending Approval'
  }

  return (
    <div style={{ minHeight: '100vh', background: '#fafafa', fontFamily: "'DM Sans', sans-serif" }}>
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
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            width: '38px', height: '38px',
            background: 'linear-gradient(135deg, #FF385C, #ff6b35)',
            border: 'none', borderRadius: '50%',
            cursor: 'pointer', boxShadow: '0 4px 12px rgba(255,56,92,0.35)'
          }}
        >
          <FaArrowLeft size={14} color="white" />
        </button>

        <h1 style={{ fontSize: '20px', fontWeight: '700', color: '#1a1a2e' }}>My Bookings</h1>

        <div style={{
          background: '#fff0f0', color: '#FF385C',
          padding: '6px 14px', borderRadius: '50px',
          fontSize: '13px', fontWeight: '600',
          border: '1px solid #ffcdd2'
        }}>
          {myBookings?.length || 0} booking{myBookings?.length !== 1 ? 's' : ''}
        </div>
      </div>

      <div style={{ maxWidth: '900px', margin: '40px auto', padding: '0 24px 80px' }}>
        {myBookings?.length ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {myBookings.map((booking) => {
              const statusStyle = getStatusColor(booking.status)
              const days = Math.ceil(
                (new Date(booking.checkOut) - new Date(booking.checkIn)) / (1000 * 60 * 60 * 24)
              )

              return (
                <div
                  key={booking._id}
                  style={{
                    background: '#fff',
                    borderRadius: '20px',
                    overflow: 'hidden',
                    boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
                    border: '1px solid #f0f0f0'
                  }}
                >
                  <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr' }}>
                    <div style={{ overflow: 'hidden', height: '200px' }}>
                      <img
                        src={booking.listing?.image1}
                        alt={booking.listing?.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                      />
                    </div>

                    <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px', gap: '12px' }}>
                          <h3 style={{ fontSize: '17px', fontWeight: '700', color: '#1a1a2e' }}>
                            {booking.listing?.title}
                          </h3>
                          <span style={{
                            background: statusStyle.bg,
                            color: statusStyle.color,
                            border: `1px solid ${statusStyle.border}`,
                            padding: '4px 12px',
                            borderRadius: '50px',
                            fontSize: '12px',
                            fontWeight: '700',
                            flexShrink: 0
                          }}>
                            {getStatusLabel(booking.status)}
                          </span>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '10px' }}>
                          <FaMapMarkerAlt size={12} color="#FF385C" />
                          <span style={{ fontSize: '13px', color: '#9ca3af', fontWeight: '500' }}>
                            {booking.listing?.landmark}, {booking.listing?.city}
                          </span>
                        </div>

                        <p style={{ fontSize: '12px', color: '#6b7280', marginBottom: '16px' }}>
                          Host: {booking.host?.name || 'Unknown'}{booking.host?.email ? ` · ${booking.host.email}` : ''}
                        </p>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginBottom: '16px' }}>
                          <div style={{ background: '#fafafa', borderRadius: '12px', padding: '12px', border: '1px solid #f0f0f0' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '4px' }}>
                              <FaCalendarAlt size={11} color="#FF385C" />
                              <span style={{ fontSize: '10px', fontWeight: '700', color: '#9ca3af' }}>CHECK-IN</span>
                            </div>
                            <p style={{ fontSize: '13px', fontWeight: '600', color: '#1a1a2e' }}>{formatDate(booking.checkIn)}</p>
                          </div>

                          <div style={{ background: '#fafafa', borderRadius: '12px', padding: '12px', border: '1px solid #f0f0f0' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '4px' }}>
                              <FaCalendarAlt size={11} color="#FF385C" />
                              <span style={{ fontSize: '10px', fontWeight: '700', color: '#9ca3af' }}>CHECK-OUT</span>
                            </div>
                            <p style={{ fontSize: '13px', fontWeight: '600', color: '#1a1a2e' }}>{formatDate(booking.checkOut)}</p>
                          </div>

                          <div style={{ background: '#fff0f0', borderRadius: '12px', padding: '12px', border: '1px solid #ffcdd2' }}>
                            <span style={{ fontSize: '10px', fontWeight: '700', color: '#FF385C' }}>DURATION</span>
                            <p style={{ fontSize: '13px', fontWeight: '600', color: '#FF385C', marginTop: '4px' }}>
                              {days} day{days > 1 ? 's' : ''}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        paddingTop: '14px', borderTop: '1px solid #f5f5f5'
                      }}>
                        <div>
                          <span style={{ fontSize: '12px', color: '#9ca3af', fontWeight: '500' }}>Total</span>
                          <p style={{ fontSize: '18px', fontWeight: '800', color: '#1a1a2e' }}>₹{booking.totalRent}</p>
                        </div>

                        <div style={{ display: 'flex', gap: '10px' }}>
                          <button
                            onClick={() => navigate(`/listing/${booking.listing?._id}`)}
                            style={{
                              background: 'linear-gradient(135deg, #FF385C, #ff6b35)',
                              color: 'white', border: 'none', borderRadius: '50px',
                              padding: '10px 18px', fontSize: '12px', fontWeight: '600',
                              cursor: 'pointer'
                            }}
                          >
                            View Listing
                          </button>

                          {booking.status !== 'cancelled' && (
                            <button
                              onClick={async () => {
                                if (window.confirm('Are you sure you want to cancel this booking?')) {
                                  await cancelBooking(booking._id)
                                }
                              }}
                              style={{
                                background: 'none',
                                color: '#e53e3e', border: '1.5px solid #ffcdd2',
                                borderRadius: '50px',
                                padding: '10px 18px', fontSize: '12px', fontWeight: '600',
                                cursor: 'pointer'
                              }}
                            >
                              Cancel Booking
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '100px 0', color: '#9ca3af' }}>
            <p style={{ fontSize: '20px', fontWeight: '700', color: '#1a1a2e', marginBottom: '8px' }}>
              No bookings yet
            </p>
            <p style={{ fontSize: '14px', marginBottom: '24px' }}>
              Find a place to stay and make your first booking
            </p>
            <button
              onClick={() => navigate('/')}
              style={{
                background: 'linear-gradient(135deg, #FF385C, #ff6b35)',
                color: 'white', border: 'none', borderRadius: '50px',
                padding: '14px 32px', fontSize: '14px', fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              Explore Listings
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default MyBooking
