import React, { useState } from 'react'

const Star = ({ rating = 0, onRate, readOnly = false }) => {
  const [hovered, setHovered] = useState(0)

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          onClick={() => !readOnly && onRate && onRate(star)}
          onMouseEnter={() => !readOnly && setHovered(star)}
          onMouseLeave={() => !readOnly && setHovered(0)}
          style={{
            fontSize: '22px',
            cursor: readOnly ? 'default' : 'pointer',
            color: star <= (hovered || rating) ? '#FFB800' : '#e8e8e8',
            transition: 'all 0.15s ease',
            transform: !readOnly && star <= hovered ? 'scale(1.2)' : 'scale(1)',
            display: 'inline-block'
          }}
        >
          ★
        </span>
      ))}
      {rating > 0 && (
        <span style={{
          fontSize: '13px', fontWeight: '600',
          color: '#6b7280', marginLeft: '6px'
        }}>
          {rating}.0
        </span>
      )}
    </div>
  )
}

export default Star