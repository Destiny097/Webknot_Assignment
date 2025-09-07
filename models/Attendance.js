const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: "Event" },
  status: { type: String, enum: ["Present", "Absent"] }
});

module.exports = mongoose.model("Attendance", attendanceSchema);
