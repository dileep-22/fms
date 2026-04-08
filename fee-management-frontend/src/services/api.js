import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Student APIs
export const studentApi = {
  getAll: () => api.get('/students'),
  getById: (id) => api.get(`/students/${id}`),
  create: (student) => api.post('/students', student),
  update: (id, student) => api.put(`/students/${id}`, student),
  delete: (id) => api.delete(`/students/${id}`),
};

// Fee APIs
export const feeApi = {
  getAll: () => api.get('/fees'),
  getById: (id) => api.get(`/fees/${id}`),
  create: (fee) => api.post('/fees', fee),
  update: (id, fee) => api.put(`/fees/${id}`, fee),
  delete: (id) => api.delete(`/fees/${id}`),
  getByStudent: (studentId) => api.get(`/fees/student/${studentId}`),
};

// Payment APIs
export const paymentApi = {
  getAll: () => api.get('/payments'),
  getById: (id) => api.get(`/payments/${id}`),
  create: (payment) => api.post('/payments', payment),
  update: (id, payment) => api.put(`/payments/${id}`, payment),
  delete: (id) => api.delete(`/payments/${id}`),
  getByFee: (feeId) => api.get(`/payments/fee/${feeId}`),
};

export default api;
