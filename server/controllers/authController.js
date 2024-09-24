const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user_schema');
const Admin = require('../models/admin_schema');

//user registration
exports.register = async (req, res) => {
  const { username, firstName, lastName, email, phone, address, dateOfBirth, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username,
            firstName,
            lastName,
            email,
            phone,
            address,
            dateOfBirth,
            password: hashedPassword
        });

        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

exports.login = async (req, res) => {
 
};

// User Login
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ token, user });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// Admin Registration
exports.registerAdmin = async (req, res) => {
    const { username, firstName, lastName, email, phone, address, position, password } = req.body;

    try {
        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({ message: 'Admin already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newAdmin = new Admin({
            username,
            firstName,
            lastName,
            email,
            phone,
            address,
            position,
            password: hashedPassword
        });

        await newAdmin.save();

        res.status(201).json({ message: 'Admin registered successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// Admin Login
exports.loginAdmin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(400).json({ message: 'Admin not found' });
        }
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ id: admin._id, role: admin.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ token, admin });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};
