const { model, Schema } = require("mongoose");

const userSchema = Schema({
  name: {
    type: String,
    require: [true, "is required"],
  },
  surname: {
    type: String,
    require: [true, "is required"],
  },
  email: {
    type: String,
    require: [true, "email is required"],
    unique: [true, "email must be unique"],
  },
  password: {
    type: String,
    require: [true, "password is required"],
  },
  role: {
    type: String,
    require: [true, "role is required"],
  },
  state: {
    type: Boolean,
    default: true,
  },
  google: {
    type: Boolean,
    default: false,
  },
});

userSchema.methods.toJSON = function () {
  const { __v, password, ...userToShow } = this.toObject();
  return userToShow;
};

module.exports = model("User", userSchema);
