import { User } from "../models/user.js";

export const getUserProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    
    const userData = await User.findByUid(userId);
    
    if (!userData) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    const { password, ...userProfile } = userData;
    
    return res.status(200).json({
      success: true,
      data: userProfile
    });
  } catch (error) {
    console.error('Get user profile error:', error);
    return res.status(500).json({
      success: false,
      message: 'Error getting user profile',
      error: error.message
    });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const uid = req.user.uid;
    const { username, fullName, bio, profilePicture } = req.body;
    
    const existingUser = await User.findByUid(uid);
    
    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    // Update user data
    const userData = {
      username: username || existingUser.username,
      fullName: fullName || existingUser.fullName,
      bio: bio || existingUser.bio,
      profilePicture: profilePicture || existingUser.profilePicture,
      updatedAt: new Date()
    };
    
    await User.update(uid, userData);
    
    const updatedUser = await User.findByUid(uid);
    
    return res.status(200).json({
      success: true,
      message: 'User profile updated successfully',
      data: updatedUser
    });
  } catch (error) {
    console.error('Update user profile error:', error);
    return res.status(500).json({
      success: false,
      message: 'Error updating user profile',
      error: error.message
    });
  }
};