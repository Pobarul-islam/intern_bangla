import express from 'express';
import userAuth from '../middelwares/authMiddleware.js';
import { createJobController, getAllJobsController } from '../controllers/jobController.js';

const router = express.Router();

// router

// Create job post 
router.post('/create-job', userAuth, createJobController);

// Get Job 
router.get('/get-job', userAuth, getAllJobsController)

export default router;