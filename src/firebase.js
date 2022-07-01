// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


const firebaseConfig = {

    apiKey: "AIzaSyCd_lXP4BGd9dO9___J6Ah9DMaX_Mca1P0",
  
    authDomain: "booksy-29d36.firebaseapp.com",
  
    projectId: "booksy-29d36",
  
    storageBucket: "booksy-29d36.appspot.com",
  
    messagingSenderId: "981387367278",
  
    appId: "1:981387367278:web:205c2536b8a99f14b8677f"
  
  };
// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, storage }