import express from 'express';
import userAuth from '../middelwares/authMiddleware.js';
import { updateUserController } from '../controllers/userController.js';

// router object 
const router = express.Router();

// routes

// GET USERS


// UPDATE USER 
router.put('/update-user', userAuth, updateUserController)

export default router;