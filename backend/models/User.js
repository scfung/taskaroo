const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Tasks = require('./tasksModel');

const TaskSchema = new mongoose.Schema({
  description: String,
  status: String,
  id: Number,
});

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  tasks: TaskSchema, // Adding tasks array to user schema
});

// Password hashing middleware
userSchema.pre('save', async function(next) {
  if (this.isModified('password') || this.isNew) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
});

// Password comparison method
userSchema.methods.comparePassword = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) {
      return callback(err);
    }
    callback(null, isMatch);
  });
};



module.exports = mongoose.model('User', userSchema);
