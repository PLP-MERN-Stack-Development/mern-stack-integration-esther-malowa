import React, { createContext, useState, useEffect } from 'react'
import api from '../services/apiService'

export const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem('user')
    return raw ? JSON.parse(raw) : null
  })
  const [token, setToken] = useState(() => localStorage.getItem('token') || null)

  useEffect(() => {
    if (user) localStorage.setItem('user', JSON.stringify(user))
    else localStorage.removeItem('user')
  }, [user])

  useEffect(() => {
    if (token) localStorage.setItem('token', token)
    else localStorage.removeItem('token')
  }, [token])

  const login = async (email, password) => {
    const res = await api.auth.login({ email, password })
    const { token, user } = res.data
    setUser(user)
    setToken(token)
    return res
  }

  const register = async (name, email, password) => {
    const res = await api.auth.register({ name, email, password })
    const { token, user } = res.data
    setUser(user)
    setToken(token)
    return res
  }

  const logout = () => {
  setUser(null)
  setToken(null)
  localStorage.removeItem('user')
  localStorage.removeItem('token')
}


  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
