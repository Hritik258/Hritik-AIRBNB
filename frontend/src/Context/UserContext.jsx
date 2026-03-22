import React, { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'
import { AuthDataContext } from './AuthContext'

export const userDataContext = createContext()

const UserContext = ({ children }) => {
  const { serverUrl } = useContext(AuthDataContext)
  const [userData, setuserData] = useState(null)
  const [userLoading, setUserLoading] = useState(true)

  const getCurrentUser = async () => {
    setUserLoading(true)
    try {
      const result = await axios.get(
        `${serverUrl}/api/user/currentuser`,
        { withCredentials: true }
      )
      setuserData(result.data)
      return result.data
    } catch (error) {
      setuserData(null)
      console.log(error)
      return null
    } finally {
      setUserLoading(false)
    }
  }

  useEffect(() => {
    getCurrentUser()
  }, [serverUrl])

  const value = {
    userData,
    setuserData,
    getCurrentUser,
    userLoading,
  }

  return (
    <userDataContext.Provider value={value}>
      {children}
    </userDataContext.Provider>
  )
}

export default UserContext
