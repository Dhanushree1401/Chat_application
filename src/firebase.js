import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyD0QVnEqG7amo1KAa7d2VnvEcHexlmHerM",
  authDomain: "chatapplication-1d8b0.firebaseapp.com",
  databaseURL: "https://chatapplication-1d8b0-default-rtdb.firebaseio.com",
  projectId: "chatapplication-1d8b0",
  storageBucket: "chatapplication-1d8b0.firebasestorage.app",
  messagingSenderId: "604360241475",
  appId: "1:604360241475:web:73e40ffcd151de1964fff6",
  measurementId: "G-VEFHKM1W02"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
const storage = getStorage(app);
export { app, storage };
