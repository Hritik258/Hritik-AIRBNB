import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { listingDataContext } from '../Context/listingContext'
import { FaArrowLeft } from 'react-icons/fa'

const ListingPage = () => {
  const navigate = useNavigate()
  const {
    title, setTitle,
    description, setDescription,
    frontEndImage1, setFrontEndImage1,
    frontEndImage2, setFrontEndImage2,
    frontEndImage3, setFrontEndImage3,
    setBackEndImage1,
    setBackEndImage2,
    setBackEndImage3,
    rent, setRent,
    city, setCity,
    landmark, setLandmark,
  } = useContext(listingDataContext)

  const handleImage = (setter, backSetter) => (e) => {
    setter(URL.createObjectURL(e.target.files[0]))
    backSetter(e.target.files[0])
  }

  const handleNext = () => {
    if (!title || !description || !frontEndImage1 || !frontEndImage2 || !frontEndImage3 || !rent || !city || !landmark) {
      alert("Please fill all fields and select all 3 images")
      return
    }
    navigate('/listingpage2')
  }

  const inputClass = "w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent transition"
  
  const handleImage1 = (e)=>{
    let file = e.target.files[0]
    setBackEndImage1(file)
    setFrontEndImage1(URL.createObjectURL(file))
  } 
  const handleImage2 = (e)=>{
    let file = e.target.files[0]
    setBackEndImage2(file)
    setFrontEndImage2(URL.createObjectURL(file))
  } 
  const handleImage3 = (e)=>{
    let file = e.target.files[0]
    setBackEndImage3(file)
    setFrontEndImage3(URL.createObjectURL(file))
  } 

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #fff5f5 0%, #ffffff 50%, #fff0f0 100%)', fontFamily: "'DM Sans', sans-serif" }}>

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
          onClick={() => navigate('/')}
          style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            background: 'none', border: 'none', cursor: 'pointer',
            color: '#374151', fontSize: '14px', fontWeight: '600',
            padding: '8px 12px', borderRadius: '50px',
            transition: 'all 0.2s'
          }}
          onMouseEnter={e => e.currentTarget.style.background = '#fff0f0'}
          onMouseLeave={e => e.currentTarget.style.background = 'none'}
        >
          <FaArrowLeft size={14} color="#FF385C" />
          <span style={{ color: '#FF385C' }}>Back to Home</span>
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '8px', height: '8px', borderRadius: '50%',
            background: '#FF385C'
          }} />
          <span style={{ fontSize: '13px', color: '#9ca3af', fontWeight: '500' }}>Step 1 of 2</span>
        </div>

        <button
          onClick={() => navigate('/')}
          style={{
            background: 'linear-gradient(135deg, #FF385C, #ff6b35)',
            color: 'white', border: 'none', borderRadius: '50px',
            padding: '10px 20px', fontSize: '13px', fontWeight: '600',
            cursor: 'pointer', boxShadow: '0 4px 14px rgba(255,56,92,0.35)',
            transition: 'all 0.2s'
          }}
        >
          SetUp Your Home
        </button>
      </div>

      {/* Progress Bar */}
      <div style={{ height: '3px', background: '#f0f0f0' }}>
        <div style={{
          height: '100%', width: '50%',
          background: 'linear-gradient(90deg, #FF385C, #ff6b35)',
          borderRadius: '0 4px 4px 0',
          transition: 'width 0.4s ease'
        }} />
      </div>

      {/* Form Container */}
      <div style={{ maxWidth: '680px', margin: '40px auto', padding: '0 20px 60px' }}>

        {/* Page Title */}
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#1a1a2e', marginBottom: '8px' }}>
            Tell us about your place 🏠
          </h1>
          <p style={{ fontSize: '14px', color: '#9ca3af', fontWeight: '400' }}>
            Fill in the details below. You can always edit them later.
          </p>
        </div>

        {/* Card */}
        <div style={{
          background: '#ffffff',
          borderRadius: '24px',
          padding: '36px',
          boxShadow: '0 8px 40px rgba(0,0,0,0.07)',
          border: '1px solid #f5f5f5'
        }}>

          {/* Title */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '8px', letterSpacing: '0.3px' }}>
              LISTING TITLE
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Cozy Villa with Pool in Goa"
              style={{
                width: '100%', background: '#fafafa', border: '1.5px solid #e8e8e8',
                borderRadius: '12px', padding: '14px 16px', fontSize: '14px',
                color: '#1a1a2e', outline: 'none', transition: 'all 0.2s',
                boxSizing: 'border-box'
              }}
              onFocus={e => { e.target.style.borderColor = '#FF385C'; e.target.style.boxShadow = '0 0 0 4px rgba(255,56,92,0.08)' }}
              onBlur={e => { e.target.style.borderColor = '#e8e8e8'; e.target.style.boxShadow = 'none' }}
            />
          </div>

          {/* Description */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '8px', letterSpacing: '0.3px' }}>
              DESCRIPTION
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your place — amenities, vibe, nearby attractions..."
              rows={4}
              style={{
                width: '100%', background: '#fafafa', border: '1.5px solid #e8e8e8',
                borderRadius: '12px', padding: '14px 16px', fontSize: '14px',
                color: '#1a1a2e', outline: 'none', resize: 'none',
                transition: 'all 0.2s', boxSizing: 'border-box', fontFamily: 'inherit'
              }}
              onFocus={e => { e.target.style.borderColor = '#FF385C'; e.target.style.boxShadow = '0 0 0 4px rgba(255,56,92,0.08)' }}
              onBlur={e => { e.target.style.borderColor = '#e8e8e8'; e.target.style.boxShadow = 'none' }}
            />
          </div>

          {/* Divider */}
          <div style={{ height: '1px', background: '#f5f5f5', margin: '28px 0' }} />

          {/* Images Section */}
          <div style={{ marginBottom: '8px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '16px', letterSpacing: '0.3px' }}>
              PHOTOS (3 required)
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
              {[
                { preview: frontEndImage1, handler: handleImage(setFrontEndImage1, setBackEndImage1), label: 'Main Photo' },
                { preview: frontEndImage2, handler: handleImage(setFrontEndImage2, setBackEndImage2), label: 'Photo 2' },
                { preview: frontEndImage3, handler: handleImage(setFrontEndImage3, setBackEndImage3), label: 'Photo 3' },
              ].map((img, i) => (
                <div key={i}>
                  <label style={{
                    display: 'block', cursor: 'pointer',
                    border: img.preview ? 'none' : '2px dashed #e8e8e8',
                    borderRadius: '16px', overflow: 'hidden',
                    height: '130px', position: 'relative',
                    background: img.preview ? 'transparent' : '#fafafa',
                    transition: 'all 0.2s'
                  }}>
                    {img.preview ? (
                      <img src={img.preview} alt={img.label} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <div style={{
                        height: '100%', display: 'flex', flexDirection: 'column',
                        alignItems: 'center', justifyContent: 'center', gap: '6px'
                      }}>
                        <div style={{
                          width: '36px', height: '36px', borderRadius: '50%',
                          background: '#fff0f0', display: 'flex', alignItems: 'center', justifyContent: 'center'
                        }}>
                          <span style={{ fontSize: '18px' }}>📷</span>
                        </div>
                        <span style={{ fontSize: '11px', color: '#9ca3af', fontWeight: '500' }}>{img.label}</span>
                      </div>
                    )}
                    <input type="file" accept="image/*" onChange={img.handler} style={{ display: 'none' }} />
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div style={{ height: '1px', background: '#f5f5f5', margin: '28px 0' }} />

          {/* Rent, City, Landmark */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' }}>

            {/* Rent */}
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '8px', letterSpacing: '0.3px' }}>
                RENT / NIGHT (₹)
              </label>
              <input
                type="number"
                value={rent}
                onChange={(e) => setRent(e.target.value)}
                placeholder="e.g. 2500"
                style={{
                  width: '100%', background: '#fafafa', border: '1.5px solid #e8e8e8',
                  borderRadius: '12px', padding: '14px 16px', fontSize: '14px',
                  color: '#1a1a2e', outline: 'none', transition: 'all 0.2s',
                  boxSizing: 'border-box'
                }}
                onFocus={e => { e.target.style.borderColor = '#FF385C'; e.target.style.boxShadow = '0 0 0 4px rgba(255,56,92,0.08)' }}
                onBlur={e => { e.target.style.borderColor = '#e8e8e8'; e.target.style.boxShadow = 'none' }}
              />
            </div>

            {/* City */}
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '8px', letterSpacing: '0.3px' }}>
                CITY
              </label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="e.g. Mumbai"
                style={{
                  width: '100%', background: '#fafafa', border: '1.5px solid #e8e8e8',
                  borderRadius: '12px', padding: '14px 16px', fontSize: '14px',
                  color: '#1a1a2e', outline: 'none', transition: 'all 0.2s',
                  boxSizing: 'border-box'
                }}
                onFocus={e => { e.target.style.borderColor = '#FF385C'; e.target.style.boxShadow = '0 0 0 4px rgba(255,56,92,0.08)' }}
                onBlur={e => { e.target.style.borderColor = '#e8e8e8'; e.target.style.boxShadow = 'none' }}
              />
            </div>
          </div>

          {/* Landmark */}
          <div style={{ marginBottom: '8px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '8px', letterSpacing: '0.3px' }}>
              LANDMARK
            </label>
            <input
              type="text"
              value={landmark}
              onChange={(e) => setLandmark(e.target.value)}
              placeholder="e.g. Near Bandra Station"
              style={{
                width: '100%', background: '#fafafa', border: '1.5px solid #e8e8e8',
                borderRadius: '12px', padding: '14px 16px', fontSize: '14px',
                color: '#1a1a2e', outline: 'none', transition: 'all 0.2s',
                boxSizing: 'border-box'
              }}
              onFocus={e => { e.target.style.borderColor = '#FF385C'; e.target.style.boxShadow = '0 0 0 4px rgba(255,56,92,0.08)' }}
              onBlur={e => { e.target.style.borderColor = '#e8e8e8'; e.target.style.boxShadow = 'none' }}
            />
          </div>

        </div>

        {/* Next Button */}
        <button
          onClick={handleNext}
          style={{
            width: '100%', marginTop: '24px',
            background: 'linear-gradient(135deg, #FF385C, #ff6b35)',
            color: 'white', border: 'none', borderRadius: '16px',
            padding: '18px', fontSize: '16px', fontWeight: '700',
            cursor: 'pointer', letterSpacing: '0.3px',
            boxShadow: '0 8px 24px rgba(255,56,92,0.35)',
            transition: 'all 0.2s'
          }}
          onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
        >
          Continue to Next Step →
        </button>

      </div>
    </div>
  )
}

export default ListingPage
