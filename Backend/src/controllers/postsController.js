const Post = require('../models/Post');

//  Get all posts
exports.getAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.find()
      .populate('category', 'name')
      .sort({ createdAt: -1 });

    // Return consistent structure for frontend
    res.json({
      data: posts,
      total: posts.length,
      pages: 1
    });
  } catch (err) {
    next(err);
  }
};
//  Get single post
exports.getPostById = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id).populate('category', 'name');
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json(post);
  } catch (err) {
    next(err);
  }
};

//  Create post
exports.createPost = async (req, res, next) => {
  try {
    console.log("📩 Incoming post data:", req.body);
    const data = req.body;
    if (req.file) data.featuredImage = req.file.path;

    const newPost = new Post(data);
    const saved = await newPost.save();
    res.status(201).json(saved);
  } catch (err) {
    next(err);
  }
};

//  Update post
exports.updatePost = async (req, res, next) => {
  try {
    const data = req.body;
    if (req.file) data.featuredImage = req.file.path;

    const updated = await Post.findByIdAndUpdate(req.params.id, data, { new: true });
    if (!updated) return res.status(404).json({ message: 'Post not found' });
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

// Delete post
exports.deletePost = async (req, res, next) => {
  try {
    const deleted = await Post.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Post not found' });
    res.json({ message: 'Post deleted successfully' });
  } catch (err) {
    next(err);
  }
};

//  Add a comment
exports.addComment = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    post.comments.push({ user: req.user.id, text: req.body.text });
    await post.save();

    res.json(post.comments);
  } catch (err) {
    next(err);
  }
};

//  Get comments for a post
exports.getComments = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id).populate('comments.user', 'name');
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json(post.comments);
  } catch (err) {
    next(err);
  }
};
