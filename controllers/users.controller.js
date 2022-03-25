const { genSalt, hash } = require("bcryptjs");

const User = require("../models/user");

const getUsers = async (req, res) => {
  const { skip = 0, limit = 5, state = true } = req.query;

  const [count, users] = await Promise.all([
    User.countDocuments({ state }),
    User.find({ state }).skip(Number(skip)).limit(Number(limit)),
  ]);

  res.json({
    count,
    users,
  });
};

const getUser = async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(id);

  res.json(user);
};

const createUser = async (req, res) => {
  const { name, surname, email, role, password } = req.body;

  const salt = await genSalt();
  const hashedPassword = await hash(password, salt);

  const newUser = new User({
    name,
    surname,
    email,
    role,
    password: hashedPassword,
  });

  await newUser.save();

  res.json(newUser);
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { google, state, password, ...rest } = req.body;

  if (password) {
    const salt = await genSalt();
    rest.password = await hash(password, salt);
  }

  const updatedUser = await User.findByIdAndUpdate(id, { rest }, { new: true });

  res.json(updatedUser);
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  const deletedUser = await User.findByIdAndUpdate(
    id,
    { state: false },
    { new: true }
  );

  res.json(deletedUser);
};

const realDeleteUser = async (req, res) => {
  const { id } = req.params;

  const deletedUser = await User.findByIdAndDelete(id);

  res.json(deletedUser);
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  realDeleteUser,
};
