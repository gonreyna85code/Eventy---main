const mongoose = require("mongoose");
const user = new mongoose.Schema({
  _id: Number,
  username: String,
  password: String,
  profile: Object,
});

module.exports = mongoose.model("User", user);
