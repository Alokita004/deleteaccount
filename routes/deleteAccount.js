const express = require('express');
const axios = require('axios');
const router = express.Router();

router.post('/delete-account', async (req, res) => {
  const { delete_reason } = req.body;

  try {
    const response = await axios.post(
      'https://nd8x1t1g-3030.inc1.devtunnels.ms/api/user/deleteAccount',
      { delete_reason },
      {
        headers: {
          Authorization: `Bearer ${req.headers.authorization}`,
          versioncode: '1',
          devicetype: 'android',
          'Content-Type': 'application/json'
        }
      }
    );

    res.status(200).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({
      message: 'Failed to delete account',
      error: error.response?.data || error.message
    });
  }
});

module.exports = router;
