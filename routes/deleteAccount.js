const express = require('express');
const pool = require('../db'); // Ensure correct MySQL config
const router = express.Router();

router.post('/delete-account', async (req, res) => {
  const { userId, delete_reason } = req.body;

  // 1. Validate input
  if (!userId || !delete_reason) {
    return res.status(400).json({
      message: 'Missing userId or delete_reason in request body.'
    });
  }

  try {
    const conn = await pool.getConnection();

    // 2. First check if user exists and is not already deleted
    const [users] = await conn.query(
      `SELECT id, is_deleted FROM users WHERE id = ?`,
      [userId]
    );

    if (users.length === 0) {
      conn.release();
      return res.status(404).json({ message: 'User not found.' });
    }

    if (users[0].is_deleted) {
      conn.release();
      return res.status(400).json({ message: 'User is already soft deleted.' });
    }

    // 3. Perform soft delete
    const [result] = await conn.query(
      `UPDATE users 
       SET is_deleted = TRUE, 
           deleted_at = NOW(), 
           delete_reason = ? 
       WHERE id = ?`,
      [delete_reason, userId]
    );

    conn.release();

    res.status(200).json({
      message: 'Account soft deleted successfully.'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Failed to delete account',
      error: error.message
    });
  }
});

module.exports = router;
