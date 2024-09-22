import dotenv from "dotenv";
import postData from "./routes/postData.js";
import express from "express";
import cors from "cors";

dotenv.config({
  path: "./env"
});

const app = express();

app.use(cors({
  origin: ['https://script.google.com'],
    methods: ["GET", "POST"],
    credentials: true,
  }));
  
app.use(express.json());

app.use("/postData", postData);

const PORT = process.env.PORT 
app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
