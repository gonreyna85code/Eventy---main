const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const user = new mongoose.Schema({  
  username: String,
  password: String,
  profile: Object,
  events: [{ type: Schema.Types.ObjectId, ref: "Event" }],
});

module.exports = mongoose.model("User", user);
