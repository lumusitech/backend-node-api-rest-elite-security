const Role = require("../models/role");

const getRoles = async (req, res) => {
  const roles = await Role.find();

  res.json(roles);
};

const getRole = async (req, res) => {
  const { id } = req.params;

  const role = await Role.findById(id);

  res.json(role);
};

const createRole = async (req, res) => {
  const { role } = req.body;

  const newRole = new Role({ role });

  await newRole.save();

  res.json(newRole);
};

const updateRole = async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;

  const updatedRole = await Role.findByIdAndUpdate(id, { role }, { new: true });

  res.json(updatedRole);
};

const deleteRole = async (req, res) => {
  const { id } = req.params;

  const deletedRole = await Role.findByIdAndDelete(id);

  res.json(deletedRole);
};

module.exports = {
  getRoles,
  getRole,
  createRole,
  updateRole,
  deleteRole,
};
