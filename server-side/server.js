// import 
import colors from "colors";
import express from "express";
import dotenv from 'dotenv';
import connectDB from "./config/db.js";

// Dot env config 
dotenv.config()


// mongodb connection 
connectDB();

// rest object 
const app = express();


// route 
app.get('/', (req, res) => {
    res.send("welcome to intern_bangla website")
})



// port 
const PORT = process.env.PORT || 5000;



// listen 
app.listen(PORT, () => {
    console.log(`intern_bangla server is running !!`.bgBlue)
})