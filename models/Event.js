const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: String,
  type: String,
  date: Date,
  collegeId: String
});

module.exports = mongoose.model("Event", eventSchema);
