const { Router } = require("express");
const { body, param, query } = require("express-validator");

const validateFields = require("../middlewares/validate-fields");

const {
  emailAlreadyExists,
  userExistsById,
  validateRole,
} = require("../helpers/db-validators");

const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  realDeleteUser,
} = require("../controllers/users.controller");

const usersRouter = Router();

usersRouter.get(
  "/",
  [
    query("skip", "skip query must be a number").optional().isNumeric(),
    query("limit", "limit query must be a number").optional().isNumeric(),
    query("state", "state query must be a boolean").optional().isBoolean(),
    validateFields,
  ],
  getUsers
);

usersRouter.get(
  "/:id",
  [
    param("id", "must be an ObjectId").isMongoId(),
    param("id").custom(userExistsById),
    validateFields,
  ],
  getUser
);

usersRouter.post(
  "/",
  [
    body("name", "name is required").not().isEmpty(),
    body("name", "min length 3").isLength({ min: 3 }),
    body("surname", "surname is required").not().isEmpty(),
    body("surname", "min length 3").isLength({ min: 3 }),
    body("email", "email is required").not().isEmpty(),
    body("email", "invalid email format").isEmail(),
    body("email").custom(emailAlreadyExists),
    body("password", "password is required").not().isEmpty(),
    body("password", "min length 3").isLength({ min: 3 }),
    body("password", "must be alphanumeric").isAlphanumeric(),
    body("role", "role is required").not().isEmpty(),
    body("role").custom(validateRole),
    validateFields,
  ],
  createUser
);

usersRouter.put(
  "/:id",
  [
    param("id", "must be an ObjectId").isMongoId(),
    param("id").custom(userExistsById),
    body("name", "min length 3").isLength({ min: 3 }).optional(),
    body("surname", "min length 3").isLength({ min: 3 }).optional(),
    body("email", "invalid email format").isEmail().optional(),
    body("password", "min length 3").isLength({ min: 3 }).optional(),
    body("password", "must be alphanumeric").isAlphanumeric().optional(),
    body("role").custom(validateRole).optional(),
    validateFields,
  ],
  updateUser
);

usersRouter.delete(
  "/:id",
  [
    param("id", "must be an ObjectId").isMongoId(),
    param("id").custom(userExistsById),
    validateFields,
  ],
  deleteUser
);

usersRouter.delete(
  "/:id/real-delete",
  [
    param("id", "must be an ObjectId").isMongoId(),
    param("id").custom(userExistsById),
    validateFields,
  ],
  realDeleteUser
);

module.exports = usersRouter;
