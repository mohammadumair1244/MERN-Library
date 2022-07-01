// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage"
import { getAnalytics } from "firebase/analytics";

// const firebaseConfig = {

//     apiKey: "AIzaSyCd_lXP4BGd9dO9___J6Ah9DMaX_Mca1P0",
  
//     authDomain: "booksy-29d36.firebaseapp.com",
  
//     projectId: "booksy-29d36",
  
//     storageBucket: "booksy-29d36.appspot.com",
  
//     messagingSenderId: "981387367278",
  
//     appId: "1:981387367278:web:205c2536b8a99f14b8677f"
  
//   };

const firebaseConfig = {
  apiKey: "AIzaSyAZ04XLA2leFXjK9CXsCShY6qBG6XZT_Lk",
  authDomain: "library-mern.firebaseapp.com",
  projectId: "library-mern",
  storageBucket: "library-mern.appspot.com",
  messagingSenderId: "245178220125",
  appId: "1:245178220125:web:70c94faf9f53666b4817b4",
  measurementId: "G-RJ0Y0TXBDE"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, storage }