const express = require('express');
const router = express.Router();
const postsController = require('../controllers/postsController');
const { createPostSchema, updatePostSchema } = require('../validators/postsValidator');
const authMiddleware = require('../middleware/authMiddleware');
const multer = require('multer');
const Joi = require('joi');

// Image upload setup using Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); 
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

// Reusable Joi validator
function validate(schema) {
  return (req, res, next) => {
    const result = schema.validate(req.body, { abortEarly: false, stripUnknown: true });
    if (result.error) {
      result.error.isJoi = true;
      return next(result.error);
    }
    req.body = result.value;
    next();
  };
}

// Public routes
router.get('/', postsController.getAllPosts);
router.get('/:id', postsController.getPostById);

// Protected routes
router.post('/', authMiddleware, upload.single('image'), validate(createPostSchema), postsController.createPost);
router.put('/:id', authMiddleware, upload.single('image'), validate(updatePostSchema), postsController.updatePost);
router.delete('/:id', authMiddleware, postsController.deletePost);

// Comments routes
router.post('/:id/comments', authMiddleware, postsController.addComment);
router.get('/:id/comments', postsController.getComments);

module.exports = router;
