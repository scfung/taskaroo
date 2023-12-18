const User = require('../models/User');
const jwt = require('jsonwebtoken');
const validator = require('email-validator');
const Task = require('../models/Task'); // Import the Task model

const signin = async (req, res) => {
  let { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    console.log(user, req.body);
    if (!user) {
      return res.status(400).send('email does not exist');
    }

    user.comparePassword(password, (err, match) => {
      if (!match || err) return res.status(400).send('password does not match');
      let token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '24h',
      });

      res.status(200).send({
        token,
        username: user.username,
        email: user.email,
        id: user._id,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      });
    });
  } catch (error) {
    return res.status(400).send('login failed');
  }
};

const register = async (req, res) => {
  console.log(req.body, 'req');
  const { email, username, password } = req.body;
  try {
    if (!username) return res.status(400).send('username is required');

    if (!email) return res.status(400).send('email is required');

    if (!validator.validate(email)) {
      return res.status(400).send('enter valid email id');
    }
    if (!password || password.length < 6) {
      return res.status(400).send('enter a valid password');
    }

    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).send('email is taken');
    }

    const user = await new User({
      email,
      username,
      password,
    });

    await user.save();
    let token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '24h',
    });

    // Return the user object without the password, along with the token
    const userObject = user.toObject();
    delete userObject.password; // This removes the password property from the object

    return res.status(201).send({ ...userObject, token });
  } catch (error) {
    console.error('Error creating user', error);
    res.status(400).send('Error during registration: ' + error.message);
  }
};

// Add this function to retrieve tasks associated with the authenticated user
const getTasks = async (req, res) => {
  const userId = req.user._id; // Get the user ID from the authenticated user

  try {
    const tasks = await Task.find({ userId });
    res.status(200).json(tasks);
  } catch (error) {
    console.error('Error fetching tasks', error);
    res.status(500).send('Error fetching tasks');
  }
};

module.exports = {
  signin,
  register,
  getTasks, // Export the getTasks function
};
