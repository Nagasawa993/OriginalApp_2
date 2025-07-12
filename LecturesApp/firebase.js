// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBad-2ZcZJhUoWesiNXDbqd5cpC2bKwyAc",
  authDomain: "lecturesapp.firebaseapp.com",
  projectId: "lecturesapp",
  storageBucket: "lecturesapp.firebasestorage.app",
  messagingSenderId: "634564613028",
  appId: "1:634564613028:web:510dc904280fbcc757e731",
  measurementId: "G-C4YWX4H7XS"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
