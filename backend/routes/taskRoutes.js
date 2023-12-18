const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController'); // Adjust the path as necessary
const User = require('../models/User'); // Import your User model
const jwt = require('jsonwebtoken'); // Import jwt for authentication

// Middleware function to authenticate the user
const authMiddleware = async (req, res, next) => {
    const token = req.header('Authorization'); // Assuming you send the token in the "Authorization" header

    if (!token) {
        return res.status(401).json({ message: 'Authorization token is required' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token
        const user = await User.findById(decoded._id); // Find the user by ID

        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }

        req.user = user; // Attach the user object to the request
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};

// Define task routes
router.post('/add', authMiddleware, taskController.addTask);
router.put('/edit/:taskId', authMiddleware, taskController.editTask);
router.delete('/delete/:taskId', authMiddleware, taskController.deleteTask);

// Add a route to retrieve tasks for the authenticated user
router.get('/user-tasks', authMiddleware, taskController.getTasks);

module.exports = router;
