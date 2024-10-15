import { Router } from "express";
import { database } from "../fireBase/database.js";
import { doc, deleteDoc, query, where, getDocs, collection } from "firebase/firestore"; 

const router = Router();

router.delete("/", async (req, res) => {
  try {
    const { date } = req.body;

    // Reference to the Firestore collection
    const collectionRef = collection(database, "true-growth-data");

    // Query documents where the date matches
    const q = query(collectionRef, where("date", "==", `${date}`));
    
    // Fetch the matching documents
    const querySnapshot = await getDocs(q);

    // Check if any documents were found
    if (querySnapshot.empty) {
      return res.json({ message: "Document not found" });
    }

    // Delete each document found
    querySnapshot.forEach(async (docSnapshot) => {
      await deleteDoc(doc(database, "true-growth-data", docSnapshot.id));
      console.log(`Deleted document with ID: ${docSnapshot.id}`);
    });

    return res.json({ message: "Document(s) deleted successfully" });

  } catch (e) {
    console.error(`Could not delete data: ${e.message}`);
    return res.status(500).json({ message: "Could not delete data", error: e.message });
  }
});

export default router;
