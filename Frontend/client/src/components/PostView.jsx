import React, { useEffect, useState, useContext } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { PostsContext } from '../context/PostsContext'

export default function PostView() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { api, reload } = useContext(PostsContext)

  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [deleting, setDeleting] = useState(false)

  // ✅ Fetch single post
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await api.get(`/api/posts/${id}`)
        setPost(res.data)
      } catch (err) {
        setError(err.message || 'Failed to fetch post')
      } finally {
        setLoading(false)
      }
    }
    fetchPost()
  }, [id, api])

  // ✅ Handle delete (optimistic UI)
  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this post?')) return

    setDeleting(true)
    try {
      await api.del(`/api/posts/${id}`)
      await reload() // refresh list context
      navigate('/')
    } catch (err) {
      alert('❌ Delete failed: ' + err.message)
    } finally {
      setDeleting(false)
    }
  }

  // ✅ Loading & error states
  if (loading)
    return (
      <div className="text-center mt-10 text-gray-500 animate-pulse">
        Loading post...
      </div>
    )

  if (error)
    return (
      <div className="text-center mt-10 text-red-600">
        Error loading post: {error}
      </div>
    )

  if (!post)
    return (
      <div className="text-center mt-10 text-gray-600">
        Post not found or has been deleted.
      </div>
    )

  return (
    <article className="bg-white shadow-lg rounded-lg p-8 max-w-3xl mx-auto mt-8">
      {/* Title + Metadata */}
      <div className="flex justify-between items-start mb-4">
        <h1 className="text-3xl font-bold text-indigo-700">{post.title}</h1>
        <span
          className={`text-xs px-3 py-1 rounded-full ${
            post.published
              ? 'bg-green-100 text-green-700'
              : 'bg-yellow-100 text-yellow-700'
          }`}
        >
          {post.published ? 'Published' : 'Draft'}
        </span>
      </div>

      <p className="text-sm text-gray-500 mb-4">
        Category:{' '}
        <span className="font-medium text-gray-700">
          {post.category?.name || 'Uncategorized'}
        </span>
      </p>

      {post.tags?.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {post.tags.map((tag, idx) => (
            <span
              key={idx}
              className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Body */}
      <p className="text-gray-800 leading-relaxed mb-8 whitespace-pre-wrap">
        {post.body}
      </p>

      {/* Author & Timestamp */}
      <div className="text-sm text-gray-500 mb-8 border-t pt-3">
        <p>
          ✍️ Author:{' '}
          <span className="font-medium text-gray-700">
            {post.author || 'Anonymous'}
          </span>
        </p>
        {post.createdAt && (
          <p>
            🕓 Created:{' '}
            {new Date(post.createdAt).toLocaleDateString('en-GB', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            })}
          </p>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3 justify-end">
        <Link
          to={`/posts/edit/${id}`}
          className="px-5 py-2 bg-yellow-400 text-black rounded-md hover:bg-yellow-500 transition"
        >
          ✏️ Edit
        </Link>

        <button
          onClick={handleDelete}
          disabled={deleting}
          className={`px-5 py-2 rounded-md text-white transition ${
            deleting
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-red-600 hover:bg-red-700'
          }`}
        >
          {deleting ? 'Deleting...' : '🗑️ Delete'}
        </button>

        <Link
          to="/"
          className="px-5 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100 transition"
        >
          ← Back
        </Link>
      </div>
    </article>
  )
}
