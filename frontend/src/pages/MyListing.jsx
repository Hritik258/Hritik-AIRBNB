import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { userDataContext } from '../Context/UserContext'
import { listingDataContext } from '../Context/ListingContext'
import { bookingDataContext } from '../Context/BookingContext'
import { FaArrowLeft } from 'react-icons/fa'

const MyListing = () => {
  const navigate = useNavigate()
  const { userData } = useContext(userDataContext)
  const { listingData, deleteListing } = useContext(listingDataContext)
  const { hostBookings, approveBooking, rejectBooking } = useContext(bookingDataContext)

  const myListings = listingData?.filter((listing) => {
    const hostId = listing.host?._id || listing.host
    const userId = userData?._id || userData?.id
    return hostId?.toString() === userId?.toString()
  }) || []

  const getStatusLabel = (status) => {
    if (status === 'confirmed') return 'Approved'
    if (status === 'cancelled') return 'Cancelled'
    return 'Pending'
  }

  const pendingRequests = hostBookings?.filter((booking) => booking.status === 'pending') || []

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

        <h1 style={{ fontSize: '20px', fontWeight: '700', color: '#1a1a2e' }}>My Listings</h1>

        <div style={{
          background: '#fff0f0', color: '#FF385C',
          padding: '6px 14px', borderRadius: '50px',
          fontSize: '13px', fontWeight: '600',
          border: '1px solid #ffcdd2'
        }}>
          {myListings.length} listing{myListings.length !== 1 ? 's' : ''}
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '40px auto', padding: '0 32px 60px' }}>
        <div style={{
          background: '#fff',
          borderRadius: '20px',
          padding: '24px',
          boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
          border: '1px solid #f0f0f0',
          marginBottom: '28px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px', flexWrap: 'wrap', marginBottom: '18px' }}>
            <div>
              <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#1a1a2e', marginBottom: '6px' }}>
                Booking Requests
              </h2>
              <p style={{ fontSize: '13px', color: '#6b7280' }}>
                Approve or reject guests who booked your place.
              </p>
            </div>
            <div style={{
              background: '#fff0f0', color: '#FF385C',
              padding: '6px 14px', borderRadius: '50px',
              fontSize: '13px', fontWeight: '600',
              border: '1px solid #ffcdd2'
            }}>
              {pendingRequests.length} pending
            </div>
          </div>

          {hostBookings?.length ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {hostBookings.map((booking) => (
                <div
                  key={booking._id}
                  style={{
                    border: '1px solid #f0f0f0',
                    borderRadius: '16px',
                    padding: '16px',
                    background: booking.status === 'pending' ? '#fffaf5' : '#fafafa',
                    display: 'grid',
                    gridTemplateColumns: '1fr auto',
                    gap: '16px',
                    alignItems: 'center'
                  }}
                >
                  <div>
                    <h3 style={{ fontSize: '15px', fontWeight: '700', color: '#1a1a2e', marginBottom: '6px' }}>
                      {booking.listing?.title}
                    </h3>
                    <p style={{ fontSize: '13px', color: '#374151', marginBottom: '6px' }}>
                      Guest: {booking.guest?.name || 'Unknown'}{booking.guest?.email ? ` · ${booking.guest.email}` : ''}
                    </p>
                    <p style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>
                      {new Date(booking.checkIn).toLocaleDateString('en-IN')} to {new Date(booking.checkOut).toLocaleDateString('en-IN')}
                    </p>
                    <p style={{ fontSize: '12px', color: '#6b7280' }}>
                      Total: ₹{booking.totalRent} · Status: {getStatusLabel(booking.status)}
                    </p>
                  </div>

                  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                    {booking.status === 'pending' ? (
                      <>
                        <button
                          onClick={async () => {
                            try {
                              await approveBooking(booking._id)
                            } catch (error) {
                              alert(error.response?.data?.message || 'Approval failed')
                            }
                          }}
                          style={{
                            background: 'linear-gradient(135deg, #16a34a, #22c55e)',
                            color: 'white', border: 'none', borderRadius: '50px',
                            padding: '10px 16px', fontSize: '12px', fontWeight: '600',
                            cursor: 'pointer'
                          }}
                        >
                          Approve
                        </button>
                        <button
                          onClick={async () => {
                            try {
                              await rejectBooking(booking._id)
                            } catch (error) {
                              alert(error.response?.data?.message || 'Rejection failed')
                            }
                          }}
                          style={{
                            background: 'none',
                            color: '#e53e3e', border: '1.5px solid #ffcdd2',
                            borderRadius: '50px',
                            padding: '10px 16px', fontSize: '12px', fontWeight: '600',
                            cursor: 'pointer'
                          }}
                        >
                          Reject
                        </button>
                      </>
                    ) : (
                      <span style={{
                        background: booking.status === 'confirmed' ? '#f0fff4' : '#fff5f5',
                        color: booking.status === 'confirmed' ? '#16a34a' : '#e53e3e',
                        border: `1px solid ${booking.status === 'confirmed' ? '#86efac' : '#ffcdd2'}`,
                        padding: '8px 14px',
                        borderRadius: '50px',
                        fontSize: '12px',
                        fontWeight: '700'
                      }}>
                        {getStatusLabel(booking.status)}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ fontSize: '14px', color: '#6b7280' }}>No booking requests yet.</p>
          )}
        </div>

        {myListings.length ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '28px'
          }}>
            {myListings.map((listing) => (
              <div
                key={listing._id}
                style={{
                  background: '#fff',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
                  border: '1px solid #f0f0f0'
                }}
              >
                <div style={{ position: 'relative', height: '220px', overflow: 'hidden' }}>
                  <img
                    src={listing.image1}
                    alt={listing.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />

                  <div style={{
                    position: 'absolute', top: '12px', left: '12px',
                    background: 'rgba(255,255,255,0.95)',
                    padding: '5px 12px', borderRadius: '50px',
                    fontSize: '11px', fontWeight: '700', color: '#FF385C'
                  }}>
                    {listing.category}
                  </div>

                  <div style={{
                    position: 'absolute', bottom: '12px', right: '12px',
                    background: 'rgba(255,255,255,0.95)',
                    padding: '5px 12px', borderRadius: '50px',
                    fontSize: '13px', fontWeight: '700', color: '#1a1a2e'
                  }}>
                    ₹{listing.rent}<span style={{ fontSize: '11px', fontWeight: '400', color: '#6b7280' }}>/day</span>
                  </div>

                </div>

                <div style={{ padding: '16px 18px 20px' }}>
                  <p style={{
                    fontSize: '12px', color: '#9ca3af', fontWeight: '500',
                    whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                    marginBottom: '6px'
                  }}>
                    {listing.landmark}, {listing.city}
                  </p>

                  <h3 style={{
                    fontSize: '15px', fontWeight: '700', color: '#1a1a2e',
                    marginBottom: '16px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'
                  }}>
                    {listing.title}
                  </h3>

                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button
                      onClick={() => navigate(`/edit-listing/${listing._id}`)}
                      style={{
                        flex: 1,
                        background: 'linear-gradient(135deg, #FF385C, #ff6b35)',
                        color: 'white', border: 'none', borderRadius: '50px',
                        padding: '10px', fontSize: '12px', fontWeight: '600',
                        cursor: 'pointer'
                      }}
                    >
                      Edit
                    </button>

                    <button
                      onClick={async () => {
                        if (window.confirm('Are you sure you want to delete this listing?')) {
                          await deleteListing(listing._id)
                        }
                      }}
                      style={{
                        flex: 1,
                        background: 'none',
                        color: '#e53e3e', border: '1.5px solid #ffcdd2',
                        borderRadius: '50px',
                        padding: '10px', fontSize: '12px', fontWeight: '600',
                        cursor: 'pointer'
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '100px 0', color: '#9ca3af' }}>
            <p style={{ fontSize: '20px', fontWeight: '700', color: '#1a1a2e', marginBottom: '8px' }}>
              No listings yet
            </p>
            <p style={{ fontSize: '14px', marginBottom: '24px' }}>
              Start by adding your first property
            </p>
            <button
              onClick={() => navigate('/listingpage1')}
              style={{
                background: 'linear-gradient(135deg, #FF385C, #ff6b35)',
                color: 'white', border: 'none', borderRadius: '50px',
                padding: '14px 32px', fontSize: '14px', fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              Add Your First Listing
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default MyListing
