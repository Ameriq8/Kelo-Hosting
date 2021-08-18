const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  userName: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 8 },
});

module.exports = model("user", userSchema);
