import { Router } from "express";
import { database } from "../fireBase/database.js";
import { collection, getDocs,deleteDoc,doc } from "firebase/firestore";
import router from "./getTrueGrowthData.js";

router.delete("/", async (req, res) => {
  try {
    const collectionRef = collection(database, "sheet-data");

    // Fetch all documents from the collection
    const querySnapshot = await getDocs(collectionRef);

    if (querySnapshot.empty) {
      return res.json({ message: "No documents found" });
    }

    const duplicateDocData = [];
    const seenDocs = new Set();


    querySnapshot.docs.forEach(async(docSnapshot) => {
      const data = docSnapshot.data();
      const { username, date } = data;

      // Create a unique key based on username and date
      const key = `${username}_${date}`;

      // If this key has been seen, it's a duplicate, otherwise add to set
      if (seenDocs.has(key)) {
        await deleteDoc(doc(database,"sheet-data",docSnapshot.id));
        duplicateDocData.push({
            id: docSnapshot.id,
            username: username,
            date: date,
          });
      } else {
        seenDocs.add(key);
      }
    });

    return res.json({ duplicateDocData });
  } catch (e) {
    console.error(`Could not delete data: ${e.message}`);
    return res.status(500).json({ message: "Could not delete data", error: e.message });
  }
});

export default router;
