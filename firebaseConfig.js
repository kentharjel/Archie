// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCaJD-1RcwT0cq8qMFzTnYwZbGrIOmA1I4",
  authDomain: "arch-3406c.firebaseapp.com",
  projectId: "arch-3406c",
  storageBucket: "arch-3406c.firebasestorage.app",
  messagingSenderId: "763081886863",
  appId: "1:763081886863:web:9ae03cff9dbb1a3cca74fa"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)