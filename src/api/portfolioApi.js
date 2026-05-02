import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

const DOC_REF = doc(db, "portfolio", "main");


export const loadPortfolio = async () => {
  const snap = await getDoc(DOC_REF);
  if (snap.exists()) {
    return snap.data();
  }
  return null;
};


export const savePortfolio = async (data) => {
  await setDoc(DOC_REF, data, { merge: true });
};