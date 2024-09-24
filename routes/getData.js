import { Router } from "express";
import { database } from "../fireBase/database.js";
import { collection, getDocs } from "firebase/firestore"; 
const router = Router();

router.get("/", async (req, res) => {
    try {
        const collectionRef = collection(database, "sheet-data");
        const docData = await getDocs(collectionRef);
        
        // Check if the data in firebase is empty or not  
        if (!docData.empty) {
            const data = docData.docs.map(doc => ({ id: doc.id, ...doc.data() })); // Include document IDs
            console.log(data);
            return res.status(200).json({ data }); // Return the array of documents
        } else {
            return res.status(404).json({ message: "No data found" }); // Handle no documents
        }
    } catch (e) {
        console.log(`Could not able to get data: ${e.message}`);
        return res.status(500).json({ message: "Could not able to send data", error: e.message });
    }
});

export default router;
