const mongoose = require("mongoose");
const Student = require("./models/Student");
const Event = require("./models/Event");
const Registration = require("./models/Registration");
const Attendance = require("./models/Attendance");
const Feedback = require("./models/Feedback");
require("dotenv").config();
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

async function seed() {
  try {
    // Clear old data
    await Student.deleteMany({});
    await Event.deleteMany({});
    await Registration.deleteMany({});
    await Attendance.deleteMany({});
    await Feedback.deleteMany({});

    // Add Students
    const students = await Student.insertMany([
      { name: "Alice", rollNo: "21CS001", email: "alice@example.com", collegeId: "C001" },
      { name: "Bob", rollNo: "21CS002", email: "bob@example.com", collegeId: "C001" },
      { name: "Charlie", rollNo: "21CS003", email: "charlie@example.com", collegeId: "C001" }
    ]);

    // Add Events
    const events = await Event.insertMany([
      { title: "Hackathon 2025", type: "Workshop", date: new Date("2025-09-10"), collegeId: "C001" },
      { title: "Tech Talk: AI", type: "Seminar", date: new Date("2025-09-15"), collegeId: "C001" },
      { title: "Cultural Fest", type: "Fest", date: new Date("2025-10-01"), collegeId: "C001" }
    ]);

    // Add Registrations
    await Registration.insertMany([
      { studentId: students[0]._id, eventId: events[0]._id },
      { studentId: students[1]._id, eventId: events[0]._id },
      { studentId: students[2]._id, eventId: events[1]._id }
    ]);

    // Add Attendance
    await Attendance.insertMany([
      { studentId: students[0]._id, eventId: events[0]._id, status: "Present" },
      { studentId: students[1]._id, eventId: events[0]._id, status: "Absent" },
      { studentId: students[2]._id, eventId: events[1]._id, status: "Present" }
    ]);

    // Add Feedback
    await Feedback.insertMany([
      { studentId: students[0]._id, eventId: events[0]._id, rating: 5, comment: "Amazing event!" },
      { studentId: students[2]._id, eventId: events[1]._id, rating: 4, comment: "Very informative." }
    ]);

    console.log("✅ Database seeded successfully!");
    process.exit();
  } catch (err) {
    console.error("❌ Error seeding database:", err);
    process.exit(1);
  }
}

seed();
