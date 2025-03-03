import { auth } from "../config/firebase.js";

export const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. No token provided'
      });
    }
    
    const token = authHeader.split(' ')[1];
    
    const currentUser = auth.currentUser;
    if (!currentUser) {
      return res.status(401).json({
        success: false,
        message: 'Not authenticated'
      });
    }
    
    req.user = {
      uid: currentUser.uid,
      email: currentUser.email
    };
    
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Invalid token',
      error: error.message
    });
  }
};