// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAVk4vGc8dY0hCGdY0UkGLXMRBYI-fSlCs",
  authDomain: "dinetime2.firebaseapp.com",
  projectId: "dinetime2",
  storageBucket: "dinetime2.firebasestorage.app",
  messagingSenderId: "169856437842",
  appId: "1:169856437842:web:cc9722cb53d0f5443ad98b",
  measurementId: "G-PHK1BBHY2X",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
