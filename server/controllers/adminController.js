const Job = require('../models/company_details_schems');
const JobApplication = require('../models/job_application_schema');

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

//only prefered when job is not applied by any user
//controller to delete a job
const deleteJob = async (req, res) => {
  try {
    const deletedJob = await Job.findByIdAndDelete(req.params.id);
    res.status(200).json(deletedJob);
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
          _id: {
            jobId: "$_id",
            companyName: "$companyName",
            role: "$role",
            salaryRange: "$salaryRange",
            description: "$description",
            technicalSkills: "$technicalSkills"
          },
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

// Controller to get all applied jobs

const getAppliedJobs = async (req, res) => {
  try {
    const allJobs = await JobApplication.find();
    res.status(200).json(allJobs);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//Get data per job application based on status
const orderedJobs = async (req, res)=>{
  try{
    const jobid = req.params.id;
    const allJobs = await JobApplication.find({ jobId: jobid })
    .select('-comments')
    .populate({
    path: 'userId',
    select: 'name email -_id',
    populate: [
      {
        path: 'acadamicDetailsKey',
        model: 'Education',
        select: 'education.grade education.passingYear education.branch', 
      },
      {
        path: 'profactionalDetailsKey',
        model: 'ProfessionalDetails',
        select: 'experience skills achievements', 
      }
    ]
  });
    const appliedJobs = [];
    const rejectedJobs = [];
    const otherJobs = [];

    allJobs.forEach(job => {
      if (job.status === 'Applied') {
        appliedJobs.push(job);
      } else if (job.status === 'Rejected') {
        rejectedJobs.push(job);
      } else {
        otherJobs.push(job);
      }
    });

    res.status(200).json({
      applied: appliedJobs,
      rejected: rejectedJobs,
      others: otherJobs
    });
  }
  catch(error){
    res.status(400).json({ error: error.message });
  }
}

// Controller to get all new applications
const getNewApplications = async (req, res) => {
  try {
    const allJobs = await JobApplication.find({ status: 'Applied' });
    res.status(200).json(allJobs);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//get active jobs
const getActiveJobs = async (req, res) => {
  try {
      const allJobs = await Job.find({
          registrationEnded: { 
              $gte: new Date().toISOString().split('T')[0]
          }
      });
      res.status(200).json(allJobs);
  } catch (error) {
      res.status(400).json({ error: error.message });
  }
  
};

//accept application
const acceptApplication = async (req, res) => {
  try {
    const jobApplication = await JobApplication.findByIdAndUpdate(req.params.id, { status: 'Accepted' });
    res.status(200).json(jobApplication);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//reject application
const rejectApplication = async (req, res) => {
  try {
    const jobApplication = await JobApplication.findByIdAndUpdate(req.params.id, { status: 'Rejected' });
    res.status(200).json(jobApplication);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//change status of application
const changeStatus = async (req, res) => {
  try {
    const jobApplication = await JobApplication.findByIdAndUpdate(req.params.id, { status: req.body.status });
    res.status(200).json(jobApplication);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//add comment to application
const addComment = async (req, res) => {
  try {
    const newComment = {
      timestamp: new Date(),
      comment: req.body.comment
    };

    const jobApplication = await JobApplication.findByIdAndUpdate(
      req.params.id,
      { $push: { comments: newComment } }
    );

    res.status(200).json(jobApplication);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


module.exports = { addJob, getallJobs, getTopCompanies, getAppliedJobs,deleteJob ,getNewApplications,orderedJobs, getActiveJobs, acceptApplication, rejectApplication, changeStatus, addComment};