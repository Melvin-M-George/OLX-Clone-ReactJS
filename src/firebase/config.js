import React from "react";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore'
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyALmKS0XQ18sNyMdQ2abA4SV5FWJcIq5r4",
  authDomain: "olx-clone-b7999.firebaseapp.com",
  projectId: "olx-clone-b7999",
  storageBucket: "olx-clone-b7999.firebasestorage.app",
  messagingSenderId: "702982071645",
  appId: "1:702982071645:web:caf5af43f5677607d7f4b4"
};


const firebase = initializeApp(firebaseConfig);
const auth = getAuth(firebase)
const db = getFirestore(firebase)
const storage = getStorage(firebase)
export { auth, db, storage ,firebase}
