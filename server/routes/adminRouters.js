const express = require('express');
const { addJob, getallJobs } = require('../controllers/adminController');

const router = express.Router();

// Define routes for adding a job and retrieving all jobs
router.post('/add-job', addJob);
router.get('/all-jobs', getallJobs);

module.exports = router;
