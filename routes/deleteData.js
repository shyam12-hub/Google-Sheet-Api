import { Router } from "express";
import { database } from "../fireBase/database.js";
import { doc, deleteDoc } from "firebase/firestore"; 
import { findId } from "../helper/findID.js";

const router = Router();

router.delete("/", async (req, res) => {
    try {
        const { id } = req.body;

        // Await the result of findId
        const exists = await findId(id);
        
        if (exists) {
            const docToDelete = doc(database, "sheet-data", id);
            await deleteDoc(docToDelete);
            console.log("Data deleted successfully");
            return res.status(200).json({ message: "Data deleted successfully" });
        } else {
            return res.status(404).json({ message: "Document not found" });
        }
    } catch (e) {
        console.log(`Could not delete data: ${e.message}`);
        return res.status(500).json({ message: "Could not delete data", error: e.message });
    }
});

export default router;
