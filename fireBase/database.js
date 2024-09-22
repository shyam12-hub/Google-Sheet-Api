import { firebaseApp } from "./config.js";
import { getDatabase } from "firebase/database";

export const database = getDatabase(firebaseApp)