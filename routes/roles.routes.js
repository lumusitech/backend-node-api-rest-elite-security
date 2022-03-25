const { Router } = require("express");
const { param, body } = require("express-validator");

const {
  getRoles,
  createRole,
  getRole,
  updateRole,
  deleteRole,
} = require("../controllers/roles.controller");

const {
  roleExistsById,
  roleAlreadyExists,
} = require("../helpers/db-validators");

const validateFields = require("../middlewares/validate-fields");

const rolesRouter = Router();

rolesRouter.get("/", getRoles);

rolesRouter.get(
  "/:id",
  [
    param("id", "must be an ObjectId").isMongoId(),
    param("id").custom(roleExistsById),
    validateFields,
  ],
  getRole
);

rolesRouter.post(
  "/",
  [
    body("role", "role is required").not().isEmpty(),
    body("role").custom(roleAlreadyExists),
    validateFields,
  ],
  createRole
);

rolesRouter.put(
  "/:id",
  [
    param("id", "must be an ObjectId").isMongoId(),
    param("id").custom(roleExistsById),
    body("role").custom(roleAlreadyExists),
    validateFields,
  ],
  updateRole
);

rolesRouter.delete(
  "/:id/real-delete",
  [
    param("id", "must be an ObjectId").isMongoId(),
    param("id").custom(roleExistsById),
    validateFields,
  ],
  deleteRole
);

module.exports = rolesRouter;
