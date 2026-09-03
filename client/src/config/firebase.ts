import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyChEp7azhYzHhUix_OMEu9NtVwFS9SCeHg",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "sih-artisian.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "sih-artisian",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "sih-artisian.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "966876392475",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:966876392475:web:1713436950c8ae0f1bdcbe",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-ZE5X6DB5P1"
};

export const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
export const googleProvider = new GoogleAuthProvider();

export {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged
};
export type { FirebaseUser };
