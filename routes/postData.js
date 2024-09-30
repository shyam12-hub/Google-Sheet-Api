import { Router } from "express";
import { database } from "../fireBase/database.js";
import { collection, addDoc } from "firebase/firestore"; 

const router = Router();

router.post("/", async (req, res) => {
    try {
        const { data } = req.body;

       

        // creating collection refercence
        const collectionRef = collection(database,"sheet-data");
        // checking sheet-data is present or not

 

        await addDoc(collectionRef,data)

        return res.status(201).json({ message: "Sheet data sent to database", data });
    } catch (e) {
        console.error("Could not POST data:", e);
        return res.status(500).json({ message: 'Could not send data', error: e.message });
    }
});

export default router;
