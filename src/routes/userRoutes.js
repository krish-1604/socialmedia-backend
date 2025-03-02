const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { verifyToken } = require('../middleware/auth');

// User routes
router.get('/profile/:userId', userController.getUserProfile);
router.put('/profile', verifyToken, userController.updateUserProfile);

module.exports = router;