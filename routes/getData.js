import { Router } from "express";
import { database } from "../fireBase/database.js";
import { collection, getDocs, query, where } from "firebase/firestore"; 

const router = Router();

router.get("/", async (req, res) => {
    const { username } = req.query;  // Retrieve the username from query parameters

    if (!username) {
        return res.status(400).json({ message: "Username is required" }); // Handle missing username
    }

    try {
        const collectionRef = collection(database, "sheet-data");

        // Query Firestore to filter by the 'username' field
        const q = query(collectionRef, where("username", "==", username));
        const docData = await getDocs(q);
        
        // Check if documents exist
        if (!docData.empty) {
            const data = docData.docs.map(doc => ({ id: doc.id, ...doc.data() })); // Include document IDs
            console.log(data);
            return res.status(200).json({ data }); // Return the filtered documents
        } else {
            return res.status(404).json({ message: "No data found for the provided username" }); // Handle no documents found
        }
    } catch (e) {
        console.log(`Could not get data: ${e.message}`);
        return res.status(500).json({ message: "Could not retrieve data", error: e.message });
    }
});

export default router;
