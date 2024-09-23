import { Router } from "express";
import { database } from "../fireBase/database.js";
import { set, ref } from "firebase/database";

const router = Router();

router.post("/", async (req, res) => {
    try {
        const { data } = req.body;

        // Validate incoming data
        if (!data || !data.message) {
            return res.status(400).json({ message: 'Invalid data format. Expecting { data: { message: "..." } }' });
        }

        // Save data to Firebase
        await set(ref(database, "sheet-data"), { data });

        return res.status(201).json({ message: "Sheet data sent to database", data });
    } catch (e) {
        console.error("Could not POST data:", e);
        return res.status(500).json({ message: 'Could not send data', error: e.message });
    }
});

export default router;
