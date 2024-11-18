const express = require('express');
const { getProfile, updateProfile , getallJobs, getJobById, applyJob, getJobByUser, getEducationDetails, getJobBySkills, getJobStatusDetails} = require('../controllers/userController');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Welcome to the User Page');
});

router.get('/profile', getProfile);
router.put('/update-profile', updateProfile);
router.get('/get-all-jobs', getallJobs); //only active jobs registration validaty >= today
router.get('/get-by-id/:id', getJobById);
router.post('/apply-job', applyJob);
router.get('/get-applied-jobs', getJobByUser);
router.get('/get-personal-details', getEducationDetails);
router.get('/get-job-by-skills', getJobBySkills);
router.get('/get-job-status-details/:jobId', getJobStatusDetails);
module.exports = router;