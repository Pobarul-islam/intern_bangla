import jobsModel from "../models/jobsModel.js";
import mongoose from "mongoose";
// Create Job Controller

export const createJobController = async (req, res, next) => {
  const { company, position } = req.body;
  if (!company || !position) {
    next("Please provide all fields");
  }
  req.body.createdBy = req.user.userId;
  const job = await jobsModel.create(req.body);
  res.status(201).json({ job });
};

// Get jobs

export const getAllJobsController = async (req, res, next) => {
  const jobs = await jobsModel.find({ createdBy: req.user.userId });
  res.status(200).json({
    totalJobs: jobs.length,
    jobs,
  });
};

// Update jobs
export const updateJobController = async (req, res, next) => {
    const { id } = req.params
    const { company, position } = req.body
    // validation 
    if (!company || !position) {
        next('Please provide all fields')
    }

    // find job 
    const job = await jobsModel.findOne({ _id: id })
    
    // validation 
    if (!job) {
        next(`no jobs found with this id ${id}`)
    }

    if (!req.user.userId === job.createdBy.toString()) {
        return;
        next('You are not authorized to update this job')
    }
    const updateJob = await jobsModel.findOneAndUpdate({ _id: id }, req.body, {
        new: true,
        runValidators: true,
    })

    // res
    res.status(200).json({ updateJob })
};



// Delete jobs controller

export const deleteJobController = async (req, res, next) => {
    const { id } = req.params
    // find job 
    const job = await jobsModel.findOne({ _id: id })
    // validation 
    if (!job) {
        next(`No Job found with this id ${id}`)
    }
    if (!req.user.userId === job.createdBy.toString()) {
        next('Your not authorize to delete this job')
    }

    await job.deleteOne();
    res.status(200).json({message: "Success, Job Deleted"})
}



// Jobs stats and filter

export const jobStatsController = async (req, res) => {
    const stats = await jobsModel.aggregate([
      // search by user jobs
      {
        $match: {
          createdBy: new mongoose.Types.ObjectId(req.user.userId),
        },
      },
    ]);
    res.status(200).json({totalJob:stats.length,stats });
};