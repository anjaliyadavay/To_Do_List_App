// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCTyxPvMt04Hb19adKM_s7qrnLc4Jja1Og",
  authDomain: "to-do-list-b329e.firebaseapp.com",
  projectId: "to-do-list-b329e",
  storageBucket: "to-do-list-b329e.firebasestorage.app",
  messagingSenderId: "31189460265",
  appId: "1:31189460265:web:03eed1c0816034615ac338",
  measurementId: "G-DSBVF7XMJJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, addDoc, getDocs, updateDoc, deleteDoc, doc };