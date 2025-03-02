const { db } = require('../config/firebase'); // Import Firestore database instance
const { serverTimestamp, collection, doc, getDoc, getDocs, setDoc, updateDoc, deleteDoc, query, where, limit } = require('firebase/firestore'); // Import Firestore functions

const usersCollection = collection(db, 'users'); // Reference to the 'users' collection

class User {
  // Create a new user document
  static async create(userData) {
    try {
      const userRef = doc(usersCollection, userData.uid);
      await setDoc(userRef, userData);
      return userData;
    } catch (error) {
      throw error;
    }
  }

  // Find user by UID
  static async findByUid(uid) {
    try {
      const userRef = doc(usersCollection, uid);
      const userDoc = await getDoc(userRef);

      if (!userDoc.exists()) {
        return null;
      }

      return { uid, ...userDoc.data() };
    } catch (error) {
      throw error;
    }
  }

  // Find user by email
  static async findByEmail(email) {
    try {
      const q = query(usersCollection, where('email', '==', email), limit(1));
      const snapshot = await getDocs(q);

      if (snapshot.empty) {
        return null;
      }

      const userDoc = snapshot.docs[0];
      return { uid: userDoc.id, ...userDoc.data() };
    } catch (error) {
      throw error;
    }
  }

  // Find user by username
  static async findByUsername(username) {
    try {
      const q = query(usersCollection, where('username', '==', username), limit(1));
      const snapshot = await getDocs(q);

      if (snapshot.empty) {
        return null;
      }

      const userDoc = snapshot.docs[0];
      return { uid: userDoc.id, ...userDoc.data() };
    } catch (error) {
      throw error;
    }
  }

  // Update user data
  static async update(uid, userData) {
    try {
      const userRef = doc(usersCollection, uid);
      await updateDoc(userRef, {
        ...userData,
        updatedAt: serverTimestamp(), // Use server timestamp
      });

      return true;
    } catch (error) {
      throw error;
    }
  }

  // Delete user
  static async delete(uid) {
    try {
      const userRef = doc(usersCollection, uid);
      await deleteDoc(userRef);
      return true;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = User;
