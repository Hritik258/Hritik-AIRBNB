import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { listingDataContext } from '../Context/ListingContext'
import { FaArrowLeft } from 'react-icons/fa'
import { MdOutlineHolidayVillage, MdPool, MdBedroomParent } from 'react-icons/md'
import { PiFarmFill } from 'react-icons/pi'
import { FaDollyFlatbed } from 'react-icons/fa'
import { GiWoodCabin } from 'react-icons/gi'
import { CiShop } from 'react-icons/ci'

const categories = [
  { name: 'Villa', icon: <MdOutlineHolidayVillage size={28} /> },
  { name: 'Farm House', icon: <PiFarmFill size={28} /> },
  { name: 'Pool House', icon: <MdPool size={28} /> },
  { name: 'Rooms', icon: <MdBedroomParent size={28} /> },
  { name: 'Flat', icon: <FaDollyFlatbed size={28} /> },
  { name: 'PG', icon: <MdBedroomParent size={28} /> },
  { name: 'Cabin', icon: <GiWoodCabin size={28} /> },
  { name: 'Shops', icon: <CiShop size={28} /> },
]

const ListingPage2 = () => {
  const navigate = useNavigate()
  const { category, setCategory } = useContext(listingDataContext)

  const handleNext = () => {
    if (!category) {
      alert("Please select a category")
      return
    }
    navigate('/listingpage3')
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
          onClick={() => navigate('/listingpage1')}
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
          <span style={{ fontSize: '13px', color: '#9ca3af', fontWeight: '500' }}>Step 2 of 3</span>
        </div>

        <button style={{
          background: 'linear-gradient(135deg, #FF385C, #ff6b35)',
          color: 'white', border: 'none', borderRadius: '50px',
          padding: '10px 20px', fontSize: '13px', fontWeight: '600',
          cursor: 'pointer', boxShadow: '0 4px 14px rgba(255,56,92,0.35)'
        }}>
          Set Your Category
        </button>
      </div>

      {/* Progress Bar */}
      <div style={{ height: '3px', background: '#f0f0f0' }}>
        <div style={{
          height: '100%', width: '66%',
          background: 'linear-gradient(90deg, #FF385C, #ff6b35)',
          borderRadius: '0 4px 4px 0',
          transition: 'width 0.4s ease'
        }} />
      </div>

      {/* Content */}
      <div style={{ maxWidth: '600px', margin: '50px auto', padding: '0 20px 80px' }}>

        <h1 style={{
          fontSize: '26px', fontWeight: '700',
          color: '#1a1a2e', textAlign: 'center', marginBottom: '40px'
        }}>
          Which of these best describes your place?
        </h1>

        {/* Category Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: '16px',
          marginBottom: '40px'
        }}>
          {categories.map((cat) => (
            <div
              key={cat.name}
              onClick={() => setCategory(cat.name)}
              style={{
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                gap: '10px', padding: '24px 12px',
                border: category === cat.name
                  ? '2px solid #FF385C'
                  : '1.5px solid #e8e8e8',
                borderRadius: '16px',
                background: category === cat.name
                  ? 'linear-gradient(135deg, #fff0f0, #fff5f5)'
                  : '#ffffff',
                cursor: 'pointer',
                transition: 'all 0.2s',
                boxShadow: category === cat.name
                  ? '0 4px 20px rgba(255,56,92,0.15)'
                  : '0 2px 8px rgba(0,0,0,0.04)',
                transform: category === cat.name ? 'translateY(-2px)' : 'none'
              }}
              onMouseEnter={e => {
                if (category !== cat.name) {
                  e.currentTarget.style.borderColor = '#ffb3b3'
                  e.currentTarget.style.transform = 'translateY(-2px)'
                  e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.08)'
                }
              }}
              onMouseLeave={e => {
                if (category !== cat.name) {
                  e.currentTarget.style.borderColor = '#e8e8e8'
                  e.currentTarget.style.transform = 'none'
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)'
                }
              }}
            >
              <div style={{
                color: category === cat.name ? '#FF385C' : '#374151',
                transition: 'color 0.2s'
              }}>
                {cat.icon}
              </div>
              <span style={{
                fontSize: '13px', fontWeight: '600',
                color: category === cat.name ? '#FF385C' : '#374151',
                transition: 'color 0.2s'
              }}>
                {cat.name}
              </span>
            </div>
          ))}
        </div>

        {/* Next Button */}
        <button
          onClick={handleNext}
          style={{
            width: '100%',
            background: category
              ? 'linear-gradient(135deg, #FF385C, #ff6b35)'
              : '#e8e8e8',
            color: category ? 'white' : '#9ca3af',
            border: 'none', borderRadius: '16px',
            padding: '18px', fontSize: '16px', fontWeight: '700',
            cursor: category ? 'pointer' : 'not-allowed',
            boxShadow: category ? '0 8px 24px rgba(255,56,92,0.35)' : 'none',
            transition: 'all 0.3s',
            letterSpacing: '0.3px'
          }}
          onMouseEnter={e => { if (category) e.currentTarget.style.transform = 'translateY(-2px)' }}
          onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
        >
          {category ? `Next → Preview Listing` : 'Select a category to continue'}
        </button>

      </div>
    </div>
  )
}

export default ListingPage2
