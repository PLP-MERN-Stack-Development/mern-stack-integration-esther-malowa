require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');

const connectDB = require('./src/config/db');
const errorHandler = require('./src/middleware/errorHandler');
const postsRoutes = require('./src/routes/posts');
const categoriesRoutes = require('./src/routes/categories');
const authRoutes = require('./src/routes/auth');
const commentsRoutes = require('./src/routes/comments');
const uploadsRoutes = require('./src/routes/uploads'); 

const app = express();

// Environment variables
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/blog_api_db';

// Connect to MongoDB
connectDB(MONGODB_URI);

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Static folder for uploaded images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API routes
app.use('/api/posts', postsRoutes);
app.use('/api/categories', categoriesRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/comments', commentsRoutes);
app.use('/api/uploads', uploadsRoutes); // added

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// Error handler middleware (always after routes)
app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
