import React, { useState, useContext } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { AuthContext } from '../context/AuthContext'

export default function Nav() {
  const { user } = useContext(AuthContext)

  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)

  const handleNewPost = () => {
    if (user) {
      navigate('/posts/new')
    } else {
      navigate('/login', { state: { from: '/posts/new' } })
    }
  }



  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50 border-b">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-bold text-indigo-600 tracking-tight hover:text-indigo-700 transition-colors"
          >
            MyBlog
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `px-3 py-2 rounded-md text-sm font-medium transition ${
                  isActive
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-indigo-700'
                }`
              }
            >
              Posts
            </NavLink>

            <button
              onClick={handleNewPost}
              className="px-4 py-2 rounded-md bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 shadow transition"
            >
              + New Post
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-md text-gray-600 hover:text-indigo-600 hover:bg-gray-100 transition"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t shadow-sm">
          <div className="px-4 py-3 space-y-2">
            <NavLink
              to="/"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `block px-3 py-2 rounded-md text-sm font-medium ${
                  isActive
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-indigo-700'
                }`
              }
            >
              Posts
            </NavLink>
            <button
              onClick={() => {
                setIsOpen(false)
                handleNewPost()
              }}
              className="block w-full text-left px-3 py-2 rounded-md bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition"
            >
              + New Post
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}
