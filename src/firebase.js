import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut 
} from "firebase/auth";
import { 
  getFirestore, 
  doc, 
  setDoc, 
  getDoc,
  collection 
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDJu67Qm59LqfGT1TH9ggmsCzb8wB__2HU",
  authDomain: "lifearcai-a8ef3.firebaseapp.com",
  projectId: "lifearcai-a8ef3",
  storageBucket: "lifearcai-a8ef3.appspot.com",
  messagingSenderId: "378111666114",
  appId: "1:378111666114:web:ac458213d594c77a01185b",
  measurementId: "G-RJWV9L5V3B",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export { 
  auth, 
  provider, 
  db, 
  signInWithPopup, 
  signOut, 
  doc, 
  setDoc, 
  getDoc,
  collection 
};
