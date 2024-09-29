const User = require('../models/user_schema');
const jwt = require('jsonwebtoken');
const Education = require('../models/acadamic_details_schema');
const ProfessionalDetails = require('../models/professional_details_schema');
const Job = require('../models/company_details_schems');
const JobApplication = require('../models/job_application_schema');
//Get user profile
exports.getProfile = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;
        const data = await User.findById(userId).populate('acadamicDetailsKey profactionalDetailsKey');
        return res.status(200).json(data);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
//Update user profile
exports.updateProfile = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;
        const { personalData, educationData, professionalData } = req.body;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
          }
      
          user.firstName = personalData.firstName;
          user.lastName = personalData.lastName;
          user.phone = personalData.phone;
          user.address = personalData.address;
          user.dateOfBirth = personalData.dateOfBirth;
      
          if (user.acadamicDetailsKey) {
            await Education.findByIdAndUpdate(user.acadamicDetailsKey, educationData);
          } else {
            const newEducation = new Education({ userId, ...educationData });
            const savedEducation = await newEducation.save();
            user.acadamicDetailsKey = savedEducation._id;
          }
      
          if (user.profactionalDetailsKey) {
            await ProfessionalDetails.findByIdAndUpdate(user.profactionalDetailsKey, professionalData);
          } else {
            const newProfessionalDetails = new ProfessionalDetails({ userId, ...professionalData });
            const savedProfessionalDetails = await newProfessionalDetails.save();
            user.profactionalDetailsKey = savedProfessionalDetails._id;
          }
      
          await user.save();
      
        return res.status(200).json({personalData, educationData, professionalData});
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all Jobs
exports.getallJobs = async (req, res) => {
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

// Get Job by ID
exports.getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({ error: 'Job not found' });
        }
        res.status(200).json(job);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Apply for a job
exports.applyJob = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;
        const { jobId } = req.body;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({ error: 'Job not found' });
        }
        const jobApplication = new JobApplication({ userId, jobId});
        const savedJobApplication = await jobApplication.save();
        if(!user.jobApplicationKeys) {
            user.jobApplicationKeys = [];
        }
        if(user.jobApplicationKeys.includes(jobId)) {
            return res.status(400).json({ error: 'You have already applied for this job' });
        }
        user.jobApplicationKeys.push(jobId);
        await user.save();
        res.status(200).json({message:"success", data:savedJobApplication});
    } catch (error) {
        res.status(400).json({ error: error.message });
        console.error('Error applying for the job:', error);
    }
};

//view jobs applyed by user
exports.getJobByUser = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;
        const allJobs = await JobApplication.find({ userId: userId }).select('-comments -resume -userId').populate('jobId', 'companyName role');
        const flattenedJobs = allJobs.map(job => ({
            _id: job._id,
            appliedDate: job.appliedDate,
            status: job.status,
            jobId: job.jobId._id,
            companyName: job.jobId.companyName,
            role: job.jobId.role,
        }));
        res.status(200).json(flattenedJobs);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getEducationDetails = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await Education.findOne({ userId: decoded.id });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}