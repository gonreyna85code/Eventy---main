const mongoose = require("mongoose");
const user = new mongoose.Schema({
  username: String,
  password: String,
  profile: Object,
});

module.exports = mongoose.model("User", user);
