import jobsModel from "../models/jobsModel.js";
import mongoose from "mongoose";
import moment from "moment";
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

  const { status, workType, search, sort} = req.query
  // conditions for searching filters 
  const queryObject = {
    createdBy: req.user.userId
  }

  // logic filters

  if (status && status !== 'all') {
      queryObject.status = status
  }

  if (workType && workType !== 'all') {
    queryObject.workType = workType;
  }

  if (search) {
    queryObject.position = { $regex: search, $options: 'i' };
  }

  let queryResult = jobsModel.find(queryObject)

  // sorting
  if (sort === 'latest') {
    queryResult = queryResult.sort('-createdAt')
  }

  if (sort === 'oldest') {
    queryResult = queryResult.sort('createdAt')
  }
  if (sort === 'a-z') {
    queryResult = queryResult.sort('position')
  }
  if (sort === 'z-a') {
    queryResult = queryResult.sort('-position')
  }
  
// pagination
  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 10
  const skip = (page - 1) * limit

  queryResult = queryResult.skip(skip).limit(limit)
  // jobs count 
  const totalJobs = await jobsModel.countDocuments(queryResult)
  const numOfPage = Math.ceil(totalJobs / limit)
  
  const jobs = await queryResult;
  

  // const jobs = await jobsModel.find({ createdBy: req.user.userId });
  res.status(200).json({
    totalJobs,
    jobs,
    numOfPage
  });
};

// Update jobs
export const updateJobController = async (req, res, next) => {
  const { id } = req.params;
  const { company, position } = req.body;
  // validation
  if (!company || !position) {
    next("Please provide all fields");
  }

  // find job
  const job = await jobsModel.findOne({ _id: id });

  // validation
  if (!job) {
    next(`no jobs found with this id ${id}`);
  }

  if (!req.user.userId === job.createdBy.toString()) {
    return;
    next("You are not authorized to update this job");
  }
  const updateJob = await jobsModel.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
    runValidators: true,
  });

  // res
  res.status(200).json({ updateJob });
};

// Delete jobs controller

export const deleteJobController = async (req, res, next) => {
  const { id } = req.params;
  // find job
  const job = await jobsModel.findOne({ _id: id });
  // validation
  if (!job) {
    next(`No Job found with this id ${id}`);
  }
  if (!req.user.userId === job.createdBy.toString()) {
    next("Your not authorize to delete this job");
  }

  await job.deleteOne();
  res.status(200).json({ message: "Success, Job Deleted" });
};

// Jobs stats and filter

export const jobStatsController = async (req, res) => {
  const stats = await jobsModel.aggregate([
    // search by user jobs
    {
      $match: {
        createdBy: new mongoose.Types.ObjectId(req.user.userId),
      },
    },
    {
      $group: {
        _id: "$status",
        count: { $sum: 1 },
      },
    },
  ]);

  // default stats

  const defaultStats = {
    pending: stats.pending || 0,
    reject: stats.rejict || 0,
    interview: stats.interview || 0,
  };

  // monthly yearly stats

  let monthlyApplication = await jobsModel.aggregate([
    {
      $match: {
        createdBy: new mongoose.Types.ObjectId(req.user.userId),
      },
    },
    {
      $group: {
        _id: {
          year: { $year: "$createdAt" },
          month: { $month: "$createdAt" },
        },
        count: {
          $sum: 1,
        },
      },
    },
  ]);

  monthlyApplication = monthlyApplication.map(item => {
    const { _id: { year, month }, count } = item
    const date = moment().month(-1).year(year).format('MMM Y')
    return { date, count }
  })
    .reverse();
  res
    .status(200)
    .json({ totalJob: stats.length, defaultStats, monthlyApplication });
};
