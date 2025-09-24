// firebase/config.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAyM-O9jH0y18ojFklyNgGtWhl1hoBoVwE",
  authDomain: "alumni-mtsn2tanatoraja.firebaseapp.com",
  projectId: "alumni-mtsn2tanatoraja",
  storageBucket: "alumni-mtsn2tanatoraja.firebasestorage.app",
  messagingSenderId: "5662266115",
  appId: "1:5662266115:web:920b9509c6cee3354c0f36",
  measurementId: "G-Z9RZFXJTN7",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
