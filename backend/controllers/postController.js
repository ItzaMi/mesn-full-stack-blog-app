const asyncHandler = require('express-async-handler');

const Post = require('../models/Post.js');
const User = require('../models/User.js');

/**
 * @desc Get all posts
 * @route GET /api/posts/
 * @access Public
 */
const getPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find();

  res.status(200).json(posts);
});

/**
 * @desc Set post
 * @route POST /api/posts/
 * @access Private
 */
const setPost = asyncHandler(async (req, res) => {
  if (!req.body.title) {
    res.status(400);
    throw new Error('Please add a title to your post');
  }
  if (!req.body.content) {
    res.status(400);
    throw new Error('Please add content to your post');
  }

  const post = await Post.create({
    title: req.body.title,
    content: req.body.content,
    user: req.user.id,
  });

  res.status(200).json(post);
});

/**
 * @desc Update post
 * @route PUT /api/posts/:id
 * @access Private
 */
const updatePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    res.status(400);
    throw new Error('Post not found');
  }

  const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  const user = await User.findById(req.user.id);

  if (post.user.toString() !== user.id) {
    res.status(401);
    throw new Error('You are not authorized to update this post');
  }

  res.status(200).json(updatedPost);
});

/**
 * @desc Delete post
 * @route DELETE /api/posts/:id
 * @access Private
 */
const deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    res.status(400);
    throw new Error('Post not found');
  }

  const user = await User.findById(req.user.id);

  if (post.user.toString() !== user.id) {
    res.status(401);
    throw new Error('You are not authorized to remove this post');
  }

  await post.remove();

  res.status(200).json({ id: req.params.id });
});

module.exports = { getPosts, setPost, updatePost, deletePost };
