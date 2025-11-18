import axiosInstance from './axios'

// Auth API
export const authAPI = {
  
  register: (data) => axiosInstance.post('/auth/register', data),

  // Login
  login: (data) => axiosInstance.post('/auth/login', data),

  // Logout
  logout: (data) => axiosInstance.post('/auth/logout', data),

  // Refresh token
  refreshToken: (data) => axiosInstance.post('/auth/refresh-token', data),

  // Create user (admin only)
  createUser: (data) => axiosInstance.post('/auth/create-user', data),

  // Get all users (admin only)
  getAllUsers: (params) => axiosInstance.get('/auth/users', { params }),

  // Get user by ID (admin only)
  getUserById: (id) => axiosInstance.get(`/auth/users/${id}`),

  // Update user by ID (admin only)
  updateUser: (id, data) => axiosInstance.put(`/auth/users/${id}`, data),

  // Update profile
  updateProfile: (data) => axiosInstance.put('/auth/profile', data),
}

// Invoice API
export const invoiceAPI = {
  // Get all invoices
  getAll: (params) => axiosInstance.get('/invoice', { params }),

  // Get invoice by ID
  getById: (id) => axiosInstance.get(`/invoice/${id}`),

  // Create invoice
  create: (data) => axiosInstance.post('/invoice', data),

  // Update invoice
  update: (id, data) => axiosInstance.put(`/invoice/${id}`, data),

  // Delete invoice
  delete: (id) => axiosInstance.delete(`/invoice/${id}`),

  // Get user invoices
  getUserInvoices: (userId, params) =>
    axiosInstance.get(`/invoice/user/${userId}`, { params }),

  // Get invoice statistics
  getStats: () => axiosInstance.get('/invoice/stats'),
}
