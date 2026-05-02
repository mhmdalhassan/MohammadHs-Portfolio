import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCFmD2Mid-rAiNla4qdg9LxaWD1n37PZ-U",
  authDomain: "mohammad-hs-portfolio.firebaseapp.com",
  projectId: "mohammad-hs-portfolio",
  storageBucket: "mohammad-hs-portfolio.appspot.com",
  messagingSenderId: "340478614888",
  appId: "1:340478614888:web:5c6811d9a6ff6f98d50add",
  measurementId: "G-9CF00KXT7G"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };