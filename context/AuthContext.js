import { createContext, useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { authAPI } from '@/lib/api'
import toast from 'react-hot-toast'
import axios from 'axios'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  // Load user from localStorage on mount
  useEffect(() => {
    const loadUser = () => {
      try {
        const storedUser = localStorage.getItem('user')
        const accessToken = localStorage.getItem('accessToken')

        if (storedUser && accessToken) {
          setUser(JSON.parse(storedUser))
        }
      } catch (error) {
        console.error('Failed to load user:', error)
      } finally {
        setLoading(false)
      }
    }

    loadUser()
  }, [])

  // Register function
  const register = async (data) => {
    try {
      const response = await axios.post(
        'http://localhost:5000/api/auth/register',
        data,
        { withCredentials: true }
      )
      const { user, accessToken, refreshToken } = response.data.data

      // Store tokens and user
      localStorage.setItem('accessToken', accessToken)
      localStorage.setItem('refreshToken', refreshToken)
      localStorage.setItem('user', JSON.stringify(user))

      setUser(user)
      toast.success('Registration successful!')

      // Redirect based on role
      if (user.role === 'ADMIN') {
        router.push('/AdminPages/Dashboard')
      } else {
        router.push('/UserPages/Invoice')
      }

      return response.data
    } catch (error) {
      console.error('Registration error:', error)
      const message =
        error.response?.data?.message || error.message || 'Registration failed'
      toast.error(message)
      throw error
    }
  }

  // Login function
  const login = async (data) => {
    try {
      console.log('Login request data:', data)
      const response = await axios.post(
        'http://localhost:5000/api/auth/login',
        data,
        {
          withCredentials: true,
        }
      )
      console.log('Login response:', response)
      console.log('Response data:', response.data)
      console.log('Response data.data:', response.data.data)

      const { user, accessToken, refreshToken } = response.data.data

      // Store tokens and user
      localStorage.setItem('accessToken', accessToken)
      localStorage.setItem('refreshToken', refreshToken)
      localStorage.setItem('user', JSON.stringify(user))

      setUser(user)
      toast.success('Login successful!')

      // Redirect based on role
      if (user.role === 'ADMIN') {
        router.push('/AdminPages/Dashboard')
      } else {
        router.push('/UserPages/Invoice')
      }

      return response.data
    } catch (error) {
      console.error('Login error:', error)
      console.error('Error response:', error.response)
      console.error('Error response data:', error.response?.data)
      const message =
        error.response?.data?.message || error.message || 'Login failed'
      toast.error(message)
      throw error
    }
  }

  // Logout function
  const logout = async () => {
    try {
      const refreshToken = localStorage.getItem('refreshToken')
      const accessToken = localStorage.getItem('accessToken')

      await authAPI.logout({ refreshToken, accessToken })

      // Clear tokens and user
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      localStorage.removeItem('user')

      setUser(null)
      toast.success('Logged out successfully')
      router.push('/Auth/Login')
    } catch (error) {
      // Even if API call fails, clear local data
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      localStorage.removeItem('user')
      setUser(null)
      router.push('/Auth/Login')
    }
  }

  const value = {
    user,
    setUser,
    loading,
    register,
    login,
    logout,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'ADMIN',
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
