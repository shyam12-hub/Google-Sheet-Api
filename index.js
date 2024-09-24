import dotenv from "dotenv";
import postData from "./routes/postData.js";
import getData from "./routes/getData.js"
import updateData from "./routes/updateData.js"
import deleteData from "./routes/deleteData.js"
import express from "express";
import cors from "cors";

dotenv.config({
  path: "./env"
});

const app = express();

app.use(cors({
  origin: function (origin, callback) {
    const allowedOrigins = ['*']; // Add your allowed origins
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ["GET", "POST","PATCH","DELETE"],
  credentials: true,
}));

  
app.use(express.json());

app.use("/postData", postData);
app.use("/getData",getData);
app.use("/updateData",updateData)
app.use("/deleteData",deleteData)
const PORT = process.env.PORT 
app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
