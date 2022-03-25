const { model, Schema } = require("mongoose");

roleSchema = Schema({
  role: {
    type: String,
    require: [true, "role name is required"],
  },
});

roleSchema.methods.toJSON = function () {
  const { __v, ...roleToShow } = this.toObject();
  return roleToShow;
};

module.exports = model("Role", roleSchema);
