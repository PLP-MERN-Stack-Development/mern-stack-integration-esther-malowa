import React, { useEffect, useState, useContext } from 'react'
import apiService from '../services/apiService'
import { AuthContext } from '../context/AuthContext'

export default function Comments({ postId }) {
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(true)
  const [body, setBody] = useState('')
  const { user, token } = useContext(AuthContext)

  useEffect(() => {
    apiService.comments.list(postId).then(res => {
      setComments(res.data || res.data?.data || [])
    }).finally(()=>setLoading(false))
  }, [postId])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!user) return alert('Please login to comment')
    try {
      const res = await apiService.comments.create(postId, body)
      const created = res.data || res.data?.data
      setComments(prev => [...prev, created])
      setBody('')
    } catch (err) {
      alert('Comment failed: ' + err.message)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete comment?')) return
    try {
      await apiService.comments.remove(id)
      setComments(prev => prev.filter(c => c._id !== id))
    } catch (err) {
      alert('Delete failed: ' + err.message)
    }
  }

  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold">Comments</h3>
      {loading ? <p>Loading...</p> : (
        <>
          {comments.map(c => (
            <div key={c._id} className="border-b py-2">
              <div className="text-sm text-gray-700"><strong>{c.author?.name || 'User'}</strong> · <span className="text-xs text-gray-500">{new Date(c.createdAt).toLocaleString()}</span></div>
              <p className="mt-1">{c.body}</p>
              {user && (user._id === c.author?._id) && <button onClick={()=>handleDelete(c._id)} className="text-red-600 text-sm">Delete</button>}
            </div>
          ))}
          <form onSubmit={handleSubmit} className="mt-4">
            <textarea className="w-full border p-2 rounded" value={body} onChange={e=>setBody(e.target.value)} />
            <button className="mt-2 px-3 py-2 bg-indigo-600 text-white rounded">Post comment</button>
          </form>
        </>
      )}
    </div>
  )
}
