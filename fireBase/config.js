
import { initializeApp } from "firebase/app";



const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMIAN,
  projectId: process.env.PORJECT_ID,
  storageBucket:process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID ,
  measurementId: process.env.MESURMENT_ID,
  DB_URL:process.env.DB_URL
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
