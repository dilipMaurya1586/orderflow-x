import { createContext, useState, useEffect } from 'react'
import authService from '../services/auth.service'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const userData = authService.getCurrentUser()
    if (userData) setUser(userData)
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    const response = await authService.login({ email, password })
    const userData = response.data
    localStorage.setItem('token', userData.token)
    localStorage.setItem('user', JSON.stringify(userData))
    setUser(userData)
    return userData
  }

  const register = async (userData) => {
    const response = await authService.register(userData)
    const data = response.data
    localStorage.setItem('token', data.token)
    localStorage.setItem('user', JSON.stringify(data))
    setUser(data)
    return data
  }

  const logout = () => {
    authService.logout()
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}