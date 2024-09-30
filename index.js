import dotenv from "dotenv";
import postData from "./routes/postData.js";
import getData from "./routes/getData.js";
import updateData from "./routes/updateData.js";
import deleteData from "./routes/deleteData.js";
import postTrueGrowth from "./routes/postTrueGrowth.js"
import getTrueGrowthData from "./routes/getTrueGrowthData.js"
import express from "express";
import cors from "cors";

dotenv.config({
  path: "./env"
});

const app = express();

// CORS configuration
app.use(cors({
  origin: '*', // Change to specific domains if needed
  methods: ["GET", "POST", "PATCH", "DELETE"],
  credentials: true,
}));

app.use(express.json());

app.use("/postData", postData);
app.use("/getData", getData);
app.use("/updateData", updateData);
app.use("/deleteData", deleteData);
app.use('/postTrueGrowth',postTrueGrowth)
app.use("/getTrueGrowthData",getTrueGrowthData)
const PORT = process.env.PORT || 5000; // Default to 5000 if PORT is not set
app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
