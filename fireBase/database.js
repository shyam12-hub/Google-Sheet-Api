import { firebaseApp } from "./config.js";
import { getFirestore  } from "firebase/firestore";

export const database = getFirestore(firebaseApp)