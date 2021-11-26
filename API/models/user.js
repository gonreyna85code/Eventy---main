const mongoose = require("mongoose");


const user =  mongoose.Schema({  
  username: String,
  password: String,
  profile: Object,
  events: [{ type: mongoose.Schema.Types.ObjectId, ref: "Event" }],
});

module.exports = mongoose.model("User", user);
