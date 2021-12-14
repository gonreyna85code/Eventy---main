const mongoose = require("mongoose");



const user =  mongoose.Schema({  
  username: String,
  password: String,
  profile: Object,
  name: String,
  email: String,
  publicKey: String,
  events: [{ type: mongoose.Schema.Types.ObjectId, ref: "Event" }],
  follows: [{type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  near: [{ type: mongoose.Schema.Types.ObjectId, ref: "Event" }],
  subscriptions: [{ type: mongoose.Schema.Types.String, ref: "Event" }],
  promises: [{ type: mongoose.Schema.Types.ObjectId, ref: "Event" }],
});

module.exports = mongoose.model("User", user);
