import { auth, db } from "../config/firebase.js";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore"; 

export const signup = async (req, res) => {
  const { firstname, lastname, username, email, password, profilepic } = req.body;

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    await setDoc(doc(db, "users", user.uid), {
      firstname,
      lastname,
      username,
      email,
      profilepic: profilepic || null,
      createdAt: new Date().toISOString()
    });

    const token = await user.getIdToken();

    return res.status(200).json({ 
      message: "User registered successfully", 
      uid: user.uid,
      token,
      email,
      firstName: firstname, 
      lastName: lastname,
      username
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    const userDoc = await getDoc(doc(db, "users", user.uid));
    
    if (!userDoc.exists()) {
      return res.status(404).json({ error: "User data not found" });
    }
    
    const userData = userDoc.data();
    const token = await user.getIdToken();
    
    return res.status(200).json({
      message: "Login successful",
      uid: user.uid,
      token,
      email: userData.email,
      firstName: userData.firstname,
      lastName: userData.lastname,
      username: userData.username,
      profilepic: userData.profilepic || null
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};