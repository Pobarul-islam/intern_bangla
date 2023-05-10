// import 
import colors from "colors";
import express from "express";
import dotenv from 'dotenv';
import connectDB from "./config/db.js";
import testRoutes from './routes/testRoutes.js'
import morgan from "morgan";
import cors from "cors";
// Dot env config 
dotenv.config()


// mongodb connection 
connectDB();

// rest object 
const app = express();

// middelwares
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));




// route 
app.use('/api/v1/test', testRoutes)



// port 
const PORT = process.env.PORT || 5000;



// listen 
app.listen(PORT, () => {
    console.log(`intern_bangla server is running !!`.bgBlue)
})