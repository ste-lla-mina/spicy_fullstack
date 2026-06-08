import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' }
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  if (config.data instanceof FormData) {
    delete config.headers['Content-Type'];
  }
  return config;
});

export const authApi = {
  signup: (data) => api.post('/auth/signup', data),
  signupOwner: (data) => api.post('/auth/signup-owner', data),
  login: (data) => api.post('/auth/login', data),
  verify: (data) => api.post('/auth/verify', data),
  resendVerification: (data) => api.post('/auth/resend-verification', data),
  forgotPassword: (data) => api.post('/auth/forgot-password', data),
  verifyResetCode: (data) => api.post('/auth/verify-reset-code', data),
  resetPassword: (data) => api.post('/auth/reset-password', data),
  getMe: () => api.get('/auth/me')
};

export const menuApi = {
  getItems: (params) => api.get('/menu/items', { params }),
  getTopRated: () => api.get('/menu/top-rated'),
  getSpecials: () => api.get('/menu/specials'),
  create: (data) => api.post('/menu/items', data),
  update: (id, data) => api.patch(`/menu/items/${id}`, data),
  toggle: (id) => api.patch(`/menu/items/${id}/toggle`),
  remove: (id) => api.delete(`/menu/items/${id}`)
};

export const orderApi = {
  getAll: () => api.get('/orders'),
  getStats: () => api.get('/orders/stats'),
  getActiveClients: () => api.get('/orders/active-clients'),
  create: (data) => api.post('/orders', data),
  updateStatus: (id, status) => api.patch(`/orders/${id}/status`, { status }),
  pay: (id) => api.patch(`/orders/${id}/pay`),
  updateClient: (id, data) => api.patch(`/orders/${id}`, data),
  serve: (orderNo) => api.patch(`/orders/serve/${orderNo}`),
  remove: (id) => api.delete(`/orders/${id}`)
};

export const tableApi = {
  getOwnerTables: (params) => api.get('/tables', { params }),
  toggle: (tableNo) => api.patch(`/tables/${tableNo}/toggle`),
  getAvailable: (params) => api.get('/tables/available', { params }),
  reserve: (data) => api.post('/tables/reservations', data),
  getReservations: () => api.get('/tables/reservations')
};

export const overviewApi = {
  get: () => api.get('/overview')
};

export const settingsApi = {
  getRestaurant: () => api.get('/settings/restaurant'),
  updateRestaurant: (data) => api.put('/settings/restaurant', data)
};

export const userApi = {
  updateProfile: (data) => api.patch('/users/profile', data),
  updatePassword: (data) => api.patch('/users/password', data),
  updateNotifications: (data) => api.patch('/users/notifications', data)
};

export const resolveImage = (src) => {
  if (!src) return 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=300&q=80';
  if (typeof src === 'string' && (src.startsWith('http') || src.startsWith('blob:') || src.startsWith('data:'))) return src;
  const file = typeof src === 'string' ? src : '';
  return `/src/assets/${file}`;
};

export default api;
