
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
});

// Add auth token to requests automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});



// Get all posts
export const apiGetPosts = async () => {
  const res = await api.get("/posts");
  return res.data;
};

// Get a single post by ID
export const apiGetPost = async (id) => {
  const res = await api.get(`/posts/${id}`);
  return res.data;
};

// Create a new post
export const apiCreatePost = async (postData) => {
  const res = await api.post("/posts", postData);
  return res.data;
};

// Update a post
export const apiUpdatePost = async (id, postData) => {
  const res = await api.put(`/posts/${id}`, postData);
  return res.data;
};

// Delete a post
export const apiDeletePost = async (id) => {
  const res = await api.delete(`/posts/${id}`);
  return res.data;
};

export default api;
