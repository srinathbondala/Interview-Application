const express = require('express');
const { addJob, getallJobs, getAppliedJobs, deleteJob,getNewApplications ,getActiveJobs, orderedJobs,acceptApplication, rejectApplication, changeStatus, addComment, getJobApplication, getUserDetailsByJobId, sendEmailToUser,sheduledDateTime} = require('../controllers/adminController');

const router = express.Router();

// Define routes for adding a job and retrieving all jobs
router.post('/add-job', addJob);
router.get('/all-jobs', getallJobs);
router.get('/applyed', getAppliedJobs);
router.delete('/delete-job/:id', deleteJob);
// router.get('/rejected', getallJobs);
router.get('/newApplications',getNewApplications);
router.get('/activeJobs',getActiveJobs);
router.get('/orderedJobs/:id',orderedJobs);
router.put('/accept-application/:id', acceptApplication);
router.put('/reject-application/:id', rejectApplication);
router.put('/change-status/:id', changeStatus);
router.post('/add-comment/:id', addComment);
router.get('/get-job-application/:id', getJobApplication);
router.get('/get-user-details/:id', getUserDetailsByJobId);
router.post('/send-email', sendEmailToUser);
router.post('/sheduled-date-time/', sheduledDateTime);

module.exports = router;
