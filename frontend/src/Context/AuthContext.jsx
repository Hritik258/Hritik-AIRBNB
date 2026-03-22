// Context/AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthDataContext = createContext();

const AuthContext = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const serverUrl = "https://hritik-airbnb-backend.onrender.com";

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const res = await axios.get(`${serverUrl}/api/auth/verify`, {
          withCredentials: true,
        });
        if (res.data.success) {
          setUser(res.data.user);
        } else {
          setUser(null);
        }
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    verifyToken();
  }, []);

  const login = (userData) => {
    setUser(userData);
  };

  // ✅ Fixed — clears cookie + state
  const logout = async () => {
    try {
      await axios.post(`${serverUrl}/api/auth/logout`, {}, { withCredentials: true });
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setUser(null); // ✅ always clear user even if request fails
    }
  };

  const value = {
    serverUrl,
    user,
    login,
    logout,
    loading,
    isAuthenticated: !!user,
  };

  if (loading) {
    return null;
  }

  return (
    <AuthDataContext.Provider value={value}>
      {children}
    </AuthDataContext.Provider>
  );
};

export default AuthContext;
