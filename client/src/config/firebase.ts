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
  apiKey: "AIzaSyChEp7azhYzHhUix_OMEu9NtVwFS9SCeHg",
  authDomain: "sih-artisian.firebaseapp.com",
  projectId: "sih-artisian",
  storageBucket: "sih-artisian.firebasestorage.app",
  messagingSenderId: "966876392475",
  appId: "1:966876392475:web:1713436950c8ae0f1bdcbe",
  measurementId: "G-ZE5X6DB5P1"
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
