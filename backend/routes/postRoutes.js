const express = require('express');

const {
  getPosts,
  setPost,
  updatePost,
  deletePost,
} = require('../controllers/postController');

const router = express.Router();

const { protect } = require('../middleware/authMiddleware');

router.route('/').get(getPosts).post(protect, setPost);
router.route('/:id').put(protect, updatePost).delete(protect, deletePost);

module.exports = router;
