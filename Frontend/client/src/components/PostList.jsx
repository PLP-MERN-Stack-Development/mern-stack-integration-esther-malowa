import React, { useContext, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { PostsContext } from '../context/PostsContext'
import api from '../api'; 
import { apiGetPosts, apiDeletePost } from "../api";



export default function PostList() {
  // Only pull what you need from context
 

  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [deleting, setDeleting] = useState(null)

  const [page, setPage] = useState(1)
  const [limit] = useState(10)
  const [q, setQ] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')
  const [categories, setCategories] = useState([])
  const [total, setTotal] = useState(0)
  const [pages, setPages] = useState(1)

  //  Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get('/categories')
        setCategories(res.data?.data || res.data || [])
      } catch (err) {
        console.error('Failed to load categories:', err)
        setCategories([])
      }
    }
    fetchCategories()
  }, [api])

  //  Fetch posts
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true)
      setError(null)

      try {
        const params = new URLSearchParams({ page, limit })
        if (q) params.set('q', q)
        if (categoryFilter) params.set('category', categoryFilter)

        const res = await api.get(`/posts?${params.toString()}`)
        const { data, total: t, pages: p } = res.data || res
        setPosts(data || [])
        setTotal(t || 0)
        setPages(p || 1)
      } catch (err) {
        console.error(err)
        setError(err.message || 'Failed to fetch posts')
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [page, limit, q, categoryFilter, api])

 const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this post?')) return
    try {
      setDeleting(id)
      await apiDeletePost(id)
      setPosts(prev => prev.filter(post => post._id !== id))
    } catch (err) {
      console.error(err)
      alert('Failed to delete post.')
    } finally {
      setDeleting(null)
    }
  }


  if (loading) return <div className="text-center text-gray-500 mt-10">Loading posts...</div>
  if (error) return <div className="text-center text-red-600 mt-10">Error: {error}</div>

  return (
    <section className="max-w-5xl mx-auto mt-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-indigo-700">Latest Posts</h1>
        
      </div>

      {/* Search & filter */}
      <div className="flex flex-wrap gap-4 mb-6">
        <input
          type="text"
          placeholder="Search posts..."
          value={q}
          onChange={e => { setQ(e.target.value); setPage(1) }}
          className="border rounded-md p-2 w-full md:w-1/3 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
        />
        <select
          value={categoryFilter}
          onChange={e => { setCategoryFilter(e.target.value); setPage(1) }}
          className="border rounded-md p-2 w-full md:w-1/3 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
        >
          <option value="">All categories</option>
          {categories.map(c => (
            <option key={c._id} value={c._id}>{c.name}</option>
          ))}
        </select>
      </div>

      {posts.length === 0 ? (
        <div className="text-center">
          <p className="text-gray-600 mb-2">No posts found.</p>
          <Link to="/posts/new" className="text-indigo-600 underline">Create one now</Link>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {posts.map(post => (
            <div
              key={post._id}
              className="bg-white p-5 rounded-lg shadow hover:shadow-lg transition transform hover:-translate-y-1 relative"
            >
              <div className="flex justify-between items-start">
                <Link
                  to={`/posts/${post._id}`}
                  className="text-xl font-semibold text-gray-900 hover:text-indigo-700"
                >
                  {post.title}
                </Link>

                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    post.published ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                  }`}
                >
                  {post.published ? 'Published' : 'Draft'}
                </span>
              </div>

              <p className="text-gray-600 text-sm mt-2 mb-3">
                {post.excerpt || post.body.slice(0, 100) + '...'}
              </p>

              <div className="text-xs text-gray-500 mb-3">
                <span className="block">Author: {post.author || 'Anonymous'}</span>
                <span className="block">Category: {post.category?.name || 'Uncategorized'}</span>
              </div>

              <div className="flex justify-between items-center mt-4">
                <Link
                  to={`/posts/edit/${post._id}`}
                  className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                >
                  ✏️ Edit
                </Link>

                <button
                  onClick={() => handleDelete(post._id)}
                  disabled={deleting === post._id}
                  className="text-red-600 hover:text-red-800 text-sm font-medium"
                >
                  {deleting === post._id ? 'Deleting...' : '🗑️ Delete'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination controls */}
      <div className="mt-6 flex items-center justify-center gap-4">
        <button
          disabled={page <= 1}
          onClick={() => setPage(p => p - 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span>Page {page} of {pages}</span>
        <button
          disabled={page >= pages}
          onClick={() => setPage(p => p + 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </section>
  )
}
