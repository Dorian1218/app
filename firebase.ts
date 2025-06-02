// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase, ref } from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB70l3peCCvlhcaGF-Kwj-8Fpc2uOS17cc",
  authDomain: "synchrony-c9963.firebaseapp.com",
  projectId: "synchrony-c9963",
  storageBucket: "synchrony-c9963.firebasestorage.app",
  messagingSenderId: "307768705200",
  appId: "1:307768705200:web:15e7e461eaff1cf8957b75",
  measurementId: "G-43SRJ2Z6KG"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
export const database = getDatabase(app);
export const dbRef = ref(database)