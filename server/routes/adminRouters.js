const express = require('express');
const { addJob, getallJobs, getAppliedJobs, deleteJob,getNewApplications ,getActiveJobs, orderedJobs,acceptApplication, rejectApplication, changeStatus, addComment} = require('../controllers/adminController');

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
router.put('/add-comment/:id', addComment);

// send email to user

module.exports = router;
