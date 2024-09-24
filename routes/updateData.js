import { Router } from "express";
import { database } from "../fireBase/database.js";
import { doc, updateDoc } from "firebase/firestore"; 

const router = Router();

router.patch("/", async (req, res) => {
    try {
        const { id, data } = req.body; // Extract the id and data from the request body
        
        // Create a reference to the document to update
        const docToUpdate = doc(database, "sheet-data", id);
        
        // Update the document with the new data
        await updateDoc(docToUpdate, { data }); // Assuming you want to store data under 'message'

        return res.status(200).json({ message: "Data updated successfully", data });
    } catch (e) {
        console.log("Could not able to update:", e.message);
        return res.status(500).json({ message: "Could not update data", error: e.message });
    }
});

export default router;
