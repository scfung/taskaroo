const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            
        },
        description: String,
        status: {
            type: String,
            enum: ['Completed, Ongoing, On-Hold'],
            default: 'Ongoing'
        },
        timestamps: true
    }
);

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;

//Timestamps bring createdAt and updatedAt fields, used to display time info, like when tasks are created or updated.