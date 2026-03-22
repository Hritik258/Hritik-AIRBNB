import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import AuthContext from './Context/AuthContext.jsx'
import UserContext from './Context/UserContext.jsx'
import ListingContext from './Context/ListingContext.jsx'  // ✅ Fixed: capital L
import BookingContext from './Context/BookingContext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthContext>        {/* 1st — provides serverUrl, isAuthenticated */}
      <UserContext>      {/* 2nd — provides userData */}
        <ListingContext> {/* 3rd — uses serverUrl from AuthContext */}
          <BookingContext> {/* 4th — uses serverUrl from AuthContext */}
            <App />
          </BookingContext>
        </ListingContext>
      </UserContext>
    </AuthContext>
  </BrowserRouter>
)
