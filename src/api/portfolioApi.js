import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { db } from "../firebase";

const docRef = doc(db, "portfolio", "data");

// realtime listener
export const subscribePortfolio = (callback) => {
  return onSnapshot(docRef, (docSnap) => {
    if (docSnap.exists()) {
      callback(docSnap.data());
    }
  });
};

// save
export const savePortfolio = async (data) => {
  await setDoc(docRef, data);
};