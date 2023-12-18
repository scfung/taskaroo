require('dotenv').config();

const cors = require('cors');
const express = require('express');
const app = express();
const port = process.env.PORT || 3001; // Use the environment port or 3001

// Enable CORS for all routes
app.use(cors());
// Middleware
app.use(express.json());

// Database Connection
require('./database.js'); // Assuming database.js is in the same directory

// Routes
const authRoutes = require('./routes/authRoutes.js');
app.use('/api/auth', authRoutes); // Prefixing auth routes with '/api/auth'

const taskRoutes = require('./routes/taskRoutes.js'); // Adjust the path as necessary
app.use('/api/tasks', taskRoutes);

// Start the Server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
