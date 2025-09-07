const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: "Event" },
  timestamp: { type: Date, default: Date.now }
});

registrationSchema.index({ studentId: 1, eventId: 1 }, { unique: true });

module.exports = mongoose.model("Registration", registrationSchema);
