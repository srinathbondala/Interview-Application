const express = require('express');
const { addJob, getallJobs, getAppliedJobs, deleteJob,getNewApplications ,getActiveJobs} = require('../controllers/adminController');

const router = express.Router();

// Define routes for adding a job and retrieving all jobs
router.post('/add-job', addJob);
router.get('/all-jobs', getallJobs);
router.get('/applyed', getAppliedJobs);
router.delete('/delete-job/:id', deleteJob);
router.get('/rejected', getallJobs);
router.get('/newApplications',getNewApplications);
router.get('/activeJobs',getActiveJobs);


module.exports = router;
