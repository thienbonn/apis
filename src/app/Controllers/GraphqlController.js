// src/controllers/userController.js
const User = require('../../models/GraphqlUserModel');

// Lấy tất cả người dùng
const getAllUsers = async () => {
  return await User.findAll();
};

// Lấy người dùng theo ID
const getUserById = async (id) => {
  return await User.findByPk(id);
};

// Tạo người dùng mới
const createUser = async (name, email, age) => {
  const newUser = await User.create({ name, email, age });
  return newUser;
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser
};
