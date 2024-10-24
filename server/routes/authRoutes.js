const express = require('express');
const { register, login, registerAdmin, loginAdmin } = require('../controllers/authController');
const { getTopCompanies } = require('../controllers/adminController');
const { getallJobs } = require('../controllers/userController');
const { get } = require('mongoose');

const router = express.Router();

// User Routes
router.post('/register', register);
router.post('/login', login);

// Admin Routes
router.post('/admin/register', registerAdmin);
router.post('/admin/login', loginAdmin);

// Company Detailse
router.get('/top-company', getTopCompanies);
router.get('/get-all-jobs', getallJobs);
module.exports = router;
