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

  createUser: (data) => axiosInstance.post('/auth/create-user', data),

  getAllUsers: (params) => axiosInstance.get('/auth/users', { params }),

  getUserById: (id) => axiosInstance.get(`/auth/users/${id}`),

  updateUser: (id, data) => axiosInstance.put(`/auth/users/${id}`, data),

  updateProfile: (data) => axiosInstance.put('/auth/profile', data),
}

// Invoice API
export const invoiceAPI = {
  // Get all invoices
  getAll: (params) => axiosInstance.get('/invoice', { params }),

  // Get invoice by ID
  getById: (id) => axiosInstance.get(`/invoice/${id}`),

  // Create invoice
  create: (data) => axiosInstance.post('/invoice/create', data),

  // Update invoice
  update: (id, data) => axiosInstance.put(`/invoice/${id}`, data),

  // Delete invoice
  delete: (id) => axiosInstance.delete(`/invoice/${id}`),

  // Get user invoices
  getUserInvoices: (params) =>
    axiosInstance.get('/invoice/my-invoices', { params }),

  // Get invoice statistics
  getStats: () => axiosInstance.get('/invoice/stats'),
}
