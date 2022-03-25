const User = require("../models/user");
const Role = require("../models/role");

const userExistsById = async (id = "") => {
  const user = await User.findById(id);
  if (!user) {
    throw new Error(`user with id ${id} was not found`);
  }
};

const emailAlreadyExists = async (email = "") => {
  const emailExists = await User.findOne({ email });
  if (emailExists) {
    throw new Error(`email ${email} is already registered`);
  }
};

const validateRole = async (role = "") => {
  const roleFounded = await Role.findOne({ role });

  if (!roleFounded) {
    throw new Error(`${role} is an invalid role`);
  }
};

const roleAlreadyExists = async (role = "") => {
  const roleFounded = await Role.findOne({ role });

  if (roleFounded) {
    throw new Error(`${role} is already registered`);
  }
};

const roleExistsById = async (id = "") => {
  const roleFounded = await Role.findById(id);

  if (!roleFounded) {
    throw new Error(`Role with id ${id} is not exists`);
  }
};

module.exports = {
  userExistsById,
  emailAlreadyExists,
  validateRole,
  roleAlreadyExists,
  roleExistsById,
};
