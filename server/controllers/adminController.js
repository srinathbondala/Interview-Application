const Job = require('../models/company_details_schems');
const JobApplication = require('../models/job_application_schema');
const {sendEmail} = require('../emailService/emailService');
const jwt = require('jsonwebtoken');

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

// Controller to get the top companies based on job postings
// const getTopCompanies = async (req, res) => {
//   try {
//     const topCompanies = await Job.aggregate([
//       {
//         $group: {
//           _id: {
//             _id: "$_id",
//             companyName: "$companyName",
//             role: "$role",
//             salaryRange: "$salaryRange",
//             description: "$description",
//             technicalSkills: "$technicalSkills",
//             createdDate: "$createdDate",
//           },
//           totalJobs: { $sum: 1 }
//         }
//       },
//       { $sort: { "_id.createdDate": 1 ,"_id.companyName": 1, "totalJobs": 1 } },
//       // { $limit: 10 }
//     ]);
    
//     res.status(200).json(topCompanies);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

const getTopCompanies = async (req, res) => {
  try {
    const topCompanies = await Job.aggregate([
      {
        $lookup: {
          from: "jobapplications",
          localField: "_id",
          foreignField: "jobId",
          as: "applications",
        },
      },
      {
        $group: {
          _id: {
            _id: "$_id",
            companyName: "$companyName",
            role: "$role",
            salaryRange: "$salaryRange",
            description: "$description",
            technicalSkills: "$technicalSkills",
            createdDate: "$createdDate",
          },
          totalJobs: { $sum: 1 },
          applicationCount: { $sum: { $size: "$applications" } },
        },
      },
      { $sort: { "_id.createdDate": 1, "_id.companyName": 1, "totalJobs": 1 } },
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

    // console.log(appliedJobs, rejectedJobs, otherJobs);
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
// get job application based on job id
const getJobApplication = async (req, res) => {
  try {
      const jobid = req.params.id;
      const allJobs = await JobApplication.find({ jobId: jobid })
      .select('-comments')
      .populate({
      path: 'userId',
      select: 'firstName lastName email -_id',
      populate: [
        {
          path: 'acadamicDetailsKey',
          model: 'Education',
          select: 'education.grade education.passingYear education.branch education.college', 
        },
        {
          path: 'profactionalDetailsKey',
          model: 'ProfessionalDetails',
          select: 'experience skills', 
        }
      ]
    });
    res.status(200).json(allJobs);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// get user details based on job application id
const getUserDetailsByJobId = async (req, res) => {
  try {
      const jobid = req.params.id;
      const allJobs = await JobApplication.find({ _id: jobid })
      .populate({
        path: 'userId',
        populate: [
          {
            path: 'acadamicDetailsKey',
            model: 'Education',
          },
          {
            path: 'profactionalDetailsKey',
            model: 'ProfessionalDetails',
          }
        ]
      })
      .populate({
        path: 'jobId',
        model: 'Job',
        select: 'companyName role salaryRange description'
      })
      res.status(200).json(allJobs);
  }
  catch (error) {
    res.status(400).json({ error: error.message });
  }
};


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
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;
    const jobApplication = await JobApplication.findByIdAndUpdate(req.params.id, { status: 'Accepted' , latestChangesBy: userId, latestChangesAt: new Date()});
    res.status(200).json(jobApplication);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

//reject application
const rejectApplication = async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;
    const jobApplication = await JobApplication.findByIdAndUpdate(req.params.id, { status: 'Rejected' , latestChangesBy: userId, latestChangesAt: new Date()});
    res.status(200).json(jobApplication);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

//change status of application
const changeStatus = async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const adminId = decoded.id;
    const jobApplication = await JobApplication.findByIdAndUpdate(req.params.id, { status: req.body.status , latestChangesBy: adminId, latestChangesAt: new Date()});
    res.status(200).json(jobApplication);
  } catch (error) {
    console.log(error);
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

    await JobApplication.findByIdAndUpdate(
      req.params.id,
      { $push: { comments: newComment } }
    );

    res.status(200).json({newComment});
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

const addSuggestion = async (req, res) => {
  try {
    const newSuggestion = {
      timestamp: new Date(),
      suggestion: req.body.suggestion
    };

    await JobApplication.findByIdAndUpdate(
      req.params.id,
      { $push: { suggestions: newSuggestion } }
    );
    res.status(200).json({newSuggestion});
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

const sendEmailToUser = async (req, res) => {
  try {
    const { email, subject, text } = req.body;
    const response = await sendEmail(email, subject, text);
    res.status(200).json({ message: response });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

const sheduledDateTime = async (req, res) => {
  try {
    const { email, subject, text, sheduledDateTime } = req.body;
    await sendEmail(email, subject, text);
    const jobApplication = await JobApplication.findByIdAndUpdate(
      req.params.id,
      { $push: { sheduledDateTime: sheduledDateTime} }
    );
    res.status(200).json(jobApplication);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
}

const disableUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, { isDisabled: true });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports = { addJob, getallJobs, getTopCompanies, getAppliedJobs,deleteJob ,getNewApplications,orderedJobs, getActiveJobs, acceptApplication, rejectApplication, changeStatus, addComment, getJobApplication,getUserDetailsByJobId, sendEmailToUser,sheduledDateTime ,disableUser,addSuggestion};