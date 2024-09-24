const express = require('express');
const { register, login, registerAdmin, loginAdmin } = require('../controllers/authController');

const router = express.Router();

// User Routes
router.post('/register', register);
router.post('/login', login);

// Admin Routes
router.post('/admin/register', registerAdmin);
router.post('/admin/login', loginAdmin);

// Company Details
exports.topCompany = async (req, res) => {
    try {
        const topCompanies = await getTopCompanies();
        res.status(200).json(topCompanies);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = router;
