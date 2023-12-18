const Task = require('../models/taskModel'); // Adjust the path as necessary

// Add a new task
exports.addTask = async (req, res) => {
  try {
    // Create a new task with data from the request body
    const newTask = new Task({
      description: req.body.description,
      status: 'Ongoing', // You can set the default status here
      id: req.body.id, // Assign a unique ID for the task
      // You might also want to associate the task with the authenticated user here
    });

    // Save the task to the database
    const savedTask = await newTask.save();

    // Respond with the saved task
    res.json(savedTask);
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Edit an existing task
exports.editTask = async (req, res) => {
  try {
    // Find the task by ID
    const task = await Task.findOne({ id: req.params.taskId });

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    // Update task properties
    task.description = req.body.description;
    task.status = req.body.status;

    // Save the updated task
    const updatedTask = await task.save();

    // Respond with the updated task
    res.json(updatedTask);
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Delete a task by ID
exports.deleteTask = async (req, res) => {
  try {
    // Find the task by ID and remove it
    await Task.findOneAndRemove({ id: req.params.taskId });

    // Respond with a success message
    res.json({ message: 'Task deleted' });
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
