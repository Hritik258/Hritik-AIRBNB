import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { listingDataContext } from '../Context/listingContext'
import { AuthDataContext } from '../Context/AuthContext'
import { FaArrowLeft } from 'react-icons/fa'
import axios from 'axios'

const EditListing = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const { listingData, getListing } = useContext(listingDataContext)
  const { serverUrl } = useContext(AuthDataContext)

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [rent, setRent] = useState("")
  const [city, setCity] = useState("")
  const [landmark, setLandmark] = useState("")
  const [category, setCategory] = useState("")
  const [loading, setLoading] = useState(false)

  const categories = ['Villa', 'Farm House', 'Pool House', 'Rooms', 'Flat', 'PG', 'Cabin', 'Shops']

  useEffect(() => {
    const listing = listingData?.find(l => l._id === id)
    if (listing) {
      setTitle(listing.title || "")
      setDescription(listing.description || "")
      setRent(listing.rent || "")
      setCity(listing.city || "")
      setLandmark(listing.landmark || "")
      setCategory(listing.category || "")
    }
  }, [id, listingData])

  const handleUpdate = async () => {
    if (!title || !description || !rent || !city || !landmark || !category) {
      alert("Please fill all fields")
      return
    }
    setLoading(true)
    try {
      await axios.put(
        `${serverUrl}/api/listing/update/${id}`,
        { title, description, rent, city, landmark, category },
        { withCredentials: true }
      )
      await getListing()
      alert("Listing updated successfully!")
      navigate('/my-listings')
    } catch (error) {
      alert(error.response?.data?.message || "Update failed.")
    } finally {
      setLoading(false)
    }
  }

  const inputStyle = {
    width: '100%', background: '#fafafa',
    border: '1.5px solid #e8e8e8', borderRadius: '12px',
    padding: '14px 16px', fontSize: '14px', color: '#1a1a2e',
    outline: 'none', transition: 'all 0.2s',
    boxSizing: 'border-box', fontFamily: 'inherit'
  }

  const labelStyle = {
    display: 'block', fontSize: '13px', fontWeight: '600',
    color: '#374151', marginBottom: '8px', letterSpacing: '0.3px'
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
        padding: '0 32px', height: '68px',
        display: 'flex', alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0 2px 20px rgba(0,0,0,0.04)'
      }}>
        <button
          onClick={() => navigate('/my-listings')}
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
        <h1 style={{ fontSize: '18px', fontWeight: '700', color: '#1a1a2e' }}>Edit Listing</h1>
        <div style={{ width: '80px' }} />
      </div>

      {/* Form */}
      <div style={{ maxWidth: '680px', margin: '40px auto', padding: '0 20px 60px' }}>
        <div style={{
          background: '#fff', borderRadius: '24px', padding: '36px',
          boxShadow: '0 8px 40px rgba(0,0,0,0.07)', border: '1px solid #f5f5f5'
        }}>

          <div style={{ marginBottom: '24px' }}>
            <label style={labelStyle}>LISTING TITLE</label>
            <input type="text" value={title} onChange={e => setTitle(e.target.value)}
              placeholder="e.g. Cozy Villa with Pool" style={inputStyle}
              onFocus={e => { e.target.style.borderColor = '#FF385C'; e.target.style.boxShadow = '0 0 0 4px rgba(255,56,92,0.08)' }}
              onBlur={e => { e.target.style.borderColor = '#e8e8e8'; e.target.style.boxShadow = 'none' }}
            />
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={labelStyle}>DESCRIPTION</label>
            <textarea value={description} onChange={e => setDescription(e.target.value)}
              placeholder="Describe your place..." rows={4}
              style={{ ...inputStyle, resize: 'none' }}
              onFocus={e => { e.target.style.borderColor = '#FF385C'; e.target.style.boxShadow = '0 0 0 4px rgba(255,56,92,0.08)' }}
              onBlur={e => { e.target.style.borderColor = '#e8e8e8'; e.target.style.boxShadow = 'none' }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' }}>
            <div>
              <label style={labelStyle}>RENT / NIGHT (₹)</label>
              <input type="number" value={rent} onChange={e => setRent(e.target.value)}
                placeholder="e.g. 2500" style={inputStyle}
                onFocus={e => { e.target.style.borderColor = '#FF385C'; e.target.style.boxShadow = '0 0 0 4px rgba(255,56,92,0.08)' }}
                onBlur={e => { e.target.style.borderColor = '#e8e8e8'; e.target.style.boxShadow = 'none' }}
              />
            </div>
            <div>
              <label style={labelStyle}>CITY</label>
              <input type="text" value={city} onChange={e => setCity(e.target.value)}
                placeholder="e.g. Mumbai" style={inputStyle}
                onFocus={e => { e.target.style.borderColor = '#FF385C'; e.target.style.boxShadow = '0 0 0 4px rgba(255,56,92,0.08)' }}
                onBlur={e => { e.target.style.borderColor = '#e8e8e8'; e.target.style.boxShadow = 'none' }}
              />
            </div>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={labelStyle}>LANDMARK</label>
            <input type="text" value={landmark} onChange={e => setLandmark(e.target.value)}
              placeholder="e.g. Near Bandra Station" style={inputStyle}
              onFocus={e => { e.target.style.borderColor = '#FF385C'; e.target.style.boxShadow = '0 0 0 4px rgba(255,56,92,0.08)' }}
              onBlur={e => { e.target.style.borderColor = '#e8e8e8'; e.target.style.boxShadow = 'none' }}
            />
          </div>

          <div style={{ marginBottom: '32px' }}>
            <label style={labelStyle}>CATEGORY</label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
              {categories.map(cat => (
                <div key={cat} onClick={() => setCategory(cat)} style={{
                  padding: '10px 8px', textAlign: 'center',
                  border: category === cat ? '2px solid #FF385C' : '1.5px solid #e8e8e8',
                  borderRadius: '12px', cursor: 'pointer',
                  background: category === cat ? '#fff0f0' : '#fafafa',
                  fontSize: '12px', fontWeight: '600',
                  color: category === cat ? '#FF385C' : '#374151',
                  transition: 'all 0.2s'
                }}>
                  {cat}
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={handleUpdate}
            disabled={loading}
            style={{
              width: '100%',
              background: loading ? '#e8e8e8' : 'linear-gradient(135deg, #FF385C, #ff6b35)',
              color: loading ? '#9ca3af' : 'white',
              border: 'none', borderRadius: '16px',
              padding: '18px', fontSize: '16px', fontWeight: '700',
              cursor: loading ? 'not-allowed' : 'pointer',
              boxShadow: loading ? 'none' : '0 8px 24px rgba(255,56,92,0.35)',
              transition: 'all 0.2s'
            }}
            onMouseEnter={e => { if (!loading) e.currentTarget.style.transform = 'translateY(-2px)' }}
            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
          >
            {loading ? '⏳ Updating...' : 'Update Listing ✅'}
          </button>

        </div>
      </div>
    </div>
  )
}

export default EditListing