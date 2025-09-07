const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: "Event" },
  rating: { type: Number, min: 1, max: 5 },
  comment: String
});

module.exports = mongoose.model("Feedback", feedbackSchema);
