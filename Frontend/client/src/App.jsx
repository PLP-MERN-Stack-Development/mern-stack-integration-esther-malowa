import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import PostList from './components/PostList';
import PostView from './components/PostView';
import PostForm from './components/PostForm';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import EditPost from './components/EditPost';

export default function App() {
  return (
    <Routes>
      {/* Public layout-wrapped routes */}
      <Route element={<Layout />}>
        <Route path="/" element={<PostList />} />
        <Route path="/posts" element={<PostList />} />   {/* ✅ Added this */}
        <Route path="/posts/:id" element={<PostView />} />

        {/* Protected routes for creating/editing */}
        <Route
          path="/posts/new"
          element={
            <ProtectedRoute>
              <PostForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/posts/edit/:id"
          element={
            <ProtectedRoute>
              <EditPost />
            </ProtectedRoute>
          }
        />
      </Route>

      {/* Auth routes (NOT wrapped in Layout) */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}
