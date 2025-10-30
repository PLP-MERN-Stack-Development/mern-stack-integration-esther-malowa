import React, { createContext, useState, useEffect, useCallback } from 'react'
import api from '../api' 

export const PostsContext = createContext()

export function PostsProvider({ children }) {
  const [posts, setPosts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // 🔹 Fetch all posts
  const fetchPosts = useCallback(async () => {
    setLoading(true)
    try {
      const res = await api.get('/posts')
      setPosts(res.data?.data || res.data || [])
    } catch (err) {
      setError(err.message || 'Failed to load posts')
    } finally {
      setLoading(false)
    }
  }, [])

  // 🔹 Fetch categories
  const fetchCategories = useCallback(async () => {
    try {
      const res = await api.get('/categories')
      setCategories(res.data?.data || res.data || [])
    } catch (err) {
      console.error('Failed to load categories:', err.message)
    }
  }, [])

  // 🔹 Create a post
  const createPost = async (newPost) => {
    try {
      const res = await api.post('/posts', newPost)
      await fetchPosts()
      return res.data
    } catch (err) {
      setError(err.message)
    }
  }

  // 🔹 Update a post
  const updatePost = async (id, updatedData) => {
    try {
      const res = await api.put(`/posts/${id}`, updatedData)
      await fetchPosts()
      return res.data
    } catch (err) {
      setError(err.message)
    }
  }

  // 🔹 Delete a post
  const deletePost = async (id) => {
    try {
      await api.delete(`/posts/${id}`)
      setPosts(prev => prev.filter(p => p._id !== id))
    } catch (err) {
      setError(err.message)
    }
  }

  // 🔹 Initial data load
  useEffect(() => {
    fetchPosts()
    fetchCategories()
  }, [fetchPosts, fetchCategories])

  return (
    <PostsContext.Provider
      value={{
        posts,
        categories,
        loading,
        error,
        createPost,
        updatePost,
        deletePost,
        fetchPosts,
      }}
    >
      {children}
    </PostsContext.Provider>
  )
}
