import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function Register() {
  const { register } = useContext(AuthContext)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
     await register(name, email, password)
      navigate('/') // redirect after successful registration
    } catch (err) {
      setError(err.message || 'Registration failed')
    }
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Register</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          className="w-full p-2 border"
          placeholder="Name"
        />
        <input
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full p-2 border"
          placeholder="Email"
        />
        <input
          value={password}
          onChange={e => setPassword(e.target.value)}
          type="password"
          className="w-full p-2 border"
          placeholder="Password"
        />
        {error && <div className="text-red-600">{error}</div>}
        <button className="px-4 py-2 bg-indigo-600 text-white rounded">
          Register
        </button>
      </form>
    </div>
  )
}
