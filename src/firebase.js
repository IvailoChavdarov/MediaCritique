import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { firebaseConfig } from "./firebaseConfig";
import { getAuth } from "firebase/auth";

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const auth = getAuth(app);