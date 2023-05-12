// packages imports  
import colors from "colors";
import express from "express";
import dotenv from 'dotenv';
import connectDB from "./config/db.js";
import morgan from "morgan";
import cors from "cors";
import "express-async-errors";
// routes import 
import testRoutes from './routes/testRoutes.js'
import authRoutes from './routes/authRoutes.js'
import errorMiddelware from "./middelwares/errorMiddelware.js";
import userRoutes from './routes/userRoutes.js';
import jobsRoutes from './routes/jobsRoutes.js';


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
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/job", jobsRoutes)

// validation middelware 
app.use(errorMiddelware);


// port 
const PORT = process.env.PORT || 5000;



// listen 
app.listen(PORT, () => {
    console.log(`intern_bangla server is running !!`.bgBlue)
})