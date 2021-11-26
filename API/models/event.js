const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const event = new mongoose.Schema({
  name: String,
  location: String,
  category: String,
  subcategory: String,
  event_pay: Boolean,
  date: Date,
  user: { type: Schema.Types.ObjectId, ref: "User" },
  info: Object,
});

module.exports = mongoose.model("Event", event);
