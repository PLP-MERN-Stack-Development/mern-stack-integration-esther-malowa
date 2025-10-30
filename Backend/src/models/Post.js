const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    body: { type: String, required: true },
    excerpt: String,
    author: { type: String, required: true },
    category:{ type: String, required: true },
    tags: [String],
    published: { type: Boolean, default: false },
    featuredImage: String,
    comments: [commentSchema]
  },
  { timestamps: true }
);

module.exports = mongoose.model('Post', postSchema);
