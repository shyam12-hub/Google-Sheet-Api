import { getDoc, doc } from "firebase/firestore";
import { database } from "../fireBase/database.js";

export async function findId(id) {
    try {
        // Create a reference to the document
        const docRef = doc(database, "sheet-data", id);
        
        // Get the document
        const docData = await getDoc(docRef);
        
        // Check if the document exists
        if (docData.exists()) {
            return true; // Document exists
        } else {
            return false; // Document does not exist
        }
    } catch (e) {
        console.error("Error getting document:", e.message); // Use console.error for errors
        return false; // Return false in case of an error
    }
}
