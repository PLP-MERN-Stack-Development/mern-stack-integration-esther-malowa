const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');
const Post = require('../models/Post');
const authMiddleware = require('../middleware/authMiddleware');
const { body, validationResult } = require('express-validator');

// GET /api/posts/:postId/comments
router.get('/posts/:postId/comments', async (req, res) => {
  try {
    const { postId } = req.params;
    const comments = await Comment.find({ post: postId })
      .populate('author', 'name')
      .sort({ createdAt: 1 });
    res.json({ data: comments });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/posts/:postId/comments
router.post(
  '/posts/:postId/comments',
  authMiddleware,
  body('body').isLength({ min: 1 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    try {
      const { postId } = req.params;
      const post = await Post.findById(postId);
      if (!post) return res.status(404).json({ message: 'Post not found' });

      const comment = new Comment({
        post: postId,
        author: req.user._id,
        body: req.body.body,
      });

      await comment.save();
      const populated = await comment.populate('author', 'name');
      res.status(201).json({ data: populated });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// DELETE comment (only comment owner or post owner)
router.delete('/comments/:id', authMiddleware, async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) return res.status(404).json({ message: 'Not found' });

    const post = await Post.findById(comment.post);
    const isOwner =
      comment.author.equals(req.user._id) ||
      (post && post.author && post.author.equals(req.user._id));

    if (!isOwner) return res.status(403).json({ message: 'Forbidden' });

    await comment.deleteOne();
    res.json({ message: 'Deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
