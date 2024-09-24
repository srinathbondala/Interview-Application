const express = require('express');
const { getProfile, updateProfile , getallJobs, getJobById} = require('../controllers/userController');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Welcome to the User Page');
});

router.get('/profile', getProfile);
router.put('/update-profile', updateProfile);
router.get('/get-all-jobs', getallJobs);
router.get('/get-by-id/:id', getJobById);

module.exports = router;