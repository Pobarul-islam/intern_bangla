import express from "express";
import { loginController, registerController } from "../controllers/authController.js";

// routes object
const router = express.Router();

// REGISTER ROUTE
router.post("/register", registerController);

// LOGIN ROUTE 
router.post("/login", loginController)

// export
export default router;
