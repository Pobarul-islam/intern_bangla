import jobsModel from "../models/jobsModel.js";

// Create Job Controller 

export const createJobController = async (req, res, next) => {
    const { company, position } = req.body;
    if (!company || !position) {
        next('Please provide all fields')
    }
    req.body.createdBy = req.user.userId
    const job = await jobsModel.create(req.body)
    res.status(201).json({ job });
}


// Get jobs 

export const getAllJobsController = async (req, res, next) => {
    const jobs = await jobsModel.find({ createdBy: req.user.userId })
    res.status(200).json({
        totalJobs: jobs.length,
        jobs,
    });
}