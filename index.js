import dotenv from "dotenv";
import postData from "./routes/postData.js";
import express from "express";
import cors from "cors";

dotenv.config({
  path: "./env"
});

const app = express();

app.use(cors({
  origin: function (origin, callback) {
    const allowedOrigins = ['https://script.google.com', `http://localhost:${process.env.PORT}`]; // Add your allowed origins
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ["GET", "POST"],
  credentials: true,
}));

  
app.use(express.json());

app.use("/postData", postData);

const PORT = process.env.PORT 
app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
