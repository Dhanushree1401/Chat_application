import { createContext, useContext, useEffect, useState } from "react";
import { 
  getAuth, GoogleAuthProvider, signInWithPopup, 
  signInWithEmailAndPassword, createUserWithEmailAndPassword, 
  sendPasswordResetEmail, signOut, onAuthStateChanged 
} from "firebase/auth";
import { auth } from "../firebase";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser({
          uid: currentUser.uid,
          email: currentUser.email,
          displayName: currentUser.displayName,
          photoURL: currentUser.photoURL || "https://via.placeholder.com/100",
        });
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  //  Google Login (Fetch Name & Profile Picture)
  const googleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      setUser({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL || "https://via.placeholder.com/100",
      });
    } catch (error) {
      console.error("Google Login Error:", error.message);
      throw new Error("Google Sign-In failed.");
    }
  };

  // Email Login
  const loginWithEmail = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      throw new Error("Incorrect email or password.");
    }
  };

  //  Register with Email
   const registerWithEmail = async (email, password, imageFile) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      let imageURL = "https://via.placeholder.com/100"; // Default image
      if (imageFile) {
        const imageRef = ref(storage, `profileImages/${user.uid}`);
        await uploadBytes(imageRef, imageFile);
        imageURL = await getDownloadURL(imageRef);
      }

      await updateProfile(user, {
        displayName: email.split("@")[0], // Use part of email as default name
        photoURL: imageURL
      });

      setUser({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: imageURL,
      });
    } catch (error) {
      throw new Error("Registration failed. Try again.");
    }
  };


  // Password Reset
  const resetPassword = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      throw new Error("Failed to send password reset email.");
    }
  };

  //  Logout
  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Logout Error:", error.message);
    }
  };

  return (
    <AuthContext.Provider value={{ user, googleLogin, loginWithEmail, registerWithEmail, resetPassword, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
