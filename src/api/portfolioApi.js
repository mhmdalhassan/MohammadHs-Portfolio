import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { db } from "../firebase";

const docRef = doc(db, "portfolio", "data");

// realtime listener
export const subscribePortfolio = (callback) => {
  return onSnapshot(docRef, (snap) => {
    callback(snap.data());
  });
};

// save updates
export const savePortfolio = async (data) => {
  await setDoc(docRef, data, { merge: true });
};