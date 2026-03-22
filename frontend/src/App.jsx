import React, { useContext } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import { userDataContext } from './Context/UserContext'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Home from './pages/home'
import ListingPage from './pages/ListingPage1'
import ListingPage2 from './pages/ListingPage2'
import ListingPage3 from './pages/Listingpage3'
import MyListing from './pages/MyListing'
import Viewcard from './pages/Viewcard'
import MyBooking from './pages/MyBooking'
import Booked from './pages/Booked'
import EditListing from './pages/EditListing'

const ProtectedRoute = ({ children }) => {
  const { userData, userLoading } = useContext(userDataContext)

  if (userLoading) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#fafafa',
          color: '#6b7280',
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        Loading...
      </div>
    )
  }

  return userData ? children : <Navigate to="/login" replace />
}

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<SignUp />} />
      <Route
        path='/listingpage1'
        element={
          <ProtectedRoute>
            <ListingPage />
          </ProtectedRoute>
        }
      />
      <Route
        path='/listingpage2'
        element={
          <ProtectedRoute>
            <ListingPage2 />
          </ProtectedRoute>
        }
      />
      <Route
        path='/listingpage3'
        element={
          <ProtectedRoute>
            <ListingPage3 />
          </ProtectedRoute>
        }
      />
      <Route path='/listing/:id' element={<Viewcard />} />
      <Route
        path='/check-booking'
        element={
          <ProtectedRoute>
            <MyBooking />
          </ProtectedRoute>
        }
      />
      <Route
        path='/my-listings'
        element={
          <ProtectedRoute>
            <MyListing />
          </ProtectedRoute>
        }
      />
      <Route
        path='/edit-listing/:id'
        element={
          <ProtectedRoute>
            <EditListing />
          </ProtectedRoute>
        }
      />
      <Route
        path='/booked'
        element={
          <ProtectedRoute>
            <Booked />
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}

export default App
