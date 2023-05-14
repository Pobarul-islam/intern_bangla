// packages imports
import colors from "colors";
import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import "express-async-errors";

// API Documention
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

// security imports
import helmet from "helmet";
import xss from 'xss-clean';
import mongoSanitize from 'express-mongo-sanitize';
// files import
import connectDB from "./config/db.js";

// routes import
import testRoutes from "./routes/testRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import errorMiddelware from "./middelwares/errorMiddelware.js";
import userRoutes from "./routes/userRoutes.js";
import jobsRoutes from "./routes/jobsRoutes.js";

// Dot env config
dotenv.config();

// mongodb connection
connectDB();

// swagger api config 
// swagger api options 
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Job Portal Application",
      description: "Node Expressjs job portal application",
    },
    servers: [
      {
        url: "http://localhost:5000",
      },
    ],
  },
  apis:['./routes/*.js'],
};

const spec = swaggerJSDoc(options)

// rest object
const app = express();

// middelwares
app.use(helmet());
app.use(xss());
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(mongoSanitize());

// route

app.use("/api/v1/test", testRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/job", jobsRoutes);


// homeroute root 
app.use("/api-doc", swaggerUi.serve, swaggerUi.setup(spec));
// validation middelware
app.use(errorMiddelware);

// port
const PORT = process.env.PORT || 5000;

// listen
app.listen(PORT, () => {
  console.log(`intern_bangla server is running !!`.bgBlue);
});
