import { Router } from "express";

import { database } from "../fireBase/database.js";
import { set,ref } from "firebase/database";
const router = Router();

router.post("/",async(req,res)=>{
try{
    
const {data} = req.body
set(ref(database,"sheet-data"),{
    data
})
return res.json({message:"sheet data send to data base ",data})
}catch(e){
    console.log("Could able to POST data");
    return res.json({message:'Could not able to send data',error:e.message})
}
})

export default router