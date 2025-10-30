import React, { useState, useContext } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

export default function Login() {
  const { login } = useContext(AuthContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const location = useLocation()

  // 👇 this captures where the user came from (e.g. /posts/new)
  const from = location.state?.from || '/'
  console.log('Redirecting after login to:', from)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await login(email, password)
      navigate(from, { replace: true }) // 👈 go back to intended page
    } catch (err) {
      setError('Invalid credentials. Please try again.')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center text-indigo-600 mb-6">Login</h2>
        {error && <p className="text-red-500 text-sm mb-3 text-center">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mb-3 p-2 border rounded focus:outline-none focus:ring focus:ring-indigo-200"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mb-4 p-2 border rounded focus:outline-none focus:ring focus:ring-indigo-200"
            required
          />
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
          >
            Login
          </button>
        </form>

        <p className="text-sm text-center text-gray-600 mt-4">
          Don’t have an account?{' '}
          <Link to="/register" className="text-indigo-600 hover:underline">
            Register
          </Link>
        </p>
        <button
  onClick={() => navigate('/login', { state: { from: '/posts/new' } })}
  className="bg-gray-200 p-2"
>
 
</button>
      </div>
    </div>
  )
}
