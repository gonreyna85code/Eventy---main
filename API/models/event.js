const mongoose = require("mongoose");
const event = new mongoose.Schema({
  name: String,
  location: String,
  event_pay: Boolean,
  date: Date,
  user: String,
  info: Object,
});

module.exports = mongoose.model("Event", event);
