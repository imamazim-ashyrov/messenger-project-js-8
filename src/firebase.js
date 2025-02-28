import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDfFGvgrFAZGHDC-Pm2HoR66Hy6P5e3leM",
  authDomain: "redux-todo-list-6ddbd.firebaseapp.com",
  projectId: "redux-todo-list-6ddbd",
  storageBucket: "redux-todo-list-6ddbd.firebasestorage.app",
  messagingSenderId: "364449402805",
  appId: "1:364449402805:web:237692a3db2a984e9d93fc",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);