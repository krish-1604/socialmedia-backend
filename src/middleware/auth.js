// src/middleware/authMiddleware.js
const { getAuth } = require('firebase/auth');
const { firebaseApp } = require('../config/firebase');

exports.verifyToken = async (req, res, next) => {
  try {
    // Get token from Authorization header
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. No token provided'
      });
    }
    
    const token = authHeader.split(' ')[1];
    
    // TEMPORARY: Just pass the token through without verifying
    // In production, you should use Firebase Admin SDK to verify tokens
    
    // Extract user ID from the request path or body for now
    // This is NOT secure and is only for development
    const uid = req.body.uid || req.params.userId || 'unknown-user';
    
    // Add user info to request
    req.user = {
      uid: uid,
      email: req.body.email || 'unknown@example.com'
    };
    
    console.warn('WARNING: Using insecure token verification. Set up Firebase Admin SDK for production.');
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    return res.status(401).json({
      success: false,
      message: 'Invalid token',
      error: error.message
    });
  }
};