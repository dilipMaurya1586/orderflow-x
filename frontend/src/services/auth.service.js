import api from './api'

const authService = {
  register: (userData) => api.post('/users/register', userData),

  login: (credentials) => api.post('/users/login', credentials),

  logout: () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  },

  getCurrentUser: () => {
    const user = localStorage.getItem('user')
    return user ? JSON.parse(user) : null
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('token')
  }
}

export default authService