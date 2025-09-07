// firebase/config.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDlun-H5HyuDscr1NMIK_O9NT-9LLfU3cs",
  authDomain: "alumnimtsn2tanatoraja.firebaseapp.com",
  projectId: "alumnimtsn2tanatoraja",
  storageBucket: "alumnimtsn2tanatoraja.firebasestorage.app",
  messagingSenderId: "1049084155371",
  appId: "1:1049084155371:web:af45d9eef46957696d35ae",
  measurementId: "G-PC089WSHGQ",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
