import React from 'react'
import Nav from '../Component/Nav.jsx'
import Card from '../Component/card.jsx' // ✅ add this

const Home = () => {
  return (
    <div>
      <Nav />
      <Card /> {/* ✅ add this */}
    </div>
  )
}

export default Home
