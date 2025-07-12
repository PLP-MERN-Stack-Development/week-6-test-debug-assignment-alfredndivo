const express = require('express');
const Post = require('./../models/Post');
const auth = require('../middleware/authMiddleware');

const router = express.Router();

// Create post
router.post('/', auth, async (req, res) => {
  console.log('POST /posts - Creating post');

  try {
    const { title, content, category } = req.body;
    if (!title || !content || !category) {
      return res.status(400).json({ error: 'Missing fields' });
    }

    const post = await Post.create({
      title,
      content,
      category,
      slug: title.toLowerCase().replace(/\s+/g, '-'),
      author: req.user._id,
    });

    res.status(201).json(post);
  } catch (err) {
    console.error('Error creating post:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get all posts
router.get('/', async (req, res) => {
  console.log('GET /posts - Fetching posts');

  try {
    const { category, page = 1, limit = 10 } = req.query;
    const filter = category ? { category } : {};

    const posts = await Post.find(filter)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.json(posts);
  } catch (err) {
    console.error('Error fetching posts:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get single post
router.get('/:id', async (req, res) => {
  console.log(`GET /posts/${req.params.id} - Fetching single post`);

  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.json(post);
  } catch (err) {
    console.error('Error fetching single post:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update post
router.put('/:id', auth, async (req, res) => {
  console.log(`PUT /posts/${req.params.id} - Updating post`);

  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });

    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    Object.assign(post, req.body);
    await post.save();
    res.json(post);
  } catch (err) {
    console.error('Error updating post:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete post
router.delete('/:id', auth, async (req, res) => {
  console.log(`DELETE /posts/${req.params.id} - Deleting post`);

  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });

    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    await post.deleteOne();
    res.status(200).json({ message: 'Deleted' });
  } catch (err) {
    console.error('Error deleting post:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
