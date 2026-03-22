import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { listingDataContext } from '../Context/listingContext'
import { FaArrowLeft } from 'react-icons/fa'

const Listingpage3 = () => {
  const navigate = useNavigate()
  const {
    title,
    description,
    frontEndImage1,
    frontEndImage2,
    frontEndImage3,
    rent,
    city,
    landmark,
    category,
    addListing,
    adding  // ✅ added
  } = useContext(listingDataContext)

  const handleSubmit = async () => {
    try {
      await addListing()
      navigate('/')
    } catch (error) {
      alert("Failed to add listing. Please try again.")
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #fff5f5 0%, #ffffff 50%, #fff0f0 100%)',
      fontFamily: "'DM Sans', sans-serif"
    }}>

      {/* Header */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 100,
        background: 'rgba(255,255,255,0.85)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid #f0f0f0',
        padding: '0 32px',
        height: '68px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0 2px 20px rgba(0,0,0,0.04)'
      }}>
        <button
          onClick={() => navigate('/listingpage2')}
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

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#FF385C' }} />
          <span style={{ fontSize: '13px', color: '#9ca3af', fontWeight: '500' }}>Step 3 of 3</span>
        </div>

        <button style={{
          background: 'linear-gradient(135deg, #FF385C, #ff6b35)',
          color: 'white', border: 'none', borderRadius: '50px',
          padding: '10px 20px', fontSize: '13px', fontWeight: '600',
          cursor: 'pointer', boxShadow: '0 4px 14px rgba(255,56,92,0.35)'
        }}>
          Preview Listing
        </button>
      </div>

      {/* Progress Bar */}
      <div style={{ height: '3px', background: '#f0f0f0' }}>
        <div style={{
          height: '100%', width: '100%',
          background: 'linear-gradient(90deg, #FF385C, #ff6b35)',
        }} />
      </div>

      {/* Content */}
      <div style={{ maxWidth: '780px', margin: '40px auto', padding: '0 20px 80px' }}>

        <h1 style={{
          fontSize: '26px', fontWeight: '700',
          color: '#1a1a2e', marginBottom: '6px'
        }}>
          Preview your listing
        </h1>
        <p style={{ fontSize: '14px', color: '#9ca3af', marginBottom: '32px' }}>
          This is how your listing will appear to guests
        </p>

        {/* Card */}
        <div style={{
          background: '#fff',
          borderRadius: '24px',
          overflow: 'hidden',
          boxShadow: '0 8px 40px rgba(0,0,0,0.08)',
          border: '1px solid #f5f5f5'
        }}>

          {/* Location tag */}
          <div style={{
            padding: '16px 24px',
            borderBottom: '1px solid #f5f5f5',
            fontSize: '14px', fontWeight: '600', color: '#374151'
          }}>
            In {landmark?.toUpperCase()} , {city?.toUpperCase()}
          </div>

          {/* Image Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3px', background: '#f0f0f0' }}>
            <div style={{ gridRow: '1 / 3' }}>
              <img
                src={frontEndImage1}
                alt="main"
                style={{ width: '100%', height: '340px', objectFit: 'cover', display: 'block' }}
              />
            </div>
            <img
              src={frontEndImage2}
              alt="img2"
              style={{ width: '100%', height: '168px', objectFit: 'cover', display: 'block' }}
            />
            <img
              src={frontEndImage3}
              alt="img3"
              style={{ width: '100%', height: '168px', objectFit: 'cover', display: 'block' }}
            />
          </div>

          {/* Details */}
          <div style={{ padding: '24px' }}>

            <h2 style={{
              fontSize: '18px', fontWeight: '700',
              color: '#1a1a2e', marginBottom: '6px'
            }}>
              {title?.toUpperCase()}
            </h2>

            <p style={{
              fontSize: '14px', color: '#6b7280',
              marginBottom: '12px', lineHeight: '1.6'
            }}>
              {description?.toUpperCase()}
            </p>

            <p style={{
              fontSize: '15px', fontWeight: '700',
              color: '#1a1a2e', marginBottom: '6px'
            }}>
              Rs.{rent}/day
            </p>

            <span style={{
              display: 'inline-block',
              background: '#fff0f0', color: '#FF385C',
              fontSize: '12px', fontWeight: '600',
              padding: '4px 12px', borderRadius: '50px',
              border: '1px solid #ffcdd2', marginBottom: '24px'
            }}>
              {category}
            </span>

            {/* ✅ Submit Button with loading state */}
            <button
              onClick={handleSubmit}
              disabled={adding}
              style={{
                width: '100%',
                background: adding
                  ? '#e8e8e8'
                  : 'linear-gradient(135deg, #FF385C, #ff6b35)',
                color: adding ? '#9ca3af' : 'white',
                border: 'none', borderRadius: '14px',
                padding: '16px', fontSize: '15px', fontWeight: '700',
                cursor: adding ? 'not-allowed' : 'pointer',
                boxShadow: adding ? 'none' : '0 8px 24px rgba(255,56,92,0.35)',
                transition: 'all 0.2s', letterSpacing: '0.3px'
              }}
              onMouseEnter={e => { if (!adding) e.currentTarget.style.transform = 'translateY(-2px)' }}
              onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
            >
              {adding ? '⏳ Adding Listing...' : 'Add Listing 🏠'} {/* ✅ dynamic text */}
            </button>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Listingpage3
