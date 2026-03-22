import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
export const listingDataContext = createContext();

const Card = () => {
  const navigate = useNavigate()
  const { filteredListings, activeCategory } = useContext(listingDataContext)
  const [wishlist, setWishlist] = useState([])

  const toggleWishlist = (e, id) => {
    e.stopPropagation()
    setWishlist(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    )
  }

  return (
    <div style={{
      maxWidth: '1400px',
      margin: '0 auto',
      padding: '32px 40px',
      fontFamily: "'DM Sans', sans-serif"
    }}>

      {/* Section Header */}
      <div style={{ marginBottom: '28px' }}>
        <h2 style={{ fontSize: '22px', fontWeight: '700', color: '#1a1a2e', marginBottom: '4px' }}>
          {activeCategory === 'Trending' ? 'All Stays' : `${activeCategory}`}
        </h2>
        <p style={{ fontSize: '14px', color: '#9ca3af' }}>
          {filteredListings?.length > 0
            ? `${filteredListings.length} listing${filteredListings.length > 1 ? 's' : ''} found`
            : 'No listings match your search'}
        </p>
      </div>

      {filteredListings && filteredListings.length > 0 ? (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '28px',
        }}>
          {filteredListings.map((listing) => (
            <div
              key={listing._id}
              onClick={() => navigate(`/listing/${listing._id}`)}
              style={{
                borderRadius: '20px', overflow: 'hidden',
                cursor: 'pointer', transition: 'all 0.25s ease',
                background: '#fff',
                boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
                border: '1px solid #f0f0f0',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-6px)'
                e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.12)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 2px 16px rgba(0,0,0,0.06)'
              }}
            >
              {/* Image */}
              <div style={{ position: 'relative', overflow: 'hidden', height: '220px' }}>
                <img
                  src={listing.image1}
                  alt={listing.title}
                  style={{
                    width: '100%', height: '100%',
                    objectFit: 'cover', display: 'block',
                    transition: 'transform 0.4s ease',
                  }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                />

                <div style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0,
                  height: '80px',
                  background: 'linear-gradient(to top, rgba(0,0,0,0.4), transparent)'
                }} />

                {/* Category Badge */}
                <div style={{
                  position: 'absolute', top: '12px', left: '12px',
                  background: 'rgba(255,255,255,0.95)',
                  backdropFilter: 'blur(8px)',
                  padding: '5px 12px', borderRadius: '50px',
                  fontSize: '11px', fontWeight: '700', color: '#FF385C',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                }}>
                  {listing.category}
                </div>

                {/* Rent Badge */}
                <div style={{
                  position: 'absolute', bottom: '12px', right: '12px',
                  background: 'rgba(255,255,255,0.95)',
                  backdropFilter: 'blur(8px)',
                  padding: '5px 12px', borderRadius: '50px',
                  fontSize: '13px', fontWeight: '700', color: '#1a1a2e',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                }}>
                  ₹{listing.rent}
                  <span style={{ fontSize: '11px', fontWeight: '400', color: '#6b7280' }}>/day</span>
                </div>

                {/* ✅ Wishlist Heart Button */}
                <button
                  onClick={(e) => toggleWishlist(e, listing._id)}
                  style={{
                    position: 'absolute', top: '12px', right: '12px',
                    width: '34px', height: '34px',
                    background: 'rgba(255,255,255,0.95)',
                    backdropFilter: 'blur(8px)',
                    border: 'none', borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer', fontSize: '16px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.15)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                >
                  {wishlist.includes(listing._id) ? '❤️' : '🤍'}
                </button>
              </div>

              {/* Details */}
              <div style={{ padding: '16px 18px 20px' }}>

                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '6px' }}>
                  <span style={{ fontSize: '13px' }}>📍</span>
                  <p style={{
                    fontSize: '12px', color: '#9ca3af', fontWeight: '500',
                    whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'
                  }}>
                    {listing.landmark}, {listing.city}
                  </p>
                </div>

                <h3 style={{
                  fontSize: '15px', fontWeight: '700', color: '#1a1a2e',
                  marginBottom: '8px',
                  whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                }}>
                  {listing.title}
                </h3>

                {/* ✅ Show average rating */}
                {listing.averageRating > 0 && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '10px' }}>
                    {[1,2,3,4,5].map(star => (
                      <span key={star} style={{
                        fontSize: '13px',
                        color: star <= Math.round(listing.averageRating) ? '#FFB800' : '#e8e8e8'
                      }}>★</span>
                    ))}
                    <span style={{ fontSize: '12px', color: '#6b7280', fontWeight: '600' }}>
                      {listing.averageRating} ({listing.ratings?.length})
                    </span>
                  </div>
                )}

                <div style={{ height: '1px', background: '#f5f5f5', marginBottom: '12px' }} />

                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    navigate(`/listing/${listing._id}`)
                  }}
                  style={{
                    width: '100%',
                    background: 'linear-gradient(135deg, #FF385C, #ff6b35)',
                    color: 'white', border: 'none', borderRadius: '50px',
                    padding: '10px', fontSize: '13px', fontWeight: '600',
                    cursor: 'pointer', boxShadow: '0 4px 12px rgba(255,56,92,0.3)',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '100px 0', color: '#9ca3af' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>🏠</div>
          <p style={{ fontSize: '20px', fontWeight: '700', color: '#1a1a2e', marginBottom: '8px' }}>
            No {activeCategory} listings yet
          </p>
          <p style={{ fontSize: '14px' }}>Try another search or category.</p>
        </div>
      )}
    </div>
  )
}

export default Card
