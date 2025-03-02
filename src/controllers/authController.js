import { auth,db } from "../config/firebase.js";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore"; 
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

    return res.status(200).json({ message: "User registered successfully", uid: user.uid });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
