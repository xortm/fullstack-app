const express = require('express');
const router = express.Router();
const db = require('../config/database');
const { authenticateToken } = require('./auth');

// Get all posts
router.get('/', (req, res) => {
  db.all(`
    SELECT p.*, u.username
    FROM posts p
    JOIN users u ON p.user_id = u.id
    ORDER BY p.created_at DESC
  `, [], (err, posts) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.json(posts);
  });
});

// Get post by ID
router.get('/:id', (req, res) => {
  db.get(`
    SELECT p.*, u.username
    FROM posts p
    JOIN users u ON p.user_id = u.id
    WHERE p.id = ?
  `, [req.params.id], (err, post) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.json(post);
  });
});

// Create post
router.post('/', authenticateToken, (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ error: 'Title and content are required' });
  }

  db.run(
    'INSERT INTO posts (user_id, title, content) VALUES (?, ?, ?)',
    [req.user.id, title, content],
    function(err) {
      if (err) return res.status(500).json({ error: 'Failed to create post' });

      db.get(
        'SELECT * FROM posts WHERE id = ?',
        [this.lastID],
        (err, post) => {
          if (err) return res.status(500).json({ error: 'Database error' });
          res.status(201).json(post);
        }
      );
    }
  );
});

// Update post
router.put('/:id', authenticateToken, (req, res) => {
  const { title, content } = req.body;

  // Check if post belongs to user
  db.get('SELECT * FROM posts WHERE id = ?', [req.params.id], (err, post) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    if (!post) return res.status(404).json({ error: 'Post not found' });
    if (post.user_id !== req.user.id) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    db.run(
      'UPDATE posts SET title = ?, content = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
      [title, content, req.params.id],
      (err) => {
        if (err) return res.status(500).json({ error: 'Failed to update post' });

        db.get('SELECT * FROM posts WHERE id = ?', [req.params.id], (err, updatedPost) => {
          if (err) return res.status(500).json({ error: 'Database error' });
          res.json(updatedPost);
        });
      }
    );
  });
});

// Delete post
router.delete('/:id', authenticateToken, (req, res) => {
  // Check if post belongs to user
  db.get('SELECT * FROM posts WHERE id = ?', [req.params.id], (err, post) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    if (!post) return res.status(404).json({ error: 'Post not found' });
    if (post.user_id !== req.user.id) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    db.run('DELETE FROM posts WHERE id = ?', [req.params.id], (err) => {
      if (err) return res.status(500).json({ error: 'Failed to delete post' });
      res.json({ message: 'Post deleted successfully' });
    });
  });
});

module.exports = router;
