import User from "../models/users.js";
// import bcrypt from 'bcrypt';
// const bcrypt = require('bcryptjs');
import bcrypt from 'bcryptjs';

import jwt from 'jsonwebtoken';

const SECRET_KEY = 'your_secret_key'; 

export const search = async (params) => {
  const users = User.find(params).select("-password").exec();
  return users;
};

//create new reminder user
export const save = async (newUser) => {
  const user = new User(newUser);
  return user.save();
};

export const validate = async ({ email, password }) => {
  try {
    // Find user by email
    const user = await User.findOne({ email }).exec();
    if (!user) {
      // throw new Error('User not found');
      return null;
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      // throw new Error('Invalid credentials');
      return null;
    }

    // const token = jwt.sign({ id: user._id, email: user.email }, SECRET_KEY, {
    //   expiresIn: '1h',
    // });
    // return  { user, token };

    return  user;
  } catch (error) {
    throw new Error(error.message);
  }
};

//get user by ID
export const getById = async (id) => {
  const user = User.findById(id).exec();
  return user;
};

//get user by email
export const getByEmail = async (email) => {
  try {
    // Use Mongoose findOne method to find user by email
    const user = await User.findOne({ email });
    return user;
  } catch (error) {
    throw new Error(error);
  }
};

//update user
export const update = async (id, updatedUser) => {
  const user = User.findByIdAndUpdate(id, updatedUser, {
    new: true,
  }).exec();
  return user;
};

//delete user
export const remove = async (id) => {
  const user = User.findByIdAndRemove(id).exec();
  return user;
};

//get user by username
export const getByUserName = async (userName) => {
  const user = User.findOne(userName).exec();
  return user;
};

