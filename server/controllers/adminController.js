const Job = require('../models/company_details_schems');

// Controller to add a new job
const addJob = async (req, res) => {
  try {
    const newJob = new Job(req.body);
    const savedJob = await newJob.save();
    res.status(201).json(savedJob);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Controller to get all jobs
const getallJobs = async (req, res) => {
  try {
    const allJobs = await Job.find();
    res.status(200).json(allJobs);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Controller to get the top companies based on job postings
const getTopCompanies = async (req, res) => {
  try {
    const topCompanies = await Job.aggregate([
      {
        $group: {
          _id: "$companyName",
          totalJobs: { $sum: 1 }
        }
      },
      { $sort: { totalJobs: -1 } },
      { $limit: 10 }
    ]);
    res.status(200).json(topCompanies);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { addJob, getallJobs, getTopCompanies };
