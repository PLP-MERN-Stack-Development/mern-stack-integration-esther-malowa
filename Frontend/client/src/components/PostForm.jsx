import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { PostsContext } from '../context/PostsContext'
import { AuthContext } from '../context/AuthContext'
import api from "../api.js"

export default function PostForm() {
  
  const navigate = useNavigate()
  const { createPost, updatePost } = useContext(PostsContext)
  const { token } = useContext(AuthContext)

  const [form, setForm] = useState({
    title: '',
    excerpt: '',
    body: '',
    author: '',
    category: '',
    tags: '',
    published: true,
  })
  const [categories, setCategories] = useState([])
  const [featuredImageUrl, setFeaturedImageUrl] = useState('')
  const [imageFile, setImageFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)

  // Fetch categories
  useEffect(() => {
    api.get('/categories')
      .then(res => setCategories(res.data || []))
      .catch(() => setCategories([]))
  }, [])

  

  const handleChange = (e) => {
    const { name, value, checked } = e.target
    setForm(prev => ({
      ...prev,
      [name]: name === 'published' ? checked : value
    }))
  }

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0])
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)
    setLoading(true)

    try {
      let imageUrl = featuredImageUrl

      // Upload image
      if (imageFile) { 
        const fd = new FormData()
         fd.append('image', imageFile)
       const res = await api.post('/uploads/image', fd, {
  headers: {
    'Content-Type': 'multipart/form-data',
    Authorization: `Bearer ${token}`,
  },
})

       imageUrl = res.data.url 
       setFeaturedImageUrl(imageUrl)
       }
      const payload = {
        ...form,
        featuredImage: imageUrl,
        tags: form.tags.split(',').map(t => t.trim()).filter(Boolean)
      }

     await createPost(payload)
     setSuccess('Post created successfully!')

      setTimeout(() => navigate('/'), 1000)
    } catch (err) {
      setError(err.message || 'Something went wrong')
    } finally {
      setLoading(false)
      setUploading(false)
    }
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-indigo-700">
    
      </h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Title */}
        <div>
          <label className="block text-sm font-semibold text-gray-700">Title</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-indigo-200"
            required
          />
        </div>

        {/* Excerpt */}
        <div>
          <label className="block text-sm font-semibold text-gray-700">Excerpt</label>
          <textarea
            name="excerpt"
            value={form.excerpt}
            onChange={handleChange}
            rows="2"
            className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-indigo-200"
          />
        </div>

        {/* Body */}
        <div>
          <label className="block text-sm font-semibold text-gray-700">Body</label>
          <textarea
            name="body"
            value={form.body}
            onChange={handleChange}
            rows="5"
            className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-indigo-200"
            required
          />
        </div>

        {/* Author */}
        <div>
          <label className="block text-sm font-semibold text-gray-700">Author</label>
          <input
            type="text"
            name="author"
            value={form.author}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-indigo-200"
          />
        </div>

        {/* Category */}
       <div>
  <label className="block mb-1 font-semibold">Category</label>
  <input
    type="text"
    name="category"
    value={form.category}
    onChange={handleChange}
    className="w-full border rounded px-3 py-2"
    placeholder="Enter category (e.g. Web Development)"
    required
  />
</div>

        {/* Tags */}
        <div>
          <label className="block text-sm font-semibold text-gray-700">Tags (comma-separated)</label>
          <input
            type="text"
            name="tags"
            value={form.tags}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-indigo-200"
          />
        </div>

        {/* Published Checkbox */}
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="published"
            checked={form.published}
            onChange={handleChange}
          />
          <label className="text-sm text-gray-700">Published</label>
        </div>

        {/* Featured Image */}
        <div>
          <label className="block text-sm font-semibold text-gray-700">Featured Image</label>
          <input type="file" accept="image/*" onChange={handleFileChange} />
          {uploading && <p className="text-sm text-gray-500 mt-1">Uploading image...</p>}
          {featuredImageUrl && (
            <img src={featuredImageUrl} alt="featured" className="w-48 mt-2 rounded" />
          )}
        </div>

        <button
          type="submit"
          disabled={loading || uploading}
          className="px-5 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
        >
          
        </button>

        {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
        {success && <p className="text-green-600 text-sm mt-2">{success}</p>}
      </form>
    </div>
  )
}
