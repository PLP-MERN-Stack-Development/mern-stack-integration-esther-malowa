import axios from 'axios'

// Create an axios instance
const apiClient = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

// Define API endpoints
const api = {
  auth: {
    register: (data) => apiClient.post('/auth/register', data),
    login: (data) => apiClient.post('/auth/login', data),
  },
  posts: {
    list: () => apiClient.get('/posts'),
    get: (id) => apiClient.get(`/posts/${id}`),
    create: (data) => apiClient.post('/posts', data),
    update: (id, data) => apiClient.put(`/posts/${id}`, data),
    remove: (id) => apiClient.delete(`/posts/${id}`),
  },
  categories: {
    list: () => apiClient.get('/categories'),
  },
  uploads: {
    uploadImage: (formData) => apiClient.post('/uploads', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  },
}

export default api
