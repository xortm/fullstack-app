const express = require('express');
const router = express.Router();
const db = require('../config/database');
const { authenticateToken } = require('./auth');

// Get all users
router.get('/', authenticateToken, (req, res) => {
  db.all(
    'SELECT id, username, email, created_at FROM users',
    [],
    (err, users) => {
      if (err) return res.status(500).json({ error: 'Database error' });
      res.json(users);
    }
  );
});

// Get user by ID
router.get('/:id', authenticateToken, (req, res) => {
  db.get(
    'SELECT id, username, email, created_at FROM users WHERE id = ?',
    [req.params.id],
    (err, user) => {
      if (err) return res.status(500).json({ error: 'Database error' });
      if (!user) return res.status(404).json({ error: 'User not found' });
      res.json(user);
    }
  );
});

module.exports = router;
