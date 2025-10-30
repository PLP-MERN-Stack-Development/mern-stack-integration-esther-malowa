import React, { useContext } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Layout() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleNewPostClick = () => {
    if (user) {
      navigate('/posts/new'); // logged in → post form
    } else {
      navigate('/login'); // not logged in → login page
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 text-gray-800">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 flex justify-between items-center px-8 py-4 bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-200">
        <h1
          className="text-2xl font-bold text-indigo-600 tracking-tight hover:text-indigo-700 transition cursor-pointer"
          onClick={() => navigate('/')}
        >
          MyBlog
        </h1>

        <div className="space-x-3">
          <button
            className="px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-xl hover:bg-indigo-100 transition-all duration-200 shadow-sm"
            onClick={() => navigate('/posts')}
          >
            Posts
          </button>
          <button
            onClick={handleNewPostClick}
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 transition-all duration-200 shadow-sm"
          >
            + New Post
          </button>
        </div>
      </nav>

      {/* Routed content */}
      <main className="flex-1 container mx-auto px-6 py-12">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-white py-6 mt-auto border-t border-gray-200 text-center text-gray-500 text-sm shadow-inner">
        © {new Date().getFullYear()}{' '}
        <span className="font-semibold text-indigo-600 hover:text-indigo-700 transition">
          MyBlog
        </span>{' '}
        — Built with React & Tailwind CSS
      </footer>
    </div>
  );
}
