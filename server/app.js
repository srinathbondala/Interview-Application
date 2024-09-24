const express = require('express');
const cors = require('cors');
const connectDB = require('./dbconfig/db');
const userRoutes = require('./routes/userRouters');
const authRouter = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRouters');
const jwtMiddleware = require('./middleware/jwtMiddleware');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

connectDB();

app.use('/auth', authRouter);
app.use('/user', jwtMiddleware.isUser, userRoutes);
app.use('/admin', jwtMiddleware.isAdmin, adminRoutes);
app.use('/', (req, res) => {
    res.send('Welcome to the Home Page');
});
app.listen(port, () => {
    console.log(`Server running on port ${port} at http://localhost:${port}`);
});