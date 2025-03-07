import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged // Added for easier auth tracking
} from "firebase/auth";
import { 
  getFirestore, 
  doc, 
  setDoc, 
  getDoc,
  collection,
  query,  // Added for Firestore queries
  where,  // Added for filtering Firestore documents
  getDocs // Added for retrieving documents
} from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDJu67Qm59LqfGT1TH9ggmsCzb8wB__2HU",
  authDomain: "lifearcai-a8ef3.firebaseapp.com",
  projectId: "lifearcai-a8ef3",
  storageBucket: "lifearcai-a8ef3.appspot.com",
  messagingSenderId: "378111666114",
  appId: "1:378111666114:web:ac458213d594c77a01185b",
  measurementId: "G-RJWV9L5V3B",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

// Export Firebase modules for easy use
export { 
  app,
  auth, 
  provider, 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged, // Now you can import this directly
  db, 
  doc, 
  setDoc, 
  getDoc,
  collection,
  query,
  where,
  getDocs
};
