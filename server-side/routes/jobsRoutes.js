import express from 'express';
import userAuth from '../middelwares/authMiddleware.js';
import { createJobController, deleteJobController, getAllJobsController, updateJobController } from '../controllers/jobController.js';

const router = express.Router();

// router

// Create job post 
router.post('/create-job', userAuth, createJobController);

// Get Job 
router.get('/get-job', userAuth, getAllJobsController)


// Update Jobs || PUT || PATCH

router.patch('/update-job/:id', userAuth, updateJobController)

// Delete jobs
router.delete('/delete-job/:id', userAuth, deleteJobController)


export default router;